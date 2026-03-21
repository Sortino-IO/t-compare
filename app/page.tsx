import type { Metadata } from "next";
import Link from "next/link";
import { getAllBrands } from "./lib/brands";
import BrandCard from "./components/BrandCard";

export const metadata: Metadata = {
  title: "Compare Enclomiphene Provider Pricing",
  description:
    "Find and compare enclomiphene provider protocols and pricing. An independent, informational reference — no recommendations, just the data.",
};

export default function HomePage() {
  const brands = getAllBrands();

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
      {/* Hero */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <p className="text-xs font-medium tracking-[0.15em] text-[#78716c] uppercase mb-5">
          Independent · Informational · No Affiliations
        </p>
        <h1 className="font-[family-name:var(--font-playfair)] text-5xl sm:text-6xl font-semibold text-[#1c1917] leading-[1.1] tracking-tight mb-6">
          Compare enclomiphene provider pricing
        </h1>
        <p className="text-lg text-[#78716c] leading-relaxed">
          Side-by-side comparison of protocols, monthly costs, and provider
          details. Sorted by lowest price.
        </p>
      </div>

      {/* Product list */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-[#1c1917]">
          Enclomiphene providers
        </h2>
        <span className="text-sm text-[#a8a29e]">{brands.length} providers</span>
      </div>

      <div className="flex flex-col gap-3">
        {brands.map((brand) => (
          <BrandCard key={brand.slug} brand={brand} />
        ))}
      </div>

      <p className="mt-6 text-xs text-[#a8a29e] text-center leading-relaxed">
        Prices shown are approximate. Verify directly with each provider.
        Original prices reflect standard retail rates before any discount
        programs.
      </p>

      {/* Category nav */}
      <div className="mt-20 pt-12 border-t border-[#e3dfd6]">
        <p className="text-xs font-medium tracking-[0.15em] text-[#a8a29e] uppercase mb-6 text-center">
          Browse by category
        </p>
        <div className="flex justify-center">
          <Link
            href="/testosterone"
            className="inline-flex items-center gap-2 rounded-xl border border-[#e3dfd6] bg-white px-6 py-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
          >
            <span className="font-[family-name:var(--font-playfair)] text-base font-semibold text-[#1c1917] group-hover:text-[#2a6e47] transition-colors">
              Testosterone support
            </span>
            <span className="text-sm text-[#a8a29e] group-hover:text-[#2a6e47] transition-colors">
              →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
