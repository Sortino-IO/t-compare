import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import AffiliateDisclosure from "../../../components/AffiliateDisclosure";
import BrandSourceLinks from "../../../components/BrandSourceLinks";
import ComparePicksCta from "../../../components/ComparePicksCta";
import ComparisonTable, { type ComparisonRow } from "../../../components/ComparisonTable";
import ExternalTextLink from "../../../components/ui/ExternalTextLink";
import ExternalCta from "../../../components/ui/ExternalCta";
import { brandMonogram, merchantCtaLabel } from "../../../lib/brand-display";
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
import { canonicalAlternates, metaDescription } from "../../../lib/seo";
import { supplementCompareSeoTitle } from "../../../lib/seo-provider";
import { OG_BASE, SITE_URL } from "../../../lib/site";

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
      ? metaDescription(
          `✓ ${leftBrand.name} ${leftBrand.priceLabel.replace(/^From\s+/i, "from ")} vs ${rightBrand.name} ${rightBrand.priceLabel.replace(/^From\s+/i, "from ")} ✓ Bulk deals, guarantees, and ingredients side by side. See which is better value.`,
        )
      : `Compare ${canonical.left} vs ${canonical.right} on testosterone supplement pricing, bulk savings, and guarantee terms.`;
  const pageTitle =
    leftBrand && rightBrand
      ? supplementCompareSeoTitle(leftBrand, rightBrand)
      : `${title}: Which T-Booster Is Better? (2026)`;
  const canonicalPath = getComparePairPath("supplement", canonical.left, canonical.right);
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;

  return {
    title: pageTitle,
    description,
    alternates: canonicalAlternates(canonicalPath),
    openGraph: {
      ...OG_BASE,
      title: `${pageTitle} | T-Compare`,
      description,
      url: canonicalUrl,
    },
    twitter: {
      card: "summary_large_image",
      title: `${pageTitle} | T-Compare`,
      description,
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

  const canonicalUrl = `${SITE_URL}${canonicalPath}`;

  const faqs = [
    {
      question: `Does this page pick a "winner" between ${a.name} and ${b.name}?`,
      answer:
        "No. It summarizes publicly framed pricing, bulk tiers, and guarantee language so you can compare honestly. Results vary by individual health, adherence, and expectations—not brand logos.",
    },
    {
      question: "What is the biggest mistake when comparing supplement prices?",
      answer:
        "Stopping at the single-bottle headline. Many funnels require multi-bottle bundles to unlock the advertised per-bottle rate. Normalize both brands to the same package size and include shipping before you decide.",
    },
    {
      question: "Where should I verify the numbers?",
      answer:
        "On each brand's official checkout page the day you buy. Promotions, bundle requirements, and guarantee terms change frequently; stale comparison tables are unreliable.",
    },
    {
      question:
        "Common misconception: do testosterone boosters treat clinically low testosterone?",
      answer:
        "OTC supplements are not FDA-approved to diagnose or treat hypogonadism. If you have symptoms or abnormal labs, talk to a clinician before relying on booster funnels instead of medical evaluation.",
    },
    {
      question: "What should I check before paying?",
      answer:
        "Confirm the money-back guarantee window, whether you must return unused bottles, shipping costs on your bundle size, and the full ingredient list for allergens or medication interactions.",
    },
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Testosterone Supplement Comparisons", item: `${SITE_URL}${COMPARISONS_INDEX}` },
      { "@type": "ListItem", position: 3, name: `${a.name} vs ${b.name}`, item: canonicalUrl },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${a.name} vs ${b.name}`,
    itemListElement: [a, b].map((brand, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: brand.name,
      url: `${SITE_URL}${getBrandDetailPath(brand)}`,
    })),
  };

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
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex flex-wrap items-center gap-2 text-[13px] text-[#5f757f]"
        >
          <Link href="/" className="hover:text-[#176b87] hover:underline">
            Home
          </Link>
          <span aria-hidden>/</span>
          <Link href={COMPARISONS_INDEX} className="hover:text-[#176b87] hover:underline">
            Testosterone Supplement Comparisons
          </Link>
          <span aria-hidden>/</span>
          <span className="text-[#3c535e]">
            {a.name} vs {b.name}
          </span>
        </nav>

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#176b87]">
              Head-to-head comparison
            </p>
            <h1 className="tc-display text-[1.75rem] font-bold leading-tight sm:text-4xl">
              {a.name} vs {b.name}
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#53666e]">
              Side-by-side snapshot of supplement pricing anchors, guarantee terms, and formula positioning from
              public checkout pages. Always verify the live cart before you pay.
            </p>
          </div>
          <Link
            href={COMPARISONS_INDEX}
            className="text-sm font-semibold text-[#176b87] hover:text-[#10556d] hover:underline"
          >
            ← All comparisons
          </Link>
        </div>

        <AffiliateDisclosure className="mt-4" />

        <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-2">
          {[a, b].map((brand) => (
            <div key={brand.slug} className="tc-card flex flex-col p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#e3e3e3] bg-white text-xs font-bold text-[#176b87]"
                >
                  {brandMonogram(brand.name)}
                </span>
                <div className="min-w-0">
                  <div className="tc-display text-lg font-bold">{brand.name}</div>
                  <div className="mt-0.5 text-sm leading-relaxed text-[#53666e]">
                    {brand.shortLabel} · {brand.priceLabel}
                  </div>
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
                <ExternalCta
                  href={withTtimeAffiliateParams(brand.affiliateUrl)}
                  brand={brand.name}
                  position="comparison"
                  label={merchantCtaLabel(brand)}
                  size="sm"
                />
                <Link
                  href={getBrandDetailPath(brand)}
                  className="tc-btn tc-btn-secondary tc-btn-sm"
                >
                  Read our {brand.name} review
                  <span aria-hidden>→</span>
                </Link>
              </div>
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

        <ComparePicksCta
          brands={[a, b]}
          note="Both anchors above are public snapshots. Bundle size, shipping, and promos change the total — confirm the live cart and guarantee window before you order."
        />

        <div className="tc-card mt-8 p-5 sm:p-6">
          <h2 className="tc-display text-lg font-bold sm:text-xl">Objective summary</h2>
          <div className="mt-3 grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="rounded-xl border border-[#ededed] bg-white p-4">
              <div className="text-sm font-semibold text-[#142b3a]">Compare the same bundle size</div>
              <p className="mt-2 text-sm text-[#53666e] leading-relaxed">
                A $49/bottle headline often requires buying six bottles upfront. Normalize both products to the same
                commitment (single bottle, 3-pack, or 6-pack) before picking a winner.
              </p>
            </div>
            <div className="rounded-xl border border-[#ededed] bg-white p-4">
              <div className="text-sm font-semibold text-[#142b3a]">Model your “all-in” cost</div>
              <ul className="mt-2 list-disc pl-5 text-sm text-[#53666e] space-y-1.5">
                <li>Entry price vs bulk per-bottle math</li>
                <li>Shipping thresholds and free-shipping minimums</li>
                <li>Money-back guarantee length and return terms</li>
              </ul>
            </div>
            <div className="rounded-xl border border-[#ededed] bg-white p-4">
              <div className="text-sm font-semibold text-[#142b3a]">Use sources for the final check</div>
              <p className="mt-2 text-sm text-[#53666e] leading-relaxed">
                Checkout funnels change often. Use the links below to confirm the exact bundle pricing, guarantee
                window, and ingredient list you would purchase today.
              </p>
            </div>
          </div>
        </div>

        <div className="tc-card mt-8 p-5 sm:p-6">
          <h2 className="tc-display text-lg font-bold sm:text-xl">Sources</h2>
          <div className="mt-3 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[a, b].map((brand) => (
              <div key={brand.slug}>
                <div className="text-sm font-semibold text-[#142b3a]">{brand.name}</div>
                <BrandSourceLinks brand={brand} />
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-[#53666e] leading-relaxed">
            Not medical advice. Supplements are not FDA-approved to treat low testosterone. Pricing, availability,
            and guarantee terms can change over time.
          </p>

          {pairExtras?.extraSources?.length ? (
            <div className="mt-8 border-t border-[#ededed] pt-6">
              <h3 className="text-sm font-semibold text-[#142b3a]">Additional references (pair-specific)</h3>
              <ul className="mt-3 space-y-2 text-sm text-[#53666e]">
                {pairExtras.extraSources.map((s) => (
                  <li key={s.href}>
                    <ExternalTextLink
                      className="text-[#176b87] hover:underline font-medium"
                      href={s.href}
                    >
                      {s.label}
                    </ExternalTextLink>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <section className="tc-card mt-8 p-5 sm:p-6">
          <h2 className="tc-display text-lg font-bold sm:text-xl">FAQ</h2>
          <p className="mt-2 text-sm text-[#53666e] max-w-3xl leading-relaxed">
            Quick answers for comparing {a.name} and {b.name}. Educational only; confirm pricing and supplement facts
            on official sites before checkout.
          </p>
          <dl className="mt-6 space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <dt className="text-sm font-semibold text-[#142b3a]">{faq.question}</dt>
                <dd className="mt-2 text-sm text-[#53666e] leading-relaxed">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </div>
  );
}
