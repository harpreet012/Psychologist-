import Link from "next/link";
import { ArrowRight, CalendarDays, CreditCard, Laptop, Mail, MapPin, Phone } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: `Contact | ${siteConfig.name}`,
  description:
    "Ask a question or request an initial counselling consultation with Anjali Jakhar.",
};

export default function ContactPage() {
  return (
    <>
      <section className="py-16 sm:py-20">
        <div className="container-content">
          <SectionHeading
            eyebrow="Get in Touch"
          title="Booking, Payment, and Session Information"
          description="Choose a live Google Calendar slot, complete payment securely through Razorpay, and receive automatic confirmation once payment is verified."
          />

          <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
            <div className="rounded-3xl border border-charcoal/8 bg-white/65 p-7 sm:p-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sage-100 text-sage-600">
                <CalendarDays size={22} strokeWidth={1.6} />
              </span>
              <h2 className="mt-5 font-serif text-2xl text-charcoal">
                Choose an available session
              </h2>
              <p className="mt-3 text-sm leading-7 text-charcoal-muted">
                Availability is checked against Anjali&apos;s Google Calendar. A selected
                slot is held for 15 minutes while you complete payment.
              </p>
              <Link
                href="/book-appointment"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-sage-500 px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-sage-600"
              >
                View Live Slots <ArrowRight size={15} />
              </Link>
            </div>

            <div className="rounded-3xl border border-charcoal/8 bg-lavender-100/55 p-7 sm:p-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/70 text-sage-700">
                <CreditCard size={22} strokeWidth={1.6} />
              </span>
              <h2 className="mt-5 font-serif text-2xl text-charcoal">
                Pay and auto-confirm
              </h2>
              <p className="mt-3 text-sm leading-7 text-charcoal-muted">
                Razorpay provides the payment page. After its signed webhook verifies
                payment, the session is confirmed and added to Google Calendar automatically.
              </p>
              <Link
                href="/#faq"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sage-700 underline decoration-sage-300 underline-offset-4"
              >
                Read Common Questions <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream-soft py-16 sm:py-20">
        <div className="container-content">
          <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-white/65 p-6 text-center">
              <Laptop className="mx-auto text-sage-600" size={21} />
              <h3 className="mt-3 font-serif text-lg text-charcoal">Online</h3>
              <p className="mt-1 text-sm text-charcoal-muted">Remote counselling sessions</p>
            </div>
            <div className="rounded-2xl bg-white/65 p-6 text-center">
              <MapPin className="mx-auto text-sage-600" size={21} />
              <h3 className="mt-3 font-serif text-lg text-charcoal">Rohtak</h3>
              <p className="mt-1 text-sm text-charcoal-muted">In-person availability by enquiry</p>
            </div>
            <div className="rounded-2xl bg-white/65 p-6 text-center">
              <CalendarDays className="mx-auto text-sage-600" size={21} />
              <h3 className="mt-3 font-serif text-lg text-charcoal">By Appointment</h3>
              <p className="mt-1 text-sm text-charcoal-muted">Timing and fees confirmed directly</p>
            </div>
          </div>
          <div className="mx-auto mt-6 flex max-w-4xl flex-col items-center justify-center gap-3 rounded-2xl border border-charcoal/8 bg-white/65 p-5 text-sm text-charcoal-soft sm:flex-row sm:gap-8">
            <a href={`mailto:${siteConfig.email}`} className="inline-flex items-center gap-2 hover:text-sage-700">
              <Mail size={16} className="text-sage-600" /> {siteConfig.email}
            </a>
            <a href={`tel:${siteConfig.phoneHref}`} className="inline-flex items-center gap-2 hover:text-sage-700">
              <Phone size={16} className="text-sage-600" /> {siteConfig.phone}
            </a>
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-6 text-charcoal-muted">
            Please do not use the appointment form for urgent or emergency support.
            This practice does not provide crisis-response services through the website.
          </p>
        </div>
      </section>
    </>
  );
}
