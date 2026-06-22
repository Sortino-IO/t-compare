import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import BrandSourceLinks from "../../components/BrandSourceLinks";
import { withTtimeAffiliateParams } from "../../lib/affiliate-links";
import { getPostsByTopic } from "../../lib/blog";
import { getBlogTopic } from "../../lib/blog-topics";
import {
  BRAND_CATEGORY_CONFIG,
  getBrandBySlug,
  getBrandsByCategory,
  getCategoryIndexPath,
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

  // If this brand has a matching blog topic hub, surface its guides for internal linking.
  const brandTopic = getBlogTopic(brand.slug);
  const topicPosts = brandTopic ? getPostsByTopic(brand.slug).slice(0, 8) : [];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "T-Supplements", item: `${SITE_URL}${categoryPath}` },
      { "@type": "ListItem", position: 3, name: brand.name, item: pageUrl },
    ],
  };

  const formattedDate = new Date(brand.lastReviewed).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="mx-auto max-w-5xl px-6 py-10 sm:py-16">
        <nav className="flex items-center gap-2 text-sm text-[#b5b0a8] mb-10 sm:mb-14 flex-wrap">
          <Link href="/" className="hover:text-[#1c1917] transition-colors">Home</Link>
          <span>/</span>
          <Link href={categoryPath} className="hover:text-[#1c1917] transition-colors">
            T-Supplements
          </Link>
          <span>/</span>
          <span className="text-[#78716c]">{brand.name}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[1fr_300px] items-start">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.2em] text-[#a8a29e] uppercase mb-4">
              Informational Comparison · {config.detailBadge}
            </p>
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl font-semibold text-[#1c1917] leading-tight mb-2">
              {brand.name}
            </h1>
            <p className="text-xs text-[#b5b0a8] mb-5">Last reviewed: {formattedDate}</p>
            <p className="text-base text-[#78716c] leading-relaxed mb-8 max-w-lg">
              Considering {brand.name}? This page breaks down what you&apos;ll
              actually pay, what the formula emphasizes, and how its guarantee
              works-so you can decide if it fits your goals before checkout.
            </p>

            <div className="rounded-2xl bg-white border border-[#e3dfd6] overflow-hidden shadow-sm mb-8">
              <div className="px-7 py-5 border-b border-[#f0ece4]">
                <p className="text-[11px] font-semibold text-[#b5b0a8] uppercase tracking-[0.12em] mb-2">Overview</p>
                <p className="text-sm text-[#44403c] leading-relaxed">{brand.overview}</p>
              </div>
              <div className="px-7 py-5 border-b border-[#f0ece4]">
                <p className="text-[11px] font-semibold text-[#b5b0a8] uppercase tracking-[0.12em] mb-2">Pricing</p>
                <p className="text-sm text-[#44403c] leading-relaxed">
                  {brand.priceLabel}.{" "}
                  <span className="font-semibold text-[#2a6e47]">
                    Headline anchor ~${brand.priceFromMonthly}/mo equivalent.
                  </span>{" "}
                  Verify on the official checkout page.
                </p>
              </div>
              <div className="px-7 py-5">
                <p className="text-[11px] font-semibold text-[#b5b0a8] uppercase tracking-[0.12em] mb-2">Notes</p>
                <ul className="flex flex-col gap-1.5">
                  {brand.notes.map((note, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#44403c] leading-relaxed">
                      <span className="text-[#b5b0a8] mt-0.5 shrink-0">-</span>
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <a
              href={withTtimeAffiliateParams(brand.affiliateUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-xl bg-[#2a6e47] px-8 py-4 text-sm font-semibold text-white hover:bg-[#22593a] transition-colors shadow-sm"
            >
              Visit {brand.name}
            </a>

            {brand.ctaBelowParagraphs.length > 0 ? (
              <section className="mt-8 max-w-2xl">
                <h2 className="text-lg font-semibold text-[#1c1917] font-[family-name:var(--font-playfair)] mb-4">
                  About {brand.name}
                </h2>
                <div className="flex flex-col gap-4 text-sm text-[#57534e] leading-relaxed">
                  {brand.ctaBelowParagraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </section>
            ) : null}

            {brand.faqItems.length > 0 ? (
              <section className="mt-10 max-w-2xl">
                <h2 className="text-lg font-semibold text-[#1c1917] font-[family-name:var(--font-playfair)] mb-5">
                  Frequently asked questions
                </h2>
                <div className="flex flex-col gap-3">
                  {brand.faqItems.map((item, i) => (
                    <details
                      key={i}
                      className="group rounded-xl border border-[#e3dfd6] bg-white px-4 py-1 shadow-sm open:pb-3"
                    >
                      <summary className="cursor-pointer list-none py-3 text-sm font-medium text-[#44403c]">
                        {item.question}
                      </summary>
                      <p className="text-sm text-[#57534e] leading-relaxed pb-1 border-t border-[#f0ece4] pt-3">
                        {item.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            ) : null}

            {brandTopic && topicPosts.length > 0 ? (
              <section className="mt-10 max-w-2xl">
                <h2 className="text-lg font-semibold text-[#1c1917] font-[family-name:var(--font-playfair)] mb-5">
                  {brand.name} guides
                </h2>
                <ul className="flex flex-col divide-y divide-[#f0ece4] rounded-xl border border-[#e3dfd6] bg-white shadow-sm">
                  {topicPosts.map((post) => (
                    <li key={post.slug}>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="flex items-start gap-3 px-4 py-3 text-sm text-[#44403c] transition-colors hover:bg-[#faf9f6] hover:text-[#1c1917]"
                      >
                        <span className="mt-0.5 shrink-0 text-[#2a6e47]">→</span>
                        {post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/blog/topics/${brandTopic.slug}`}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#2a6e47] transition-colors hover:text-[#1c1917]"
                >
                  See all {brand.name} guides →
                </Link>
              </section>
            ) : null}

            <details className="mt-8 group">
              <summary className="cursor-pointer list-none flex items-center gap-1.5 text-xs font-medium text-[#b5b0a8] hover:text-[#78716c] transition-colors select-none">
                <svg
                  width="12" height="12" viewBox="0 0 12 12" fill="none"
                  className="transition-transform duration-150 group-open:rotate-90"
                  aria-hidden="true"
                >
                  <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Sources
              </summary>
              <div className="mt-3 pl-4 border-l border-[#e3dfd6]">
                <BrandSourceLinks
                  brand={brand}
                  className="flex flex-col gap-1.5"
                  linkClassName="text-xs text-[#78716c] hover:text-[#2a6e47] hover:underline transition-colors font-normal"
                />
              </div>
            </details>
          </div>

          <div>
            <div className="rounded-2xl bg-white border border-[#e3dfd6] p-7 shadow-sm">
              <p className="text-[11px] font-semibold tracking-[0.2em] text-[#b5b0a8] uppercase mb-5">Starting price</p>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="font-[family-name:var(--font-playfair)] text-5xl font-bold text-[#2a6e47] tabular-nums leading-none">
                  ${brand.priceFromMonthly}
                </span>
                <span className="text-base text-[#78716c]">/mo</span>
              </div>
              <p className="text-xs text-[#44403c] leading-relaxed">{brand.priceLabel}</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#e3dfd6]">
          <Link href={categoryPath} className="text-sm text-[#78716c] hover:text-[#1c1917] transition-colors">
            ← Back to T-Supplements
          </Link>
        </div>
      </div>
    </>
  );
}
