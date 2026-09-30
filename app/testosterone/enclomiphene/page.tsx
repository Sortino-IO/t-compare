import type { Metadata } from "next";
import Link from "next/link";
import { BRAND_CATEGORY_CONFIG, getBrandsByCategory } from "../../lib/brands";
import { formatReviewedDate, latestReviewedDate } from "../../lib/brand-display";
import { buildEstimatorRows } from "../../lib/cost-estimator";
import { hasPublishedPrice } from "../../lib/provider-facts";
import QuickCostEstimator from "../../components/QuickCostEstimator";
import FaqSection from "../../components/FaqSection";
import EvidenceNotes from "../../components/EvidenceNotes";
import { buildEnclomipheneFaq } from "../../lib/enclomiphene-faq";
import AffiliateDisclosure from "../../components/AffiliateDisclosure";
import BrandCard from "../../components/BrandCard";
import ClinicalContext from "../../components/ClinicalContext";
import QuickCompareTable from "../../components/QuickCompareTable";
import TrustStrip from "../../components/TrustStrip";
import VerdictTiles from "../../components/VerdictTiles";
import AuthoritySources from "../../components/AuthoritySources";
import HubQuickAnswer from "../../components/HubQuickAnswer";
import { canonicalAlternates, metaDescription } from "../../lib/seo";
import { OG_BASE, SITE_URL } from "../../lib/site";

const PAGE_PATH = "/testosterone/enclomiphene";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

export const metadata: Metadata = {
  title: "Best Enclomiphene Providers Compared (2026): Prices & Labs",
  description: metaDescription(
    "Compare 8 enclomiphene telehealth providers side by side — monthly price, labs, commitment, prescriber type, and estimated 12-month total. Free cost calculator and head-to-head pages.",
  ),
  alternates: canonicalAlternates(PAGE_PATH),
  openGraph: {
    ...OG_BASE,
    title: "Best Enclomiphene Providers Compared (2026) | T-Compare",
    description: metaDescription(
      "Compare 8 enclomiphene telehealth providers — monthly price, labs, commitment, and 12-month cost. Free calculator and head-to-head pages.",
    ),
    url: PAGE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Top Enclomiphene Providers Compared (2026) | T-Compare",
    description:
      "Compare enclomiphene providers by starting price, onboarding flow, labs, and plan structure. Shortlist the best fit, then verify details on official sites.",
  },
};

export default function EnclomiphenePage() {
  const brands = getBrandsByCategory("enclomiphene");
  const config = BRAND_CATEGORY_CONFIG.enclomiphene;
  const priced = brands.filter(hasPublishedPrice);
  const lowestPrice = priced[0]!.priceFromMonthly;
  const highestPrice = priced[priced.length - 1]!.priceFromMonthly;
  const reviewedOn = latestReviewedDate(brands);

  const estimatorRows = buildEstimatorRows(brands);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Enclomiphene Providers", item: PAGE_URL },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Enclomiphene Providers Comparison",
    url: PAGE_URL,
    numberOfItems: brands.length,
    itemListElement: brands.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: b.name,
      url: `${SITE_URL}/testosterone/enclomiphene/${b.slug}`,
    })),
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex items-center gap-2 text-[13px] text-[#5f757f]"
        >
          <Link href="/" className="hover:text-[#176b87] hover:underline">
            Home
          </Link>
          <span aria-hidden>/</span>
          <span className="text-[#3c535e]">Enclomiphene Providers</span>
        </nav>

        {/* Header */}
        <div className="max-w-3xl">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#176b87]">
            Independent comparison
          </p>
          <h1 className="tc-display text-[1.75rem] font-bold leading-tight sm:text-4xl">
            Compare Enclomiphene Providers
          </h1>
          <p className="mt-3 text-base leading-relaxed text-[#53666e]">
            Browse pricing and program details for enclomiphene providers in one
            place. All providers listed offer online access. Information is based
            on publicly available sources and may change over time.
          </p>
        </div>

        {/* Trust strip — every value comes from the published dataset */}
        <TrustStrip
          className="mt-6"
          items={[
            { label: config.entityLabel, value: String(brands.length) },
            {
              label: "Published price range",
              value: `$${lowestPrice}–$${highestPrice}/mo`,
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

        <HubQuickAnswer className="mt-6">
          <p>
            <strong>Enclomiphene</strong> is a selective estrogen receptor modulator (SERM) used
            off-label through compounding pharmacies to stimulate your own testosterone production
            while preserving fertility in many men. Telehealth programs differ most on{" "}
            <strong>all-in cost</strong> (medication, membership, labs), prescriber access, and
            state availability — not just the advertised monthly price.
          </p>
          <p className="mt-3">
            Use the comparison table and{" "}
            <Link href="/tools/enclomiphene-cost-calculator" className="text-[#176b87] underline">
              12-month cost calculator
            </Link>{" "}
            here, then confirm live pricing on each provider&apos;s official site before checkout.
          </p>
        </HubQuickAnswer>

        <QuickCostEstimator rows={estimatorRows} className="mt-6" />

        <VerdictTiles brands={brands} className="mt-8" />

        {/* Quick comparison */}
        <section className="mt-8" aria-labelledby="quick-comparison">
          <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
            <h2
              id="quick-comparison"
              className="tc-display text-xl font-bold sm:text-2xl"
            >
              Quick comparison
            </h2>
            <span className="text-xs text-[#5f757f]">
              Sorted by starting price, low to high
            </span>
          </div>
          <QuickCompareTable
            brands={brands}
            lowestSlug={brands[0]!.slug}
            caption="Billing, lab costs and prescriber details as each provider publishes them, checked September 2026. Green means covered or favourable, amber means an extra cost or commitment to factor in."
          />
        </section>

        {/* Cost calculator callout */}
        <Link
          href="/tools/enclomiphene-cost-calculator"
          className="group mt-8 flex items-center justify-between gap-4 rounded-xl border border-[#bcd9e4] bg-[#eef6f9] px-4 py-3.5 transition-colors hover:border-[#176b87] sm:px-5"
        >
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#176b87]">
              Free tool
            </p>
            <p className="mt-0.5 text-sm font-semibold text-[#142b3a]">
              See every provider&apos;s real 12-month cost — medication, membership &amp; labs
            </p>
          </div>
          <span
            className="shrink-0 text-lg text-[#176b87] transition-transform group-hover:translate-x-0.5"
            aria-hidden
          >
            →
          </span>
        </Link>

        <ClinicalContext className="mt-8" />

        <AuthoritySources className="mt-8" />

        <EvidenceNotes
          ids={["enclomiphene-sperm", "enclomiphene-lh-fsh", "t-trials-sexual-function"]}
          className="mt-8"
        />

        {/* List header */}
        <div className="mb-4 mt-10 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="tc-display text-xl font-bold sm:text-2xl">
            {config.listTitle}
          </h2>
          <span className="text-xs text-[#5f757f]">Price low → high</span>
        </div>

        {/* Provider cards (sorted low → high; first row = lowest published anchor in our dataset) */}
        <div className="flex flex-col gap-3">
          {brands.map((brand, i) => (
            <div key={brand.slug} id={i === 0 ? "lowest-price-provider" : undefined} className="scroll-mt-24">
              <BrandCard brand={brand} highlight={i === 0} />
            </div>
          ))}
        </div>

        <p className="mt-5 text-xs leading-relaxed text-[#5f757f]">
          Pricing is indicative and may vary based on consultation, dosage, and
          location. Verify current pricing directly with each provider.
        </p>

        <FaqSection
          items={buildEnclomipheneFaq(estimatorRows)}
          title="Enclomiphene FAQ"
          className="mt-12"
        />
      </div>
    </>
  );
}
