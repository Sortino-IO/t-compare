import type { Metadata } from "next";
import Link from "next/link";
import BlogCard from "../components/BlogCard";
import BlogPagination from "../components/BlogPagination";
import { getPostsPage } from "../lib/blog";
import { SITE_URL } from "../lib/site";

export const metadata: Metadata = {
  title: "Testosterone & Enclomiphene Blog: Guides That Help You Choose",
  description:
    "Get practical guides on TRT, enclomiphene, symptoms, fertility, and real treatment costs so you can ask better questions and choose providers with confidence.",
  openGraph: {
    title: "Testosterone & Enclomiphene Blog: Guides That Help You Choose",
    description:
      "Get practical guides on TRT, enclomiphene, symptoms, fertility, and real treatment costs so you can ask better questions and choose providers with confidence.",
    url: `${SITE_URL}/blog`,
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
    title: "Testosterone & Enclomiphene Blog: Guides That Help You Choose",
    description:
      "Get practical guides on TRT, enclomiphene, symptoms, fertility, and real treatment costs so you can ask better questions and choose providers with confidence.",
    images: ["/blog/opengraph-image"],
  },
};

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function BlogArchivePage({ searchParams }: Props) {
  const { page: pageStr } = await searchParams;
  const parsed = parseInt(pageStr ?? "1", 10);
  const page = Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
  const { posts, totalPages, currentPage, total } = getPostsPage(page);

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
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

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-2">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>

      <BlogPagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
