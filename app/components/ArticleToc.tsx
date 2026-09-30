import type { TocEntry } from "../lib/blog-headings";

/** Minimum number of sections before a table of contents earns its space. */
export const TOC_MIN_SECTIONS = 4;

/**
 * Server-rendered contents list built from the article's level-2 headings.
 * Plain anchors, so every section is reachable and crawlable without JS.
 */
export default function ArticleToc({ entries }: { entries: TocEntry[] }) {
  if (entries.length < TOC_MIN_SECTIONS) return null;

  return (
    <nav
      aria-labelledby="toc-heading"
      className="mb-10 rounded-xl border border-[#e3e3e3] bg-white p-4 sm:p-5"
    >
      <h2
        id="toc-heading"
        className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#3c535e]"
      >
        On this page
      </h2>
      <ol className="mt-3 grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
        {entries.map((e, i) => (
          <li key={e.id} className="flex gap-2 text-sm leading-relaxed">
            <span className="tabular-nums text-[#5a7079]" aria-hidden>
              {String(i + 1).padStart(2, "0")}
            </span>
            <a
              href={`#${e.id}`}
              className="text-[#176b87] underline decoration-[#176b87]/25 underline-offset-2 hover:text-[#10556d] hover:decoration-[#10556d]"
            >
              {e.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
