import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import DashboardStats from "@/components/admin/DashboardStats";
import AppointmentsTable from "@/components/admin/AppointmentsTable";
import { getAppointmentStats, getRecentAppointments } from "@/lib/appointments";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [stats, recent] = await Promise.all([
    getAppointmentStats(),
    getRecentAppointments(5),
  ]);

  return (
    <div>
      <AdminHeader
        title="Dashboard"
        description="An overview of your practice's appointments."
      />

      <DashboardStats stats={stats} />

      <div className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-lg text-charcoal">Recent Appointments</h2>
          <Link
            href="/admin/appointments"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-sage-600"
          >
            View all
            <ArrowRight size={14} />
          </Link>
        </div>
        <AppointmentsTable
          appointments={recent}
          variant="compact"
          emptyMessage="No appointments have been booked yet. New requests from the Book a Session page will show up here."
        />
      </div>
    </div>
  );
}
