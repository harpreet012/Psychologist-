import Link from "next/link";
import { Eye, CalendarX2 } from "lucide-react";
import { Appointment } from "@/types/appointment";
import AppointmentStatusBadge from "./AppointmentStatusBadge";
import PaymentStatusBadge from "./PaymentStatusBadge";

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr + "T00:00:00").toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function formatTime(timeStr: string) {
  if (!timeStr) return timeStr;
  const [h, m] = timeStr.split(":");
  const hour = parseInt(h, 10);
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour}:${m} ${period}`;
}

interface AppointmentsTableProps {
  appointments: Appointment[];
  variant?: "compact" | "full";
  emptyMessage?: string;
}

export default function AppointmentsTable({
  appointments,
  variant = "full",
  emptyMessage = "No appointments yet.",
}: AppointmentsTableProps) {
  if (appointments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-charcoal/15 bg-white/60 px-6 py-16 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sage-100 text-sage-500">
          <CalendarX2 size={20} strokeWidth={1.75} />
        </span>
        <p className="mt-4 text-sm text-charcoal-muted">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-charcoal/8 bg-white shadow-card">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead>
          <tr className="border-b border-charcoal/8 text-xs uppercase tracking-wide text-charcoal-muted">
            <th className="px-5 py-3.5 font-medium">Client</th>
            {variant === "full" && <th className="px-5 py-3.5 font-medium">Email</th>}
            {variant === "full" && <th className="px-5 py-3.5 font-medium">Phone</th>}
            <th className="px-5 py-3.5 font-medium">Service</th>
            <th className="px-5 py-3.5 font-medium">Date</th>
            <th className="px-5 py-3.5 font-medium">Time</th>
            {variant === "full" && <th className="px-5 py-3.5 font-medium">Booked</th>}
            <th className="px-5 py-3.5 font-medium">Status</th>
            <th className="px-5 py-3.5 font-medium">Payment</th>
            <th className="px-5 py-3.5 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((a) => (
            <tr
              key={a.id}
              className="border-b border-charcoal/6 last:border-0 hover:bg-cream-soft/60"
            >
              <td className="px-5 py-4 font-medium text-charcoal">{a.full_name}</td>
              {variant === "full" && (
                <td className="px-5 py-4 text-charcoal-soft">{a.email}</td>
              )}
              {variant === "full" && (
                <td className="px-5 py-4 text-charcoal-soft">{a.phone}</td>
              )}
              <td className="px-5 py-4 text-charcoal-soft">{a.service}</td>
              <td className="px-5 py-4 text-charcoal-soft">{formatDate(a.preferred_date)}</td>
              <td className="px-5 py-4 text-charcoal-soft">{formatTime(a.preferred_time)}</td>
              {variant === "full" && (
                <td className="px-5 py-4 text-charcoal-soft">{formatDate(a.created_at)}</td>
              )}
              <td className="px-5 py-4">
                <AppointmentStatusBadge status={a.status} />
              </td>
              <td className="px-5 py-4">
                <PaymentStatusBadge status={a.payment_status} />
              </td>
              <td className="px-5 py-4 text-right">
                <Link
                  href={`/admin/appointments/${a.id}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-charcoal/15 px-3 py-1.5 text-xs font-medium text-charcoal-soft transition-colors hover:bg-sage-50"
                >
                  <Eye size={13} /> View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
