"use client";

import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { updateAppointmentStatus } from "@/lib/actions/appointments";
import {
  AppointmentStatus,
  ALLOWED_STATUS_TRANSITIONS,
  PaymentStatus,
} from "@/types/appointment";

const LABELS: Record<AppointmentStatus, string> = {
  pending: "Mark Pending",
  confirmed: "Confirm",
  completed: "Mark Completed",
  cancelled: "Cancel",
};

export default function StatusUpdateControl({
  id,
  status,
  paymentStatus,
}: {
  id: string;
  status: AppointmentStatus;
  paymentStatus: PaymentStatus;
}) {
  const [current, setCurrent] = useState(status);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const nextOptions = ALLOWED_STATUS_TRANSITIONS[current] ?? [];

  if (nextOptions.length === 0) {
    return <p className="text-xs text-charcoal-muted">No further changes available.</p>;
  }

  const handleChange = (next: AppointmentStatus) => {
    if (
      next === "cancelled" &&
      paymentStatus === "paid" &&
      !window.confirm(
        "This removes the calendar event but does not refund the payment. Continue?"
      )
    ) {
      return;
    }
    setError("");
    startTransition(async () => {
      const result = await updateAppointmentStatus(id, current, next);
      if (result.success) {
        setCurrent(next);
      } else {
        setError(result.error || "Something went wrong.");
      }
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {nextOptions.map((option) => (
        <button
          key={option}
          onClick={() => handleChange(option)}
          disabled={isPending}
          className="inline-flex items-center gap-1.5 rounded-full border border-charcoal/15 px-3.5 py-1.5 text-xs font-medium text-charcoal-soft transition-colors hover:bg-sage-50 disabled:opacity-60"
        >
          {isPending && <Loader2 size={12} className="animate-spin" />}
          {LABELS[option]}
        </button>
      ))}
      {error && <p className="w-full text-xs text-red-600">{error}</p>}
    </div>
  );
}
