import { permanentRedirect } from "next/navigation";
import { getBrandBySlug, getBrandPairs, getComparePairPath } from "../../lib/brands";

type Params = { pair: string };
type PageProps = { params: Params | Promise<Params> };

function parsePair(pair: unknown): { left: string; right: string } | null {
  if (typeof pair !== "string") return null;
  const m = pair.match(/^([a-z0-9-]+)-vs-([a-z0-9-]+)$/i);
  if (!m) return null;
  const left = m[1]!.toLowerCase();
  const right = m[2]!.toLowerCase();
  if (!left || !right || left === right) return null;
  return { left, right };
}

function canonicalPairSlug(left: string, right: string) {
  const [a, b] = left.localeCompare(right) <= 0 ? [left, right] : [right, left];
  return `${a}-vs-${b}`;
}

/**
 * Legacy `/comparisons/:pair` → canonical compare route for the brand category.
 */
export function generateStaticParams(): Params[] {
  const out: Params[] = [];
  for (const category of ["enclomiphene", "supplement"] as const) {
    for (const { a, b } of getBrandPairs(category)) {
      const slugs = [a.slug, b.slug].sort();
      out.push({ pair: `${slugs[0]}-vs-${slugs[1]}` });
    }
  }
  return out;
}

export default async function ComparisonsPairRedirect({ params }: PageProps) {
  const p = await Promise.resolve(params);
  const parsed = parsePair(p.pair);
  if (!parsed) permanentRedirect("/comparisons");

  const slug = canonicalPairSlug(parsed.left, parsed.right);
  const leftBrand = getBrandBySlug(parsed.left);
  const rightBrand = getBrandBySlug(parsed.right);

  if (
    leftBrand?.category === "supplement" &&
    rightBrand?.category === "supplement"
  ) {
    permanentRedirect(getComparePairPath("supplement", parsed.left, parsed.right));
  }

  permanentRedirect(`/compare/${slug}`);
}
