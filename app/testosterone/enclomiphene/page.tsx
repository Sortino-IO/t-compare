import type { Metadata } from "next";
import Link from "next/link";
import { getAllBrands } from "../../lib/brands";
import BrandCard from "../../components/BrandCard";

export const metadata: Metadata = {
  title: "Enclomiphene Providers Comparison — Pricing & Protocols",
  description:
    "Compare enclomiphene providers side by side. Browse protocols, monthly pricing, and delivery details for each provider.",
};

export default function EnclomiphenePage() {
  const brands = getAllBrands();
  const lowestPrice = brands[0].price_monthly;
  const highestRetail = Math.max(...brands.map((b) => b.price_retail));

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[#b5b0a8] mb-14">
        <Link href="/" className="hover:text-[#1c1917] transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link
          href="/testosterone"
          className="hover:text-[#1c1917] transition-colors"
        >
          Testosterone
        </Link>
        <span>/</span>
        <span className="text-[#78716c]">Enclomiphene</span>
      </nav>

      {/* Header */}
      <div className="max-w-2xl mb-12">
        <p className="text-[11px] font-semibold tracking-[0.2em] text-[#a8a29e] uppercase mb-4">
          Informational Comparison
        </p>
        <h1 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl font-semibold text-[#1c1917] mb-5 leading-tight">
          Compare Enclomiphene Providers
        </h1>
        <p className="text-base text-[#78716c] leading-relaxed">
          Browse pricing, protocol format, and provider details in one place.
          Enclomiphene is a non-steroidal SERM used to support natural
          testosterone production. All providers below offer
          telemedicine-based access.
        </p>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-3 gap-4 mb-12 rounded-2xl bg-white border border-[#e3dfd6] p-6 shadow-sm">
        <div className="text-center">
          <p className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-[#2a6e47] tabular-nums">
            From ${lowestPrice}
          </p>
          <p className="text-xs text-[#b5b0a8] mt-1.5">Starting from / mo</p>
        </div>
        <div className="text-center border-x border-[#e3dfd6]">
          <p className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-[#1c1917] tabular-nums">
            {brands.length}
          </p>
          <p className="text-xs text-[#b5b0a8] mt-1.5">Providers listed</p>
        </div>
        <div className="text-center">
          <p className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-[#1c1917] tabular-nums">
            Up to ${highestRetail - lowestPrice}
          </p>
          <p className="text-xs text-[#b5b0a8] mt-1.5">Potential savings / mo</p>
        </div>
      </div>

      {/* Provider list header */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-[#1c1917]">
          All providers
        </h2>
        <span className="text-xs text-[#b5b0a8]">Sorted: price low → high</span>
      </div>

      {/* Provider cards */}
      <div className="flex flex-col gap-3">
        {brands.map((brand) => (
          <BrandCard key={brand.slug} brand={brand} />
        ))}
      </div>

      <p className="mt-6 text-xs text-[#b5b0a8] leading-relaxed">
        Pricing is indicative and may vary based on consultation, dosage, and
        location. Verify current pricing directly with each provider.
      </p>
    </div>
  );
}
