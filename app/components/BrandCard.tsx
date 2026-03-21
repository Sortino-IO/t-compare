import Link from "next/link";
import type { Brand } from "../lib/brands";

interface BrandCardProps {
  brand: Brand;
  showProtocol?: boolean;
}

export default function BrandCard({ brand, showProtocol = true }: BrandCardProps) {
  const savings = brand.price_retail - brand.price_monthly;
  const savingsPct = Math.round((savings / brand.price_retail) * 100);

  return (
    <Link
      href={`/testosterone/enclomiphene/${brand.slug}`}
      className="group block rounded-2xl bg-white border border-[#e3dfd6] px-7 py-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
    >
      <div className="flex items-start justify-between gap-4">
        {/* Left: name + protocol */}
        <div className="flex flex-col gap-1.5 min-w-0">
          <h3 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-[#1c1917] leading-tight group-hover:text-[#2a6e47] transition-colors">
            {brand.name}
          </h3>
          {showProtocol && (
            <p className="text-sm text-[#78716c] leading-relaxed">
              {brand.protocol}
            </p>
          )}
        </div>

        {/* Right: price */}
        <div className="flex flex-col items-end shrink-0 gap-0.5">
          <span className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-[#2a6e47] tabular-nums whitespace-nowrap">
            <span className="text-base font-normal text-[#6daa87]">From </span>${brand.price_monthly}
            <span className="text-base font-normal text-[#6daa87]">/mo</span>
          </span>
          <span className="text-sm text-[#a8a29e] line-through tabular-nums">
            ${brand.price_retail}/mo
          </span>
          <span className="text-xs font-medium text-[#2a6e47] bg-[#eaf3ee] rounded-full px-2 py-0.5 mt-0.5">
            Save {savingsPct}%
          </span>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span className="text-xs text-[#a8a29e]">
          {brand.delivery.split(",")[0]}
        </span>
        <span className="text-xs font-medium text-[#78716c] group-hover:text-[#2a6e47] transition-colors">
          View details →
        </span>
      </div>
    </Link>
  );
}
