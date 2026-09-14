export type AppointmentStatus = "pending" | "confirmed" | "completed" | "cancelled";

export type SessionType = "online" | "in-person";
export type PaymentStatus = "pending" | "paid" | "failed" | "expired" | "refunded";

export interface Appointment {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  service: string;
  preferred_date: string;
  preferred_time: string;
  session_type: SessionType;
  slot_start: string | null;
  slot_end: string | null;
  hold_expires_at: string | null;
  message: string | null;
  consent_given_at: string;
  payment_status: PaymentStatus;
  amount_paise: number | null;
  payment_link_id: string | null;
  payment_link_url: string | null;
  razorpay_payment_id: string | null;
  paid_at: string | null;
  google_event_id: string | null;
  google_event_url: string | null;
  public_token_hash: string | null;
  status: AppointmentStatus;
  created_at: string;
  updated_at: string;
}

export interface AppointmentStats {
  total: number;
  pending: number;
  confirmed: number;
  completed: number;
  cancelled: number;
  paid: number;
  awaitingPayment: number;
}

export interface AppointmentFilters {
  search?: string;
  status?: AppointmentStatus | "all";
  service?: string;
  date?: string;
  sort?: "newest" | "oldest" | "appointment_date";
}

export const APPOINTMENT_STATUSES: AppointmentStatus[] = [
  "pending",
  "confirmed",
  "completed",
  "cancelled",
];

// Only these transitions are allowed via the admin dashboard.
export const ALLOWED_STATUS_TRANSITIONS: Record<AppointmentStatus, AppointmentStatus[]> = {
  pending: ["cancelled"],
  confirmed: ["completed", "cancelled"],
  completed: [],
  cancelled: [],
};
