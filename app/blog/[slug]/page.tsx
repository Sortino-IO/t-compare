import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleToc from "../../components/ArticleToc";
import BlogArticleTrust from "../../components/BlogArticleTrust";
import BlogContent from "../../components/BlogContent";
import BlogPostRelated from "../../components/BlogPostRelated";
import BlogPriceCheck from "../../components/BlogPriceCheck";
import BlogProviderLinks from "../../components/BlogProviderLinks";
import type { BlogBlock } from "../../lib/blog";
import { getAllSlugs, getPostBySlug, getRelatedPosts, type BlogPost } from "../../lib/blog";
import { extractTopLevelHeadings } from "../../lib/blog-headings";
import { resolvePrimaryTopic } from "../../lib/blog-topics";
import { metaDescription } from "../../lib/seo";
import { OG_BASE, SITE_URL } from "../../lib/site";
import QuickCostEstimator from "../../components/QuickCostEstimator";
import EvidenceNotes from "../../components/EvidenceNotes";
import { getBrandsByCategory } from "../../lib/brands";
import { buildEstimatorRows } from "../../lib/cost-estimator";

/** Posts where readers are weighing prescription programs, so a cost check helps them decide. */
const PROVIDER_COST_POST = /enclomiphene|ttime|hims|(^|-)trt(-|$)/;
const PROVIDER_IN_SLUG = /^(ttime|hims)-/;

function absoluteImageUrl(src: string): string {
  if (src.startsWith("https://") || src.startsWith("http://")) return src;
  const path = src.startsWith("/") ? src : `/${src}`;
  return `${SITE_URL}${path}`;
}

/** Flatten a paragraph block (plain text or segmented) into a single string. */
function paragraphToPlainText(block: BlogBlock): string {
  if (block.type !== "paragraph") return "";
  if ("text" in block) return block.text;
  return block.segments
    .map((seg) => (seg.type === "text" ? seg.text : seg.label))
    .join("");
}

/**
 * Extract Q&A pairs from a content array. A FAQ section starts at a level-2
 * heading whose text is "FAQ"; each subsequent level-3 heading is a question
 * and the paragraphs that follow (until the next heading/disclaimer) are its
 * answer. Returns an empty array when no FAQ section is present.
 */
function extractFaq(blocks: BlogBlock[]): { question: string; answer: string }[] {
  const faqs: { question: string; answer: string }[] = [];
  let inFaq = false;
  let current: { question: string; answer: string[] } | null = null;

  const flush = () => {
    if (current && current.answer.length > 0) {
      faqs.push({ question: current.question, answer: current.answer.join(" ") });
    }
    current = null;
  };

  for (const block of blocks) {
    if (block.type === "heading" && block.level !== 3) {
      const isFaqStart = block.text.trim().toLowerCase() === "faq";
      if (isFaqStart) {
        flush();
        inFaq = true;
        continue;
      }
      // A non-FAQ level-2 heading ends the FAQ section.
      flush();
      inFaq = false;
      continue;
    }
    if (!inFaq) continue;

    if (block.type === "heading" && block.level === 3) {
      flush();
      current = { question: block.text.trim(), answer: [] };
      continue;
    }
    if (block.type === "paragraph" && current) {
      const text = paragraphToPlainText(block).trim();
      if (text) current.answer.push(text);
      continue;
    }
    if (block.type === "disclaimer") {
      flush();
      inFaq = false;
    }
  }
  flush();
  return faqs;
}

function postMetaDescription(post: BlogPost): string {
  if (post.seoDescription?.trim()) return post.seoDescription.trim();
  return metaDescription(post.excerpt);
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Article not found" };
  }

  const pageUrl = `${SITE_URL}/blog/${post.slug}`;
  const metadataTitle =
    post.seoTitle && post.seoTitle.trim().length > 0
      ? post.seoTitle
      : `${post.title} | T-Compare`;
  const metadataDescription = postMetaDescription(post);

  return {
    title: {
      absolute: metadataTitle,
    },
    description: metadataDescription,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      ...OG_BASE,
      title: metadataTitle,
      description: metadataDescription,
      url: pageUrl,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: metadataTitle,
      description: metadataDescription,
    },
  };
}

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const primaryTopic = resolvePrimaryTopic(post.topics);
  const related = getRelatedPosts(post.slug, primaryTopic ? 4 : 3);
  const tocEntries = extractTopLevelHeadings(post.content);

  const pageUrl = `${SITE_URL}/blog/${post.slug}`;
  const postingDescription = postMetaDescription(post);

  const jsonLd: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: postingDescription,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt ?? post.publishedAt,
      url: pageUrl,
      image: absoluteImageUrl(post.featuredImage),
      author: {
        "@type": "Organization",
        name: "T-Compare",
      },
      publisher: {
        "@type": "Organization",
        name: "T-Compare",
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/logo.png`,
        },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
        { "@type": "ListItem", position: 3, name: post.title, item: pageUrl },
      ],
    },
  ];

  const faqs = extractFaq(post.content);
  if (faqs.length > 0) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.answer,
        },
      })),
    });
  }

  return (
    <>
      {jsonLd.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}

      <article className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-[45rem] px-4 pt-6 sm:px-6 sm:pt-8">
          <nav
            aria-label="Breadcrumb"
            className="mb-5 flex flex-wrap items-center gap-2 text-[13px] text-[#5f757f]"
          >
            <Link href="/" className="hover:text-[#176b87] hover:underline">
              Home
            </Link>
            <span aria-hidden>/</span>
            <Link href="/blog" className="hover:text-[#176b87] hover:underline">
              Blog
            </Link>
            <span aria-hidden>/</span>
            <span className="line-clamp-1 text-[#3c535e]">{post.title}</span>
          </nav>

          <header className="mb-6">
            {primaryTopic ? (
              <Link
                href={`/blog/topics/${primaryTopic.slug}`}
                className="tc-tag mb-3 uppercase hover:border-[#a9cbd8] hover:text-[#176b87]"
              >
                {primaryTopic.label}
              </Link>
            ) : null}
            <h1 className="tc-display text-[1.75rem] font-bold leading-[1.2] sm:text-[2.25rem]">
              {post.title}
            </h1>

            {/* Byline: T-Compare publishes editorially as an organization; no
                individual author or medical reviewer is claimed. */}
            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 border-y border-[#ededed] py-3 text-[13px] text-[#5f757f]">
              <span className="font-semibold text-[#3c535e]">
                T-Compare Editorial
              </span>
              <span aria-hidden>·</span>
              <span>
                {post.updatedAt && post.updatedAt !== post.publishedAt
                  ? `Updated ${formatDate(post.updatedAt)}`
                  : `Published ${formatDate(post.publishedAt)}`}
              </span>
              <span aria-hidden>·</span>
              <span>Informational, not medical advice</span>
            </div>
          </header>
        </div>

        <div className="mx-auto max-w-[45rem] px-4 sm:px-6">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-[#e3e3e3] bg-[#ededed] sm:aspect-[2.2/1]">
            <Image
              src={post.featuredImage}
              alt={post.featuredImageAlt}
              fill
              priority
              sizes="(max-width: 720px) 100vw, 720px"
              className="object-cover object-center"
            />
          </div>
        </div>

        <div className="mx-auto max-w-[45rem] px-4 pt-8 sm:px-6">
          {/* Quick answer — the article standfirst, surfaced as a scannable summary. */}
          <div className="mb-8 rounded-xl border border-[#bcd9e4] bg-[#eef6f9] p-4 sm:p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#176b87]">
              Quick answer
            </p>
            <p className="mt-1.5 text-[15px] leading-relaxed text-[#3c535e]">
              {post.excerpt}
            </p>
          </div>

          {PROVIDER_COST_POST.test(post.slug) ? (
            <BlogPriceCheck text={`${post.title} ${post.slug}`} className="-mt-4 mb-8" />
          ) : null}

          <ArticleToc entries={tocEntries} />
        </div>

        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <BlogContent blocks={post.content} cta={primaryTopic?.cta} />
        </div>

        {PROVIDER_COST_POST.test(post.slug) ? (
          <div className="mx-auto max-w-[45rem] px-4 sm:px-6">
            <QuickCostEstimator
              rows={buildEstimatorRows(getBrandsByCategory("enclomiphene"))}
              initialSlug={PROVIDER_IN_SLUG.exec(post.slug)?.[1]}
              className="mt-10"
            />
            <EvidenceNotes
              ids={["enclomiphene-sperm", "enclomiphene-not-approved"]}
              className="mt-6"
            />
            <BlogProviderLinks text={`${post.title} ${post.slug}`} className="mt-6" />
          </div>
        ) : null}

        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <BlogArticleTrust />
          <BlogPostRelated posts={related} topic={primaryTopic} />
        </div>

        <div className="mx-auto mt-12 max-w-[45rem] border-t border-[#e3e3e3] px-4 pt-8 sm:px-6">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm font-semibold text-[#176b87] hover:text-[#10556d] hover:underline"
          >
            ← Back to all articles
          </Link>
        </div>
      </article>
    </>
  );
}
