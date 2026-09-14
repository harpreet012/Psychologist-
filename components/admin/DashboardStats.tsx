import { CalendarDays, Clock, CheckCircle2, Star, XCircle, IndianRupee } from "lucide-react";
import { AppointmentStats } from "@/types/appointment";

export default function DashboardStats({ stats }: { stats: AppointmentStats }) {
  const cards = [
    { label: "Total Appointments", value: stats.total, icon: CalendarDays },
    { label: "Pending", value: stats.pending, icon: Clock },
    { label: "Confirmed", value: stats.confirmed, icon: CheckCircle2 },
    { label: "Paid", value: stats.paid, icon: IndianRupee },
    { label: "Completed", value: stats.completed, icon: Star },
    { label: "Cancelled", value: stats.cancelled, icon: XCircle },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className="rounded-2xl border border-charcoal/8 bg-white p-5 shadow-card"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sage-100 text-sage-600">
              <Icon size={17} strokeWidth={1.85} />
            </span>
            <p className="mt-4 font-serif text-2xl text-charcoal">{card.value}</p>
            <p className="mt-0.5 text-xs text-charcoal-muted">{card.label}</p>
          </div>
        );
      })}
    </div>
  );
}
