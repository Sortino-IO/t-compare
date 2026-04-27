import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Comparisons",
  description:
    "Side-by-side comparisons of testosterone-related providers using publicly available information and cited sources.",
};

const COMPARISON_PAGES = [
  {
    title: "TTime vs Hims",
    href: "/comparisons/ttime-vs-hims",
    description: "Pricing and onboarding comparison for enclomiphene-focused programs.",
  },
  {
    title: "Maximus vs Hims",
    href: "/comparisons/maximus-vs-hims",
    description: "Compare enclomiphene program pricing structure and published program details.",
  },
  {
    title: "TTime vs Maximus",
    href: "/comparisons/ttime-vs-maximus",
    description: "Compare 90-day vs subscription pricing models and what’s included.",
  },
];

export default function ComparisonsIndexPage() {
  return (
    <div className="bg-[#f5f3ee]">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1c1917] font-[family-name:var(--font-playfair)]">
          Comparisons
        </h1>
        <p className="mt-3 text-sm sm:text-base text-[#57534e] max-w-2xl leading-relaxed">
          SEO-friendly comparison pages that focus on verifiable items (published prices, plan structure,
          what’s included, and sources). Medical decisions should be made with a licensed clinician.
        </p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {COMPARISON_PAGES.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="rounded-2xl border border-[#e3dfd6] bg-white p-5 hover:border-[#c6c0b4] transition-colors"
            >
              <div className="text-lg font-semibold text-[#1c1917]">{p.title}</div>
              <div className="mt-1.5 text-sm text-[#78716c] leading-relaxed">{p.description}</div>
              <div className="mt-4 text-sm font-medium text-[#2a6e47]">View comparison →</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

