"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  CreditCard,
  ExternalLink,
  LoaderCircle,
  MapPin,
  RefreshCcw,
  ShieldCheck,
  Video,
} from "lucide-react";
import { services } from "@/lib/data";
import { AvailabilityPayload, BookingSlot } from "@/types/booking";

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  slotStart: string;
  slotEnd: string;
  sessionType: "online" | "in-person";
  message: string;
  consent: boolean;
}

interface PaymentReady {
  bookingId: string;
  paymentUrl: string;
  amountPaise: number;
  holdExpiresAt: string;
}

interface PublicBookingStatus {
  appointmentStatus: string;
  paymentStatus: string;
  date: string;
  time: string;
  sessionType: string;
}

const initialState: FormState = {
  fullName: "",
  email: "",
  phone: "",
  service: "",
  date: "",
  slotStart: "",
  slotEnd: "",
  sessionType: "online",
  message: "",
  consent: false,
};

type Errors = Partial<Record<keyof FormState, string>>;

function currency(amountPaise: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amountPaise / 100);
}

function localDateBounds() {
  const now = new Date();
  const min = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
  const maxDate = new Date(now);
  maxDate.setDate(maxDate.getDate() + 45);
  const max = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(maxDate);
  return { min, max };
}

export default function BookingForm() {
  const searchParams = useSearchParams();
  const callbackBooking = searchParams.get("booking");
  const callbackToken = searchParams.get("token");
  const isPaymentReturn = Boolean(callbackBooking && callbackToken);
  const { min: minDate, max: maxDate } = useMemo(() => localDateBounds(), []);

  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [availability, setAvailability] = useState<AvailabilityPayload | null>(null);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotsError, setSlotsError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [paymentReady, setPaymentReady] = useState<PaymentReady | null>(null);
  const [bookingStatus, setBookingStatus] = useState<PublicBookingStatus | null>(null);
  const [statusError, setStatusError] = useState("");

  useEffect(() => {
    if (!callbackBooking || !callbackToken) return;
    let active = true;
    let attempts = 0;

    async function checkStatus() {
      try {
        const response = await fetch(
          `/api/appointments/status?booking=${encodeURIComponent(
            callbackBooking!
          )}&token=${encodeURIComponent(callbackToken!)}`,
          { cache: "no-store" }
        );
        const data = await response.json();
        if (!response.ok) throw new Error(data?.error || "Status check failed.");
        if (!active) return;
        setBookingStatus(data);
        setStatusError("");
        attempts += 1;
        if (
          data.appointmentStatus !== "confirmed" &&
          data.paymentStatus !== "expired" &&
          data.paymentStatus !== "failed" &&
          attempts < 20
        ) {
          window.setTimeout(checkStatus, 3000);
        }
      } catch (error) {
        if (!active) return;
        setStatusError(
          error instanceof Error
            ? error.message
            : "Payment status could not be checked right now."
        );
      }
    }

    void checkStatus();
    return () => {
      active = false;
    };
  }, [callbackBooking, callbackToken]);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const loadSlots = async (date: string) => {
    setLoadingSlots(true);
    setSlotsError("");
    setAvailability(null);
    try {
      const response = await fetch(`/api/availability?date=${encodeURIComponent(date)}`, {
        cache: "no-store",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Slots could not be loaded.");
      setAvailability(data as AvailabilityPayload);
      if (!data.configured) {
        setSlotsError(data.message || "Online scheduling is not available yet.");
      }
    } catch (error) {
      setSlotsError(
        error instanceof Error ? error.message : "Slots could not be loaded."
      );
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleDateChange = (date: string) => {
    setForm((current) => ({
      ...current,
      date,
      slotStart: "",
      slotEnd: "",
    }));
    setErrors((current) => ({ ...current, date: undefined, slotStart: undefined }));
    if (date) void loadSlots(date);
  };

  const selectSlot = (slot: BookingSlot) => {
    setForm((current) => ({
      ...current,
      slotStart: slot.start,
      slotEnd: slot.end,
    }));
    setErrors((current) => ({ ...current, slotStart: undefined }));
  };

  const validate = () => {
    const next: Errors = {};
    if (!form.fullName.trim()) next.fullName = "Please enter your full name.";
    if (!form.email.trim()) next.email = "Please enter your email address.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      next.email = "Please enter a valid email address.";
    }
    if (!form.phone.trim()) next.phone = "Please enter a phone number.";
    else if (!/^\+?[0-9][0-9\s-]{8,18}$/.test(form.phone.trim())) {
      next.phone = "Please enter a valid phone number with country code.";
    }
    if (!form.service) next.service = "Please select an area of support.";
    if (!form.date) next.date = "Please choose a date.";
    if (!form.slotStart || !form.slotEnd) next.slotStart = "Please choose an available time.";
    if (!form.consent) {
      next.consent = "Please confirm that we may use these details to arrange the session.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    setSubmitError("");
    setSubmitting(true);
    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok || !data?.success) {
        if (response.status === 409 && form.date) void loadSlots(form.date);
        throw new Error(data?.error || "The slot could not be reserved.");
      }
      setPaymentReady({
        bookingId: data.bookingId,
        paymentUrl: data.paymentUrl,
        amountPaise: data.amountPaise,
        holdExpiresAt: data.holdExpiresAt,
      });
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "The slot could not be reserved. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (isPaymentReturn) {
    const confirmed = bookingStatus?.appointmentStatus === "confirmed";
    const expired = ["expired", "failed"].includes(bookingStatus?.paymentStatus ?? "");
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-xl rounded-3xl bg-white p-7 text-center shadow-card sm:p-10"
      >
        <span
          className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${
            confirmed
              ? "bg-sage-100 text-sage-600"
              : expired
                ? "bg-red-50 text-red-600"
                : "bg-lavender-100 text-sage-700"
          }`}
        >
          {confirmed ? (
            <CheckCircle2 size={30} />
          ) : expired ? (
            <RefreshCcw size={27} />
          ) : (
            <LoaderCircle size={28} className="animate-spin" />
          )}
        </span>
        <h2 className="mt-6 font-serif text-2xl text-charcoal">
          {confirmed
            ? "Your session is confirmed."
            : expired
              ? "This payment session has expired."
              : "Verifying your payment…"}
        </h2>
        <p className="mt-3 text-sm leading-7 text-charcoal-muted">
          {confirmed
            ? "Payment has been verified and the appointment has been added to Anjali's Google Calendar."
            : expired
              ? "No appointment was confirmed. Please return to the booking form and choose an available slot again."
              : "Please keep this page open for a moment. Confirmation appears after Razorpay's signed webhook is received."}
        </p>
        {bookingStatus && (
          <div className="mx-auto mt-6 max-w-sm rounded-2xl bg-cream-soft p-4 text-sm text-charcoal-soft">
            <p>{bookingStatus.date} · {bookingStatus.time} · {bookingStatus.sessionType}</p>
          </div>
        )}
        {statusError && <p className="mt-4 text-sm text-red-600">{statusError}</p>}
        <Link
          href="/book-appointment"
          className="mt-7 inline-flex items-center rounded-full border border-charcoal/15 px-6 py-3 text-sm font-medium text-charcoal-soft"
        >
          {confirmed ? "Back to Website" : "Choose Another Slot"}
        </Link>
      </motion.div>
    );
  }

  if (paymentReady) {
    const selected = availability?.slots.find(
      (slot) => slot.start === form.slotStart
    );
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-xl rounded-3xl bg-white p-7 shadow-card sm:p-10"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-sage-100 text-sage-600">
          <CreditCard size={25} />
        </span>
        <h2 className="mt-6 font-serif text-2xl text-charcoal">
          Your slot is held for payment.
        </h2>
        <p className="mt-3 text-sm leading-7 text-charcoal-muted">
          Complete payment before the hold expires. The appointment is confirmed
          automatically only after Razorpay verifies the payment.
        </p>
        <dl className="mt-6 divide-y divide-charcoal/8 rounded-2xl bg-cream-soft px-5">
          <div className="flex justify-between gap-4 py-3 text-sm">
            <dt className="text-charcoal-muted">Date & time</dt>
            <dd className="text-right font-medium text-charcoal">
              {form.date} · {selected?.label}
            </dd>
          </div>
          <div className="flex justify-between gap-4 py-3 text-sm">
            <dt className="text-charcoal-muted">Session</dt>
            <dd className="capitalize text-charcoal">{form.sessionType} · 50 minutes</dd>
          </div>
          <div className="flex justify-between gap-4 py-3 text-sm">
            <dt className="text-charcoal-muted">Amount</dt>
            <dd className="font-semibold text-charcoal">{currency(paymentReady.amountPaise)}</dd>
          </div>
          <div className="flex justify-between gap-4 py-3 text-sm">
            <dt className="text-charcoal-muted">Hold expires</dt>
            <dd className="text-charcoal">
              {new Date(paymentReady.holdExpiresAt).toLocaleTimeString("en-IN", {
                hour: "numeric",
                minute: "2-digit",
                timeZone: "Asia/Kolkata",
              })}
            </dd>
          </div>
        </dl>
        <a
          href={paymentReady.paymentUrl}
          className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-sage-500 px-6 py-3.5 font-medium text-cream transition-colors hover:bg-sage-600"
        >
          Pay {currency(paymentReady.amountPaise)} Securely
          <ExternalLink size={16} />
        </a>
        <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-charcoal-muted">
          <ShieldCheck size={15} className="mt-0.5 shrink-0 text-sage-600" />
          Payment is completed on Razorpay. Card or UPI details are not collected by this website.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mx-auto grid max-w-3xl grid-cols-1 gap-6 rounded-3xl bg-white p-6 shadow-card sm:grid-cols-2 sm:p-10"
    >
      <div className="sm:col-span-2">
        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sage-100 text-sage-600">
            <CalendarDays size={19} />
          </span>
          <div>
            <h2 className="font-serif text-xl text-charcoal">1. Choose a live slot</h2>
            <p className="text-xs text-charcoal-muted">50-minute session · 10-minute buffer</p>
          </div>
        </div>
        <label htmlFor="date" className="text-sm font-medium text-charcoal">
          Preferred Date
        </label>
        <input
          id="date"
          type="date"
          min={minDate}
          max={maxDate}
          value={form.date}
          onChange={(event) => handleDateChange(event.target.value)}
          className="mt-2 w-full rounded-xl border border-charcoal/15 px-4 py-3 text-sm focus:border-sage-400 sm:max-w-xs"
        />
        {errors.date && <p className="mt-1.5 text-xs text-red-600">{errors.date}</p>}

        {loadingSlots && (
          <p className="mt-5 flex items-center gap-2 text-sm text-charcoal-muted">
            <LoaderCircle size={16} className="animate-spin" /> Checking Google Calendar…
          </p>
        )}
        {slotsError && <p className="mt-5 text-sm text-red-600">{slotsError}</p>}
        {availability?.configured && !loadingSlots && (
          <div className="mt-5">
            {availability.slots.length > 0 ? (
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {availability.slots.map((slot) => (
                  <button
                    key={slot.start}
                    type="button"
                    onClick={() => selectSlot(slot)}
                    className={`rounded-xl border px-3 py-3 text-sm font-medium transition-colors ${
                      form.slotStart === slot.start
                        ? "border-sage-500 bg-sage-500 text-cream"
                        : "border-charcoal/12 bg-white text-charcoal-soft hover:border-sage-300 hover:bg-sage-50"
                    }`}
                  >
                    {slot.label}
                  </button>
                ))}
              </div>
            ) : (
              <p className="rounded-xl bg-cream-soft p-4 text-sm text-charcoal-muted">
                No available slots on this date. Please try another day.
              </p>
            )}
            {availability.feePaise && (
              <div className="mt-4 rounded-xl bg-cream-soft p-4 text-sm">
                <p className="font-medium text-charcoal">
                  Session fee: {currency(availability.feePaise)}
                </p>
                {availability.cancellationPolicy && (
                  <p className="mt-1 text-xs leading-5 text-charcoal-muted">
                    {availability.cancellationPolicy}
                  </p>
                )}
              </div>
            )}
          </div>
        )}
        {errors.slotStart && (
          <p className="mt-2 text-xs text-red-600">{errors.slotStart}</p>
        )}
      </div>

      <div className="border-t border-charcoal/8 pt-6 sm:col-span-2">
        <div className="mb-1 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-lavender-100 text-sage-700">
            <Clock3 size={19} />
          </span>
          <h2 className="font-serif text-xl text-charcoal">2. Your details</h2>
        </div>
      </div>

      <div>
        <label htmlFor="fullName" className="text-sm font-medium text-charcoal">Full Name</label>
        <input id="fullName" type="text" autoComplete="name" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} className="mt-2 w-full rounded-xl border border-charcoal/15 px-4 py-2.5 text-sm focus:border-sage-400" />
        {errors.fullName && <p className="mt-1.5 text-xs text-red-600">{errors.fullName}</p>}
      </div>
      <div>
        <label htmlFor="email" className="text-sm font-medium text-charcoal">Email Address</label>
        <input id="email" type="email" autoComplete="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="mt-2 w-full rounded-xl border border-charcoal/15 px-4 py-2.5 text-sm focus:border-sage-400" />
        {errors.email && <p className="mt-1.5 text-xs text-red-600">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="phone" className="text-sm font-medium text-charcoal">Phone Number</label>
        <input id="phone" type="tel" autoComplete="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="mt-2 w-full rounded-xl border border-charcoal/15 px-4 py-2.5 text-sm focus:border-sage-400" />
        {errors.phone && <p className="mt-1.5 text-xs text-red-600">{errors.phone}</p>}
      </div>
      <div>
        <label htmlFor="service" className="text-sm font-medium text-charcoal">Area of Support</label>
        <select id="service" value={form.service} onChange={(e) => update("service", e.target.value)} className="mt-2 w-full rounded-xl border border-charcoal/15 bg-white px-4 py-2.5 text-sm focus:border-sage-400">
          <option value="">Choose an area</option>
          <option value="Not sure yet">I&apos;m not sure yet</option>
          {services.map((service) => <option key={service.slug} value={service.title}>{service.title}</option>)}
        </select>
        {errors.service && <p className="mt-1.5 text-xs text-red-600">{errors.service}</p>}
      </div>

      <fieldset className="sm:col-span-2">
        <legend className="text-sm font-medium text-charcoal">Session Type</legend>
        <div className="mt-2 grid grid-cols-2 gap-3">
          <label className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm ${form.sessionType === "online" ? "border-sage-400 bg-sage-50 text-sage-700" : "border-charcoal/15 text-charcoal-soft"}`}>
            <input type="radio" name="sessionType" checked={form.sessionType === "online"} onChange={() => update("sessionType", "online")} className="sr-only" />
            <Video size={16} /> Online
          </label>
          <label className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm ${form.sessionType === "in-person" ? "border-sage-400 bg-sage-50 text-sage-700" : "border-charcoal/15 text-charcoal-soft"}`}>
            <input type="radio" name="sessionType" checked={form.sessionType === "in-person"} onChange={() => update("sessionType", "in-person")} className="sr-only" />
            <MapPin size={16} /> In-person
          </label>
        </div>
      </fieldset>

      <div className="sm:col-span-2">
        <label htmlFor="message" className="text-sm font-medium text-charcoal">Message <span className="text-charcoal-muted">(optional)</span></label>
        <textarea id="message" rows={4} maxLength={1000} value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="Anything you would like Anjali to know before the first session." className="mt-2 w-full resize-none rounded-xl border border-charcoal/15 px-4 py-2.5 text-sm focus:border-sage-400" />
        <p className="mt-1 text-right text-[0.7rem] text-charcoal-muted">{form.message.length}/1000</p>
      </div>

      <div className="sm:col-span-2">
        <label className="flex items-start gap-3 rounded-2xl bg-cream-soft p-4 text-xs leading-5 text-charcoal-muted">
          <input type="checkbox" checked={form.consent} onChange={(e) => update("consent", e.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-sage-600" />
          <span>
            I understand that the selected slot is held temporarily and confirmed only after payment. I agree that these details may be used to arrange the session, as described in the <Link href="/privacy" className="font-medium text-sage-700 underline underline-offset-2">privacy notice</Link>.
          </span>
        </label>
        {errors.consent && <p className="mt-1.5 text-xs text-red-600">{errors.consent}</p>}
      </div>

      <div className="sm:col-span-2">
        {submitError && <p role="alert" className="mb-3 text-center text-sm text-red-600">{submitError}</p>}
        <button type="submit" disabled={submitting || !availability?.configured} className="w-full rounded-full bg-sage-500 px-6 py-3.5 font-medium text-cream transition-colors hover:bg-sage-600 disabled:cursor-not-allowed disabled:opacity-60">
          {submitting ? "Reserving Your Slot…" : "Reserve Slot & Get Payment Link"}
        </button>
        <p className="mt-3 text-center text-xs leading-5 text-charcoal-muted">
          Your slot is held for 15 minutes. Razorpay payment verification confirms the appointment automatically.
        </p>
      </div>
    </form>
  );
}
