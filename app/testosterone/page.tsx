import type { Metadata } from "next";
import Link from "next/link";
import { getBrandsByCategory } from "../lib/brands";
import { SITE_URL } from "../lib/site";

export const metadata: Metadata = {
  title: "Enclomiphene Providers: Compare by Category",
  description:
    "Compare enclomiphene telehealth providers by pricing, onboarding, labs, and plan structure before you choose.",
  openGraph: {
    title: "Enclomiphene Providers: Compare by Category | T-Compare",
    description:
      "Compare enclomiphene telehealth providers by pricing, onboarding, labs, and plan structure before you choose.",
    url: `${SITE_URL}/testosterone`,
    images: [
      {
        url: "/testosterone/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Testosterone Treatment Options: Compare by Category",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Enclomiphene Providers: Compare by Category | T-Compare",
    description:
      "Compare enclomiphene telehealth providers by pricing, onboarding, labs, and plan structure before you choose.",
    images: ["/testosterone/opengraph-image"],
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

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[#a8a29e] mb-12">
        <Link href="/" className="hover:text-[#1c1917] transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-[#78716c]">Testosterone</span>
      </nav>

      <div className="max-w-xl mb-14">
        <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-semibold text-[#1c1917] mb-4 leading-tight">
          Compare testosterone options by category
        </h1>
        <p className="text-base text-[#78716c] leading-relaxed">
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
            className="group flex flex-col gap-3 rounded-2xl bg-white border border-[#e3dfd6] p-7 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="flex items-start justify-between">
              <h2 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-[#1c1917] group-hover:text-[#2a6e47] transition-colors">
                {category.name}
              </h2>
              <span className="text-xs text-[#a8a29e] tabular-nums mt-1">
                {category.providerCount} providers
              </span>
            </div>
            <p className="text-sm text-[#78716c] leading-relaxed">
              {category.description}
            </p>
            <div className="flex items-center justify-between mt-2 pt-4 border-t border-[#e3dfd6]">
              <span className="text-sm text-[#a8a29e]">
                From{" "}
                <span className="font-semibold text-[#2a6e47]">
                  ${category.priceFrom}/mo
                </span>
              </span>
              <span className="text-xs font-medium text-[#78716c] group-hover:text-[#2a6e47] transition-colors">
                Compare →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
