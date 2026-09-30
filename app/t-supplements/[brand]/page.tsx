import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import BrandSourceLinks from "../../components/BrandSourceLinks";
import CommercialHero from "../../components/CommercialHero";
import MobileStickyCta from "../../components/MobileStickyCta";
import ExternalCta from "../../components/ui/ExternalCta";
import { formatReviewedDate, merchantCtaLabel } from "../../lib/brand-display";
import { withTtimeAffiliateParams } from "../../lib/affiliate-links";
import { getPostsByTopic } from "../../lib/blog";
import { getBlogTopic } from "../../lib/blog-topics";
import {
  BRAND_CATEGORY_CONFIG,
  getBrandBySlug,
  getBrandPairs,
  getBrandsByCategory,
  getCategoryIndexPath,
  getComparePairPath,
  getComparisonsIndexPath,
} from "../../lib/brands";
import { SITE_URL } from "../../lib/site";

type Props = {
  params: Promise<{ brand: string }>;
};

export async function generateStaticParams() {
  return getBrandsByCategory("supplement").map((b) => ({ brand: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brand: slug } = await params;
  const brand = getBrandBySlug(slug);

  if (!brand || brand.category !== "supplement") return { title: "Supplement not found" };

  const pageUrl = `${SITE_URL}/t-supplements/${brand.slug}`;
  const seoTitle = brand.seoTitle.replace(/\s*\|\s*T-Compare\s*$/, "");
  const seoDescription = brand.seoDescription;

  return {
    title: seoTitle,
    description: seoDescription,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: pageUrl,
      images: [
        {
          url: "/t-supplements/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${brand.name} testosterone supplement review`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: ["/t-supplements/opengraph-image"],
    },
  };
}

export default async function TSupplementBrandPage({ params }: Props) {
  const { brand: slug } = await params;
  const brand = getBrandBySlug(slug);

  if (!brand || brand.category !== "supplement") notFound();

  const config = BRAND_CATEGORY_CONFIG.supplement;
  const categoryPath = getCategoryIndexPath("supplement");
  const pageUrl = `${SITE_URL}/t-supplements/${brand.slug}`;
  const affiliateHref = withTtimeAffiliateParams(brand.affiliateUrl);
  const ctaLabel = merchantCtaLabel(brand);

  // If this brand has a matching blog topic hub, surface its guides for internal linking.
  const brandTopic = getBlogTopic(brand.slug);
  const topicPosts = brandTopic ? getPostsByTopic(brand.slug).slice(0, 8) : [];

  // Head-to-head comparisons involving this brand (interlinks product page <-> money pages).
  const comparisonsIndexPath = getComparisonsIndexPath("supplement");
  const comparePairs = getBrandPairs("supplement")
    .filter((p) => p.a.slug === brand.slug || p.b.slug === brand.slug)
    .map((p) => {
      const other = p.a.slug === brand.slug ? p.b : p.a;
      return { other, href: getComparePairPath("supplement", brand.slug, other.slug) };
    });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Testosterone Supplements", item: `${SITE_URL}${categoryPath}` },
      { "@type": "ListItem", position: 3, name: brand.name, item: pageUrl },
    ],
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: brand.name,
    description: brand.seoDescription || brand.overview,
    category: "Testosterone Support Supplement",
    brand: { "@type": "Brand", name: brand.name },
    image: `${SITE_URL}/t-supplements/opengraph-image`,
    url: pageUrl,
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: brand.priceFromMonthly,
      availability: "https://schema.org/InStock",
      url: pageUrl,
    },
  };

  const faqPageSchema =
    brand.faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: brand.faqItems.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }
      : null;

  const formattedDate = formatReviewedDate(brand.lastReviewed);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      {faqPageSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
        />
      ) : null}

      <div className="mx-auto max-w-5xl px-4 pb-24 pt-8 sm:px-6 sm:pb-16 sm:pt-10">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex flex-wrap items-center gap-2 text-[13px] text-[#5f757f]"
        >
          <Link href="/" className="hover:text-[#176b87] hover:underline">
            Home
          </Link>
          <span aria-hidden>/</span>
          <Link href={categoryPath} className="hover:text-[#176b87] hover:underline">
            Testosterone Supplements
          </Link>
          <span aria-hidden>/</span>
          <span className="text-[#3c535e]">{brand.name}</span>
        </nav>

        <CommercialHero
          brand={brand}
          affiliateHref={affiliateHref}
          intro={`Considering ${brand.name}? This page breaks down what you'll actually pay, what the formula emphasizes, and how its guarantee works — so you can decide before checkout.`}
        />

        {/* Pricing + formula detail */}
        <section className="mt-8" aria-labelledby="pricing-formula">
          <h2
            id="pricing-formula"
            className="tc-display text-xl font-bold sm:text-2xl"
          >
            Pricing, guarantee and formula
          </h2>

          <dl className="mt-3 grid gap-3 sm:grid-cols-3">
            {[
              {
                label: config.whyLabels.onboarding,
                value: brand.why.onboarding,
                positive: true,
              },
              { label: config.whyLabels.pricing, value: brand.why.pricing },
              {
                label: config.whyLabels.positioning,
                value: brand.why.positioning,
              },
            ].map((item) => (
              <div key={item.label} className="tc-card p-4 sm:p-5">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#3c535e]">
                  {item.label}
                </dt>
                <dd
                  className={`mt-2 text-sm leading-relaxed ${
                    item.positive ? "text-[#1a6249]" : "text-[#3c535e]"
                  }`}
                >
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>

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
              Promos and bundle totals change often. Confirm the latest price and
              guarantee terms on the official checkout before you order.
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

        {brandTopic && topicPosts.length > 0 ? (
          <section className="mt-10" aria-labelledby="brand-guides">
            <h2
              id="brand-guides"
              className="tc-display text-xl font-bold sm:text-2xl"
            >
              {brand.name} guides
            </h2>
            <ul className="tc-card mt-3 flex max-w-2xl flex-col divide-y divide-[#ededed]">
              {topicPosts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="flex items-start gap-3 px-4 py-3 text-sm text-[#3c535e] transition-colors hover:bg-[#f4f8fa] hover:text-[#176b87]"
                  >
                    <span className="mt-0.5 shrink-0 text-[#176b87]" aria-hidden>
                      →
                    </span>
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href={`/blog/topics/${brandTopic.slug}`}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#176b87] hover:text-[#10556d] hover:underline"
            >
              See all {brand.name} guides →
            </Link>
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
              See how {brand.name} stacks up against other testosterone
              supplements on price, formula, and guarantee terms.
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
            <Link
              href={comparisonsIndexPath}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#176b87] hover:text-[#10556d] hover:underline"
            >
              See all supplement comparisons →
            </Link>
          </section>
        ) : null}

        {/* Methodology + sources */}
        <section className="mt-10" aria-labelledby="sources">
          <h2 id="sources" className="tc-display text-xl font-bold sm:text-2xl">
            Sources &amp; how this listing is built
          </h2>
          <div className="tc-card mt-3 p-4 sm:p-5">
            <p className="text-sm leading-relaxed text-[#53666e]">
              Pricing, guarantee and formula details are taken from{" "}
              {brand.name}&apos;s own public pages and last reviewed on{" "}
              {formattedDate}. T-Compare does not run product testing, aggregate
              user reviews, or assign star ratings — listings summarize what each
              brand publishes so you can verify it at the source.
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
            Check current {brand.name} pricing
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#53666e]">
            Confirm the latest bundle price, shipping, and guarantee window on the
            official checkout before you order.
          </p>
          <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:items-center">
            <ExternalCta
              href={affiliateHref}
              brand={brand.name}
              position="footer"
              label={ctaLabel}
            />
            <Link href={categoryPath} className="tc-btn tc-btn-secondary">
              Compare all supplements
              <span aria-hidden>→</span>
            </Link>
          </div>
        </section>

        <div className="mt-10 border-t border-[#e3e3e3] pt-6">
          <Link
            href={categoryPath}
            className="text-sm font-semibold text-[#176b87] hover:text-[#10556d] hover:underline"
          >
            ← Back to Testosterone Supplements
          </Link>
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
