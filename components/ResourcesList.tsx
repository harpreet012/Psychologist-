"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, ArrowUpRight, Clock, BookOpenText } from "lucide-react";
import { articles, articleCategories } from "@/lib/data";

export default function ResourcesList() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const featured = articles.find((a) => a.featured);
  const rest = articles.filter((a) => !a.featured);

  const filtered = useMemo(() => {
    return rest.filter((a) => {
      const matchesCategory = category === "All" || a.category === category;
      const matchesQuery =
        query.trim() === "" ||
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [query, category, rest]);

  return (
    <div>
      {featured && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 overflow-hidden rounded-3xl bg-white shadow-card lg:grid-cols-2"
        >
          <div className="relative flex min-h-[240px] items-center justify-center overflow-hidden bg-gradient-to-br from-sage-100 via-cream-deep to-lavender-100 p-8">
            <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full border border-white/70" />
            <div className="absolute -bottom-14 -right-8 h-52 w-52 rounded-full bg-clay-100/70" />
            <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-white/70 bg-white/40 text-sage-700 shadow-card backdrop-blur-sm">
              <BookOpenText size={36} strokeWidth={1.25} />
            </div>
          </div>
          <div className="flex flex-col justify-center p-8 sm:p-10">
            <span className="eyebrow text-sage-500">Featured · {featured.category}</span>
            <h2 className="mt-3 font-serif text-2xl leading-snug text-charcoal sm:text-3xl">
              {featured.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-charcoal-muted">
              {featured.excerpt}
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-charcoal-muted">
              <Clock size={13} /> {featured.readTime}
            </div>
            <Link
              href={`/resources/${featured.slug}`}
              className="mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-sage-600"
            >
              Read article
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </motion.div>
      )}

      <div className="mt-14 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search
            size={16}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-charcoal-muted"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles..."
            aria-label="Search articles"
            className="w-full rounded-full border border-charcoal/12 bg-white py-2.5 pl-10 pr-4 text-sm text-charcoal placeholder:text-charcoal-muted/70 focus:border-sage-400"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {articleCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${
                category === cat
                  ? "border-sage-500 bg-sage-500 text-cream"
                  : "border-charcoal/12 text-charcoal-soft hover:border-sage-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((article, i) => (
          <motion.div
            key={article.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
          >
            <Link
              href={`/resources/${article.slug}`}
              className="group flex h-full flex-col rounded-2xl border border-charcoal/8 bg-white/60 p-6 transition-all hover:-translate-y-1 hover:border-sage-200 hover:bg-white hover:shadow-card"
            >
              <span className="eyebrow w-fit rounded-full bg-sage-100 px-3 py-1 text-sage-600">
                {article.category}
              </span>
              <h3 className="mt-4 font-serif text-lg leading-snug text-charcoal">
                {article.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-muted">
                {article.excerpt}
              </p>
              <div className="mt-5 flex items-center justify-between text-xs text-charcoal-muted">
                <span className="flex items-center gap-1.5">
                  <Clock size={12} /> {article.readTime}
                </span>
                <ArrowUpRight
                  size={15}
                  className="text-sage-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </div>
            </Link>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full py-10 text-center text-sm text-charcoal-muted">
            No articles match your search yet — try a different keyword or category.
          </p>
        )}
      </div>
    </div>
  );
}
