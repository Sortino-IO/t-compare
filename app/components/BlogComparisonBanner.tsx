import Link from "next/link";

const COMPARE_PATH = "/testosterone/enclomiphene";

export default function BlogComparisonBanner({ variant = "inline" }: { variant?: "inline" | "end" }) {
  const margin =
    variant === "end"
      ? "mt-12 sm:mt-14 mb-2"
      : "my-12 sm:my-14";

  return (
    <aside
      className={`relative overflow-hidden rounded-2xl border border-[#c6e0d0] bg-gradient-to-br from-[#f0f7f3] to-[#e8f2ec] px-6 py-7 shadow-sm sm:px-8 sm:py-8 ${margin}`}
    >
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#2a6e47]/10 blur-2xl"
        aria-hidden
      />
      <div className="relative">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6daa87]">
          Compare providers
        </p>
        <p className="mt-3 font-[family-name:var(--font-playfair)] text-xl font-semibold leading-snug text-[#1c1917] sm:text-2xl">
          Visit our enclomiphene comparison page
        </p>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#57534e] sm:text-base">
          Review pricing, onboarding, and program details side by side, then choose the option that fits you best.
        </p>
        <Link
          href={COMPARE_PATH}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#2a6e47] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#22593a]"
        >
          Open comparison page
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </aside>
  );
}
