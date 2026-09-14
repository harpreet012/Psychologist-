import { NextRequest, NextResponse } from "next/server";
import { createGoogleAppointmentEvent } from "@/lib/google-calendar";
import { bookingConfig } from "@/lib/booking-config";
import { verifyRazorpayWebhook } from "@/lib/razorpay";
import { getAdminSupabaseClient } from "@/lib/supabase/adminClient";
import { Appointment } from "@/types/appointment";

interface PaymentLinkWebhook {
  event?: string;
  payload?: {
    payment_link?: {
      entity?: {
        id?: string;
        reference_id?: string;
        status?: string;
        amount?: number;
        amount_paid?: number;
        currency?: string;
      };
    };
    payment?: {
      entity?: { id?: string; status?: string; amount?: number };
    };
  };
}

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-razorpay-signature");
  if (!verifyRazorpayWebhook(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid webhook signature." }, { status: 401 });
  }

  let event: PaymentLinkWebhook;
  try {
    event = JSON.parse(rawBody) as PaymentLinkWebhook;
  } catch {
    return NextResponse.json({ error: "Invalid webhook payload." }, { status: 400 });
  }

  if (event.event !== "payment_link.paid") {
    return NextResponse.json({ received: true });
  }

  const link = event.payload?.payment_link?.entity;
  const payment = event.payload?.payment?.entity;
  const appointmentId = link?.reference_id;
  if (!appointmentId || !link?.id) {
    return NextResponse.json({ error: "Missing payment reference." }, { status: 400 });
  }

  try {
    const supabase = getAdminSupabaseClient();
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .eq("id", appointmentId)
      .maybeSingle();
    if (error) throw error;
    const appointment = data as Appointment | null;
    if (!appointment) {
      return NextResponse.json({ error: "Appointment not found." }, { status: 404 });
    }

    const paidAmount = link.amount_paid ?? payment?.amount ?? 0;
    const validPayment =
      (!appointment.payment_link_id || appointment.payment_link_id === link.id) &&
      link.status === "paid" &&
      link.currency === "INR" &&
      appointment.amount_paise !== null &&
      paidAmount >= appointment.amount_paise;
    if (!validPayment) {
      return NextResponse.json({ error: "Payment details did not match." }, { status: 400 });
    }

    if (appointment.payment_status !== "paid") {
      const { error: paidUpdateError } = await supabase
        .from("appointments")
        .update({
          payment_status: "paid",
          paid_at: new Date().toISOString(),
          razorpay_payment_id: payment?.id ?? null,
        })
        .eq("id", appointment.id);
      if (paidUpdateError) throw paidUpdateError;
    }

    if (appointment.google_event_id && appointment.status === "confirmed") {
      return NextResponse.json({ received: true, confirmed: true });
    }

    if (!appointment.slot_start || !appointment.slot_end) {
      throw new Error("Paid appointment has no calendar slot.");
    }

    if (appointment.status === "cancelled") {
      console.error(
        `Payment received after slot expiry for appointment ${appointment.id}. Manual resolution required.`
      );
      return NextResponse.json({ received: true, confirmed: false });
    }

    const calendarEvent = await createGoogleAppointmentEvent({
      appointmentId: appointment.id,
      start: appointment.slot_start,
      end: appointment.slot_end,
      timeZone: bookingConfig.timeZone,
      sessionType: appointment.session_type,
    });

    const { error: confirmError } = await supabase
      .from("appointments")
      .update({
        status: "confirmed",
        payment_status: "paid",
        google_event_id: calendarEvent.id,
        google_event_url: calendarEvent.htmlLink ?? null,
        hold_expires_at: appointment.slot_end,
      })
      .eq("id", appointment.id);
    if (confirmError) throw confirmError;

    return NextResponse.json({ received: true, confirmed: true });
  } catch (error) {
    console.error("Razorpay webhook processing failed:", error);
    return NextResponse.json(
      { error: "Webhook processing failed." },
      { status: 500 }
    );
  }
}
