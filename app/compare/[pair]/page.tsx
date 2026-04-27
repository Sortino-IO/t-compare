import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import ComparisonTable, { type ComparisonRow } from "../../components/ComparisonTable";
import { getAllBrands, getBrandBySlug, type Brand } from "../../lib/brands";
import { withTtimeAffiliateParams } from "../../lib/affiliate-links";

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

function canonicalPair(left: string, right: string) {
  return left.localeCompare(right) <= 0
    ? { left, right }
    : { left: right, right: left };
}

export function generateStaticParams(): Params[] {
  const slugs = getAllBrands().map((b) => b.slug).sort();
  const out: Params[] = [];
  for (let i = 0; i < slugs.length; i++) {
    for (let j = i + 1; j < slugs.length; j++) {
      out.push({ pair: `${slugs[i]}-vs-${slugs[j]}` });
    }
  }
  return out;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const p = await Promise.resolve(params);
  const parsed = parsePair(p.pair);
  if (!parsed) return { title: "Comparison", description: "Provider comparison." };

  const canonical = canonicalPair(parsed.left, parsed.right);
  const leftBrand = getBrandBySlug(canonical.left);
  const rightBrand = getBrandBySlug(canonical.right);
  const title =
    leftBrand && rightBrand
      ? `${leftBrand.name} vs ${rightBrand.name}`
      : `${canonical.left} vs ${canonical.right}`;

  return {
    title,
    description:
      "Side-by-side comparison based on publicly available information. Verify pricing, inclusions, and eligibility directly with each provider.",
  };
}

function byName(a: Brand, b: Brand) {
  return a.name.localeCompare(b.name);
}

function sourceList(brand: Brand) {
  const urls = [...brand.sourceUrls];
  const affiliate = brand.affiliateUrl;
  if (affiliate && !urls.includes(affiliate)) urls.unshift(affiliate);
  return urls;
}

export default async function ComparePairPage({ params }: PageProps) {
  const p = await Promise.resolve(params);
  const parsed = parsePair(p.pair);
  if (!parsed) redirect("/comparisons");

  const canonical = canonicalPair(parsed.left, parsed.right);
  const canonicalPairSlug = `${canonical.left}-vs-${canonical.right}`;
  if (canonicalPairSlug !== p.pair) redirect(`/compare/${canonicalPairSlug}`);

  const leftBrand = getBrandBySlug(canonical.left);
  const rightBrand = getBrandBySlug(canonical.right);
  if (!leftBrand || !rightBrand) redirect("/comparisons");

  const [a, b] = [leftBrand, rightBrand].sort(byName);

  const rows: ComparisonRow[] = [
    {
      label: "Starting price (snapshot)",
      left: (
        <>
          <strong>{a.priceLabel}</strong>. Verify the live price at checkout because promos, plan length,
          and lab/testing requirements can change.
        </>
      ),
      right: (
        <>
          <strong>{b.priceLabel}</strong>. Verify the live price at checkout because promos, plan length,
          and lab/testing requirements can change.
        </>
      ),
    },
    {
      label: "Onboarding",
      left: a.onboardingType === "faster-start" ? "Faster-start flow" : "Standard onboarding flow",
      right: b.onboardingType === "faster-start" ? "Faster-start flow" : "Standard onboarding flow",
    },
    { label: "Program overview", left: a.overview, right: b.overview },
    {
      label: "Important notes",
      left: (
        <ul className="list-disc pl-5 space-y-1">
          {a.notes.slice(0, 4).map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      ),
      right: (
        <ul className="list-disc pl-5 space-y-1">
          {b.notes.slice(0, 4).map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <div className="bg-[#f5f3ee]">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#1c1917] font-[family-name:var(--font-playfair)]">
              {a.name} vs {b.name}
            </h1>
            <p className="mt-3 text-sm sm:text-base text-[#57534e] max-w-2xl leading-relaxed">
              Side-by-side snapshot of pricing framing, onboarding, and what each provider emphasizes publicly.
              Always verify eligibility and total cost at checkout.
            </p>
          </div>
          <Link href="/comparisons" className="text-sm font-medium text-[#2a6e47] hover:underline">
            ← All comparisons
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {[a, b].map((brand) => (
            <div key={brand.slug} className="rounded-2xl border border-[#e3dfd6] bg-white p-5">
              <div className="font-semibold text-[#1c1917]">{brand.name}</div>
              <div className="mt-1 text-sm text-[#57534e] leading-relaxed">
                {brand.shortLabel} · {brand.priceLabel}
              </div>
              <a
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#2a6e47] hover:underline"
                href={withTtimeAffiliateParams(brand.affiliateUrl)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit {brand.name} →
              </a>
            </div>
          ))}
        </div>

        <ComparisonTable
          leftName={a.name}
          leftHref={`/testosterone/enclomiphene/${a.slug}`}
          rightName={b.name}
          rightHref={`/testosterone/enclomiphene/${b.slug}`}
          rows={rows}
        />

        <div className="mt-8 rounded-2xl border border-[#e3dfd6] bg-white p-6">
          <h2 className="text-lg font-semibold text-[#1c1917]">Objective summary</h2>
          <div className="mt-3 grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="rounded-xl border border-[#ede9e0] bg-[#fbfaf7] p-4">
              <div className="text-sm font-semibold text-[#1c1917]">Compare the same time horizon</div>
              <p className="mt-2 text-sm text-[#57534e] leading-relaxed">
                If one provider’s headline price assumes a longer commitment, compare both on 90 days or 12 months
                with the same assumptions (promos, shipping, and required testing).
              </p>
            </div>
            <div className="rounded-xl border border-[#ede9e0] bg-[#fbfaf7] p-4">
              <div className="text-sm font-semibold text-[#1c1917]">Model your “all-in” cost</div>
              <ul className="mt-2 list-disc pl-5 text-sm text-[#57534e] space-y-1.5">
                <li>Initial labs / test kit and follow-up cadence</li>
                <li>Shipping and refill schedule</li>
                <li>What’s included (visits, messaging, adjustments)</li>
              </ul>
            </div>
            <div className="rounded-xl border border-[#ede9e0] bg-[#fbfaf7] p-4">
              <div className="text-sm font-semibold text-[#1c1917]">Use sources for the final check</div>
              <p className="mt-2 text-sm text-[#57534e] leading-relaxed">
                Provider pages change often. Use the links below to confirm the exact plan terms and pricing you’d
                actually purchase today.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-[#e3dfd6] bg-white p-6">
          <h2 className="text-lg font-semibold text-[#1c1917]">Sources</h2>
          <div className="mt-3 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[a, b].map((brand) => (
              <div key={brand.slug}>
                <div className="text-sm font-semibold text-[#1c1917]">{brand.name}</div>
                <ul className="mt-2 space-y-1.5 text-sm text-[#57534e]">
                  {sourceList(brand).map((url) => (
                    <li key={url}>
                      <a
                        className="text-[#2a6e47] hover:underline break-all"
                        href={withTtimeAffiliateParams(url)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {url}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-[#78716c] leading-relaxed">
            Not medical advice. Pricing, availability, and inclusions vary by state and can change over time.
          </p>
        </div>
      </div>
    </div>
  );
}

