import { withTtimeAffiliateParams } from "../lib/affiliate-links";
import { merchantCtaLabel } from "../lib/brand-display";
import type { Brand } from "../lib/brands";
import ExternalCta from "./ui/ExternalCta";

/**
 * Action block placed directly after the comparison table: both merchant CTAs
 * side by side with their price anchors, so the reader can act on the
 * comparison without scrolling back up.
 */
export default function ComparePicksCta({
  brands,
  note,
}: {
  brands: [Brand, Brand];
  note: string;
}) {
  return (
    <section className="mt-8 rounded-xl border border-[#bcd9e4] bg-[#eef6f9] p-5 sm:p-6">
      <h2 className="tc-display text-lg font-bold sm:text-xl">
        Check current pricing
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#3c535e]">
        {note}
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {brands.map((brand) => (
          <div
            key={brand.slug}
            className="flex flex-col gap-2 rounded-lg border border-[#e3e3e3] bg-white p-4"
          >
            <p className="text-sm font-bold text-[#142b3a]">{brand.name}</p>
            <p className="text-xs text-[#5f757f]">{brand.priceLabel}</p>
            <ExternalCta
              href={withTtimeAffiliateParams(brand.affiliateUrl)}
              brand={brand.name}
              position="verdict"
              label={merchantCtaLabel(brand)}
              size="sm"
              className="mt-1 w-full"
              fullWidth
            />
          </div>
        ))}
      </div>
    </section>
  );
}
