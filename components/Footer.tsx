import Link from "next/link";
import { AlertTriangle, Laptop, Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer className="bg-sage-800 text-cream">
      <div className="container-content py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.25fr_0.8fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cream/10">
                <span className="h-3.5 w-3.5 rounded-full bg-cream" />
              </span>
              <div>
                <span className="block font-serif text-xl">{siteConfig.name}</span>
                <span className="text-[0.65rem] uppercase tracking-[0.14em] text-cream/55">
                  {siteConfig.professionalTitle}
                </span>
              </div>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-7 text-cream/70">
              A collaborative counselling space for understanding difficult
              emotions, recurring patterns, and meaningful next steps.
            </p>
          </div>

          <div>
            <h3 className="eyebrow text-cream/60">Navigate</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href="/about" className="text-cream/80 hover:text-cream">About</Link></li>
              <li><Link href="/services" className="text-cream/80 hover:text-cream">Services</Link></li>
              <li><Link href="/resources" className="text-cream/80 hover:text-cream">Resources</Link></li>
              <li><Link href="/#faq" className="text-cream/80 hover:text-cream">FAQ</Link></li>
              <li><Link href="/contact" className="text-cream/80 hover:text-cream">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="eyebrow text-cream/60">Support</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href="/services#anxiety-overthinking" className="text-cream/80 hover:text-cream">Anxiety & Overthinking</Link></li>
              <li><Link href="/services#relationships-boundaries" className="text-cream/80 hover:text-cream">Relationships & Boundaries</Link></li>
              <li><Link href="/services#self-esteem-identity" className="text-cream/80 hover:text-cream">Self-esteem & Identity</Link></li>
              <li><Link href="/services#stress-burnout" className="text-cream/80 hover:text-cream">Stress & Burnout</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="eyebrow text-cream/60">Practice</h3>
            <ul className="mt-4 space-y-3 text-sm text-cream/80">
              <li className="flex items-start gap-2.5"><Laptop size={15} className="mt-0.5 shrink-0" />Online sessions</li>
              <li className="flex items-start gap-2.5"><MapPin size={15} className="mt-0.5 shrink-0" />{siteConfig.location}</li>
              {siteConfig.email && (
                <li>
                  <a href={`mailto:${siteConfig.email}`} className="flex items-start gap-2.5 hover:text-cream">
                    <Mail size={15} className="mt-0.5 shrink-0" />{siteConfig.email}
                  </a>
                </li>
              )}
              {siteConfig.phone && (
                <li>
                  <a href={`tel:${siteConfig.phoneHref}`} className="flex items-start gap-2.5 hover:text-cream">
                    <Phone size={15} className="mt-0.5 shrink-0" />{siteConfig.phone}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-cream/15 bg-cream/5 p-5">
          <div className="flex gap-3">
            <AlertTriangle size={18} className="mt-0.5 shrink-0 text-clay-200" />
            <p className="text-xs leading-6 text-cream/70">
              This practice and website do not provide emergency or crisis-response
              services. If there is immediate danger, a medical emergency, or a risk
              of harm, contact local emergency services or go to the nearest hospital.
              Website messages may not be reviewed immediately.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-6 text-xs text-cream/60 md:flex-row">
          <p>© {new Date().getFullYear()} {siteConfig.brandName}. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            <Link href="/privacy" className="hover:text-cream">Privacy Notice</Link>
            <Link href="/terms" className="hover:text-cream">Terms of Use</Link>
            <Link href="/disclaimer" className="hover:text-cream">Professional Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
