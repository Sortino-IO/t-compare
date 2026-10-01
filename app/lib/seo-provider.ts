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
  const annualLine = annual ? `, about $${annual.toLocaleString("en-US")} for 12 months with labs` : "";
  return metaDescription(
    `${brand.name} enclomiphene ${priceAnchor}${annualLine}. Compare labs, commitment, and onboarding before you enroll.`,
  );
}

export function compareSeoDescription(left: Brand, right: Brand): string {
  const annual = (b: Brand) => (b.facts ? publishedAnnualCost(b.facts) : null);
  const aL = annual(left);
  const aR = annual(right);
  const costHint =
    aL != null && aR != null
      ? ` 12-month cost with labs: ~$${aL.toLocaleString("en-US")} vs ~$${aR.toLocaleString("en-US")}.`
      : "";
  const price = (b: Brand) =>
    hasPublishedPrice(b) ? b.priceLabel.replace(/^From\s+/i, "from ") : "price not published";
  const head = `${left.name} (${price(left)}) vs ${right.name} (${price(right)}).${costHint}`;
  const full = `${head} Compare labs, commitment, and onboarding side by side.`;
  return metaDescription(full.length <= 158 ? full : `${head} Compare labs and terms side by side.`);
}
