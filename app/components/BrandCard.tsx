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
      className="group block rounded-2xl bg-white border border-[#d8d3c8] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
    >
      {/* Main body */}
      <div className="flex items-stretch">

        {/* LEFT — 70% — name + protocol */}
        <div className="flex flex-col justify-center gap-2.5 px-7 py-6 flex-1 min-w-0 border-r border-[#ede9e0]">
          {/* Category pill */}
          <span className="inline-flex w-fit items-center rounded-full bg-[#f5f3ee] border border-[#e3dfd6] px-2.5 py-0.5 text-[11px] font-semibold text-[#a8a29e] tracking-wide uppercase">
            Oral enclomiphene
          </span>

          <h3 className="font-[family-name:var(--font-playfair)] text-[1.6rem] font-bold text-[#1c1917] leading-snug group-hover:text-[#2a6e47] transition-colors">
            {brand.name}
          </h3>

          {showProtocol && (
            <p className="text-sm text-[#78716c] leading-relaxed pr-4">
              {brand.protocol}
            </p>
          )}
        </div>

        {/* RIGHT — 30% — price block */}
        <div className="flex flex-col items-end justify-center gap-1.5 px-7 py-6 shrink-0 w-[30%] min-w-[160px]">
          {/* From label */}
          <span className="text-xs font-semibold text-[#6daa87] tracking-wide uppercase">
            From
          </span>

          {/* Big price */}
          <span className="font-[family-name:var(--font-playfair)] text-[2.6rem] font-bold text-[#2a6e47] tabular-nums leading-none">
            ${brand.price_monthly}
            <span className="text-lg font-normal text-[#6daa87]">/mo</span>
          </span>

          {/* Old price */}
          <span className="text-sm text-[#b5b0a8] line-through tabular-nums">
            ${brand.price_retail}/mo
          </span>

          {/* Savings badge */}
          <span className="mt-0.5 inline-flex items-center rounded-full bg-[#eaf3ee] border border-[#c6e0d0] px-2.5 py-0.5 text-xs font-bold text-[#2a6e47]">
            Save {savingsPct}%
          </span>
        </div>
      </div>

      {/* FOOTER — CTA row */}
      <div className="flex items-center justify-between px-7 py-3.5 border-t border-[#ede9e0] bg-[#faf9f7] rounded-b-2xl">
        <span className="text-xs text-[#b5b0a8]">
          {brand.delivery.split(",")[0]}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#2a6e47] px-4 py-2 text-xs font-semibold text-white shadow-sm group-hover:bg-[#22593a] transition-colors">
          View details
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>
    </Link>
  );
}
