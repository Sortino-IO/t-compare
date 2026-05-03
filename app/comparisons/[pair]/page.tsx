import { permanentRedirect } from "next/navigation";
import { getAllBrands } from "../../lib/brands";

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
 * Pairwise URLs are canonical under `/compare/:pair`. This route exists only so older
 * `/comparisons/:pair` links consolidate without duplicate on-page content.
 */
export function generateStaticParams(): Params[] {
  const slugs = getAllBrands()
    .map((b) => b.slug)
    .sort();
  const out: Params[] = [];
  for (let i = 0; i < slugs.length; i++) {
    for (let j = i + 1; j < slugs.length; j++) {
      out.push({ pair: `${slugs[i]}-vs-${slugs[j]}` });
    }
  }
  return out;
}

export default async function ComparisonsPairRedirect({ params }: PageProps) {
  const p = await Promise.resolve(params);
  const parsed = parsePair(p.pair);
  if (!parsed) permanentRedirect("/comparisons");
  const slug = canonicalPairSlug(parsed.left, parsed.right);
  permanentRedirect(`/compare/${slug}`);
}
