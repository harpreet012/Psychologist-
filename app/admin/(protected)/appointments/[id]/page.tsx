import Link from "next/link";
import { ArrowLeft, Mail, Phone, CalendarDays, Clock, MessageSquare, ExternalLink, IndianRupee } from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import AppointmentStatusBadge from "@/components/admin/AppointmentStatusBadge";
import PaymentStatusBadge from "@/components/admin/PaymentStatusBadge";
import StatusUpdateControl from "@/components/admin/StatusUpdateControl";
import { getAppointmentById } from "@/lib/appointments";

export const dynamic = "force-dynamic";

function formatDateTime(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return dateStr;
  }
}

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr + "T00:00:00").toLocaleDateString(undefined, {
      dateStyle: "long",
    });
  } catch {
    return dateStr;
  }
}

export default async function AppointmentDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const appointment = await getAppointmentById(id);

  if (!appointment) {
    return (
      <div>
        <AdminHeader title="Appointment Not Found" />
        <div className="rounded-2xl border border-dashed border-charcoal/15 bg-white/60 p-10 text-center">
          <p className="text-sm text-charcoal-muted">
            We couldn&apos;t find an appointment with that ID. It may have been
            removed, or the link may be incorrect.
          </p>
          <Link
            href="/admin/appointments"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-sage-600"
          >
            <ArrowLeft size={14} /> Back to Appointments
          </Link>
        </div>
      </div>
    );
  }

  const details = [
    { icon: Mail, label: "Email", value: appointment.email },
    { icon: Phone, label: "Phone", value: appointment.phone },
    { icon: CalendarDays, label: "Preferred Date", value: formatDate(appointment.preferred_date) },
    { icon: Clock, label: "Preferred Time", value: appointment.preferred_time },
  ];

  return (
    <div>
      <Link
        href="/admin/appointments"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-sage-600"
      >
        <ArrowLeft size={14} /> Back to Appointments
      </Link>

      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl text-charcoal sm:text-3xl">
            {appointment.full_name}
          </h1>
          <p className="mt-1 text-xs text-charcoal-muted">
            Appointment ID: {appointment.id}
          </p>
        </div>
        <AppointmentStatusBadge status={appointment.status} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-charcoal/8 bg-white p-6 shadow-card">
            <h2 className="flex items-center gap-2 font-serif text-base text-charcoal">
              <IndianRupee size={16} className="text-sage-600" /> Payment & Calendar
            </h2>
            <div className="mt-4 flex items-center justify-between gap-3">
              <span className="text-xs text-charcoal-muted">Payment status</span>
              <PaymentStatusBadge status={appointment.payment_status} />
            </div>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-charcoal-muted">Amount</dt>
                <dd className="font-medium text-charcoal-soft">
                  {appointment.amount_paise
                    ? new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(appointment.amount_paise / 100)
                    : "—"}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-charcoal-muted">Paid at</dt>
                <dd className="text-right text-charcoal-soft">
                  {appointment.paid_at ? formatDateTime(appointment.paid_at) : "—"}
                </dd>
              </div>
              {appointment.razorpay_payment_id && (
                <div className="flex justify-between gap-4">
                  <dt className="text-charcoal-muted">Payment ID</dt>
                  <dd className="max-w-[180px] truncate text-charcoal-soft">{appointment.razorpay_payment_id}</dd>
                </div>
              )}
            </dl>
            <div className="mt-5 flex flex-wrap gap-2">
              {appointment.payment_link_url && appointment.payment_status === "pending" && (
                <a href={appointment.payment_link_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-charcoal/15 px-3 py-1.5 text-xs font-medium text-charcoal-soft">
                  Payment link <ExternalLink size={12} />
                </a>
              )}
              {appointment.google_event_url && (
                <a href={appointment.google_event_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-sage-200 bg-sage-50 px-3 py-1.5 text-xs font-medium text-sage-700">
                  Google Calendar event <ExternalLink size={12} />
                </a>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-charcoal/8 bg-white p-6 shadow-card">
            <h2 className="font-serif text-base text-charcoal">Booking Details</h2>
            <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {details.map((d) => {
                const Icon = d.icon;
                return (
                  <div key={d.label} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sage-100 text-sage-600">
                      <Icon size={14} strokeWidth={1.85} />
                    </span>
                    <div>
                      <dt className="text-xs text-charcoal-muted">{d.label}</dt>
                      <dd className="text-sm text-charcoal">{d.value}</dd>
                    </div>
                  </div>
                );
              })}
              <div className="flex items-start gap-3 sm:col-span-2">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sage-100 text-sage-600">
                  <CalendarDays size={14} strokeWidth={1.85} />
                </span>
                <div>
                  <dt className="text-xs text-charcoal-muted">Selected Service</dt>
                  <dd className="text-sm text-charcoal">{appointment.service}</dd>
                </div>
              </div>
              <div className="flex items-start gap-3 sm:col-span-2">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sage-100 text-sage-600">
                  <Clock size={14} strokeWidth={1.85} />
                </span>
                <div>
                  <dt className="text-xs text-charcoal-muted">Session Type</dt>
                  <dd className="text-sm capitalize text-charcoal">
                    {appointment.session_type}
                  </dd>
                </div>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl border border-charcoal/8 bg-white p-6 shadow-card">
            <h2 className="flex items-center gap-2 font-serif text-base text-charcoal">
              <MessageSquare size={16} strokeWidth={1.85} className="text-sage-600" />
              Additional Message
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-charcoal-soft">
              {appointment.message || "No additional message was provided."}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-charcoal/8 bg-white p-6 shadow-card">
            <h2 className="font-serif text-base text-charcoal">Update Status</h2>
            <p className="mt-1 text-xs text-charcoal-muted">
              Current status:{" "}
              <AppointmentStatusBadge status={appointment.status} />
            </p>
            <div className="mt-4">
              <StatusUpdateControl
                id={appointment.id}
                status={appointment.status}
                paymentStatus={appointment.payment_status}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-charcoal/8 bg-white p-6 shadow-card">
            <h2 className="font-serif text-base text-charcoal">Timeline</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-charcoal-muted">Created</dt>
                <dd className="text-right text-charcoal-soft">
                  {formatDateTime(appointment.created_at)}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-charcoal-muted">Last Updated</dt>
                <dd className="text-right text-charcoal-soft">
                  {formatDateTime(appointment.updated_at)}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
