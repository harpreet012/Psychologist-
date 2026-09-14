import { AppointmentStatus } from "@/types/appointment";

const STYLES: Record<AppointmentStatus, string> = {
  pending: "bg-clay-100 text-clay-300 border border-clay-200",
  confirmed: "bg-sage-100 text-sage-700 border border-sage-200",
  completed: "bg-sage-500 text-cream border border-sage-500",
  cancelled: "bg-red-50 text-red-600 border border-red-200",
};

const LABELS: Record<AppointmentStatus, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  completed: "Completed",
  cancelled: "Cancelled",
};

export default function AppointmentStatusBadge({
  status,
}: {
  status: AppointmentStatus;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${STYLES[status]}`}
    >
      {LABELS[status]}
    </span>
  );
}
