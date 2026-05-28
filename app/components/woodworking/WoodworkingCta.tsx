import { WOODWORKING_AFFILIATE_URL } from "../../lib/woodworking-affiliate";

type Props = {
  title?: string;
  body?: string;
  className?: string;
};

export default function WoodworkingCta({ title, body, className = "" }: Props) {
  return (
    <aside
      className={`my-10 rounded-2xl border-2 border-[#c17817] bg-gradient-to-br from-[#fdf8f0] to-[#f5efe6] p-6 sm:p-8 shadow-sm ${className}`}
    >
      <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#92400e] mb-2">
        Recommended resource
      </p>
      <h3 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-[#3d2914] sm:text-2xl mb-3">
        {title ?? "16,000 shop-tested woodworking plans"}
      </h3>
      <p className="text-sm sm:text-base leading-relaxed text-[#57534e] mb-5">
        {body ??
          "TedsWoodworking includes searchable plans with exact cut lists, materials lists, and step-by-step instructions — each built in the workshop before publication. Lifetime access currently available for a one-time $67."}
      </p>
      <a
        href={WOODWORKING_AFFILIATE_URL}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="inline-flex items-center justify-center rounded-lg bg-[#c17817] px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-[#2d2118] shadow-md transition-transform hover:scale-[1.02] hover:bg-[#a86510]"
      >
        Get instant access →
      </a>
      <p className="mt-3 text-[10px] text-[#a8a29e]">60-day money-back guarantee · Secure ClickBank checkout</p>
    </aside>
  );
}
