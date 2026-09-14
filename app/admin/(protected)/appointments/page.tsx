import AdminHeader from "@/components/admin/AdminHeader";
import AppointmentFilters from "@/components/admin/AppointmentFilters";
import AppointmentsTable from "@/components/admin/AppointmentsTable";
import { getAppointments, getDistinctServices } from "@/lib/appointments";
import { AppointmentStatus } from "@/types/appointment";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{
    search?: string;
    status?: string;
    service?: string;
    date?: string;
    sort?: string;
  }>;
}

export default async function AdminAppointmentsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const [appointments, services] = await Promise.all([
    getAppointments({
      search: params.search,
      status: (params.status as AppointmentStatus | undefined) || "all",
      service: params.service,
      date: params.date,
      sort: (params.sort as "newest" | "oldest" | "appointment_date") || "newest",
    }),
    getDistinctServices(),
  ]);

  return (
    <div>
      <AdminHeader
        title="Appointments"
        description="Search, filter, and manage every booking request."
      />

      <div className="mb-6">
        <AppointmentFilters services={services} />
      </div>

      <AppointmentsTable
        appointments={appointments}
        variant="full"
        emptyMessage="No appointments match your current filters."
      />
    </div>
  );
}
