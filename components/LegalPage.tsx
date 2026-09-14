import { ReactNode } from "react";

export default function LegalPage({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <article className="py-16 sm:py-20">
      <div className="container-content max-w-3xl">
        <span className="eyebrow text-sage-500">{eyebrow}</span>
        <h1 className="mt-3 font-serif text-4xl leading-tight text-charcoal sm:text-5xl">
          {title}
        </h1>
        <p className="mt-6 text-lg leading-8 text-charcoal-muted">{intro}</p>
        <div className="legal-copy mt-12 space-y-9">{children}</div>
        <p className="mt-12 border-t border-charcoal/10 pt-6 text-xs text-charcoal-muted">
          Last updated: September 2026
        </p>
      </div>
    </article>
  );
}

