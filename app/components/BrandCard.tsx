import Link from "next/link";
import {
  BRAND_CATEGORY_CONFIG,
  getBrandDetailPath,
  type Brand,
} from "../lib/brands";
import {
  brandMonogram,
  formatReviewedDate,
  merchantCtaLabel,
  reviewCtaLabel,
} from "../lib/brand-display";
import { withTtimeAffiliateParams } from "../lib/affiliate-links";
import { hasPublishedPrice } from "../lib/provider-facts";
import ExternalCta from "./ui/ExternalCta";

interface BrandCardProps {
  brand: Brand;
  /** Marks the lowest published starting price in the current list. */
  highlight?: boolean;
}

/** Icon-free label/value pair; the label carries the meaning, not the color. */
function Spec({
  label,
  value,
  tone = "neutral",
}: {
  label: string;
  value: string;
  tone?: "neutral" | "positive";
}) {
  return (
    <div className="min-w-0">
      <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#5f757f]">
        {label}
      </dt>
      <dd
        className={`mt-0.5 text-sm leading-snug ${
          tone === "positive" ? "text-[#1a6249]" : "text-[#3c535e]"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}

export default function BrandCard({ brand, highlight = false }: BrandCardProps) {
  const detailPath = getBrandDetailPath(brand);
  const config = BRAND_CATEGORY_CONFIG[brand.category];
  const isSupplement = brand.category === "supplement";
  const affiliateHref = withTtimeAffiliateParams(brand.affiliateUrl);

  return (
    <article
      id={`card-${brand.slug}`}
      className={`tc-card overflow-hidden transition-colors ${
        highlight ? "border-[#bfe3d3]" : "hover:border-[#a9cbd8]"
      }`}
    >
      {/* ── Identity + price ── */}
      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-start sm:gap-5 sm:p-5">
        <span
          aria-hidden
          className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#e3e3e3] bg-white text-[13px] font-bold tracking-tight text-[#176b87] sm:flex"
        >
          {brandMonogram(brand.name)}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="tc-tag uppercase">{brand.shortLabel}</span>
            {highlight ? (
              <span className="tc-tag tc-tag-positive uppercase">
                Lowest listed price
              </span>
            ) : null}
            {brand.onboardingType === "faster-start" && !isSupplement ? (
              <span className="tc-tag uppercase">Faster start</span>
            ) : null}
          </div>

          <h3 className="tc-display mt-2 text-lg font-bold leading-snug sm:text-xl">
            <Link
              href={detailPath}
              className="text-[#142b3a] transition-colors hover:text-[#176b87]"
            >
              {brand.name}
            </Link>
          </h3>

          <p className="mt-1 text-sm leading-relaxed text-[#53666e]">
            {brand.why.positioning}
          </p>
        </div>

        <div className="shrink-0 rounded-lg border border-[#e3e3e3] bg-white px-4 py-2.5 sm:min-w-[9.5rem] sm:text-right">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#5f757f]">
            Starting price
          </p>
          {hasPublishedPrice(brand) ? (
            <p className="mt-0.5 flex items-baseline gap-1 sm:justify-end">
              <span className="text-2xl font-bold tabular-nums leading-none text-[#142b3a]">
                ${brand.priceFromMonthly}
              </span>
              <span className="text-xs text-[#53666e]">
                {isSupplement ? "/bottle eq." : "/mo"}
              </span>
            </p>
          ) : null}
          <p className="mt-1 text-[11px] leading-snug text-[#5f757f]">
            {brand.priceLabel}
          </p>
        </div>
      </div>

      {/* ── Comparable attributes, always visible ── */}
      <dl className="grid grid-cols-1 gap-x-6 gap-y-3 border-t border-[#ededed] bg-white px-4 py-3.5 sm:grid-cols-3 sm:px-5">
        <Spec
          label={config.whyLabels.onboarding}
          value={brand.why.onboarding}
          tone={isSupplement ? "positive" : "neutral"}
        />
        <Spec label={config.whyLabels.pricing} value={brand.why.pricing} />
        <Spec label="Approach" value={brand.shortDescription} />
      </dl>

      {/* ── Actions ── */}
      <div className="flex flex-col gap-2.5 border-t border-[#ededed] px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <p className="text-[11px] text-[#5f757f]">
          Last reviewed {formatReviewedDate(brand.lastReviewed)} · verify current
          terms on the official site
        </p>
        <div className="flex flex-col gap-2 sm:flex-row sm:shrink-0 sm:items-center">
          <Link href={detailPath} className="tc-btn tc-btn-secondary tc-btn-sm">
            {reviewCtaLabel(brand)}
            <span aria-hidden>→</span>
          </Link>
          <ExternalCta
            href={affiliateHref}
            brand={brand.name}
            position="card"
            label={merchantCtaLabel(brand)}
            size="sm"
          />
        </div>
      </div>
    </article>
  );
}
