import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found (404)",
  robots: { index: false, follow: true },
};

const QUICK_LINKS = [
  {
    href: "/testosterone/enclomiphene",
    title: "Enclomiphene providers",
    description: "Compare telehealth programs by price, labs, and onboarding.",
  },
  {
    href: "/t-supplements",
    title: "Testosterone supplements",
    description: "Browse OTC boosters by price, guarantees, and formula.",
  },
  {
    href: "/comparisons",
    title: "Comparisons",
    description: "Head-to-head provider and supplement breakdowns.",
  },
  {
    href: "/blog",
    title: "Blog",
    description: "Independent guides on enclomiphene, TRT, and ingredients.",
  },
];

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 sm:py-28 text-center">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#a8a29e] mb-3">
        Error 404
      </p>
      <h1 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl font-semibold text-[#1c1917] leading-tight">
        We couldn&apos;t find that page
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#78716c]">
        The link may be broken or the page may have moved. Try one of the sections
        below, or head back to the homepage.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 text-left">
        {QUICK_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group rounded-2xl border border-[#e3dfd6] bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#2a6e47]/30 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="text-base font-semibold text-[#1c1917] group-hover:text-[#2a6e47]">
                {link.title}
              </span>
              <span className="text-[#c8c2bb] transition-transform group-hover:translate-x-0.5 group-hover:text-[#2a6e47]" aria-hidden>
                →
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-[#78716c]">
              {link.description}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-[#2a6e47] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#22593a]"
        >
          Back to homepage
        </Link>
      </div>
    </div>
  );
}
