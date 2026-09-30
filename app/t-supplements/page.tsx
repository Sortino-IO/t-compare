import type { Metadata } from "next";
import Link from "next/link";
import AffiliateDisclosure from "../components/AffiliateDisclosure";
import BrandCard from "../components/BrandCard";
import QuickCompareTable from "../components/QuickCompareTable";
import TrustStrip from "../components/TrustStrip";
import { formatReviewedDate, latestReviewedDate } from "../lib/brand-display";
import { getBrandDetailPath, getBrandsByCategory } from "../lib/brands";
import { OG_BASE, SITE_URL } from "../lib/site";

const PAGE_URL = `${SITE_URL}/t-supplements`;

export const metadata: Metadata = {
  title: "Best Testosterone Supplements Compared: Prices & Value (2026)",
  description:
    "Compare top testosterone boosters side by side from $55/mo. See entry prices, bulk savings, guarantees, and ingredients so you pick the right bottle-not the loudest ad.",
  openGraph: {
    ...OG_BASE,
    title: "Best Testosterone Supplements Compared: Prices & Value (2026) | T-Compare",
    description:
      "Compare top testosterone boosters side by side from $55/mo. See entry prices, bulk savings, guarantees, and ingredients so you pick the right bottle-not the loudest ad.",
    url: PAGE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Testosterone Supplements Compared: Prices & Value (2026) | T-Compare",
    description:
      "Compare top testosterone boosters side by side from $55/mo. See entry prices, bulk savings, guarantees, and ingredients so you pick the right bottle-not the loudest ad.",
  },
};

export default function TSupplementsPage() {
  const brands = getBrandsByCategory("supplement");
  const lowestPrice = brands[0]!.priceFromMonthly;
  const highestPrice = brands[brands.length - 1]!.priceFromMonthly;
  const reviewedOn = latestReviewedDate(brands);

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Testosterone Supplements",
    url: PAGE_URL,
    numberOfItems: brands.length,
    itemListElement: brands.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: b.name,
      url: `${SITE_URL}${getBrandDetailPath(b)}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex flex-wrap items-center gap-2 text-[13px] text-[#5f757f]"
        >
          <Link href="/" className="hover:text-[#176b87] hover:underline">
            Home
          </Link>
          <span aria-hidden>/</span>
          <span className="text-[#3c535e]">Testosterone Supplements</span>
        </nav>

        <div className="max-w-3xl">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#176b87]">
            Independent comparison
          </p>
          <h1 className="tc-display text-[1.75rem] font-bold leading-tight sm:text-4xl">
            Compare Testosterone Supplements
          </h1>
          <p className="mt-3 text-base leading-relaxed text-[#53666e]">
            Browse pricing, bulk bundle math, and guarantee terms for OTC
            testosterone boosters in one place. Sorted by monthly cost.
          </p>
        </div>

        <TrustStrip
          className="mt-6"
          items={[
            { label: "Supplements listed", value: String(brands.length) },
            {
              label: "Published price range",
              value: `$${lowestPrice}–$${highestPrice} entry`,
            },
            ...(reviewedOn
              ? [
                  {
                    label: "Listings last reviewed",
                    value: formatReviewedDate(reviewedOn),
                  },
                ]
              : []),
          ]}
        />

        <AffiliateDisclosure className="mt-3" />

        <section className="mt-8" aria-labelledby="quick-comparison">
          <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
            <h2
              id="quick-comparison"
              className="tc-display text-xl font-bold sm:text-2xl"
            >
              Quick comparison
            </h2>
            <span className="text-xs text-[#5f757f]">
              Sorted by entry price, low to high
            </span>
          </div>
          <QuickCompareTable
            brands={brands}
            lowestSlug={brands[0]!.slug}
            caption="Publicly advertised entry prices, guarantee windows, and bulk-pricing structure. Bundle requirements and promos change often — confirm on each brand's official checkout."
          />
        </section>

        <div className="mb-4 mt-10 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="tc-display text-xl font-bold sm:text-2xl">
            All supplements
          </h2>
          <span className="text-xs text-[#5f757f]">{brands.length} listed</span>
        </div>

        <div className="flex flex-col gap-3">
          {brands.map((brand, i) => (
            <BrandCard key={brand.slug} brand={brand} highlight={i === 0} />
          ))}
        </div>

        <p className="mt-5 text-xs leading-relaxed text-[#5f757f]">
          OTC supplements are not prescription therapy. Pricing varies by bundle
          size and promos-verify on each brand&apos;s official site before you buy.
        </p>

        <div className="mt-8">
          <Link
            href="/t-supplements/comparisons"
            className="tc-btn tc-btn-secondary"
          >
            View head-to-head supplement comparisons
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </>
  );
}
