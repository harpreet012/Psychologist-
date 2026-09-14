import "server-only";
import { DateTime, Interval } from "luxon";
import { bookingConfig } from "@/lib/booking-config";
import { getGoogleBusyIntervals } from "@/lib/google-calendar";
import { getAdminSupabaseClient } from "@/lib/supabase/adminClient";
import { BookingSlot } from "@/types/booking";

function parseClock(value: string) {
  const match = /^(\d{2}):(\d{2})$/.exec(value);
  if (!match) throw new Error(`Invalid booking clock value: ${value}`);
  return { hour: Number(match[1]), minute: Number(match[2]) };
}

function overlaps(start: DateTime, end: DateTime, busyStart: string, busyEnd: string) {
  const busy = Interval.fromDateTimes(
    DateTime.fromISO(busyStart),
    DateTime.fromISO(busyEnd)
  );
  return busy.overlaps(Interval.fromDateTimes(start, end));
}

export function validateBookingDate(date: string) {
  const selected = DateTime.fromISO(date, { zone: bookingConfig.timeZone }).startOf("day");
  const today = DateTime.now().setZone(bookingConfig.timeZone).startOf("day");
  return (
    selected.isValid &&
    selected >= today &&
    selected <= today.plus({ days: bookingConfig.horizonDays })
  );
}

export async function getAvailableSlots(date: string): Promise<BookingSlot[]> {
  if (!validateBookingDate(date)) return [];

  const day = DateTime.fromISO(date, { zone: bookingConfig.timeZone });
  if (
    !bookingConfig.workingDays.has(day.weekday) ||
    bookingConfig.blockedDates.has(date)
  ) {
    return [];
  }

  const startClock = parseClock(bookingConfig.dayStart);
  const endClock = parseClock(bookingConfig.dayEnd);
  const dayStart = day.set({ ...startClock, second: 0, millisecond: 0 });
  const dayEnd = day.set({ ...endClock, second: 0, millisecond: 0 });

  const [googleBusy, reservationResult] = await Promise.all([
    getGoogleBusyIntervals(
      dayStart.toUTC().toISO()!,
      dayEnd.toUTC().toISO()!,
      bookingConfig.timeZone
    ),
    getAdminSupabaseClient()
      .from("appointments")
      .select("slot_start,slot_end,payment_status,hold_expires_at,status")
      .gte("slot_start", dayStart.toUTC().toISO()!)
      .lt("slot_start", dayEnd.toUTC().toISO()!)
      .neq("status", "cancelled"),
  ]);

  if (reservationResult.error) throw reservationResult.error;
  const now = DateTime.now();
  const reservations = (reservationResult.data ?? []).filter((row) => {
    return (
      row.payment_status === "paid" ||
      (row.hold_expires_at && DateTime.fromISO(row.hold_expires_at) > now)
    );
  });

  const minimumStart = DateTime.now()
    .setZone(bookingConfig.timeZone)
    .plus({ hours: bookingConfig.minNoticeHours });
  const slots: BookingSlot[] = [];
  let cursor = dayStart;

  while (cursor.plus({ minutes: bookingConfig.sessionMinutes }) <= dayEnd) {
    const slotEnd = cursor.plus({ minutes: bookingConfig.sessionMinutes });
    const bufferedEnd = slotEnd.plus({ minutes: bookingConfig.bufferMinutes });
    const calendarConflict = googleBusy.some((busy) =>
      overlaps(cursor, bufferedEnd, busy.start, busy.end)
    );
    const reservationConflict = reservations.some((row) =>
      overlaps(cursor, slotEnd, row.slot_start, row.slot_end)
    );

    if (cursor >= minimumStart && !calendarConflict && !reservationConflict) {
      slots.push({
        start: cursor.toUTC().toISO()!,
        end: slotEnd.toUTC().toISO()!,
        label: cursor.toFormat("h:mm a"),
      });
    }

    cursor = cursor.plus({
      minutes: bookingConfig.sessionMinutes + bookingConfig.bufferMinutes,
    });
  }

  return slots;
}
