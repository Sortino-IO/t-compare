import type { Metadata } from "next";
import Link from "next/link";
import ComparisonPairsGrid from "../../components/ComparisonPairsGrid";
import { getBrandPairs, getComparePairPath } from "../../lib/brands";
import { OG_BASE, SITE_URL } from "../../lib/site";

const PAGE_URL = `${SITE_URL}/t-supplements/comparisons`;

export const metadata: Metadata = {
  title: "Testosterone Supplement Comparisons: Price, Bulk & Guarantees",
  description:
    "Head-to-head testosterone booster comparisons only. Check entry price, multi-bottle savings, guarantee length, and formula focus before checkout.",
  openGraph: {
    ...OG_BASE,
    title: "Testosterone Supplement Comparisons: Price, Bulk & Guarantees | T-Compare",
    description:
      "Head-to-head testosterone booster comparisons only. Check entry price, multi-bottle savings, guarantee length, and formula focus before checkout.",
    url: PAGE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Testosterone Supplement Comparisons: Price, Bulk & Guarantees | T-Compare",
    description:
      "Head-to-head testosterone booster comparisons only. Check entry price, multi-bottle savings, guarantee length, and formula focus before checkout.",
  },
};

export default function TSupplementsComparisonsPage() {
  const pairs = getBrandPairs("supplement").map(({ a, b }) => ({
    title: `${a.name} vs ${b.name}`,
    href: getComparePairPath("supplement", a.slug, b.slug),
    description: `Compare ${a.name} and ${b.name} on price, bulk bundles, and guarantees.`,
  }));

  return (
    <div>
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex flex-wrap items-center gap-2 text-[13px] text-[#5f757f]"
        >
          <Link href="/" className="hover:text-[#176b87] hover:underline">
            Home
          </Link>
          <span aria-hidden>/</span>
          <Link href="/t-supplements" className="hover:text-[#176b87] hover:underline">
            Testosterone Supplements
          </Link>
          <span aria-hidden>/</span>
          <span className="text-[#3c535e]">Comparisons</span>
        </nav>

        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#176b87]">
          Independent comparison
        </p>
        <h1 className="tc-display text-[1.75rem] font-bold leading-tight sm:text-4xl">
          Testosterone Supplement Comparisons
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-[#53666e]">
          OTC booster funnels often hide the real cost behind multi-bottle bundles.
          Compare entry anchors, bulk per-bottle math, guarantee length, and formula
          positioning before you checkout-not after.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-3 lg:grid-cols-3">
          <div className="tc-card p-4 sm:p-5">
            <div className="text-sm font-bold text-[#142b3a]">What to compare first</div>
            <ul className="mt-3 list-disc pl-5 text-sm text-[#53666e] space-y-2">
              <li>
                <span className="font-medium text-[#142b3a]">Entry vs bulk price</span> (single bottle vs 3- or 6-pack)
              </li>
              <li>
                <span className="font-medium text-[#142b3a]">Shipping</span> (free thresholds vary by package)
              </li>
              <li>
                <span className="font-medium text-[#142b3a]">Money-back window</span> (60, 90, or 100 days)
              </li>
              <li>
                <span className="font-medium text-[#142b3a]">Formula focus</span> (DAA, Tongkat Ali, libido herbs, etc.)
              </li>
            </ul>
          </div>

          <div className="tc-card p-4 sm:p-5">
            <div className="text-sm font-bold text-[#142b3a]">Common funnel trap</div>
            <p className="mt-3 text-sm text-[#53666e] leading-relaxed">
              A $49/bottle headline often requires buying six bottles upfront. Normalize
              both products to the same commitment (30, 90, or 180 days) before picking a winner.
            </p>
          </div>

          <div className="tc-card p-4 sm:p-5">
            <div className="text-sm font-bold text-[#142b3a]">Reality check</div>
            <p className="mt-3 text-sm text-[#53666e] leading-relaxed">
              Supplements are not FDA-approved to treat low testosterone. If you have
              symptoms or abnormal labs, talk to a clinician before relying on OTC boosters.
            </p>
          </div>
        </div>

        <ComparisonPairsGrid pairs={pairs} />

        <div className="mt-10">
          <Link
            href="/t-supplements"
            className="text-sm font-semibold text-[#176b87] hover:text-[#10556d] hover:underline"
          >
            ← Back to all Testosterone Supplements
          </Link>
        </div>
      </div>
    </div>
  );
}
