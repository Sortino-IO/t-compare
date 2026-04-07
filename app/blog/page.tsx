import type { Metadata } from "next";
import Link from "next/link";
import BlogCard from "../components/BlogCard";
import BlogPagination from "../components/BlogPagination";
import { getPostsPage } from "../lib/blog";

const BASE_URL = "https://comparet.com";

export const metadata: Metadata = {
  title: "Men’s Health & Testosterone Education Blog",
  description:
    "In-depth guides on enclomiphene, TRT, testosterone symptoms, fertility, online men’s health, costs, and how to compare providers responsibly.",
  openGraph: {
    title: "Men’s Health & Testosterone Education Blog | T-Compare",
    description:
      "In-depth guides on enclomiphene, TRT, testosterone symptoms, fertility, online men’s health, costs, and how to compare providers responsibly.",
    url: `${BASE_URL}/blog`,
  },
  twitter: {
    title: "Men’s Health & Testosterone Education Blog | T-Compare",
    description:
      "In-depth guides on enclomiphene, TRT, testosterone symptoms, fertility, online men’s health, costs, and how to compare providers responsibly.",
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
