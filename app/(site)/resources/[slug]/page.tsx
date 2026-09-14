import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, BookOpenText } from "lucide-react";
import { articles } from "@/lib/data";
import { siteConfig } from "@/lib/site-config";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: `${article.title} | ${siteConfig.name}`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  return (
    <article className="py-16 sm:py-20">
      <div className="container-content max-w-2xl">
        <Link
          href="/resources"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-sage-600"
        >
          <ArrowLeft size={15} /> Back to Resources
        </Link>

        <span className="eyebrow mt-8 inline-block rounded-full bg-sage-100 px-3 py-1 text-sage-600">
          {article.category}
        </span>
        <h1 className="mt-4 font-serif text-3xl leading-tight text-charcoal sm:text-4xl">
          {article.title}
        </h1>
        <div className="mt-4 flex items-center gap-2 text-sm text-charcoal-muted">
          <Clock size={14} /> {article.readTime}
        </div>

        <div className="relative mt-8 aspect-[16/8] w-full overflow-hidden rounded-3xl bg-gradient-to-br from-sage-100 via-cream-deep to-lavender-100">
          <div className="absolute -left-16 top-4 h-52 w-52 rounded-full border border-white/70" />
          <div className="absolute -bottom-20 right-6 h-56 w-56 rounded-full bg-clay-100/65" />
          <div className="relative flex h-full items-center justify-center text-sage-700">
            <BookOpenText size={48} strokeWidth={1.15} />
          </div>
        </div>

        <p className="mt-8 text-lg leading-relaxed text-charcoal-soft">
          {article.excerpt}
        </p>
        <div className="mt-10 space-y-10">
          {article.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-serif text-2xl leading-snug text-charcoal">
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="leading-8 text-charcoal-muted">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-charcoal/8 bg-cream-soft p-6">
          <p className="text-sm text-charcoal-muted">
            This article is for general information only and is not a
            substitute for professional mental health care. If you&apos;re
            struggling, please consider reaching out for support.
          </p>
        </div>

        <Link
          href="/book-appointment"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-sage-500 px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-sage-600"
        >
          Request a Consultation
        </Link>
      </div>
    </article>
  );
}
