"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { moods } from "@/lib/data";
import SectionHeading from "./SectionHeading";

export default function MoodCheckIn() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = moods.find((m) => m.id === selectedId) ?? null;

  return (
    <section className="relative bg-lavender-100/30 py-24">
      <div className="container-content">
        <SectionHeading
          eyebrow="A Moment For You"
          title="How Are You Feeling Today?"
          description="Choose what feels closest. You will get one small, practical next step—not a diagnosis."
        />

        {/* Mood buttons */}
        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-3">
          {moods.map((mood) => (
            <button
              key={mood.id}
              onClick={() => setSelectedId(mood.id)}
              aria-pressed={selectedId === mood.id}
              className={`inline-flex min-h-[68px] w-full items-center justify-center gap-2.5 rounded-2xl border px-5 py-4 text-base font-medium transition-all duration-200 ${
                selectedId === mood.id
                  ? "border-sage-400 bg-white text-charcoal shadow-[0_2px_12px_-4px_rgba(111,125,85,0.25)]"
                  : "border-charcoal/10 bg-white/60 text-charcoal-soft hover:border-sage-200 hover:bg-white hover:text-charcoal"
              }`}
            >
              <span className="text-lg leading-none" aria-hidden="true">
                {mood.emoji}
              </span>
              <span>{mood.label}</span>
            </button>
          ))}
        </div>

        {/* Response card — subtle glassmorphism, only element that gets it */}
        <div className="mx-auto mt-8 max-w-xl">
          <AnimatePresence mode="wait">
            {selected && (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="rounded-xl border border-white/60 bg-white/80 p-6 text-center shadow-[0_8px_32px_-12px_rgba(43,40,35,0.14)] backdrop-blur-sm sm:p-8"
              >
                <p className="font-serif text-lg leading-relaxed text-charcoal sm:text-xl">
                  {selected.message}
                </p>
                <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-charcoal-muted">
                  {selected.practice}
                </p>
                <Link
                  href={selected.href}
                  className="mt-5 inline-flex items-center justify-center rounded-full bg-sage-500 px-6 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-sage-600"
                >
                  {selected.linkLabel}
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="mx-auto mt-8 max-w-md text-center text-xs leading-relaxed text-charcoal-muted">
          This check-in is for self-reflection only and is not a diagnostic
          tool.
        </p>
      </div>
    </section>
  );
}