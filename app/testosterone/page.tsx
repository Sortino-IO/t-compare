import type { Metadata } from "next";
import Link from "next/link";
import { getBrandsByCategory } from "../lib/brands";
import QuickCostEstimator from "../components/QuickCostEstimator";
import EvidenceNotes from "../components/EvidenceNotes";
import { buildEstimatorRows } from "../lib/cost-estimator";
import { breadcrumbListSchema, canonicalAlternates } from "../lib/seo";
import { OG_BASE, SITE_URL } from "../lib/site";

const PAGE_PATH = "/testosterone";

export const metadata: Metadata = {
  title: "Testosterone & Enclomiphene Comparison Hub (2026)",
  description:
    "Start here to compare prescription enclomiphene telehealth programs — pricing, labs, 12-month cost calculator, and head-to-head provider pages.",
  alternates: canonicalAlternates(PAGE_PATH),
  openGraph: {
    ...OG_BASE,
    title: "Enclomiphene Providers: Compare by Category | T-Compare",
    description:
      "Compare enclomiphene telehealth providers by pricing, onboarding, labs, and plan structure before you choose.",
    url: `${SITE_URL}/testosterone`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Enclomiphene Providers: Compare by Category | T-Compare",
    description:
      "Compare enclomiphene telehealth providers by pricing, onboarding, labs, and plan structure before you choose.",
  },
};

export default function TestosteronePage() {
  const encloBrands = getBrandsByCategory("enclomiphene");

  const categories = [
    {
      name: "Enclomiphene",
      slug: "enclomiphene",
      description:
        "A selective estrogen receptor modulator (SERM) that stimulates the body's own testosterone production without direct hormone replacement.",
      providerCount: encloBrands.length,
      priceFrom: encloBrands.length ? encloBrands[0]!.priceFromMonthly : 0,
    },
  ];

  const breadcrumbSchema = breadcrumbListSchema([
    { name: "Home", path: "/" },
    { name: "Testosterone", path: PAGE_PATH },
  ]);

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[#5f757f] mb-12">
        <Link href="/" className="hover:text-[#176b87] hover:underline">
          Home
        </Link>
        <span>/</span>
        <span className="text-[#53666e]">Testosterone</span>
      </nav>

      <div className="max-w-xl mb-14">
        <h1 className="tc-display text-4xl font-semibold text-[#142b3a] mb-4 leading-tight">
          Compare testosterone options by category
        </h1>
        <p className="text-base text-[#53666e] leading-relaxed">
          Prescription enclomiphene programs and OTC testosterone supplements
          solve different problems. Pick a category below to compare pricing,
          structure, and value before you commit.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 max-w-2xl">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/testosterone/${category.slug}`}
            className="group flex flex-col gap-3 rounded-xl bg-white border border-[#e3e3e3] p-7 transition-all duration-200"
          >
            <div className="flex items-start justify-between">
              <h2 className="tc-display text-xl font-semibold text-[#142b3a] group-hover:text-[#176b87] transition-colors">
                {category.name}
              </h2>
              <span className="text-xs text-[#5f757f] tabular-nums mt-1">
                {category.providerCount} providers
              </span>
            </div>
            <p className="text-sm text-[#53666e] leading-relaxed">
              {category.description}
            </p>
            <div className="flex items-center justify-between mt-2 pt-4 border-t border-[#e3e3e3]">
              <span className="text-sm text-[#5f757f]">
                From{" "}
                <span className="font-semibold text-[#176b87]">
                  ${category.priceFrom}/mo
                </span>
              </span>
              <span className="text-xs font-medium text-[#53666e] group-hover:text-[#176b87] transition-colors">
                Compare →
              </span>
            </div>
          </Link>
        ))}
      </div>

      <QuickCostEstimator rows={buildEstimatorRows(encloBrands)} className="mt-10" />

      <EvidenceNotes
        ids={["t-trials-sexual-function", "t-trials-bone", "t-trials-anemia"]}
        className="mt-10"
      />
    </div>
  );
}
