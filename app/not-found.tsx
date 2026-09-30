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
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#176b87] mb-3">
        Error 404
      </p>
      <h1 className="tc-display text-[1.75rem] font-bold leading-tight sm:text-4xl">
        We couldn&apos;t find that page
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#53666e]">
        The link may be broken or the page may have moved. Try one of the sections
        below, or head back to the homepage.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 text-left">
        {QUICK_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group rounded-xl border border-[#e3e3e3] bg-white p-5 transition-all hover:border-[#176b87]/30"
          >
            <div className="flex items-center justify-between">
              <span className="text-base font-semibold text-[#142b3a] group-hover:text-[#176b87]">
                {link.title}
              </span>
              <span className="text-[#9db0ba] transition-transform group-hover:translate-x-0.5 group-hover:text-[#176b87]" aria-hidden>
                →
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-[#53666e]">
              {link.description}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-[#176b87] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#10556d]"
        >
          Back to homepage
        </Link>
      </div>
    </div>
  );
}
