import Link from "next/link";

const DEFAULT_CTA = {
  eyebrow: "Compare providers",
  title: "Visit our enclomiphene comparison page",
  body: "Review pricing, onboarding, and program details side by side, then choose the option that fits you best.",
  buttonLabel: "Open comparison page",
  href: "/testosterone/enclomiphene",
};

export type BannerCta = {
  eyebrow: string;
  title: string;
  body: string;
  buttonLabel: string;
  href: string;
};

export default function BlogComparisonBanner({
  variant = "inline",
  cta,
}: {
  variant?: "inline" | "end";
  cta?: BannerCta;
}) {
  const margin =
    variant === "end"
      ? "mt-12 sm:mt-14 mb-2"
      : "my-12 sm:my-14";

  const c = cta ?? DEFAULT_CTA;

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
          {c.eyebrow}
        </p>
        <p className="mt-3 font-[family-name:var(--font-playfair)] text-xl font-semibold leading-snug text-[#1c1917] sm:text-2xl">
          {c.title}
        </p>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#57534e] sm:text-base">
          {c.body}
        </p>
        <Link
          href={c.href}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#2a6e47] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#22593a]"
        >
          {c.buttonLabel}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </aside>
  );
}
