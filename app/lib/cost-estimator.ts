import type { EstimatorRow } from "../components/QuickCostEstimator";
import { withTtimeAffiliateParams } from "./affiliate-links";
import { merchantCtaLabel } from "./brand-display";
import type { Brand } from "./brands";
import { annualCostBreakdown, labCostKnown } from "./provider-facts";

export function buildEstimatorRows(brands: Brand[]): EstimatorRow[] {
  return brands.flatMap((b) => {
    const cost = b.facts ? annualCostBreakdown(b.facts) : null;
    if (!b.facts || !cost) return [];
    return [
      {
        slug: b.slug,
        name: b.name,
        affiliateHref: withTtimeAffiliateParams(b.affiliateUrl),
        ctaLabel: merchantCtaLabel(b),
        ...cost,
        labAssumed: !labCostKnown(b.facts),
        billing: b.facts.billing.short,
      },
    ];
  });
}
