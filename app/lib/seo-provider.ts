import { getBrandsByCategory, type Brand } from "./brands";
import { hasPublishedPrice, publishedAnnualCost } from "./provider-facts";
import { metaDescription, metaTitle } from "./seo";

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;
const fromPrice = (b: Brand) => b.priceLabel.replace(/^From\s+/i, "");
const annualOf = (b: Brand) => (b.facts ? publishedAnnualCost(b.facts) : null);
const kReviews = (n: number) => (n >= 1000 ? `${Math.floor(n / 1000)}K` : String(n));

/** Shortest variant that fits; every candidate must already be accurate on its own. */
function firstFitting(candidates: string[], max = 62): string {
  return candidates.find((c) => c.length <= max) ?? metaTitle(candidates[candidates.length - 1]!, max);
}

function isCheapest(brand: Brand): boolean {
  const priced = getBrandsByCategory(brand.category).filter(hasPublishedPrice);
  return priced.length > 1 && priced.every((b) => b.slug === brand.slug || b.priceFromMonthly > brand.priceFromMonthly);
}

/**
 * Search titles lead with the fact a searcher is weighing (price, yearly cost, public rating),
 * built from brands.json so they stay true when the data changes.
 */
export function providerSeoTitle(brand: Brand): string {
  if (brand.searchTitle) return brand.searchTitle;
  const name = `${brand.name} Enclomiphene`;
  const tp = brand.trustpilot;
  const annual = annualOf(brand);
  const count = getBrandsByCategory("enclomiphene").length;

  if (!hasPublishedPrice(brand)) {
    return tp
      ? firstFitting([`${name}: ${tp.score}★ Trustpilot, Price Not Public`, `${name}: ${tp.score}★ Trustpilot`])
      : firstFitting([`${name}: Price, Labs & Review [2026]`]);
  }
  const price = fromPrice(brand);
  if (isCheapest(brand)) {
    return firstFitting([
      `${name}: ${price}, Lowest Price of ${count} We Track [2026]`,
      `${name}: ${price}, Lowest Price We Track [2026]`,
    ]);
  }
  if (tp && tp.score >= 4.5) {
    return firstFitting([
      `${name}: ${tp.score}★ (${kReviews(tp.reviews)} Reviews), ${price} [2026]`,
      `${name}: ${tp.score}★ Trustpilot, ${price}`,
    ]);
  }
  if (tp) {
    return firstFitting([
      ...(annual ? [`${name}: ${price}, ~${usd(annual)}/yr & ${tp.score}★ Trustpilot`] : []),
      `${name}: ${price}, ${tp.score}★ Trustpilot [2026]`,
      `${name}: ${price}, ${tp.score}★ Trustpilot`,
    ]);
  }
  return firstFitting([
    ...(annual ? [`${name}: ${price}, ~${usd(annual)}/yr Real Cost [2026]`, `${name}: ${price}, ~${usd(annual)}/yr Real Cost`] : []),
    `${name}: ${price} + Labs, Review [2026]`,
  ]);
}

export function providerSeoDescription(brand: Brand): string {
  const annual = annualOf(brand);
  const tp = brand.trustpilot;
  const ticks = [
    hasPublishedPrice(brand) ? `✓ ${brand.priceLabel}` : "✓ Price not published",
    annual ? `✓ ~${usd(annual)} for 12 months with labs` : null,
    tp ? `✓ ${tp.score}★ from ${tp.reviews.toLocaleString("en-US")} Trustpilot reviews` : null,
  ].filter(Boolean);
  const tails = [
    " See the one catch to check before you enroll, and how it compares.",
    " See the one catch to check before you enroll.",
    " See the catch before you enroll.",
  ];
  const head = `${ticks.join(" ")}.`;
  return metaDescription(`${head}${tails.find((t) => (head + t).length <= 158) ?? ""}`);
}

export function compareSeoTitle(left: Brand, right: Brand): string {
  const vs = `${left.name} vs ${right.name}`;
  const aL = annualOf(left);
  const aR = annualOf(right);
  if (aL != null && aR != null) {
    const gap = Math.abs(aL - aR);
    if (gap >= 50) {
      const cheaper = aL < aR ? left : right;
      return firstFitting([
        `${vs}: ${cheaper.name} Saves ~${usd(gap)}/yr [2026]`,
        `${vs}: ${cheaper.name} Saves ~${usd(gap)}/yr`,
        `${vs}: ~${usd(gap)}/yr Price Gap [2026]`,
      ]);
    }
    return firstFitting([`${vs}: Same Price, Key Differences [2026]`, `${vs}: Same Price, Key Differences`]);
  }
  const rated = [left, right].filter((b) => b.trustpilot);
  if (rated.length === 2) {
    return firstFitting([
      `${vs}: ${left.trustpilot!.score}★ vs ${right.trustpilot!.score}★ Compared [2026]`,
      `${vs}: ${left.trustpilot!.score}★ vs ${right.trustpilot!.score}★`,
    ]);
  }
  return firstFitting([`${vs}: Price, Labs & Which to Pick [2026]`, `${vs}: Price, Labs & Which to Pick`]);
}

export function compareSeoDescription(left: Brand, right: Brand): string {
  const aL = annualOf(left);
  const aR = annualOf(right);
  const costHint =
    aL != null && aR != null ? ` ✓ 12 months with labs: ~${usd(aL)} vs ~${usd(aR)}` : "";
  const tpHint =
    left.trustpilot && right.trustpilot
      ? ` ✓ Trustpilot: ${left.trustpilot.score}★ vs ${right.trustpilot.score}★`
      : "";
  const price = (b: Brand) => (hasPublishedPrice(b) ? fromPrice(b) : "price not published");
  const head = `✓ ${left.name} ${price(left)} vs ${right.name} ${price(right)}${costHint}${tpHint}.`;
  const tails = [" See who wins on labs, commitment, and cancellation.", " See who wins on terms.", ""];
  return metaDescription(`${head}${tails.find((t) => (head + t).length <= 158) ?? ""}`);
}

export function supplementCompareSeoTitle(left: Brand, right: Brand): string {
  const vs = `${left.name} vs ${right.name}`;
  const gap = Math.round(Math.abs(left.priceFromMonthly - right.priceFromMonthly));
  if (gap >= 5) {
    const cheaper = left.priceFromMonthly < right.priceFromMonthly ? left : right;
    return firstFitting([
      `${vs}: ${cheaper.name} Starts $${gap} Cheaper [2026]`,
      `${vs}: ${cheaper.name} Starts $${gap} Cheaper`,
      `${vs}: $${gap} Price Gap, Which Is Better?`,
    ]);
  }
  return firstFitting([`${vs}: Which T-Booster Is Better? [2026]`, `${vs}: Which T-Booster Is Better?`]);
}
