"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import HorizonArc from "./HorizonArc";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-sage-700 py-24 text-cream">
      <HorizonArc
        tone="lavender"
        className="absolute inset-x-0 bottom-0 opacity-40"
      />
      <div className="container-content relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-xl"
        >
          <h2 className="font-serif text-3xl leading-tight sm:text-4xl">
            You Can Begin Before You Have All the Words.
          </h2>
          <p className="mt-4 text-cream/80">
            Bring the part you can explain. We can make sense of the rest together.
          </p>
          <Link
            href="/book-appointment"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-cream px-8 py-3.5 font-medium text-sage-700 shadow-soft transition-transform hover:-translate-y-0.5"
          >
            Request a First Consultation
          </Link>
          <Link
            href="/services"
            className="mt-4 block text-sm font-medium text-cream/80 underline decoration-cream/30 underline-offset-4 transition-colors hover:text-cream"
          >
            Explore areas of support first
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
