"use client";

import { motion } from "framer-motion";
import { processSteps } from "@/lib/data";
import SectionHeading from "./SectionHeading";

export default function TherapyProcess() {
  return (
    <section id="process" className="relative scroll-mt-24 overflow-hidden bg-cream-soft py-24">
      <div className="container-content relative">
        <SectionHeading
          eyebrow="The Process"
          title="Taking the First Step Can Be Simple"
        />

        <div className="relative mt-16 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          <div
            className="pointer-events-none absolute left-0 right-0 top-[26px] hidden h-px bg-gradient-to-r from-transparent via-sage-300 to-transparent md:block"
            aria-hidden="true"
          />
          {processSteps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.12, ease: "easeOut" }}
              className="relative text-center md:text-left"
            >
              <span className="relative z-10 inline-flex h-14 w-14 items-center justify-center rounded-full bg-sage-500 font-serif text-lg text-cream shadow-card">
                {step.number}
              </span>
              <h3 className="mt-5 font-serif text-xl text-charcoal">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-muted">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
