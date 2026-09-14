import Link from "next/link";
import {
  CheckCircle2,
  ArrowRight,
  Wind,
  CloudSun,
  HeartHandshake,
  Fingerprint,
  Compass,
  BatteryMedium,
} from "lucide-react";

import SectionHeading from "@/components/SectionHeading";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import { services } from "@/lib/data";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: `Counselling Services | ${siteConfig.name}`,
  description:
    "Counselling support for anxiety, low mood, relationships, self-esteem, life transitions, stress, and burnout with Anjali Jakhar.",
};

const iconMap = {
  Wind,
  CloudSun,
  HeartHandshake,
  Fingerprint,
  Compass,
  BatteryMedium,
};

export default function ServicesPage() {
  return (
    <>
      <section className="py-16 sm:py-20">
        <div className="container-content">
          <SectionHeading
            eyebrow="Services"
            title="Support Built Around What You’re Facing"
            description="These categories are a starting point, not a diagnosis. Your experience may cross several areas, and we will shape the work around your specific context."
          />
        </div>
      </section>

      {services.map((service, i) => {
        const Icon =
          iconMap[service.icon as keyof typeof iconMap] ?? Wind;

        const isEven = i % 2 === 0;

        return (
          <section
            id={service.slug}
            key={service.slug}
            className={`scroll-mt-24 py-16 ${
              isEven ? "bg-cream-soft" : "bg-cream"
            }`}
          >
            <div className="container-content grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
              <div>
                <span className="flex h-11 w-11 items-center justify-center rounded-md bg-sage-100 text-sage-600">
                  <Icon size={22} strokeWidth={1.75} />
                </span>

                <h2 className="mt-4 font-serif text-2xl text-charcoal sm:text-3xl">
                  {service.title}
                </h2>

                <p className="mt-3 leading-relaxed text-charcoal-muted">
                  {service.longDescription}
                </p>

                <Link
                  href="/book-appointment"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-sage-500 px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-sage-600"
                >
                  Discuss This in a Consultation
                  <ArrowRight size={15} />
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* "Who It May Help" — warm clay tint */}
                <div className="rounded-lg border border-clay-200/70 bg-clay-100/30 p-6">
                  <h3 className="font-serif text-base text-charcoal">
                    Who It May Help
                  </h3>

                  <ul className="mt-4 space-y-3">
                    {service.whoItMayHelp.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2.5 text-sm text-charcoal-soft"
                      >
                        <CheckCircle2
                          size={16}
                          className="mt-0.5 shrink-0 text-sage-500"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* "What to Expect" — sage tint */}
                <div className="rounded-lg border border-sage-100 bg-sage-50/60 p-6">
                  <h3 className="font-serif text-base text-charcoal">
                    What to Expect
                  </h3>

                  <ul className="mt-4 space-y-3">
                    {service.whatToExpect.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2.5 text-sm text-charcoal-soft"
                      >
                        <CheckCircle2
                          size={16}
                          className="mt-0.5 shrink-0 text-sage-500"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        );
      })}
      <FAQSection />
      <CTASection />
    </>
  );
}
