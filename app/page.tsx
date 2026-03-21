import type { Metadata } from "next";
import Link from "next/link";
import { getAllBrands } from "./lib/brands";
import BrandCard from "./components/BrandCard";

export const metadata: Metadata = {
  title: "Compare Enclomiphene Providers — Pricing & Protocols",
  description:
    "An independent, informational comparison of enclomiphene providers. Browse pricing, protocol format, and provider details in one place.",
};

export default function HomePage() {
  const brands = getAllBrands();

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
      {/* Hero */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <p className="text-[11px] font-semibold tracking-[0.2em] text-[#a8a29e] uppercase mb-5">
          Informational Comparison
        </p>
        <h1 className="font-[family-name:var(--font-playfair)] text-5xl sm:text-6xl font-semibold text-[#1c1917] leading-[1.1] tracking-tight mb-5">
          Compare Enclomiphene Providers
        </h1>
        <p className="text-lg text-[#78716c] leading-relaxed max-w-xl mx-auto">
          Browse pricing, protocol format, and provider details in one place.
          Sorted by monthly cost, lowest first.
        </p>
      </div>

      {/* Section header */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-[#1c1917]">
          Enclomiphene providers
        </h2>
        <span className="text-sm text-[#b5b0a8]">{brands.length} listed</span>
      </div>

      {/* Provider list */}
      <div className="flex flex-col gap-3">
        {brands.map((brand) => (
          <BrandCard key={brand.slug} brand={brand} />
        ))}
      </div>

      <p className="mt-6 text-xs text-[#b5b0a8] text-center leading-relaxed">
        Pricing is indicative and may vary based on consultation, dosage, and
        location. Verify directly with each provider.
      </p>

      {/* Category nav */}
      <div className="mt-20 pt-12 border-t border-[#e3dfd6]">
        <p className="text-[11px] font-semibold tracking-[0.2em] text-[#b5b0a8] uppercase mb-6 text-center">
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
            <span className="text-sm text-[#b5b0a8] group-hover:text-[#2a6e47] transition-colors">
              →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
