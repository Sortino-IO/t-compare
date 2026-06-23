import type { Metadata } from "next";
import Link from "next/link";
import BrandCard from "../components/BrandCard";
import { getBrandDetailPath, getBrandsByCategory } from "../lib/brands";
import { SITE_URL } from "../lib/site";

const PAGE_URL = `${SITE_URL}/t-supplements`;

export const metadata: Metadata = {
  title: "Best Testosterone Supplements Compared: Prices & Value (2026)",
  description:
    "Compare top testosterone boosters side by side from $55/mo. See entry prices, bulk savings, guarantees, and ingredients so you pick the right bottle-not the loudest ad.",
  openGraph: {
    title: "Best Testosterone Supplements Compared: Prices & Value (2026) | T-Compare",
    description:
      "Compare top testosterone boosters side by side from $55/mo. See entry prices, bulk savings, guarantees, and ingredients so you pick the right bottle-not the loudest ad.",
    url: PAGE_URL,
    images: [
      {
        url: "/t-supplements/opengraph-image",
        width: 1200,
        height: 630,
        alt: "T-Supplements Compared",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Testosterone Supplements Compared: Prices & Value (2026) | T-Compare",
    description:
      "Compare top testosterone boosters side by side from $55/mo. See entry prices, bulk savings, guarantees, and ingredients so you pick the right bottle-not the loudest ad.",
    images: ["/t-supplements/opengraph-image"],
  },
};

export default function TSupplementsPage() {
  const brands = getBrandsByCategory("supplement");

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

      <div className="mx-auto max-w-5xl px-6 py-8 sm:py-20">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-16">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-[#a8a29e] uppercase mb-3 sm:mb-4">
            Informational Comparison
          </p>
          <h1 className="font-[family-name:var(--font-playfair)] text-[1.9rem] sm:text-5xl lg:text-6xl font-semibold text-[#1c1917] leading-[1.1] tracking-tight mb-3 sm:mb-5">
            Compare Testosterone Supplements
          </h1>
          <p className="text-sm sm:text-lg text-[#78716c] leading-relaxed max-w-xl mx-auto">
            Browse pricing, bulk bundle math, and guarantee terms for OTC
            testosterone boosters in one place. Sorted by monthly cost.
          </p>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-[family-name:var(--font-playfair)] text-xl sm:text-2xl font-semibold text-[#1c1917]">
            Testosterone Supplements
          </h2>
          <span className="text-sm text-[#b5b0a8]">{brands.length} listed</span>
        </div>

        <div className="flex flex-col gap-3">
          {brands.map((brand, i) => (
            <BrandCard key={brand.slug} brand={brand} highlight={i === 0} />
          ))}
        </div>

        <p className="mt-5 text-xs text-[#b5b0a8] text-center leading-relaxed">
          OTC supplements are not prescription therapy. Pricing varies by bundle
          size and promos-verify on each brand&apos;s official site before you buy.
        </p>

        <p className="mt-8 text-center">
          <Link
            href="/t-supplements/comparisons"
            className="text-sm font-medium text-[#2a6e47] hover:underline"
          >
            View head-to-head Testosterone Supplement comparisons →
          </Link>
        </p>
      </div>
    </>
  );
}
