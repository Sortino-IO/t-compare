import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import AffiliateDisclosure from "../../components/AffiliateDisclosure";
import BrandSourceLinks from "../../components/BrandSourceLinks";
import ComparisonTable, { type ComparisonRow } from "../../components/ComparisonTable";
import ComparePicksCta from "../../components/ComparePicksCta";
import QuickCostEstimator from "../../components/QuickCostEstimator";
import EvidenceNotes from "../../components/EvidenceNotes";
import { buildEstimatorRows } from "../../lib/cost-estimator";
import ExternalTextLink from "../../components/ui/ExternalTextLink";
import ExternalCta from "../../components/ui/ExternalCta";
import { brandMonogram, merchantCtaLabel } from "../../lib/brand-display";
import {
  getBrandBySlug,
  getBrandDetailPath,
  getBrandPairs,
  getBrandsByCategory,
  getComparePairPath,
  type Brand,
} from "../../lib/brands";
import { getPairComparisonExtras } from "../../lib/pair-comparison-extras";
import { buildPairVerdict } from "../../lib/pair-verdict";
import { withTtimeAffiliateParams } from "../../lib/affiliate-links";
import { canonicalAlternates } from "../../lib/seo";
import { compareSeoDescription } from "../../lib/seo-provider";
import { OG_BASE, SITE_URL } from "../../lib/site";

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
  const out: Params[] = [];
  for (const { a, b } of getBrandPairs("enclomiphene")) {
    const slugs = [a.slug, b.slug].sort();
    out.push({ pair: `${slugs[0]}-vs-${slugs[1]}` });
  }
  return out;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const p = await Promise.resolve(params);
  const parsed = parsePair(p.pair);
  if (!parsed) {
    return {
      title: "TRT Provider Comparison",
      description:
        "Compare testosterone providers side by side on pricing, labs, onboarding, and plan terms before you sign up.",
    };
  }

  const canonical = canonicalPair(parsed.left, parsed.right);
  const leftBrand = getBrandBySlug(canonical.left);
  const rightBrand = getBrandBySlug(canonical.right);
  const title =
    leftBrand && rightBrand
      ? `${leftBrand.name} vs ${rightBrand.name}`
      : `${canonical.left} vs ${canonical.right}`;
  const isSupplement =
    leftBrand?.category === "supplement" && rightBrand?.category === "supplement";
  const pageTitle = isSupplement
    ? `${title}: Which T-Booster Is Better? (2026)`
    : `${title}: Price, Labs & 12-Mo Cost (2026)`;
  const canonicalPath = `/compare/${canonical.left}-vs-${canonical.right}`;
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;
  const description =
    leftBrand && rightBrand
      ? isSupplement
        ? `Compare ${leftBrand.name} vs ${rightBrand.name} on entry price, bulk bundles, guarantees, and ingredients. See which testosterone booster fits your budget before checkout.`
        : compareSeoDescription(leftBrand, rightBrand)
      : isSupplement
        ? `Compare ${canonical.left} vs ${canonical.right} on testosterone supplement pricing, bulk savings, and guarantee terms.`
        : `Compare ${canonical.left} vs ${canonical.right} across pricing, labs, onboarding flow, and plan structure.`;

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
  if (leftBrand.category !== rightBrand.category) redirect("/comparisons");
  if (leftBrand.category === "supplement") {
    redirect(getComparePairPath("supplement", canonical.left, canonical.right));
  }

  const isSupplement = false;

  const [a, b] = [leftBrand, rightBrand].sort(byName);
  const pairEstimator = (() => {
    const rows = buildEstimatorRows(getBrandsByCategory("enclomiphene"));
    const inPair = rows
      .filter((r) => r.slug === a.slug || r.slug === b.slug)
      .sort((x, y) => x.total - y.total);
    return { rows, initialSlug: inPair[0]?.slug };
  })();

  const canonicalUrl = `${SITE_URL}/compare/${canonicalPairSlug}`;

  const verdict = buildPairVerdict(a, b);

  const faqs = [
    ...(verdict?.faqs ?? []),
    {
      question: "What is the biggest mistake when comparing monthly prices?",
      answer:
        "Ignoring plan length and lab cadence. Normalize both brands to the same time horizon (for example 90 days) and include shipping, kits, and repeat labs when advertised separately.",
    },
    {
      question: "Where should I verify the numbers?",
      answer:
        "Use each provider's official checkout or FAQ pages for your state on the day you enroll. This snapshot can drift when promotions or regulations change.",
    },
    {
      question:
        "Common misconception: if two brands list testosterone, are they the same therapy?",
      answer:
        "Not necessarily. Enclomiphene-first programs and injectable TRT carry different monitoring expectations and risks. Your clinician helps match therapy class to labs and goals.",
    },
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Comparisons", item: `${SITE_URL}/comparisons` },
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
          and {isSupplement ? "shipping" : "lab/testing requirements"} can change.
        </>
      ),
      right: (
        <>
          <strong>{b.priceLabel}</strong>. Verify the live price at checkout because promos, bundle size,
          and {isSupplement ? "shipping" : "lab/testing requirements"} can change.
        </>
      ),
    },
    {
      label: isSupplement ? "Money-back guarantee" : "Onboarding",
      left: isSupplement ? a.why.onboarding : a.onboardingType === "faster-start" ? "Faster-start flow" : "Standard onboarding flow",
      right: isSupplement ? b.why.onboarding : b.onboardingType === "faster-start" ? "Faster-start flow" : "Standard onboarding flow",
    },
    {
      label: isSupplement ? "Bulk pricing snapshot" : "Program overview",
      left: isSupplement ? a.why.pricing : a.overview,
      right: isSupplement ? b.why.pricing : b.overview,
    },
    {
      label: isSupplement ? "Formula focus" : "Important notes",
      left: isSupplement ? (
        a.why.positioning
      ) : (
        <ul className="list-disc pl-5 space-y-1">
          {a.notes.slice(0, 4).map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      ),
      right: isSupplement ? (
        b.why.positioning
      ) : (
        <ul className="list-disc pl-5 space-y-1">
          {b.notes.slice(0, 4).map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      ),
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
          <Link href="/comparisons" className="hover:text-[#176b87] hover:underline">
            Comparisons
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
              {isSupplement
                ? "Side-by-side snapshot of supplement pricing anchors, guarantee terms, and formula positioning from public checkout pages. Always verify the live cart before you pay."
                : "Side-by-side snapshot of pricing framing, onboarding, and what each provider emphasizes publicly. Always verify eligibility and total cost at checkout."}
            </p>
          </div>
          <Link
            href="/comparisons"
            className="text-sm font-semibold text-[#176b87] hover:text-[#10556d] hover:underline"
          >
            ← All comparisons
          </Link>
        </div>

        {verdict ? (
          <section className="mt-5 rounded-xl border border-[#cfe4ec] bg-[#eef6f9] p-5 sm:p-6" aria-labelledby="short-answer">
            <h2 id="short-answer" className="tc-display text-lg font-bold sm:text-xl">
              {a.name} vs {b.name}: the short answer
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-[#3c535e]">{verdict.summary}</p>
            {verdict.chooseIf.length > 0 ? (
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {verdict.chooseIf.map((c) => (
                  <div key={c.brand.slug} className="rounded-lg border border-[#e3e3e3] bg-white p-4">
                    <h3 className="text-sm font-semibold text-[#142b3a]">Choose {c.brand.name} if</h3>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-[#53666e]">
                      {c.reasons.map((r) => (
                        <li key={r}>{r}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : null}
            <h3 className="mt-4 text-sm font-semibold text-[#142b3a]">Watch out for</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-[#53666e]">
              {verdict.watchOut.map((w) => (
                <li key={w.brand.slug}>
                  <span className="font-medium text-[#3c535e]">{w.brand.name}:</span> {w.text}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

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

        {pairEstimator.initialSlug ? (
          <QuickCostEstimator
            rows={pairEstimator.rows}
            initialSlug={pairEstimator.initialSlug}
            className="mt-6"
          />
        ) : null}

        <EvidenceNotes ids={["enclomiphene-sperm", "enclomiphene-lh-fsh"]} className="mt-6" />

        <ComparePicksCta
          brands={[a, b]}
          note={`Both figures above are public snapshots. Confirm the live price, eligibility for your state, and what each plan includes before you enroll.`}
        />

        <div className="tc-card mt-8 p-5 sm:p-6">
          <h2 className="tc-display text-lg font-bold sm:text-xl">Objective summary</h2>
          <div className="mt-3 grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="rounded-xl border border-[#ededed] bg-white p-4">
              <div className="text-sm font-semibold text-[#142b3a]">Compare the same time horizon</div>
              <p className="mt-2 text-sm text-[#53666e] leading-relaxed">
                If one provider’s headline price assumes a longer commitment, compare both on 90 days or 12 months
                with the same assumptions (promos, shipping, and required testing).
              </p>
            </div>
            <div className="rounded-xl border border-[#ededed] bg-white p-4">
              <div className="text-sm font-semibold text-[#142b3a]">Model your “all-in” cost</div>
              <ul className="mt-2 list-disc pl-5 text-sm text-[#53666e] space-y-1.5">
                <li>Initial labs / test kit and follow-up cadence</li>
                <li>Shipping and refill schedule</li>
                <li>What’s included (visits, messaging, adjustments)</li>
              </ul>
            </div>
            <div className="rounded-xl border border-[#ededed] bg-white p-4">
              <div className="text-sm font-semibold text-[#142b3a]">Use sources for the final check</div>
              <p className="mt-2 text-sm text-[#53666e] leading-relaxed">
                Provider pages change often. Use the links below to confirm the exact plan terms and pricing you’d
                actually purchase today.
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
            Not medical advice. Pricing, availability, and inclusions vary by state and can change over time.
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
            Quick answers for comparing {a.name} and {b.name}. Educational only; confirm your own eligibility and
            pricing on official sites.
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

