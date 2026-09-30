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

/**
 * Decision facts verified against a provider's own public pages. Anything the
 * provider does not publish stays "unknown" rather than being estimated —
 * these values drive the comparison table and the cost calculator.
 */
export type LabsIncluded = "included" | "extra" | "partial" | "unknown";
export type Prescriber = "physician" | "clinician" | "unknown";

export interface ProviderFacts {
  checkedOn: string;
  billing: {
    /** Advertised medication/program price per month; omitted when the provider does not publish one. */
    headlineMonthly?: number;
    /** Separate mandatory membership billed on top (e.g. Hone). */
    membershipMonthly?: number;
    /** How many months each charge covers. */
    cadenceMonths: number;
    /** Months you are locked into for the headline price; 0 = cancel anytime. */
    commitmentMonths: number;
    /** What is charged on day one, when the provider publishes it. */
    upfrontCharge?: number;
    short: string;
    source: string;
  };
  labs: {
    required: "yes" | "no" | "unknown";
    included: LabsIncluded;
    /** Cheapest published initial lab option, in USD. */
    initialCost?: number;
    /** True when repeat monitoring labs are covered by the plan. */
    followupIncluded?: boolean;
    short: string;
    source: string;
  };
  prescriber: { value: Prescriber; short: string; source: string };
  states: { count?: number; short: string; source: string };
  cancellation: { short: string; source: string };
  limitation: { text: string; source: string };
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
  facts?: ProviderFacts;
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
  // Providers that do not publish a price sort after every priced one.
  const sortPrice = (b: Brand) =>
    b.facts && b.facts.billing.headlineMonthly === undefined
      ? Number.POSITIVE_INFINITY
      : b.priceFromMonthly;
  return [...(brandsData as Brand[])].sort((a, b) => sortPrice(a) - sortPrice(b));
}

export function getBrandsByCategory(category: BrandCategory): Brand[] {
  return getAllBrands().filter((b) => b.category === category);
}

export function getBrandBySlug(slug: string): Brand | undefined {
  return (brandsData as Brand[]).find((b) => b.slug === slug);
}

export function getBrandDetailPath(brand: Brand): string {
  if (brand.category === "supplement") {
    return `/t-supplements/${brand.slug}`;
  }
  return `/testosterone/enclomiphene/${brand.slug}`;
}

export function getCategoryIndexPath(category: BrandCategory): string {
  if (category === "supplement") return "/t-supplements";
  return "/testosterone/enclomiphene";
}

export function getComparisonsIndexPath(category: BrandCategory): string {
  if (category === "supplement") return "/t-supplements/comparisons";
  return "/comparisons";
}

export function getComparePairPath(
  category: BrandCategory,
  leftSlug: string,
  rightSlug: string,
): string {
  const slugs = [leftSlug, rightSlug].sort();
  const pair = `${slugs[0]}-vs-${slugs[1]}`;
  if (category === "supplement") return `/t-supplements/compare/${pair}`;
  return `/compare/${pair}`;
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
