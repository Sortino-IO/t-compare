import type { Metadata } from "next";
import Link from "next/link";
import {
  getLandingPagesDirectory,
  getLandingPagesDirectoryStats,
} from "../../lib/landing-pages-directory";
import { SITE_URL } from "../../lib/site";

const PAGE_PATH = "/internal/landing-pages";

export const metadata: Metadata = {
  title: { absolute: "Landing Pages — Internal" },
  description: "Unlisted index of affiliate landing pages. Not for public indexing.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function InternalLandingPagesIndex() {
  const groups = getLandingPagesDirectory();
  const stats = getLandingPagesDirectoryStats(groups);
  const bookmarkUrl = `${SITE_URL}${PAGE_PATH}`;

  return (
    <div className="mx-auto max-w-4xl px-6 py-10 sm:py-14">
      <div className="rounded-xl border border-amber-200/80 bg-amber-50/90 px-4 py-3 text-sm text-amber-950">
        <p className="font-semibold">Internal only — unlisted</p>
        <p className="mt-1 text-amber-900/90 leading-relaxed">
          This page is not linked from the site menu or sitemap. Share the URL only with your team.
          Search engines are asked not to index it.
        </p>
      </div>

      <header className="mt-8 mb-10">
        <p className="text-[11px] font-semibold tracking-[0.2em] text-[#a8a29e] uppercase mb-2">
          T-Compare · Internal
        </p>
        <h1 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-semibold text-[#1c1917] tracking-tight">
          Landing pages directory
        </h1>
        <p className="mt-3 text-sm text-[#78716c] leading-relaxed max-w-2xl">
          {stats.offerPages} offer pages · {stats.woodworkingArticles} woodworking articles ·{" "}
          {stats.totalLinks} links below
        </p>
        <p className="mt-4 text-xs text-[#b5b0a8] font-mono break-all">{bookmarkUrl}</p>
      </header>

      <div className="flex flex-col gap-10">
        {groups.map((group) => (
          <section key={group.id} aria-labelledby={`group-${group.id}`}>
            <div className="mb-4">
              <h2
                id={`group-${group.id}`}
                className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-[#1c1917]"
              >
                {group.label}
              </h2>
              <p className="mt-1 text-sm text-[#78716c]">{group.description}</p>
            </div>

            <ul className="flex flex-col gap-2">
              {group.entries.map((entry) => (
                <li key={entry.href}>
                  <Link
                    href={entry.href}
                    className="group flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-xl border border-[#e3dfd6] bg-white px-4 py-3.5 shadow-sm hover:border-[#8fbc9e] hover:shadow-md transition-all"
                  >
                    <div className="min-w-0 flex-1">
                      <span className="block font-medium text-[#1c1917] group-hover:text-[#2a6e47] transition-colors truncate">
                        {entry.title}
                      </span>
                      <span className="block text-xs text-[#a8a29e] mt-0.5 truncate">{entry.subtitle}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {entry.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex rounded-full bg-[#f0f7f3] border border-[#c6e0d0] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#2a6e47]"
                        >
                          {tag}
                        </span>
                      ))}
                      <span className="text-xs font-mono text-[#b5b0a8] hidden sm:inline">{entry.href}</span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 12 12"
                        fill="none"
                        className="text-[#2a6e47] shrink-0"
                        aria-hidden="true"
                      >
                        <path
                          d="M2.5 6h7M6.5 3l3 3-3 3"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <p className="mt-12 text-xs text-[#b5b0a8] leading-relaxed border-t border-[#e3dfd6] pt-6">
        LP routes use minimal chrome (no site header). Woodworking articles live under{" "}
        <code className="text-[#78716c]">/lp/woodworking/…</code>. Offer LPs under{" "}
        <code className="text-[#78716c]">/lp/[slug]</code>.
      </p>
    </div>
  );
}
