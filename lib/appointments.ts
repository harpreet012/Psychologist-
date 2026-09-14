import "server-only";
import { getAdminSupabaseClient } from "@/lib/supabase/adminClient";
import {
  Appointment,
  AppointmentFilters,
  AppointmentStats,
} from "@/types/appointment";

export async function getAppointmentStats(): Promise<AppointmentStats> {
  const supabase = getAdminSupabaseClient();
  const { data, error } = await supabase
    .from("appointments")
    .select("status,payment_status");

  if (error) {
    console.error("Failed to load appointment stats:", error);
    return {
      total: 0,
      pending: 0,
      confirmed: 0,
      completed: 0,
      cancelled: 0,
      paid: 0,
      awaitingPayment: 0,
    };
  }

  const rows = data ?? [];
  return {
    total: rows.length,
    pending: rows.filter((r) => r.status === "pending").length,
    confirmed: rows.filter((r) => r.status === "confirmed").length,
    completed: rows.filter((r) => r.status === "completed").length,
    cancelled: rows.filter((r) => r.status === "cancelled").length,
    paid: rows.filter((r) => r.payment_status === "paid").length,
    awaitingPayment: rows.filter(
      (r) => r.payment_status === "pending" && r.status === "pending"
    ).length,
  };
}

export async function getRecentAppointments(limit = 5): Promise<Appointment[]> {
  const supabase = getAdminSupabaseClient();
  const { data, error } = await supabase
    .from("appointments")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Failed to load recent appointments:", error);
    return [];
  }
  return data ?? [];
}

export async function getAppointments(
  filters: AppointmentFilters = {}
): Promise<Appointment[]> {
  const supabase = getAdminSupabaseClient();
  let query = supabase.from("appointments").select("*");

  if (filters.status && filters.status !== "all") {
    query = query.eq("status", filters.status);
  }
  if (filters.service) {
    query = query.eq("service", filters.service);
  }
  if (filters.date) {
    query = query.eq("preferred_date", filters.date);
  }
  if (filters.search) {
    const term = filters.search.trim();
    if (term) {
      query = query.or(
        `full_name.ilike.%${term}%,email.ilike.%${term}%,phone.ilike.%${term}%`
      );
    }
  }

  switch (filters.sort) {
    case "oldest":
      query = query.order("created_at", { ascending: true });
      break;
    case "appointment_date":
      query = query.order("preferred_date", { ascending: true });
      break;
    case "newest":
    default:
      query = query.order("created_at", { ascending: false });
      break;
  }

  const { data, error } = await query;
  if (error) {
    console.error("Failed to load appointments:", error);
    return [];
  }
  return data ?? [];
}

export async function getAppointmentById(id: string): Promise<Appointment | null> {
  const supabase = getAdminSupabaseClient();
  const { data, error } = await supabase
    .from("appointments")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Failed to load appointment:", error);
    return null;
  }
  return data;
}

export async function getDistinctServices(): Promise<string[]> {
  const supabase = getAdminSupabaseClient();
  const { data, error } = await supabase.from("appointments").select("service");
  if (error || !data) return [];
  return Array.from(new Set(data.map((r) => r.service))).sort();
}
