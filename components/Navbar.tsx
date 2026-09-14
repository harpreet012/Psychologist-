"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-cream/90 backdrop-blur-md shadow-[0_1px_0_0_rgba(43,40,35,0.08)]"
          : "bg-cream/60 backdrop-blur-sm"
      }`}
    >
      <nav
        className="container-content flex items-center justify-between h-20"
        aria-label="Primary"
      >
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-sage-500/10">
            <span className="h-3.5 w-3.5 rounded-full bg-sage-500 transition-transform duration-300 group-hover:scale-110" />
          </span>
          <span className="leading-tight">
            <span className="block font-serif text-lg tracking-tight text-charcoal">
              {siteConfig.name}
            </span>
            <span className="hidden text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-charcoal-muted sm:block">
              {siteConfig.professionalTitle}
            </span>
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-9">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-[0.95rem] transition-colors hover:text-sage-600 ${
                  pathname === link.href
                    ? "text-sage-600 font-medium"
                    : "text-charcoal-soft"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Link
            href="/book-appointment"
            className="inline-flex items-center rounded-full bg-sage-500 px-6 py-2.5 text-[0.95rem] font-medium text-cream shadow-card transition-all hover:bg-sage-600 hover:shadow-soft"
          >
            Request a Consultation
          </Link>
        </div>

        <button
          className="md:hidden flex h-10 w-10 items-center justify-center rounded-full text-charcoal"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-t border-charcoal/5 bg-cream"
          >
            <ul className="container-content flex flex-col gap-1 py-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-xl px-3 py-3 text-[1.05rem] ${
                      pathname === link.href
                        ? "bg-sage-50 text-sage-600 font-medium"
                        : "text-charcoal-soft"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/book-appointment"
                  onClick={() => setOpen(false)}
                  className="block w-full rounded-full bg-sage-500 px-6 py-3 text-center font-medium text-cream"
                >
                  Request a Consultation
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
