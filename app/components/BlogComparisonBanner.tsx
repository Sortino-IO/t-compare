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

/**
 * In-article pricing/comparison box. The destination is always an on-site
 * comparison or brand page — the outbound merchant hop happens there, so
 * article link equity stays internal.
 */
export default function BlogComparisonBanner({
  variant = "inline",
  cta,
}: {
  variant?: "inline" | "end";
  cta?: BannerCta;
}) {
  const margin = variant === "end" ? "mt-10 mb-2" : "my-10";
  const c = cta ?? DEFAULT_CTA;

  return (
    <aside
      className={`rounded-xl border border-[#bcd9e4] bg-[#eef6f9] p-5 sm:p-6 ${margin}`}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#176b87]">
        {c.eyebrow}
      </p>
      <p className="tc-display mt-2 text-lg font-bold leading-snug sm:text-xl">
        {c.title}
      </p>
      <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-[#3c535e]">
        {c.body}
      </p>
      <Link href={c.href} className="tc-btn tc-btn-primary mt-4">
        {c.buttonLabel}
        <span aria-hidden>→</span>
      </Link>
    </aside>
  );
}
