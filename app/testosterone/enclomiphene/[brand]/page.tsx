import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import BrandSourceLinks from "../../../components/BrandSourceLinks";
import CommercialHero from "../../../components/CommercialHero";
import MobileStickyCta from "../../../components/MobileStickyCta";
import ProviderNextSteps from "../../../components/ProviderNextSteps";
import QuickCostEstimator from "../../../components/QuickCostEstimator";
import EvidenceNotes from "../../../components/EvidenceNotes";
import { buildEstimatorRows } from "../../../lib/cost-estimator";
import ExternalCta from "../../../components/ui/ExternalCta";
import { formatReviewedDate, merchantCtaLabel } from "../../../lib/brand-display";
import { withTtimeAffiliateParams } from "../../../lib/affiliate-links";
import { canonicalAlternates } from "../../../lib/seo";
import { providerSeoDescription, providerSeoTitle } from "../../../lib/seo-provider";
import { hasPublishedPrice } from "../../../lib/provider-facts";
import {
  getBrandBySlug,
  getBrandPairs,
  getBrandsByCategory,
  getComparePairPath,
} from "../../../lib/brands";
import { OG_BASE, SITE_URL } from "../../../lib/site";

type Props = {
  params: Promise<{ brand: string }>;
};

export async function generateStaticParams() {
  return getBrandsByCategory("enclomiphene").map((b) => ({ brand: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brand: slug } = await params;
  const brand = getBrandBySlug(slug);

  if (!brand) return { title: "Provider not found" };

  const pagePath = `/testosterone/enclomiphene/${brand.slug}`;
  const pageUrl = `${SITE_URL}${pagePath}`;
  const seoTitle = providerSeoTitle(brand);
  const seoDescription = providerSeoDescription(brand);

  return {
    title: seoTitle,
    description: seoDescription,
    alternates: canonicalAlternates(pagePath),
    openGraph: {
      ...OG_BASE,
      title: seoTitle,
      description: seoDescription,
      url: pageUrl,
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
    },
  };
}

export default async function BrandPage({ params }: Props) {
  const { brand: slug } = await params;
  const brand = getBrandBySlug(slug);

  if (!brand) notFound();

  const pageUrl = `${SITE_URL}/testosterone/enclomiphene/${brand.slug}`;
  const affiliateHref = withTtimeAffiliateParams(brand.affiliateUrl);
  const ctaLabel = merchantCtaLabel(brand);
  const estimatorRows = buildEstimatorRows(getBrandsByCategory("enclomiphene"));

  // Head-to-head pages featuring this provider, for internal navigation.
  const comparePairs = getBrandPairs("enclomiphene")
    .filter((p) => p.a.slug === brand.slug || p.b.slug === brand.slug)
    .map((p) => {
      const other = p.a.slug === brand.slug ? p.b : p.a;
      return {
        other,
        href: getComparePairPath("enclomiphene", brand.slug, other.slug),
      };
    });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home",        item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "T Providers", item: `${SITE_URL}/testosterone/enclomiphene` },
      { "@type": "ListItem", position: 3, name: brand.name,    item: pageUrl },
    ],
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${brand.name} Enclomiphene Review`,
    description: `Independent overview of ${brand.name}'s enclomiphene pricing, onboarding, and program details.`,
    url: pageUrl,
    dateModified: brand.lastReviewed,
    breadcrumb: breadcrumbSchema,
  };

  const formattedDate = formatReviewedDate(brand.lastReviewed);

  const faqPageSchema =
    brand.faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: brand.faqItems.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      {faqPageSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
        />
      ) : null}

      <div className="mx-auto max-w-5xl px-4 pb-24 pt-8 sm:px-6 sm:pb-16 sm:pt-10">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex flex-wrap items-center gap-2 text-[13px] text-[#5f757f]"
        >
          <Link href="/" className="hover:text-[#176b87] hover:underline">
            Home
          </Link>
          <span aria-hidden>/</span>
          <Link
            href="/testosterone/enclomiphene"
            className="hover:text-[#176b87] hover:underline"
          >
            T Providers
          </Link>
          <span aria-hidden>/</span>
          <span className="text-[#3c535e]">{brand.name}</span>
        </nav>

        <CommercialHero
          brand={brand}
          affiliateHref={affiliateHref}
          intro={`This page summarizes ${brand.name}'s enclomiphene and testosterone-related program: publicly available pricing, how onboarding works, and the plan details worth checking before you enroll.`}
        />

        <ProviderNextSteps brand={brand} />

        {estimatorRows.some((r) => r.slug === brand.slug) ? (
          <QuickCostEstimator rows={estimatorRows} initialSlug={brand.slug} className="mt-6" />
        ) : null}

        <EvidenceNotes ids={["enclomiphene-sperm", "enclomiphene-not-approved"]} className="mt-6" />

        {/* Program details */}
        <section className="mt-8" aria-labelledby="program-details">
          <h2
            id="program-details"
            className="tc-display text-xl font-bold sm:text-2xl"
          >
            Pricing and program details
          </h2>

          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="tc-card p-4 sm:p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#3c535e]">
                Pricing
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#3c535e]">
                {hasPublishedPrice(brand) ? (
                  <>
                    Starting from{" "}
                    <span className="font-semibold text-[#142b3a]">
                      ${brand.priceFromMonthly}/mo
                    </span>
                    {brand.facts ? ` — ${brand.facts.billing.short}. ` : ". "}
                  </>
                ) : (
                  `${brand.facts?.billing.short}. `
                )}
                Final pricing may vary based on consultation, dosage, and location. Verify
                directly with the provider.
              </p>
            </div>

            <div className="tc-card p-4 sm:p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#3c535e]">
                Onboarding
              </p>
              <p className="mt-2 text-sm leading-relaxed text-[#3c535e]">
                {brand.onboardingType === "faster-start"
                  ? "Marketed as a faster-start flow. A clinician review and eligibility rules still apply."
                  : "Standard onboarding flow, including clinician review and eligibility checks."}{" "}
                {brand.why.onboarding}.
              </p>
            </div>
          </div>

          <div className="tc-card mt-3 p-4 sm:p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#3c535e]">
              Notes
            </p>
            <ul className="mt-2 flex flex-col gap-1.5">
              {brand.notes.map((note, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm leading-relaxed text-[#3c535e]"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#9db0ba]" aria-hidden />
                  {note}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA repeated after pricing */}
          <div className="mt-4 flex flex-col gap-3 rounded-xl border border-[#bcd9e4] bg-[#eef6f9] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <p className="text-sm leading-relaxed text-[#3c535e]">
              Pricing and state availability change often. Check the live figures
              for your state on {brand.name}&apos;s official site.
            </p>
            <ExternalCta
              href={affiliateHref}
              brand={brand.name}
              position="pricing"
              label={ctaLabel}
              className="sm:shrink-0"
            />
          </div>
        </section>

        {brand.ctaBelowParagraphs.length > 0 ? (
          <section className="mt-10" aria-labelledby={`about-${brand.slug}`}>
            <h2
              id={`about-${brand.slug}`}
              className="tc-display text-xl font-bold sm:text-2xl"
            >
              About {brand.name}
            </h2>
            <div className="mt-3 flex max-w-2xl flex-col gap-4 text-[15px] leading-relaxed text-[#53666e]">
              {brand.ctaBelowParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
        ) : null}

        {comparePairs.length > 0 ? (
          <section className="mt-10" aria-labelledby="head-to-head">
            <h2
              id="head-to-head"
              className="tc-display text-xl font-bold sm:text-2xl"
            >
              {brand.name} head-to-head comparisons
            </h2>
            <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-[#53666e]">
              See how {brand.name} lines up against other enclomiphene programs on
              price, onboarding, and plan terms.
            </p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {comparePairs.map(({ other, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="flex items-center justify-between gap-2 rounded-lg border border-[#e3e3e3] bg-white px-4 py-3 text-sm font-medium text-[#3c535e] transition-colors hover:border-[#a9cbd8] hover:text-[#176b87]"
                  >
                    <span>
                      {brand.name} vs {other.name}
                    </span>
                    <span className="shrink-0 text-[#176b87]" aria-hidden>
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {brand.faqItems.length > 0 ? (
          <section className="mt-10" aria-labelledby={`faq-${brand.slug}`}>
            <h2
              id={`faq-${brand.slug}`}
              className="tc-display text-xl font-bold sm:text-2xl"
            >
              Frequently asked questions
            </h2>
            <div className="mt-3 flex max-w-2xl flex-col gap-2">
              {brand.faqItems.map((item, i) => (
                <details
                  key={i}
                  className="group rounded-lg border border-[#e3e3e3] bg-white px-4 open:pb-3"
                >
                  <summary className="relative cursor-pointer list-none select-none py-3 pr-7 text-sm font-semibold text-[#142b3a]">
                    {item.question}
                    <span
                      className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-[#5f757f] transition-transform group-open:rotate-180"
                      aria-hidden
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M6 9l6 6 6-6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </summary>
                  <p className="border-t border-[#ededed] pt-3 text-sm leading-relaxed text-[#53666e]">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        ) : null}

        {/* Methodology + sources */}
        <section className="mt-10" aria-labelledby="sources">
          <h2 id="sources" className="tc-display text-xl font-bold sm:text-2xl">
            Sources &amp; how this listing is built
          </h2>
          <div className="tc-card mt-3 p-4 sm:p-5">
            <p className="text-sm leading-relaxed text-[#53666e]">
              Pricing and program attributes on this page are taken from{" "}
              {brand.name}&apos;s own public pages and last reviewed on{" "}
              {formattedDate}. T-Compare does not run clinical testing, collect
              user reviews, or assign star ratings — listings summarize what each
              provider publishes so you can verify it at the source.
            </p>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#3c535e]">
              Sources
            </p>
            <BrandSourceLinks
              brand={brand}
              className="mt-2 flex flex-col gap-1.5"
              linkClassName="text-sm text-[#176b87] underline decoration-[#176b87]/30 underline-offset-2 hover:text-[#10556d]"
            />
          </div>
        </section>

        {/* Closing CTA */}
        <section className="mt-8 rounded-xl border border-[#e3e3e3] bg-white p-5 sm:p-6">
          <h2 className="tc-display text-lg font-bold sm:text-xl">
            Ready to check {brand.name}?
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#53666e]">
            Confirm the current price, eligibility for your state, and what the
            plan includes on the official site before you enroll.
          </p>
          <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:items-center">
            <ExternalCta
              href={affiliateHref}
              brand={brand.name}
              position="footer"
              label={ctaLabel}
            />
            <Link
              href="/testosterone/enclomiphene"
              className="tc-btn tc-btn-secondary"
            >
              Compare all providers
              <span aria-hidden>→</span>
            </Link>
          </div>
        </section>

        {/* Footer row */}
        <div className="mt-10 flex flex-col gap-3 border-t border-[#e3e3e3] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/testosterone/enclomiphene"
            className="text-sm font-semibold text-[#176b87] hover:text-[#10556d] hover:underline"
          >
            ← Back to provider comparison
          </Link>
          <p className="max-w-sm text-xs leading-relaxed text-[#5f757f] sm:text-right">
            Verify current information directly with the provider.
          </p>
        </div>
      </div>

      <MobileStickyCta
        href={affiliateHref}
        brand={brand.name}
        label={ctaLabel}
        priceLabel={brand.priceLabel}
      />
    </>
  );
}
