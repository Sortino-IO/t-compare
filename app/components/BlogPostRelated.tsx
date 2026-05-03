import Link from "next/link";
import type { BlogPost } from "../lib/blog";

type Props = {
  posts: BlogPost[];
};

export default function BlogPostRelated({ posts }: Props) {
  if (!posts.length) return null;

  return (
    <section className="mx-auto mt-12 max-w-3xl border-t border-[#e3dfd6] pt-12">
      <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-[#1c1917] sm:text-3xl">
        You might also like
      </h2>
      <p className="mt-2 text-sm text-[#78716c]">
        More articles on T-Compare, plus quick links to our comparison tools.
      </p>

      <ul className="mt-8 space-y-6">
        {posts.map((p) => (
          <li key={p.slug} className="border-b border-[#ede9e0] pb-6 last:border-b-0 last:pb-0">
            <Link
              href={`/blog/${p.slug}`}
              className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-[#1c1917] transition-colors hover:text-[#2a6e47]"
            >
              {p.title}
            </Link>
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#57534e]">{p.excerpt}</p>
            <Link
              href={`/blog/${p.slug}`}
              className="mt-3 inline-flex text-sm font-semibold text-[#2a6e47] hover:underline"
            >
              Read article →
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <Link
          href="/testosterone/enclomiphene"
          className="rounded-2xl border border-[#e3dfd6] bg-white px-5 py-4 transition-colors hover:border-[#c6e0d0]"
        >
          <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#a8a29e]">
            Rankings & grid
          </div>
          <div className="mt-2 font-semibold text-[#1c1917]">Enclomiphene provider comparison</div>
          <div className="mt-1 text-sm text-[#57534e]">Browse all listed programs side by side.</div>
        </Link>
        <Link
          href="/comparisons"
          className="rounded-2xl border border-[#e3dfd6] bg-white px-5 py-4 transition-colors hover:border-[#c6e0d0]"
        >
          <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#a8a29e]">
            Pairwise
          </div>
          <div className="mt-2 font-semibold text-[#1c1917]">Head-to-head comparisons</div>
          <div className="mt-1 text-sm text-[#57534e]">Open A‑vs‑B pages built from the same brand data.</div>
        </Link>
      </div>
    </section>
  );
}
