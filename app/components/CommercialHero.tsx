import Link from "next/link";
import {
  BRAND_CATEGORY_CONFIG,
  getComparisonsIndexPath,
  type Brand,
} from "../lib/brands";
import {
  brandMonogram,
  formatReviewedDate,
  merchantCtaLabel,
} from "../lib/brand-display";
import { hasPublishedPrice } from "../lib/provider-facts";
import AffiliateDisclosure from "./AffiliateDisclosure";
import TrustpilotRating from "./TrustpilotRating";
import ExternalCta from "./ui/ExternalCta";

type Props = {
  brand: Brand;
  /** Merchant destination, already resolved by the caller. Passed through as-is. */
  affiliateHref: string;
  /** Short editorial framing rendered under the H1. */
  intro: string;
  /** Internal comparison destination for the secondary action. */
  compareHref?: string;
  compareLabel?: string;
};

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="mt-1 shrink-0 text-[#1f7a5a]"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/**
 * First visible block on a provider or supplement page: identity, price anchor,
 * editorial verdict, the strongest published attributes, one qualification, the
 * review date, and both the merchant and internal comparison actions.
 *
 * Every value is read from `brands.json`; no ratings, awards or endorsements are
 * synthesized here.
 */
export default function CommercialHero({
  brand,
  affiliateHref,
  intro,
  compareHref,
  compareLabel,
}: Props) {
  const config = BRAND_CATEGORY_CONFIG[brand.category];
  const isSupplement = brand.category === "supplement";
  const comparisonsHref = compareHref ?? getComparisonsIndexPath(brand.category);

  const facts = brand.facts;
  const advantages = facts
    ? [
        { label: "Billing", value: facts.billing.short },
        { label: "Labs", value: facts.labs.short },
        { label: "Prescriber", value: facts.prescriber.short },
        { label: "Cancelling", value: facts.cancellation.short },
      ]
    : [
        { label: config.whyLabels.onboarding, value: brand.why.onboarding },
        { label: config.whyLabels.pricing, value: brand.why.pricing },
        { label: config.whyLabels.positioning, value: brand.why.positioning },
      ];

  // A verified, provider-specific drawback beats the generic first note.
  const limitation = facts?.limitation.text ?? brand.notes[0];

  const priceLabelAddsDetail =
    brand.priceLabel.replace(/[\s~]/g, "").toLowerCase() !==
    `from$${brand.priceFromMonthly}/mo`;

  return (
    <div className="tc-card overflow-hidden">
      <div className="grid gap-0 lg:grid-cols-[1fr_20rem]">
        {/* ── Identity, verdict, advantages ── */}
        <div className="p-5 sm:p-6">
          <div className="flex items-start gap-3.5">
            <span
              aria-hidden
              className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[#e3e3e3] bg-white text-sm font-bold tracking-tight text-[#176b87] sm:flex"
            >
              {brandMonogram(brand.name)}
            </span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="tc-tag uppercase">{config.detailBadge}</span>
                <span className="tc-tag uppercase">{brand.shortLabel}</span>
              </div>
              <h1 className="tc-display mt-2 text-2xl font-bold leading-tight sm:text-3xl">
                {brand.name}
              </h1>
              <p className="mt-1 text-xs text-[#5f757f]">
                Last reviewed {formatReviewedDate(brand.lastReviewed)}
              </p>
              {brand.trustpilot ? (
                <TrustpilotRating rating={brand.trustpilot} className="mt-1.5" />
              ) : null}
            </div>
          </div>

          <p className="mt-4 text-[15px] leading-relaxed text-[#53666e]">
            {intro}
          </p>

          <div className="mt-5 rounded-lg border border-[#e3e3e3] bg-white p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#3c535e]">
              Our take
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-[#3c535e]">
              {brand.overview}
            </p>
          </div>

          <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#3c535e]">
            {facts ? "Key terms" : "What stands out"}
          </p>
          <ul className="mt-2 space-y-2">
            {advantages.map((a) => (
              <li key={a.label} className="flex items-start gap-2 text-sm">
                <CheckIcon />
                <span className="text-[#3c535e]">
                  <span className="font-semibold text-[#142b3a]">
                    {a.label}:
                  </span>{" "}
                  {a.value}
                </span>
              </li>
            ))}
          </ul>

          {limitation ? (
            <div className="mt-4 rounded-lg border border-[#e3e3e3] border-l-[3px] border-l-[#c98a26] bg-white px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8f5810]">
                {facts ? "Before you sign up" : "Worth qualifying"}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-[#3c535e]">
                {limitation}
              </p>
            </div>
          ) : null}
        </div>

        {/* ── Price + actions ── */}
        <div className="border-t border-[#e3e3e3] bg-white p-5 sm:p-6 lg:border-l lg:border-t-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#3c535e]">
            {isSupplement ? "Entry price" : "Starting price"}
          </p>
          {hasPublishedPrice(brand) ? (
            <p className="mt-1 flex items-baseline gap-1.5">
              <span className="text-4xl font-bold tabular-nums leading-none text-[#142b3a]">
                ${brand.priceFromMonthly}
              </span>
              <span className="text-sm text-[#53666e]">
                {isSupplement ? "/bottle eq." : "/mo"}
              </span>
            </p>
          ) : (
            <p className="mt-1 text-2xl font-bold leading-tight text-[#142b3a]">Not published</p>
          )}
          {/* Only show the label when it adds detail beyond the numeral above. */}
          {facts ? (
            <p className="mt-2 text-sm font-medium leading-relaxed text-[#3c535e]">
              {facts.billing.short}
            </p>
          ) : priceLabelAddsDetail ? (
            <p className="mt-2 text-sm leading-relaxed text-[#53666e]">
              {brand.priceLabel}
            </p>
          ) : null}

          <div className="mt-5 flex flex-col gap-2.5">
            <ExternalCta
              href={affiliateHref}
              brand={brand.name}
              position="hero"
              label={merchantCtaLabel(brand)}
              fullWidth
            />
            <Link
              href={comparisonsHref}
              className="tc-btn tc-btn-secondary w-full"
            >
              {compareLabel ??
                (isSupplement
                  ? "Compare with other supplements"
                  : "Compare with other providers")}
              <span aria-hidden>→</span>
            </Link>
          </div>

          <AffiliateDisclosure className="mt-3" />

          <p className="mt-3 border-t border-[#e3e3e3] pt-3 text-xs leading-relaxed text-[#5f757f]">
            {isSupplement
              ? "Bundle size, shipping, and promotions change the total you pay. Confirm the live cart before checkout."
              : "Program details may vary by consultation, eligibility, and location. Prices shown are the same as going direct."}
          </p>
        </div>
      </div>
    </div>
  );
}
