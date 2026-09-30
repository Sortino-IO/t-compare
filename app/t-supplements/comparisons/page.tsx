import type { Metadata } from "next";
import Link from "next/link";
import ComparisonPairsGrid from "../../components/ComparisonPairsGrid";
import { getBrandPairs, getComparePairPath } from "../../lib/brands";
import { breadcrumbListSchema, canonicalAlternates, itemListSchema } from "../../lib/seo";
import { OG_BASE, SITE_URL } from "../../lib/site";

const PAGE_PATH = "/t-supplements/comparisons";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const SUPP_PAIR_COUNT = getBrandPairs("supplement").length;

export const metadata: Metadata = {
  title: "Testosterone Supplement Comparisons (2026): Every Head-to-Head",
  description: `${SUPP_PAIR_COUNT} booster comparisons — entry price, bulk per-bottle cost, guarantee length, and formula focus before checkout.`,
  alternates: canonicalAlternates(PAGE_PATH),
  openGraph: {
    ...OG_BASE,
    title: "Testosterone Supplement Comparisons (2026) | T-Compare",
    description: `${SUPP_PAIR_COUNT} head-to-head testosterone booster comparisons with price, bulk savings, and guarantees.`,
    url: PAGE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Testosterone Supplement Comparisons (2026) | T-Compare",
    description: `${SUPP_PAIR_COUNT} head-to-head testosterone booster comparisons with price, bulk savings, and guarantees.`,
  },
};

export default function TSupplementsComparisonsPage() {
  const pairs = getBrandPairs("supplement").map(({ a, b }) => ({
    title: `${a.name} vs ${b.name}`,
    href: getComparePairPath("supplement", a.slug, b.slug),
    description: `Compare ${a.name} and ${b.name} on price, bulk bundles, and guarantees.`,
  }));

  const breadcrumbSchema = breadcrumbListSchema([
    { name: "Home", path: "/" },
    { name: "Testosterone Supplements", path: "/t-supplements" },
    { name: "Comparisons", path: PAGE_PATH },
  ]);
  const pairListSchema = itemListSchema(
    "Testosterone supplement comparisons",
    PAGE_PATH,
    pairs.map((p) => ({ name: p.title, path: p.href })),
  );

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pairListSchema) }}
      />
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
