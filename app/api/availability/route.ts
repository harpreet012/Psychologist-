import { NextRequest, NextResponse } from "next/server";
import {
  bookingConfig,
  isGoogleCalendarConfigured,
} from "@/lib/booking-config";
import { getAvailableSlots, validateBookingDate } from "@/lib/availability";
import { AvailabilityPayload } from "@/types/booking";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date") ?? "";
  if (!validateBookingDate(date)) {
    return NextResponse.json(
      { error: "Choose a valid date within the booking window." },
      { status: 400 }
    );
  }

  if (!isGoogleCalendarConfigured()) {
    const payload: AvailabilityPayload = {
      configured: false,
      date,
      timeZone: bookingConfig.timeZone,
      sessionMinutes: bookingConfig.sessionMinutes,
      bufferMinutes: bookingConfig.bufferMinutes,
      feePaise: bookingConfig.feePaise,
      cancellationPolicy: bookingConfig.cancellationPolicy,
      slots: [],
      message: "Online scheduling is being configured. Please check back shortly.",
    };
    return NextResponse.json(payload);
  }

  try {
    const slots = await getAvailableSlots(date);
    const payload: AvailabilityPayload = {
      configured: true,
      date,
      timeZone: bookingConfig.timeZone,
      sessionMinutes: bookingConfig.sessionMinutes,
      bufferMinutes: bookingConfig.bufferMinutes,
      feePaise: bookingConfig.feePaise,
      cancellationPolicy: bookingConfig.cancellationPolicy,
      slots,
    };
    return NextResponse.json(payload, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("Failed to load appointment availability:", error);
    return NextResponse.json(
      { error: "Available slots could not be loaded right now. Please try again." },
      { status: 503 }
    );
  }
}
