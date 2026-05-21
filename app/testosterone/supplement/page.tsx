import type { Metadata } from "next";
import Link from "next/link";
import { BRAND_CATEGORY_CONFIG, getBrandsByCategory } from "../../lib/brands";
import BrandCard from "../../components/BrandCard";
import { SITE_URL } from "../../lib/site";

const PAGE_URL = `${SITE_URL}/testosterone/supplement`;

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
        url: "/testosterone/supplement/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Top Testosterone Supplements Compared",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Testosterone Supplements Compared: Prices & Value (2026) | T-Compare",
    description:
      "Compare top testosterone boosters side by side from $55/mo. See entry prices, bulk savings, guarantees, and ingredients so you pick the right bottle-not the loudest ad.",
    images: ["/testosterone/supplement/opengraph-image"],
  },
};

export default function SupplementPage() {
  const brands = getBrandsByCategory("supplement");
  const config = BRAND_CATEGORY_CONFIG.supplement;
  const lowestPrice = brands[0]!.priceFromMonthly;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Testosterone",
        item: `${SITE_URL}/testosterone`,
      },
      { "@type": "ListItem", position: 3, name: config.breadcrumbLabel, item: PAGE_URL },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Testosterone Supplements Comparison",
    url: PAGE_URL,
    numberOfItems: brands.length,
    itemListElement: brands.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: b.name,
      url: `${SITE_URL}/testosterone/supplement/${b.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <div className="mx-auto max-w-5xl px-6 py-10 sm:py-16">
        <nav className="flex items-center gap-2 text-sm text-[#b5b0a8] mb-10 sm:mb-14 flex-wrap">
          <Link href="/" className="hover:text-[#1c1917] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/testosterone" className="hover:text-[#1c1917] transition-colors">
            Testosterone
          </Link>
          <span>/</span>
          <span className="text-[#78716c]">{config.breadcrumbLabel}</span>
        </nav>

        <div className="max-w-2xl mb-10 sm:mb-12">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-[#a8a29e] uppercase mb-4">
            Informational Comparison
          </p>
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1c1917] mb-4 leading-tight">
            Find the Right Testosterone Supplement for Your Budget
          </h1>
          <p className="text-base text-[#78716c] leading-relaxed">
            Shopping for a testosterone booster? Compare entry prices, bulk
            bundle math, money-back guarantees, and ingredient stacks in one
            place-sorted low to high so you can spot real value fast. OTC
            supplements are not prescription therapy; confirm live checkout
            totals on each brand&apos;s official site before you buy.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-10 sm:mb-12 rounded-2xl bg-white border border-[#e3dfd6] p-5 sm:p-6 shadow-sm">
          <div className="text-center">
            <p className="font-[family-name:var(--font-playfair)] text-xl sm:text-2xl font-semibold text-[#2a6e47] tabular-nums">
              From ${lowestPrice}
            </p>
            <p className="text-xs text-[#b5b0a8] mt-1.5">Starting from / mo</p>
          </div>
          <div className="text-center border-l border-[#e3dfd6]">
            <p className="font-[family-name:var(--font-playfair)] text-xl sm:text-2xl font-semibold text-[#1c1917] tabular-nums">
              {brands.length}
            </p>
            <p className="text-xs text-[#b5b0a8] mt-1.5">{config.entityLabel}</p>
          </div>
        </div>

        <div className="mb-4 sm:mb-5 flex items-center justify-between">
          <h2 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-[#1c1917]">
            {config.listTitle}
          </h2>
          <span className="text-xs text-[#b5b0a8]">Price low → high</span>
        </div>

        <div className="flex flex-col gap-3">
          {brands.map((brand, i) => (
            <div
              key={brand.slug}
              id={i === 0 ? "lowest-price-supplement" : undefined}
              className="scroll-mt-28"
            >
              <BrandCard brand={brand} highlight={i === 0} />
            </div>
          ))}
        </div>

        <p className="mt-5 text-xs text-[#b5b0a8] leading-relaxed">
          Supplement pricing varies by bundle size, subscribe options, shipping,
          and promos. OTC products are not FDA-approved to treat low testosterone.
          Talk to a clinician if you have symptoms or abnormal labs.
        </p>
      </div>
    </>
  );
}
