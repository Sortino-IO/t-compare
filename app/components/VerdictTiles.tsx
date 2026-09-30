import Link from "next/link";
import { getBrandDetailPath, type Brand } from "../lib/brands";
import { merchantCtaLabel } from "../lib/brand-display";
import { withTtimeAffiliateParams } from "../lib/affiliate-links";
import { buildVerdicts } from "../lib/provider-facts";
import ExternalCta from "./ui/ExternalCta";

type Props = {
  brands: Brand[];
  className?: string;
};

export default function VerdictTiles({ brands, className = "" }: Props) {
  const verdicts = buildVerdicts(brands);
  if (verdicts.length === 0) return null;

  return (
    <section aria-labelledby="best-for-heading" className={className}>
      <h2 id="best-for-heading" className="tc-display text-xl font-semibold text-[#142b3a]">
        Best for
      </h2>
      <p className="mt-1 text-sm text-[#53666e]">
        Picked only from terms each provider publishes, checked September 2026. Each provider can
        win one pick at most.
      </p>

      <ul
        className={`mt-4 grid gap-3 sm:grid-cols-2 ${
          verdicts.length >= 4 ? "lg:grid-cols-4" : verdicts.length === 3 ? "lg:grid-cols-3" : ""
        }`}
      >
        {verdicts.map((v) => (
          <li key={v.id} className="tc-card flex flex-col p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#176b87]">
              {v.title}
            </p>
            <Link
              href={getBrandDetailPath(v.brand)}
              className="mt-1.5 text-base font-semibold text-[#142b3a] hover:text-[#176b87] hover:underline"
            >
              {v.brand.name}
            </Link>
            <p className="mt-1 flex-1 text-[13px] leading-relaxed text-[#53666e]">{v.detail}</p>
            <div className="mt-3">
              <ExternalCta
                href={withTtimeAffiliateParams(v.brand.affiliateUrl)}
                brand={v.brand.name}
                position="verdict"
                label={merchantCtaLabel(v.brand)}
                size="sm"
                fullWidth
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
