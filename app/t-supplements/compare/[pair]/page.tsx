import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import BrandSourceLinks from "../../../components/BrandSourceLinks";
import ComparisonTable, { type ComparisonRow } from "../../../components/ComparisonTable";
import {
  getBrandBySlug,
  getBrandDetailPath,
  getBrandPairs,
  getComparisonsIndexPath,
  getComparePairPath,
  type Brand,
} from "../../../lib/brands";
import { getPairComparisonExtras } from "../../../lib/pair-comparison-extras";
import { withTtimeAffiliateParams } from "../../../lib/affiliate-links";
import { SITE_URL } from "../../../lib/site";

const COMPARISONS_INDEX = getComparisonsIndexPath("supplement");

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
  return getBrandPairs("supplement").map(({ a, b }) => {
    const slugs = [a.slug, b.slug].sort();
    return { pair: `${slugs[0]}-vs-${slugs[1]}` };
  });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const p = await Promise.resolve(params);
  const parsed = parsePair(p.pair);
  if (!parsed) {
    return {
      title: "T-Supplement Comparison",
      description:
        "Compare testosterone boosters side by side on entry price, bulk bundles, guarantees, and ingredients before checkout.",
    };
  }

  const canonical = canonicalPair(parsed.left, parsed.right);
  const leftBrand = getBrandBySlug(canonical.left);
  const rightBrand = getBrandBySlug(canonical.right);
  const title =
    leftBrand && rightBrand
      ? `${leftBrand.name} vs ${rightBrand.name}`
      : `${canonical.left} vs ${canonical.right}`;
  const description =
    leftBrand && rightBrand
      ? `Compare ${leftBrand.name} vs ${rightBrand.name} on entry price, bulk bundles, guarantees, and ingredients. See which testosterone booster fits your budget before checkout.`
      : `Compare ${canonical.left} vs ${canonical.right} on testosterone supplement pricing, bulk savings, and guarantee terms.`;
  const pageTitle = `${title}: Which T-Booster Is Better?`;
  const canonicalUrl = `${SITE_URL}${getComparePairPath("supplement", canonical.left, canonical.right)}`;

  return {
    title: pageTitle,
    description,
    openGraph: {
      title: `${pageTitle} | T-Compare`,
      description,
      url: canonicalUrl,
      images: [
        {
          url: "/t-supplements/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${title} comparison`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${pageTitle} | T-Compare`,
      description,
      images: ["/t-supplements/opengraph-image"],
    },
  };
}

function byName(a: Brand, b: Brand) {
  return a.name.localeCompare(b.name);
}

export default async function TSupplementComparePairPage({ params }: PageProps) {
  const p = await Promise.resolve(params);
  const parsed = parsePair(p.pair);
  if (!parsed) redirect(COMPARISONS_INDEX);

  const canonical = canonicalPair(parsed.left, parsed.right);
  const canonicalPairSlug = `${canonical.left}-vs-${canonical.right}`;
  const canonicalPath = getComparePairPath("supplement", canonical.left, canonical.right);
  if (canonicalPairSlug !== p.pair) redirect(canonicalPath);

  const leftBrand = getBrandBySlug(canonical.left);
  const rightBrand = getBrandBySlug(canonical.right);
  if (!leftBrand || !rightBrand) redirect(COMPARISONS_INDEX);
  if (leftBrand.category !== "supplement" || rightBrand.category !== "supplement") {
    redirect(COMPARISONS_INDEX);
  }

  const [a, b] = [leftBrand, rightBrand].sort(byName);

  const pairExtras = getPairComparisonExtras(canonicalPairSlug);

  const rows: ComparisonRow[] = [
    {
      label: "Starting price (snapshot)",
      left: (
        <>
          <strong>{a.priceLabel}</strong>. Verify the live price at checkout because promos, bundle size,
          and shipping can change.
        </>
      ),
      right: (
        <>
          <strong>{b.priceLabel}</strong>. Verify the live price at checkout because promos, bundle size,
          and shipping can change.
        </>
      ),
    },
    {
      label: "Money-back guarantee",
      left: a.why.onboarding,
      right: b.why.onboarding,
    },
    {
      label: "Bulk pricing snapshot",
      left: a.why.pricing,
      right: b.why.pricing,
    },
    {
      label: "Formula focus",
      left: a.why.positioning,
      right: b.why.positioning,
    },
    ...(pairExtras?.rows ?? []),
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
              Side-by-side snapshot of supplement pricing anchors, guarantee terms, and formula positioning from
              public checkout pages. Always verify the live cart before you pay.
            </p>
          </div>
          <Link href={COMPARISONS_INDEX} className="text-sm font-medium text-[#2a6e47] hover:underline">
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
          leftHref={getBrandDetailPath(a)}
          rightName={b.name}
          rightHref={getBrandDetailPath(b)}
          rows={rows}
        />

        <div className="mt-8 rounded-2xl border border-[#e3dfd6] bg-white p-6">
          <h2 className="text-lg font-semibold text-[#1c1917]">Objective summary</h2>
          <div className="mt-3 grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="rounded-xl border border-[#ede9e0] bg-[#fbfaf7] p-4">
              <div className="text-sm font-semibold text-[#1c1917]">Compare the same bundle size</div>
              <p className="mt-2 text-sm text-[#57534e] leading-relaxed">
                A $49/bottle headline often requires buying six bottles upfront. Normalize both products to the same
                commitment (single bottle, 3-pack, or 6-pack) before picking a winner.
              </p>
            </div>
            <div className="rounded-xl border border-[#ede9e0] bg-[#fbfaf7] p-4">
              <div className="text-sm font-semibold text-[#1c1917]">Model your “all-in” cost</div>
              <ul className="mt-2 list-disc pl-5 text-sm text-[#57534e] space-y-1.5">
                <li>Entry price vs bulk per-bottle math</li>
                <li>Shipping thresholds and free-shipping minimums</li>
                <li>Money-back guarantee length and return terms</li>
              </ul>
            </div>
            <div className="rounded-xl border border-[#ede9e0] bg-[#fbfaf7] p-4">
              <div className="text-sm font-semibold text-[#1c1917]">Use sources for the final check</div>
              <p className="mt-2 text-sm text-[#57534e] leading-relaxed">
                Checkout funnels change often. Use the links below to confirm the exact bundle pricing, guarantee
                window, and ingredient list you would purchase today.
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
                <BrandSourceLinks brand={brand} />
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-[#78716c] leading-relaxed">
            Not medical advice. Supplements are not FDA-approved to treat low testosterone. Pricing, availability,
            and guarantee terms can change over time.
          </p>

          {pairExtras?.extraSources?.length ? (
            <div className="mt-8 border-t border-[#ede9e0] pt-6">
              <h3 className="text-sm font-semibold text-[#1c1917]">Additional references (pair-specific)</h3>
              <ul className="mt-3 space-y-2 text-sm text-[#57534e]">
                {pairExtras.extraSources.map((s) => (
                  <li key={s.href}>
                    <a
                      className="text-[#2a6e47] hover:underline font-medium"
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <section className="mt-8 rounded-2xl border border-[#e3dfd6] bg-white p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-[#1c1917]">FAQ</h2>
          <p className="mt-2 text-sm text-[#57534e] max-w-3xl leading-relaxed">
            Quick answers for comparing {a.name} and {b.name}. Educational only; confirm pricing and supplement facts
            on official sites before checkout.
          </p>
          <dl className="mt-6 space-y-6">
            <div>
              <dt className="text-sm font-semibold text-[#1c1917]">
                Does this page pick a “winner” between {a.name} and {b.name}?
              </dt>
              <dd className="mt-2 text-sm text-[#57534e] leading-relaxed">
                No. It summarizes publicly framed pricing, bulk tiers, and guarantee language so you can compare
                honestly. Results vary by individual health, adherence, and expectations—not brand logos.
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-[#1c1917]">
                What is the biggest mistake when comparing supplement prices?
              </dt>
              <dd className="mt-2 text-sm text-[#57534e] leading-relaxed">
                Stopping at the single-bottle headline. Many funnels require multi-bottle bundles to unlock the
                advertised per-bottle rate. Normalize both brands to the same package size and include shipping
                before you decide.
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-[#1c1917]">
                Where should I verify the numbers?
              </dt>
              <dd className="mt-2 text-sm text-[#57534e] leading-relaxed">
                On each brand’s official checkout page the day you buy. Promotions, bundle requirements, and guarantee
                terms change frequently; stale comparison tables are unreliable.
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-[#1c1917]">
                Common misconception: do testosterone boosters treat clinically low testosterone?
              </dt>
              <dd className="mt-2 text-sm text-[#57534e] leading-relaxed">
                OTC supplements are not FDA-approved to diagnose or treat hypogonadism. If you have symptoms or
                abnormal labs, talk to a clinician before relying on booster funnels instead of medical evaluation.
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-[#1c1917]">
                What should I check before paying?
              </dt>
              <dd className="mt-2 text-sm text-[#57534e] leading-relaxed">
                Confirm the money-back guarantee window, whether you must return unused bottles, shipping costs on
                your bundle size, and the full ingredient list for allergens or medication interactions.
              </dd>
            </div>
          </dl>
        </section>
      </div>
    </div>
  );
}
