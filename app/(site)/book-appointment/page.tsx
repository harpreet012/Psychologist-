import SectionHeading from "@/components/SectionHeading";
import BookingForm from "@/components/BookingForm";
import { siteConfig } from "@/lib/site-config";
import { Suspense } from "react";

export const metadata = {
  title: `Request a Consultation | ${siteConfig.name}`,
  description:
    "Request an online or in-person counselling consultation with Anjali Jakhar in Rohtak.",
};

export default function BookAppointmentPage() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-content">
        <SectionHeading
          eyebrow="Consultation Request"
          title="Begin With a Conversation"
          description="Choose a live Google Calendar slot, share a few practical details, and complete payment through Razorpay. The appointment confirms automatically after verified payment."
        />
        <div className="mt-14">
          <Suspense
            fallback={
              <div className="mx-auto max-w-3xl rounded-3xl bg-white p-10 text-center text-sm text-charcoal-muted shadow-card">
                Loading secure booking…
              </div>
            }
          >
            <BookingForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
