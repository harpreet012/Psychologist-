import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// This root-level not-found renders for any URL that doesn't match a
// route at all (including outside the (site) group), so it includes
// Navbar/Footer directly to keep the page looking exactly as it did
// before the (site) route group existed.
export default function NotFound() {
  return (
    <>
      <Navbar />
      <main>
        <section className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
          <span className="font-serif text-6xl text-sage-300">404</span>
          <h1 className="mt-4 font-serif text-2xl text-charcoal">
            This page took a wrong turn.
          </h1>
          <p className="mt-2 max-w-sm text-sm text-charcoal-muted">
            The page you&apos;re looking for doesn&apos;t exist, but you&apos;re welcome to
            head back home.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center rounded-full bg-sage-500 px-6 py-3 text-sm font-medium text-cream hover:bg-sage-600"
          >
            Back to Home
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
