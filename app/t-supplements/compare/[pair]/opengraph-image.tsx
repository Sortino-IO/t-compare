import { getBrandPairs } from "../../../lib/brands";
import { OG_CONTENT_TYPE, OG_SIZE, renderPairCard } from "../../../lib/og-card";

export const alt = "Testosterone supplement comparison";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return getBrandPairs("supplement").map(({ a, b }) => {
    const slugs = [a.slug, b.slug].sort();
    return { pair: `${slugs[0]}-vs-${slugs[1]}` };
  });
}

export default async function Image({ params }: { params: Promise<{ pair: string }> }) {
  const { pair } = await params;
  return renderPairCard(pair, "supplement");
}
