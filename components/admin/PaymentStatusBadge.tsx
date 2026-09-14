import { PaymentStatus } from "@/types/appointment";

const STYLES: Record<PaymentStatus, string> = {
  pending: "border border-amber-200 bg-amber-50 text-amber-700",
  paid: "border border-sage-200 bg-sage-100 text-sage-700",
  failed: "border border-red-200 bg-red-50 text-red-600",
  expired: "border border-charcoal/10 bg-charcoal/5 text-charcoal-muted",
  refunded: "border border-lavender-200 bg-lavender-100 text-sage-700",
};

export default function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${STYLES[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

