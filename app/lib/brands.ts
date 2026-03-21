import brandsData from "../data/brands.json";

export interface Brand {
  name: string;
  slug: string;
  price_monthly: number;
  price_retail: number;
  protocol: string;
  labs_required: string;
  delivery: string;
  affiliate_link: string;
  notes: string;
}

export function getAllBrands(): Brand[] {
  return [...brandsData].sort((a, b) => a.price_monthly - b.price_monthly);
}

export function getBrandBySlug(slug: string): Brand | undefined {
  return brandsData.find((b) => b.slug === slug);
}
