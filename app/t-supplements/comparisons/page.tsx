import type { Metadata } from "next";
import Link from "next/link";
import ComparisonPairsGrid from "../../components/ComparisonPairsGrid";
import { getBrandPairs, getComparePairPath } from "../../lib/brands";
import { SITE_URL } from "../../lib/site";

const PAGE_URL = `${SITE_URL}/t-supplements/comparisons`;

export const metadata: Metadata = {
  title: "T-Supplements Comparisons: Price, Bulk & Guarantees",
  description:
    "Head-to-head testosterone booster comparisons only. Check entry price, multi-bottle savings, guarantee length, and formula focus before checkout.",
  openGraph: {
    title: "T-Supplements Comparisons: Price, Bulk & Guarantees | T-Compare",
    description:
      "Head-to-head testosterone booster comparisons only. Check entry price, multi-bottle savings, guarantee length, and formula focus before checkout.",
    url: PAGE_URL,
    images: [
      {
        url: "/t-supplements/opengraph-image",
        width: 1200,
        height: 630,
        alt: "T-Supplements Comparisons",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "T-Supplements Comparisons: Price, Bulk & Guarantees | T-Compare",
    description:
      "Head-to-head testosterone booster comparisons only. Check entry price, multi-bottle savings, guarantee length, and formula focus before checkout.",
    images: ["/t-supplements/opengraph-image"],
  },
};

export default function TSupplementsComparisonsPage() {
  const pairs = getBrandPairs("supplement").map(({ a, b }) => ({
    title: `${a.name} vs ${b.name}`,
    href: getComparePairPath("supplement", a.slug, b.slug),
    description: `Compare ${a.name} and ${b.name} on price, bulk bundles, and guarantees.`,
  }));

  return (
    <div className="bg-[#f5f3ee]">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <nav className="flex items-center gap-2 text-sm text-[#b5b0a8] mb-8 flex-wrap">
          <Link href="/" className="hover:text-[#1c1917] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/t-supplements" className="hover:text-[#1c1917] transition-colors">
            T-Supplements
          </Link>
          <span>/</span>
          <span className="text-[#78716c]">Comparisons</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-bold text-[#1c1917] font-[family-name:var(--font-playfair)]">
          T-Supplements Comparisons
        </h1>
        <p className="mt-3 text-sm sm:text-base text-[#57534e] max-w-3xl leading-relaxed">
          OTC booster funnels often hide the real cost behind multi-bottle bundles.
          Compare entry anchors, bulk per-bottle math, guarantee length, and formula
          positioning before you checkout-not after.
        </p>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-[#e3dfd6] bg-white p-5">
            <div className="text-sm font-semibold text-[#1c1917]">What to compare first</div>
            <ul className="mt-3 list-disc pl-5 text-sm text-[#57534e] space-y-2">
              <li>
                <span className="font-medium text-[#1c1917]">Entry vs bulk price</span> (single bottle vs 3- or 6-pack)
              </li>
              <li>
                <span className="font-medium text-[#1c1917]">Shipping</span> (free thresholds vary by package)
              </li>
              <li>
                <span className="font-medium text-[#1c1917]">Money-back window</span> (60, 90, or 100 days)
              </li>
              <li>
                <span className="font-medium text-[#1c1917]">Formula focus</span> (DAA, Tongkat Ali, libido herbs, etc.)
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-[#e3dfd6] bg-white p-5">
            <div className="text-sm font-semibold text-[#1c1917]">Common funnel trap</div>
            <p className="mt-3 text-sm text-[#57534e] leading-relaxed">
              A $49/bottle headline often requires buying six bottles upfront. Normalize
              both products to the same commitment (30, 90, or 180 days) before picking a winner.
            </p>
          </div>

          <div className="rounded-2xl border border-[#e3dfd6] bg-white p-5">
            <div className="text-sm font-semibold text-[#1c1917]">Reality check</div>
            <p className="mt-3 text-sm text-[#57534e] leading-relaxed">
              Supplements are not FDA-approved to treat low testosterone. If you have
              symptoms or abnormal labs, talk to a clinician before relying on OTC boosters.
            </p>
          </div>
        </div>

        <ComparisonPairsGrid pairs={pairs} />

        <p className="mt-10 text-center">
          <Link href="/t-supplements" className="text-sm font-medium text-[#2a6e47] hover:underline">
            ← Back to all T-Supplements
          </Link>
        </p>
      </div>
    </div>
  );
}
