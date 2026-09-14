"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowUpRight,
  Wind,
  CloudSun,
  HeartHandshake,
  Fingerprint,
  Compass,
  BatteryMedium,
} from "lucide-react";
import { Service } from "@/types";

const iconMap = {
  Wind,
  CloudSun,
  HeartHandshake,
  Fingerprint,
  Compass,
  BatteryMedium,
} as const;

// Subtle variation: alternate between two very close background tints
// so the grid doesn't look like a stamped template
const cardTints = [
  "bg-white",
  "bg-cream-soft",
  "bg-white",
  "bg-cream-soft",
  "bg-white",
  "bg-cream-soft",
] as const;

export default function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const Icon = iconMap[service.icon as keyof typeof iconMap];
  const tint = cardTints[index % cardTints.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: "easeOut" }}
    >
      <Link
        href={`/services#${service.slug}`}
        className={`group flex h-full flex-col justify-between rounded-lg border border-charcoal/8 ${tint} p-6 transition-all duration-300 hover:border-sage-300 hover:shadow-[0_4px_20px_-8px_rgba(43,40,35,0.14)]`}
      >
        <div>
          {/* Icon inline with a small square badge — not a circle */}
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-sage-100 text-sage-600">
            <Icon size={18} strokeWidth={1.75} />
          </span>
          {/* Left-accent rule gives editorial rhythm */}
          <div className="mt-4 border-l-2 border-sage-200 pl-3">
            <h3 className="font-serif text-lg text-charcoal">{service.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-charcoal-muted">
              {service.shortDescription}
            </p>
          </div>
        </div>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-sage-600">
          Learn more
          <ArrowUpRight
            size={14}
            className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </Link>
    </motion.div>
  );
}
