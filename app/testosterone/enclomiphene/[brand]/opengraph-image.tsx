import { getBrandBySlug, getBrandsByCategory } from "../../../lib/brands";
import { OG_CONTENT_TYPE, OG_SIZE, providerChips, renderOgCard } from "../../../lib/og-card";

export const alt = "Enclomiphene provider cost and review";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return getBrandsByCategory("enclomiphene").map((b) => ({ brand: b.slug }));
}

export default async function Image({ params }: { params: Promise<{ brand: string }> }) {
  const { brand: slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) return renderOgCard({ eyebrow: "Enclomiphene guide", title: "Enclomiphene Providers Compared" });
  return renderOgCard({
    eyebrow: "Enclomiphene provider review",
    title: `${brand.name} Enclomiphene: Cost & Review`,
    subtitle: "Price, labs, commitment and 12-month cost",
    chips: providerChips(brand),
  });
}
