import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogArticleTrust from "../../components/BlogArticleTrust";
import BlogContent from "../../components/BlogContent";
import BlogPostRelated from "../../components/BlogPostRelated";
import type { BlogBlock } from "../../lib/blog";
import { getAllSlugs, getPostBySlug, getRelatedPosts } from "../../lib/blog";
import { resolvePrimaryTopic } from "../../lib/blog-topics";
import { SITE_URL } from "../../lib/site";

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
  const metadataDescription =
    post.seoDescription && post.seoDescription.trim().length > 0
      ? post.seoDescription
      : post.excerpt.length > 155
        ? `${post.excerpt.slice(0, 152).trimEnd()}...`
        : post.excerpt;

  return {
    title: {
      absolute: metadataTitle,
    },
    description: metadataDescription,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
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

  const pageUrl = `${SITE_URL}/blog/${post.slug}`;

  const jsonLd: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.seoDescription,
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

      <article className="pb-16 sm:pb-24">
        <div className="border-b border-[#e3dfd6] bg-[#faf9f6]">
          <div className="relative mx-auto aspect-[21/9] max-h-[min(52vh,520px)] w-full max-w-6xl overflow-hidden sm:aspect-[2.4/1]">
            <Image
              src={post.featuredImage}
              alt={post.featuredImageAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1c1917]/50 to-transparent sm:from-[#1c1917]/30"
              aria-hidden
            />
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-6 pt-10 sm:pt-14">
          <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[#b5b0a8]">
            <Link href="/" className="transition-colors hover:text-[#1c1917]">
              Home
            </Link>
            <span>/</span>
            <Link href="/blog" className="transition-colors hover:text-[#1c1917]">
              Blog
            </Link>
            <span>/</span>
            <span className="line-clamp-1 text-[#78716c]">{post.title}</span>
          </nav>

          <header className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#a8a29e]">
              {formatDate(post.publishedAt)}
            </p>
            <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-semibold leading-[1.15] text-[#1c1917] sm:text-4xl sm:leading-tight lg:text-5xl">
              {post.title}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#78716c] sm:text-lg">
              {post.excerpt}
            </p>
          </header>
        </div>

        <div className="mx-auto max-w-5xl px-6">
          <BlogContent blocks={post.content} cta={primaryTopic?.cta} />
        </div>

        <div className="mx-auto max-w-5xl px-6">
          <BlogArticleTrust />
          <BlogPostRelated posts={related} topic={primaryTopic} />
        </div>

        <div className="mx-auto mt-16 max-w-3xl border-t border-[#e3dfd6] px-6 pt-10 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm font-semibold text-[#2a6e47] transition-colors hover:text-[#1c1917]"
          >
            ← Back to all articles
          </Link>
        </div>
      </article>
    </>
  );
}
