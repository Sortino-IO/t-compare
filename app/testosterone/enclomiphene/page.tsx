import type { Metadata } from "next";
import Link from "next/link";
import { getAllBrands } from "../../lib/brands";
import BrandCard from "../../components/BrandCard";

export const metadata: Metadata = {
  title: "Enclomiphene Providers Comparison",
  description:
    "Compare enclomiphene providers side by side. View protocols, monthly pricing, lab requirements, and delivery details for each provider.",
};

export default function EnclomiphenePage() {
  const brands = getAllBrands();
  const lowestPrice = brands[0].price_monthly;
  const highestRetail = Math.max(...brands.map((b) => b.price_retail));

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[#a8a29e] mb-12">
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
      <div className="max-w-2xl mb-10">
        <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-semibold text-[#1c1917] mb-4 leading-tight">
          Enclomiphene providers comparison
        </h1>
        <p className="text-base text-[#78716c] leading-relaxed">
          Enclomiphene is a non-steroidal SERM that stimulates the
          hypothalamic-pituitary axis to increase natural testosterone
          production. Providers below offer telemedicine-based access. Sorted
          by monthly cost.
        </p>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-3 gap-4 mb-10 rounded-2xl bg-white border border-[#e3dfd6] p-6 shadow-sm">
        <div className="text-center">
          <p className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-[#2a6e47] tabular-nums">
            From ${lowestPrice}
          </p>
          <p className="text-xs text-[#a8a29e] mt-1">Starting from / mo</p>
        </div>
        <div className="text-center border-x border-[#e3dfd6]">
          <p className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-[#1c1917] tabular-nums">
            {brands.length}
          </p>
          <p className="text-xs text-[#a8a29e] mt-1">Providers listed</p>
        </div>
        <div className="text-center">
          <p className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-[#1c1917] tabular-nums">
            Up to ${highestRetail - lowestPrice}
          </p>
          <p className="text-xs text-[#a8a29e] mt-1">Potential savings / mo</p>
        </div>
      </div>

      {/* Provider card list */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-[#1c1917]">
          The proof is in the prices
        </h2>
        <span className="text-xs text-[#a8a29e]">Sorted: price low → high</span>
      </div>

      <div className="flex flex-col gap-3">
        {brands.map((brand) => (
          <BrandCard key={brand.slug} brand={brand} />
        ))}
      </div>

      <p className="mt-6 text-xs text-[#a8a29e] leading-relaxed">
        Pricing is indicative and may vary based on consultation and dosage.
        Verify current pricing directly with each provider.
      </p>
    </div>
  );
}
