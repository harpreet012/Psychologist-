import { createHash, randomBytes } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { DateTime } from "luxon";
import { getAvailableSlots } from "@/lib/availability";
import {
  bookingConfig,
  bookingIntegrationsConfigured,
} from "@/lib/booking-config";
import {
  cancelRazorpayPaymentLink,
  createRazorpayPaymentLink,
} from "@/lib/razorpay";
import { services } from "@/lib/data";
import { getAdminSupabaseClient } from "@/lib/supabase/adminClient";

interface BookingPayload {
  fullName: string;
  email: string;
  phone: string;
  service: string;
  slotStart: string;
  slotEnd: string;
  sessionType: "online" | "in-person";
  message?: string;
  consent: true;
}

const allowedServices = new Set([
  "Not sure yet",
  ...services.map((service) => service.title),
]);

function isValidPayload(body: unknown): body is BookingPayload {
  if (!body || typeof body !== "object") return false;
  const value = body as Record<string, unknown>;
  const start =
    typeof value.slotStart === "string"
      ? DateTime.fromISO(value.slotStart)
      : DateTime.invalid("missing");
  const end =
    typeof value.slotEnd === "string"
      ? DateTime.fromISO(value.slotEnd)
      : DateTime.invalid("missing");

  return (
    typeof value.fullName === "string" &&
    value.fullName.trim().length > 0 &&
    value.fullName.trim().length <= 100 &&
    typeof value.email === "string" &&
    value.email.length <= 254 &&
    /^\S+@\S+\.\S+$/.test(value.email) &&
    typeof value.phone === "string" &&
    /^\+?[0-9][0-9\s-]{8,18}$/.test(value.phone.trim()) &&
    typeof value.service === "string" &&
    allowedServices.has(value.service) &&
    start.isValid &&
    end.isValid &&
    end > start &&
    (value.sessionType === "online" || value.sessionType === "in-person") &&
    (value.message === undefined ||
      (typeof value.message === "string" && value.message.length <= 1000)) &&
    value.consent === true
  );
}

function tokenHash(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function POST(request: NextRequest) {
  if (!bookingIntegrationsConfigured() || !bookingConfig.feePaise) {
    return NextResponse.json(
      {
        success: false,
        error: "Online booking and payment are being configured. Please try again later.",
      },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "We couldn't read that request. Please try again." },
      { status: 400 }
    );
  }

  if (!isValidPayload(body)) {
    return NextResponse.json(
      { success: false, error: "Please fill in all required fields correctly." },
      { status: 400 }
    );
  }

  const slotStart = DateTime.fromISO(body.slotStart).toUTC();
  const slotEnd = DateTime.fromISO(body.slotEnd).toUTC();
  const localStart = slotStart.setZone(bookingConfig.timeZone);
  const expectedEnd = slotStart.plus({ minutes: bookingConfig.sessionMinutes });
  if (Math.abs(expectedEnd.diff(slotEnd, "minutes").minutes) > 0.01) {
    return NextResponse.json(
      { success: false, error: "That appointment duration is not valid." },
      { status: 400 }
    );
  }

  try {
    const latestSlots = await getAvailableSlots(localStart.toISODate()!);
    const stillAvailable = latestSlots.some(
      (slot) => slot.start === slotStart.toISO() && slot.end === slotEnd.toISO()
    );
    if (!stillAvailable) {
      return NextResponse.json(
        {
          success: false,
          error: "That slot has just become unavailable. Please choose another time.",
        },
        { status: 409 }
      );
    }

    const supabase = getAdminSupabaseClient();
    const now = new Date();
    await supabase
      .from("appointments")
      .update({ status: "cancelled", payment_status: "expired" })
      .eq("status", "pending")
      .eq("payment_status", "pending")
      .lt("hold_expires_at", now.toISOString());

    const holdExpiresAt = new Date(
      now.getTime() + bookingConfig.holdMinutes * 60_000
    );
    const publicToken = randomBytes(24).toString("hex");
    const { data: appointment, error: insertError } = await supabase
      .from("appointments")
      .insert({
        full_name: body.fullName.trim(),
        email: body.email.trim().toLowerCase(),
        phone: body.phone.trim(),
        service: body.service,
        preferred_date: localStart.toISODate(),
        preferred_time: localStart.toFormat("HH:mm"),
        session_type: body.sessionType,
        slot_start: slotStart.toISO(),
        slot_end: slotEnd.toISO(),
        hold_expires_at: holdExpiresAt.toISOString(),
        message: body.message?.trim() || null,
        consent_given_at: now.toISOString(),
        payment_status: "pending",
        amount_paise: bookingConfig.feePaise,
        public_token_hash: tokenHash(publicToken),
        status: "pending",
      })
      .select("id")
      .single();

    if (insertError) {
      if (insertError.code === "23505") {
        return NextResponse.json(
          {
            success: false,
            error: "That slot has just been reserved. Please choose another time.",
          },
          { status: 409 }
        );
      }
      throw insertError;
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;
    const callback = new URL("/book-appointment", siteUrl);
    callback.searchParams.set("booking", appointment.id);
    callback.searchParams.set("token", publicToken);
    callback.searchParams.set("payment", "processing");

    try {
      const paymentLink = await createRazorpayPaymentLink({
        appointmentId: appointment.id,
        amountPaise: bookingConfig.feePaise,
        description: `Counselling consultation on ${localStart.toFormat(
          "dd LLL yyyy, h:mm a"
        )}`,
        name: body.fullName.trim(),
        email: body.email.trim().toLowerCase(),
        phone: body.phone.trim(),
        expireAt: holdExpiresAt,
        callbackUrl: callback.toString(),
      });

      const { error: updateError } = await supabase
        .from("appointments")
        .update({
          payment_link_id: paymentLink.id,
          payment_link_url: paymentLink.short_url,
        })
        .eq("id", appointment.id);
      if (updateError) {
        await cancelRazorpayPaymentLink(paymentLink.id);
        throw updateError;
      }

      return NextResponse.json({
        success: true,
        bookingId: appointment.id,
        paymentUrl: paymentLink.short_url,
        amountPaise: bookingConfig.feePaise,
        holdExpiresAt: holdExpiresAt.toISOString(),
        publicToken,
      });
    } catch (error) {
      await supabase
        .from("appointments")
        .update({ status: "cancelled", payment_status: "failed" })
        .eq("id", appointment.id);
      throw error;
    }
  } catch (error) {
    console.error("Failed to create appointment payment link:", error);
    return NextResponse.json(
      {
        success: false,
        error: "We couldn't reserve that slot right now. Please try again shortly.",
      },
      { status: 500 }
    );
  }
}
