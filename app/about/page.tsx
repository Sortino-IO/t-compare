import type { Metadata } from "next";
import Link from "next/link";
import { OG_BASE, SITE_URL } from "../lib/site";

export const metadata: Metadata = {
  title: "About T-Compare: How We Compare Providers",
  description:
    "Learn how T-Compare researches testosterone and enclomiphene providers, how listings are built, and how to use our comparisons to make smarter decisions.",
  openGraph: {
    ...OG_BASE,
    title: "About T-Compare: How We Compare Providers",
    description:
      "Learn how T-Compare researches testosterone and enclomiphene providers, how listings are built, and how to use our comparisons to make smarter decisions.",
    url: `${SITE_URL}/about`,
  },
  twitter: {
    card: "summary_large_image",
    title: "About T-Compare: How We Compare Providers",
    description:
      "Learn how T-Compare researches testosterone and enclomiphene providers, how listings are built, and how to use our comparisons to make smarter decisions.",
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
      <nav className="flex items-center gap-2 text-sm text-[#5f757f] mb-10">
        <Link href="/" className="hover:text-[#176b87] hover:underline">Home</Link>
        <span>/</span>
        <span className="text-[#53666e]">About</span>
      </nav>

      <div className="max-w-2xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#176b87] mb-4">
          About
        </p>
        <h1 className="tc-display text-[1.75rem] font-bold leading-tight sm:text-4xl mb-10">
          About T-Compare
        </h1>

        <div className="rounded-xl bg-white border border-[#e3e3e3] overflow-hidden">
          <div className="px-7 py-6 border-b border-[#ededed]">
            <p className="text-[11px] font-semibold text-[#5f757f] uppercase tracking-[0.12em] mb-3">
              What is T-Compare?
            </p>
            <p className="text-sm text-[#3c535e] leading-relaxed">
              T-Compare is an informational website that helps users browse
              publicly available information about testosterone-related providers
              and programs in one place.
            </p>
            <p className="mt-3 text-sm text-[#3c535e] leading-relaxed">
              We do not provide medical advice, diagnosis, or treatment.
            </p>
            <p className="mt-3 text-sm text-[#3c535e] leading-relaxed">
              Information is based on publicly available sources and may change
              over time.
            </p>
          </div>

          <div className="px-7 py-6 border-b border-[#ededed]">
            <p className="text-[11px] font-semibold text-[#5f757f] uppercase tracking-[0.12em] mb-3">
              How it works
            </p>
            <p className="text-sm text-[#3c535e] leading-relaxed">
              We collect and display publicly available pricing and program
              information from online providers. All information shown is for
              reference only. Prices, availability, and program details change
              frequently - always verify directly with each provider.
            </p>
          </div>

          <div className="px-7 py-6 border-b border-[#ededed]">
            <p className="text-[11px] font-semibold text-[#5f757f] uppercase tracking-[0.12em] mb-3">
              Independence
            </p>
            <p className="text-sm text-[#3c535e] leading-relaxed">
              T-Compare is independent and does not endorse or recommend any
              specific provider, product, or treatment. Some links may be
              affiliate links, which are clearly disclosed on relevant pages.
            </p>
          </div>

          <div className="px-7 py-6">
            <p className="text-[11px] font-semibold text-[#5f757f] uppercase tracking-[0.12em] mb-3">
              Medical disclaimer
            </p>
            <p className="text-sm text-[#3c535e] leading-relaxed">
              Nothing on this site constitutes medical advice, diagnosis, or
              treatment. Always consult a qualified healthcare provider before
              starting, stopping, or changing any treatment or program.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
