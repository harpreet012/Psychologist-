"use server";

import { revalidatePath } from "next/cache";
import { getAdminSession } from "@/lib/admin-session";
import { getAdminSupabaseClient } from "@/lib/supabase/adminClient";
import { AppointmentStatus, ALLOWED_STATUS_TRANSITIONS } from "@/types/appointment";
import { cancelRazorpayPaymentLink } from "@/lib/razorpay";
import { deleteGoogleAppointmentEvent } from "@/lib/google-calendar";

export interface UpdateStatusResult {
  success: boolean;
  error?: string;
}

export async function updateAppointmentStatus(
  id: string,
  currentStatus: AppointmentStatus,
  nextStatus: AppointmentStatus
): Promise<UpdateStatusResult> {
  // Re-check the session inside the action itself — never trust that a
  // caller reached this code path through an authenticated page.
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Your session has expired. Please sign in again." };
  }

  const allowed = ALLOWED_STATUS_TRANSITIONS[currentStatus] ?? [];
  if (!allowed.includes(nextStatus)) {
    return { success: false, error: "That status change isn't allowed." };
  }

  try {
    const supabase = getAdminSupabaseClient();
    const { data: appointment, error: loadError } = await supabase
      .from("appointments")
      .select("payment_status,payment_link_id,google_event_id")
      .eq("id", id)
      .eq("status", currentStatus)
      .single();
    if (loadError) throw loadError;

    if (nextStatus === "cancelled") {
      if (appointment.payment_status === "pending" && appointment.payment_link_id) {
        await cancelRazorpayPaymentLink(appointment.payment_link_id);
      }
      if (appointment.google_event_id) {
        await deleteGoogleAppointmentEvent(appointment.google_event_id);
      }
    }

    const { error } = await supabase
      .from("appointments")
      .update({
        status: nextStatus,
        payment_status:
          nextStatus === "cancelled" && appointment.payment_status === "pending"
            ? "expired"
            : appointment.payment_status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .eq("status", currentStatus); // avoid racing an already-changed row

    if (error) throw error;
  } catch (err) {
    console.error("Failed to update appointment status:", err);
    return { success: false, error: "Something went wrong. Please try again." };
  }

  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/appointments");
  revalidatePath(`/admin/appointments/${id}`);

  return { success: true };
}
