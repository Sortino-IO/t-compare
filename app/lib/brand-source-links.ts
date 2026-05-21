import { withTtimeAffiliateParams } from "./affiliate-links";
import type { Brand } from "./brands";

export type BrandSourceLink = {
  href: string;
  label: string;
};

function secondarySourceLabel(brand: Brand, rawUrl: string): string {
  try {
    const path = new URL(rawUrl).pathname.replace(/\/$/, "").toLowerCase();
    if (path.includes("1-month") || path.includes("1month")) {
      return `Visit ${brand.name} (1-month page)`;
    }
    if (path.includes("enclomiphene")) {
      return `Visit ${brand.name} (enclomiphene page)`;
    }
    if (path.includes("testosterone")) {
      return `Visit ${brand.name} (testosterone page)`;
    }
  } catch {
    /* ignore malformed URLs */
  }
  return `Visit ${brand.name} (additional page)`;
}

function sourceLabel(brand: Brand, index: number, total: number, rawUrl: string): string {
  if (total === 1) return `Visit ${brand.name}`;
  if (index === 0) return `Visit ${brand.name}`;
  return secondarySourceLabel(brand, rawUrl);
}

/** Deduplicated outbound links for a brand’s Sources section (affiliate-aware). */
export function getBrandSourceLinks(brand: Brand): BrandSourceLink[] {
  const candidates: string[] = [];
  if (brand.affiliateUrl) candidates.push(brand.affiliateUrl);
  for (const url of brand.sourceUrls) {
    if (!candidates.includes(url)) candidates.push(url);
  }

  const seen = new Set<string>();
  const items: { raw: string; href: string }[] = [];

  for (const raw of candidates) {
    const href = withTtimeAffiliateParams(raw);
    if (seen.has(href)) continue;
    seen.add(href);
    items.push({ raw, href });
  }

  return items.map((item, index) => ({
    href: item.href,
    label: sourceLabel(brand, index, items.length, item.raw),
  }));
}
