import { ChevronDown } from "lucide-react";
import { faqs } from "@/lib/data";
import SectionHeading from "./SectionHeading";

export default function FAQSection() {
  return (
    <section id="faq" className="scroll-mt-24 bg-cream-soft py-20 sm:py-24">
      <div className="container-content">
        <SectionHeading
          eyebrow="Before You Begin"
          title="Questions You May Be Carrying"
          description="Starting counselling can feel unfamiliar. These answers are here to make the first step clearer."
        />
        <div className="mx-auto mt-12 max-w-3xl divide-y divide-charcoal/10 border-y border-charcoal/10">
          {faqs.map((faq) => (
            <details key={faq.question} className="group py-1">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-serif text-lg text-charcoal marker:hidden">
                {faq.question}
                <ChevronDown
                  size={18}
                  className="shrink-0 text-sage-600 transition-transform duration-200 group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="max-w-2xl pb-6 pr-10 text-sm leading-7 text-charcoal-muted">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
