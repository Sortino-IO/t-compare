import brandsData from "../data/brands.json";

export type BrandCategory = "enclomiphene" | "supplement";

export interface BrandWhy {
  onboarding: string;
  pricing: string;
  positioning: string;
}

export interface BrandFaqItem {
  question: string;
  answer: string;
}

export interface Brand {
  slug: string;
  name: string;
  category: BrandCategory;
  priceFromMonthly: number;
  priceLabel: string;
  onboardingType: "faster-start" | "standard";
  shortLabel: string;
  shortDescription: string;
  overview: string;
  notes: string[];
  affiliateUrl: string;
  sourceUrls: string[];
  lastReviewed: string;
  seoTitle: string;
  seoDescription: string;
  why: BrandWhy;
  /** Short paragraphs shown under the primary CTA; written for clarity and brand-name discovery in search. */
  ctaBelowParagraphs: string[];
  faqItems: BrandFaqItem[];
}

export const BRAND_CATEGORY_CONFIG: Record<
  BrandCategory,
  {
    listTitle: string;
    entityLabel: string;
    expandPrompt: string;
    whyLabels: { onboarding: string; pricing: string; positioning: string };
    detailBadge: string;
    breadcrumbLabel: string;
  }
> = {
  enclomiphene: {
    listTitle: "All providers",
    entityLabel: "Providers listed",
    expandPrompt: "Why this provider?",
    whyLabels: {
      onboarding: "Onboarding",
      pricing: "Pricing",
      positioning: "Overview",
    },
    detailBadge: "Enclomiphene Provider",
    breadcrumbLabel: "T Providers",
  },
  supplement: {
    listTitle: "All supplements",
    entityLabel: "Supplements listed",
    expandPrompt: "Why this supplement?",
    whyLabels: {
      onboarding: "Guarantee",
      pricing: "Bulk pricing",
      positioning: "Formula focus",
    },
    detailBadge: "Testosterone Supplement",
    breadcrumbLabel: "T Supplements",
  },
};

export function getAllBrands(): Brand[] {
  return [...(brandsData as Brand[])].sort(
    (a, b) => a.priceFromMonthly - b.priceFromMonthly
  );
}

export function getBrandsByCategory(category: BrandCategory): Brand[] {
  return getAllBrands().filter((b) => b.category === category);
}

export function getBrandBySlug(slug: string): Brand | undefined {
  return (brandsData as Brand[]).find((b) => b.slug === slug);
}

export function getBrandDetailPath(brand: Brand): string {
  return `/testosterone/${brand.category}/${brand.slug}`;
}

export function getCategoryIndexPath(category: BrandCategory): string {
  return `/testosterone/${category}`;
}

export function getBrandPairs(category: BrandCategory): { a: Brand; b: Brand }[] {
  const brands = getBrandsByCategory(category);
  const out: { a: Brand; b: Brand }[] = [];
  for (let i = 0; i < brands.length; i++) {
    for (let j = i + 1; j < brands.length; j++) {
      out.push({ a: brands[i]!, b: brands[j]! });
    }
  }
  return out;
}

export function isBrandCategory(value: string): value is BrandCategory {
  return value === "enclomiphene" || value === "supplement";
}
