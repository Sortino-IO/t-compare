import { getBrandBySlug, getBrandsByCategory } from "../../lib/brands";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "../../lib/og-card";

export const alt = "Testosterone supplement review";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return getBrandsByCategory("supplement").map((b) => ({ brand: b.slug }));
}

export default async function Image({ params }: { params: Promise<{ brand: string }> }) {
  const { brand: slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) return renderOgCard({ eyebrow: "Supplement guide", title: "Testosterone Supplements Compared" });
  return renderOgCard({
    eyebrow: "Supplement review",
    title: `${brand.name} Review`,
    subtitle: "Price, bundles, guarantee and formula",
    chips: [brand.priceLabel],
  });
}
