import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogCard from "../../../components/BlogCard";
import { getPostsByTopic, getUsedTopicSlugs } from "../../../lib/blog";
import { BLOG_TOPICS, getBlogTopic } from "../../../lib/blog-topics";
import { SITE_URL } from "../../../lib/site";

type Props = {
  params: Promise<{ topic: string }>;
};

export function generateStaticParams() {
  // Pre-render any topic that is both configured and used by at least one post.
  const used = new Set(getUsedTopicSlugs());
  return Object.keys(BLOG_TOPICS)
    .filter((slug) => used.has(slug))
    .map((topic) => ({ topic }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topic: slug } = await params;
  const topic = getBlogTopic(slug);
  if (!topic) return { title: "Topic not found" };

  const pageUrl = `${SITE_URL}/blog/topics/${topic.slug}`;
  return {
    title: { absolute: topic.seoTitle },
    description: topic.seoDescription,
    alternates: { canonical: pageUrl },
    openGraph: {
      title: topic.seoTitle,
      description: topic.seoDescription,
      url: pageUrl,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: topic.seoTitle,
      description: topic.seoDescription,
    },
  };
}

export default async function BlogTopicPage({ params }: Props) {
  const { topic: slug } = await params;
  const topic = getBlogTopic(slug);
  if (!topic) notFound();

  const posts = getPostsByTopic(slug);
  if (posts.length === 0) notFound();

  const postBySlug = new Map(posts.map((p) => [p.slug, p]));
  const cornerstone = (topic.cornerstoneSlugs ?? [])
    .map((s) => postBySlug.get(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const pageUrl = `${SITE_URL}/blog/topics/${topic.slug}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: topic.label, item: pageUrl },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: topic.heading,
    itemListElement: posts.map((post, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/blog/${post.slug}`,
      name: post.title,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <nav className="mb-10 flex items-center gap-2 text-sm text-[#b5b0a8]">
          <Link href="/" className="transition-colors hover:text-[#1c1917]">
            Home
          </Link>
          <span>/</span>
          <Link href="/blog" className="transition-colors hover:text-[#1c1917]">
            Blog
          </Link>
          <span>/</span>
          <span className="text-[#78716c]">{topic.label}</span>
        </nav>

        <div className="mb-10 max-w-2xl">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#a8a29e]">
            Topic hub
          </p>
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-semibold leading-tight text-[#1c1917] sm:text-5xl">
            {topic.heading}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[#78716c] sm:text-lg">
            {topic.intro}
          </p>
          <p className="mt-2 text-sm text-[#b5b0a8]">{posts.length} articles</p>
        </div>

        {cornerstone.length > 0 ? (
          <div className="mb-12">
            <h2 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#a8a29e]">
              Start here
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {cornerstone.map((post, i) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex items-start gap-4 rounded-2xl border border-[#e3dfd6] bg-white px-5 py-4 transition-colors hover:border-[#c6e0d0]"
                >
                  <span className="font-[family-name:var(--font-playfair)] text-2xl font-bold tabular-nums text-[#c6c0b4]">
                    {i + 1}
                  </span>
                  <span>
                    <span className="block font-semibold leading-snug text-[#1c1917] transition-colors group-hover:text-[#2a6e47]">
                      {post.title}
                    </span>
                    <span className="mt-1 line-clamp-2 block text-sm leading-relaxed text-[#57534e]">
                      {post.excerpt}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        <h2 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#a8a29e]">
          All {topic.label} articles
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        {topic.cta ? (
          <div className="mt-14 overflow-hidden rounded-3xl border border-[#c6e0d0] bg-[#f3f8f4]">
            <div className="flex flex-col gap-5 px-7 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-10">
              <div className="max-w-xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#2a6e47]">
                  {topic.cta.eyebrow}
                </p>
                <h2 className="mt-2 font-[family-name:var(--font-playfair)] text-2xl font-semibold text-[#1c1917]">
                  {topic.cta.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[#57534e]">{topic.cta.body}</p>
              </div>
              <Link
                href={topic.cta.href}
                className="inline-flex shrink-0 items-center justify-center rounded-xl bg-[#2a6e47] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#22593a]"
              >
                {topic.cta.buttonLabel}
              </Link>
            </div>
          </div>
        ) : null}

        <div className="mt-14 border-t border-[#e3dfd6] pt-8">
          <Link
            href="/blog"
            className="text-sm font-semibold text-[#2a6e47] transition-colors hover:text-[#1c1917]"
          >
            ← All articles
          </Link>
        </div>
      </div>
    </>
  );
}
