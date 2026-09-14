import { createHash, timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { getAdminSupabaseClient } from "@/lib/supabase/adminClient";

export const dynamic = "force-dynamic";

function tokenMatches(token: string, storedHash: string | null) {
  if (!storedHash) return false;
  const received = Buffer.from(
    createHash("sha256").update(token).digest("hex")
  );
  const expected = Buffer.from(storedHash);
  return received.length === expected.length && timingSafeEqual(received, expected);
}

export async function GET(request: NextRequest) {
  const bookingId = request.nextUrl.searchParams.get("booking") ?? "";
  const token = request.nextUrl.searchParams.get("token") ?? "";
  if (!/^[0-9a-f-]{36}$/i.test(bookingId) || token.length < 32) {
    return NextResponse.json({ error: "Invalid booking reference." }, { status: 400 });
  }

  try {
    const supabase = getAdminSupabaseClient();
    const { data, error } = await supabase
      .from("appointments")
      .select(
        "id,status,payment_status,preferred_date,preferred_time,session_type,hold_expires_at,public_token_hash"
      )
      .eq("id", bookingId)
      .maybeSingle();
    if (error) throw error;
    if (!data || !tokenMatches(token, data.public_token_hash)) {
      return NextResponse.json({ error: "Booking reference not found." }, { status: 404 });
    }

    if (
      data.payment_status === "pending" &&
      data.hold_expires_at &&
      new Date(data.hold_expires_at).getTime() < Date.now()
    ) {
      await supabase
        .from("appointments")
        .update({ status: "cancelled", payment_status: "expired" })
        .eq("id", bookingId)
        .eq("payment_status", "pending");
      data.status = "cancelled";
      data.payment_status = "expired";
    }

    return NextResponse.json(
      {
        bookingId: data.id,
        appointmentStatus: data.status,
        paymentStatus: data.payment_status,
        date: data.preferred_date,
        time: data.preferred_time,
        sessionType: data.session_type,
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("Failed to fetch public booking status:", error);
    return NextResponse.json(
      { error: "Booking status could not be checked right now." },
      { status: 503 }
    );
  }
}

