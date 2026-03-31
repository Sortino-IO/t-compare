import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogContent from "../../components/BlogContent";
import { getAllSlugs, getPostBySlug } from "../../lib/blog";

const BASE_URL = "https://comparet.com";

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

  const pageUrl = `${BASE_URL}/blog/${post.slug}`;

  return {
    title: {
      absolute: post.seoTitle,
    },
    description: post.seoDescription,
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      url: pageUrl,
      type: "article",
      publishedTime: post.publishedAt,
      images: [
        {
          url: post.featuredImage,
          width: 1200,
          height: 630,
          alt: post.featuredImageAlt,
        },
      ],
    },
    twitter: {
      title: post.seoTitle,
      description: post.seoDescription,
      images: [post.featuredImage],
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

  const pageUrl = `${BASE_URL}/blog/${post.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seoDescription,
    datePublished: post.publishedAt,
    url: pageUrl,
    image: post.featuredImage,
    author: {
      "@type": "Organization",
      name: "CompareT",
    },
    publisher: {
      "@type": "Organization",
      name: "CompareT",
      url: BASE_URL,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
          <BlogContent blocks={post.content} />
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
