import "server-only";

function integerEnv(name: string, fallback: number) {
  const value = Number.parseInt(process.env[name] ?? "", 10);
  return Number.isFinite(value) && value >= 0 ? value : fallback;
}

function workingDaysEnv() {
  const raw = process.env.BOOKING_WORKING_DAYS ?? "1,2,3,4,5,6";
  const days = raw
    .split(",")
    .map((value) => Number.parseInt(value.trim(), 10))
    .filter((value) => Number.isInteger(value) && value >= 1 && value <= 7);
  return new Set(days.length > 0 ? days : [1, 2, 3, 4, 5, 6]);
}

function blockedDatesEnv() {
  return new Set(
    (process.env.BOOKING_BLOCKED_DATES ?? "")
      .split(",")
      .map((value) => value.trim())
      .filter((value) => /^\d{4}-\d{2}-\d{2}$/.test(value))
  );
}

const feeRupees = Number.parseFloat(process.env.SESSION_FEE_INR ?? "");

export const bookingConfig = {
  timeZone: process.env.BOOKING_TIME_ZONE || "Asia/Kolkata",
  sessionMinutes: integerEnv("BOOKING_SESSION_MINUTES", 50),
  bufferMinutes: integerEnv("BOOKING_BUFFER_MINUTES", 10),
  holdMinutes: integerEnv("BOOKING_HOLD_MINUTES", 15),
  minNoticeHours: integerEnv("BOOKING_MIN_NOTICE_HOURS", 4),
  horizonDays: integerEnv("BOOKING_HORIZON_DAYS", 45),
  dayStart: process.env.BOOKING_DAY_START || "10:00",
  dayEnd: process.env.BOOKING_DAY_END || "18:00",
  workingDays: workingDaysEnv(),
  blockedDates: blockedDatesEnv(),
  feePaise:
    Number.isFinite(feeRupees) && feeRupees > 0
      ? Math.round(feeRupees * 100)
      : null,
  cancellationPolicy: process.env.BOOKING_CANCELLATION_POLICY?.trim() || null,
} as const;

export function isGoogleCalendarConfigured() {
  return Boolean(
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
      process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY &&
      process.env.GOOGLE_CALENDAR_ID
  );
}

export function bookingIntegrationsConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY &&
      isGoogleCalendarConfigured() &&
      process.env.RAZORPAY_KEY_ID &&
      process.env.RAZORPAY_KEY_SECRET &&
      process.env.RAZORPAY_WEBHOOK_SECRET &&
      bookingConfig.feePaise &&
      bookingConfig.cancellationPolicy
  );
}
