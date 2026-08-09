import type { Metadata } from "next";
import Link from "next/link";
import BlogCard from "../components/BlogCard";
import BlogPagination from "../components/BlogPagination";
import { getPostsPage } from "../lib/blog";
import { SITE_URL } from "../lib/site";

type Props = {
  searchParams: Promise<{ page?: string }>;
};

const BLOG_TITLE = "Testosterone & Enclomiphene Blog: Guides That Help You Choose";
const BLOG_DESCRIPTION =
  "Get practical guides on TRT, enclomiphene, symptoms, fertility, and real treatment costs so you can ask better questions and choose providers with confidence.";

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { page: pageStr } = await searchParams;
  const parsed = parseInt(pageStr ?? "1", 10);
  const page = Number.isFinite(parsed) && parsed > 1 ? parsed : 1;
  // Self-referencing canonical for each page of the series (fixes "Duplicate
  // without user-selected canonical" on /blog?page=N).
  const canonical = page > 1 ? `${SITE_URL}/blog?page=${page}` : `${SITE_URL}/blog`;
  const title = page > 1 ? `${BLOG_TITLE} — Page ${page}` : BLOG_TITLE;

  return {
    title,
    description: BLOG_DESCRIPTION,
    alternates: { canonical },
    openGraph: {
      title,
      description: BLOG_DESCRIPTION,
      url: canonical,
      images: [
        {
          url: "/blog/opengraph-image",
          width: 1200,
          height: 630,
          alt: "Testosterone and Enclomiphene Blog Guides",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: BLOG_DESCRIPTION,
      images: ["/blog/opengraph-image"],
    },
  };
}

export default async function BlogArchivePage({ searchParams }: Props) {
  const { page: pageStr } = await searchParams;
  const parsed = parseInt(pageStr ?? "1", 10);
  const page = Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
  const { posts, totalPages, currentPage, total } = getPostsPage(page);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
      <nav className="mb-10 flex items-center gap-2 text-sm text-[#b5b0a8]">
        <Link href="/" className="transition-colors hover:text-[#1c1917]">
          Home
        </Link>
        <span>/</span>
        <span className="text-[#78716c]">Blog</span>
      </nav>

      <div className="mb-10 max-w-2xl">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#a8a29e]">
          T-Compare
        </p>
        <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-semibold leading-tight text-[#1c1917] sm:text-5xl">
          Blog
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[#78716c] sm:text-lg">
          Evidence-style education on enclomiphene and TRT, testosterone symptoms,
          fertility, telehealth access, therapy costs, and how to use T-Compare
          comparisons without replacing medical advice.
        </p>
        <p className="mt-2 text-sm text-[#b5b0a8]">{total} articles</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
        {posts.map((post, i) => (
          <BlogCard key={post.slug} post={post} priority={i === 0} />
        ))}
      </div>

      <BlogPagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
