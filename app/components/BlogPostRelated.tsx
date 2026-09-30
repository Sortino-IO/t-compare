import Link from "next/link";
import type { BlogPost } from "../lib/blog";
import type { BlogTopic } from "../lib/blog-topics";

type Props = {
  posts: BlogPost[];
  /** When set, the section is branded to the topic cluster and links to its hub + product page. */
  topic?: BlogTopic;
};

export default function BlogPostRelated({ posts, topic }: Props) {
  if (!posts.length) return null;

  const heading = topic ? `More ${topic.label} guides` : "You might also like";
  const subtext = topic
    ? `Keep exploring our independent ${topic.label} coverage, or jump straight to pricing and the guarantee.`
    : "More articles on T-Compare, plus quick links to our comparison tools.";

  return (
    <section className="mx-auto mt-12 max-w-3xl border-t border-[#e3e3e3] pt-12">
      <h2 className="tc-display text-2xl font-semibold text-[#142b3a] sm:text-3xl">
        {heading}
      </h2>
      <p className="mt-2 text-sm text-[#53666e]">{subtext}</p>

      <ul className="mt-8 space-y-6">
        {posts.map((p) => (
          <li key={p.slug} className="border-b border-[#ededed] pb-6 last:border-b-0 last:pb-0">
            <Link
              href={`/blog/${p.slug}`}
              className="tc-display text-lg font-semibold text-[#142b3a] transition-colors hover:text-[#176b87]"
            >
              {p.title}
            </Link>
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#53666e]">{p.excerpt}</p>
            <Link
              href={`/blog/${p.slug}`}
              className="mt-3 inline-flex text-sm font-semibold text-[#176b87] hover:underline"
            >
              Read article →
            </Link>
          </li>
        ))}
      </ul>

      {topic ? (
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <Link
            href={`/blog/topics/${topic.slug}`}
            className="rounded-xl border border-[#e3e3e3] bg-white px-5 py-4 transition-colors hover:border-[#bcd9e4]"
          >
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#5f757f]">
              Topic hub
            </div>
            <div className="mt-2 font-semibold text-[#142b3a]">All {topic.label} guides</div>
            <div className="mt-1 text-sm text-[#53666e]">
              Reviews, ingredients, comparisons & cost in one place.
            </div>
          </Link>
          {topic.cta ? (
            <Link
              href={topic.cta.href}
              className="rounded-xl border border-[#bcd9e4] bg-[#eef6f9] px-5 py-4 transition-colors hover:border-[#176b87]"
            >
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#176b87]">
                {topic.cta.eyebrow}
              </div>
              <div className="mt-2 font-semibold text-[#142b3a]">{topic.cta.title}</div>
              <div className="mt-1 text-sm font-semibold text-[#176b87]">
                {topic.cta.buttonLabel} →
              </div>
            </Link>
          ) : null}
        </div>
      ) : (
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <Link
            href="/testosterone/enclomiphene"
            className="rounded-xl border border-[#e3e3e3] bg-white px-5 py-4 transition-colors hover:border-[#bcd9e4]"
          >
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#5f757f]">
              Rankings & grid
            </div>
            <div className="mt-2 font-semibold text-[#142b3a]">Enclomiphene provider comparison</div>
            <div className="mt-1 text-sm text-[#53666e]">Browse all listed programs side by side.</div>
          </Link>
          <Link
            href="/comparisons"
            className="rounded-xl border border-[#e3e3e3] bg-white px-5 py-4 transition-colors hover:border-[#bcd9e4]"
          >
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#5f757f]">
              Pairwise
            </div>
            <div className="mt-2 font-semibold text-[#142b3a]">Head-to-head comparisons</div>
            <div className="mt-1 text-sm text-[#53666e]">Open A‑vs‑B pages built from the same brand data.</div>
          </Link>
        </div>
      )}
    </section>
  );
}
