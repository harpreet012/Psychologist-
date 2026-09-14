"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Laptop, MapPin } from "lucide-react";
import ProfileVisual from "./ProfileVisual";
import { siteConfig } from "@/lib/site-config";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-charcoal/5">
      <div
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-organic bg-lavender-200/50 blur-2xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-16 top-40 h-64 w-64 rounded-organic-2 bg-clay-100/70 blur-2xl"
        aria-hidden="true"
      />

      <div className="container-content relative grid grid-cols-1 items-center gap-14 py-14 sm:py-20 lg:grid-cols-[1.08fr_0.92fr] lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="eyebrow inline-flex items-center rounded-full bg-sage-100 px-3.5 py-1.5 text-sage-700">
            {siteConfig.name} · {siteConfig.professionalTitle}
          </span>
          <h1 className="mt-6 max-w-2xl font-serif text-4xl leading-[1.12] text-charcoal sm:text-5xl lg:text-[3.45rem]">
            Understand what feels heavy.
            <span className="mt-1 block italic text-sage-600">
              Untangle what keeps you stuck.
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-charcoal-muted">
            A collaborative counselling space to make sense of difficult
            emotions, recognise recurring patterns, and move forward with
            greater clarity and self-trust.
          </p>

          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-charcoal-soft">
            <span className="inline-flex items-center gap-2">
              <Laptop size={16} className="text-sage-600" /> Online sessions
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin size={16} className="text-sage-600" /> In-person availability in Rohtak
            </span>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/book-appointment"
              className="inline-flex items-center gap-2 rounded-full bg-sage-500 px-7 py-3.5 font-medium text-cream shadow-card transition-colors hover:bg-sage-600"
            >
              Request a Consultation
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-full border border-charcoal/15 px-7 py-3.5 font-medium text-charcoal transition-colors hover:bg-charcoal/5"
            >
              See How I Work
            </Link>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-charcoal-muted">
            An initial consultation helps us understand your needs and whether
            working together feels suitable. It does not commit you to ongoing sessions.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="relative isolate"
        >
          {/* Name Card */}
          <div className="absolute bottom-10 left-0 z-0 w-[260px] rounded-2xl border border-charcoal/5 bg-white/95 px-5 py-3.5 shadow-soft backdrop-blur-sm sm:left-4 lg:-left-16">
            <p className="font-serif text-lg text-charcoal">
              {siteConfig.name}
            </p>

            <p className="mt-0.5 text-xs text-charcoal-muted">
              {siteConfig.professionalTitle} · PhD Scholar
            </p>
          </div>

          {/* Portrait */}
          <div className="relative z-10">
            <ProfileVisual />
          </div>
        </motion.div>
      </div>
    </section>
  );
}