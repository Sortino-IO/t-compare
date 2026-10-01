import type { Brand } from "./brands";
import { hasPublishedPrice, publishedAnnualCost } from "./provider-facts";
import { metaDescription } from "./seo";

export function providerSeoTitle(brand: Brand): string {
  if (!hasPublishedPrice(brand)) {
    return `${brand.name} Enclomiphene Price, Labs & Review (2026)`;
  }
  const from = brand.priceLabel.replace(/^From\s+/i, "");
  return `${brand.name} Enclomiphene Price: ${from} + Labs, Review (2026)`;
}

export function providerSeoDescription(brand: Brand): string {
  const priceAnchor = hasPublishedPrice(brand)
    ? brand.priceLabel.replace(/^From\s+/i, "from ")
    : "pricing not published on the official site";
  const annual = brand.facts ? publishedAnnualCost(brand.facts) : null;
  const annualLine = annual
    ? ` Estimated 12-month total about $${annual.toLocaleString("en-US")} including labs.`
    : "";
  return metaDescription(
    `${brand.name} enclomiphene ${priceAnchor}.${annualLine} Compare labs, commitment, onboarding, and head-to-head matches before you enroll.`,
  );
}

export function compareSeoDescription(left: Brand, right: Brand): string {
  const annual = (b: Brand) => (b.facts ? publishedAnnualCost(b.facts) : null);
  const aL = annual(left);
  const aR = annual(right);
  const costHint =
    aL != null && aR != null
      ? ` 12-mo estimates: ${left.name} ~$${aL.toLocaleString("en-US")}, ${right.name} ~$${aR.toLocaleString("en-US")}.`
      : "";
  return metaDescription(
    `${left.name} (${left.priceLabel}) vs ${right.name} (${right.priceLabel}).${costHint} Side-by-side labs, commitment, onboarding, and our free cost calculator.`,
  );
}
