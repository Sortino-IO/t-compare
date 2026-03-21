import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllBrands, getBrandBySlug } from "../../../lib/brands";

type Props = {
  params: Promise<{ brand: string }>;
};

export async function generateStaticParams() {
  const brands = getAllBrands();
  return brands.map((b) => ({ brand: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brand: slug } = await params;
  const brand = getBrandBySlug(slug);

  if (!brand) {
    return { title: "Provider not found" };
  }

  return {
    title: `${brand.name} — Enclomiphene Provider Details`,
    description: `View protocol, pricing, lab requirements, and delivery details for ${brand.name}. Monthly price starting at $${brand.price_monthly}.`,
  };
}

export default async function BrandPage({ params }: Props) {
  const { brand: slug } = await params;
  const brand = getBrandBySlug(slug);

  if (!brand) {
    notFound();
  }

  const savings = brand.price_retail - brand.price_monthly;
  const savingsPct = Math.round((savings / brand.price_retail) * 100);
  const annualSavings = savings * 12;

  const details: { label: string; value: string }[] = [
    { label: "Protocol", value: brand.protocol },
    { label: "Labs required", value: brand.labs_required },
    { label: "Delivery", value: brand.delivery },
    { label: "Notes", value: brand.notes },
  ];

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[#a8a29e] mb-12 flex-wrap">
        <Link href="/" className="hover:text-[#1c1917] transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link
          href="/testosterone"
          className="hover:text-[#1c1917] transition-colors"
        >
          Testosterone
        </Link>
        <span>/</span>
        <Link
          href="/testosterone/enclomiphene"
          className="hover:text-[#1c1917] transition-colors"
        >
          Enclomiphene
        </Link>
        <span>/</span>
        <span className="text-[#78716c]">{brand.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1fr_340px] items-start">
        {/* Left column — details */}
        <div>
          <p className="text-xs font-medium tracking-[0.15em] text-[#a8a29e] uppercase mb-3">
            Enclomiphene Provider
          </p>
          <h1 className="font-[family-name:var(--font-playfair)] text-5xl font-semibold text-[#1c1917] leading-tight mb-8">
            {brand.name}
          </h1>

          {/* Detail rows */}
          <div className="rounded-2xl bg-white border border-[#e3dfd6] overflow-hidden shadow-sm mb-8">
            {details.map((item, i) => (
              <div
                key={item.label}
                className={`flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-8 px-7 py-5 ${
                  i < details.length - 1 ? "border-b border-[#f0ece4]" : ""
                }`}
              >
                <span className="text-xs font-semibold text-[#a8a29e] uppercase tracking-wide sm:w-32 shrink-0 pt-0.5">
                  {item.label}
                </span>
                <span className="text-sm text-[#44403c] leading-relaxed">
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a
            href={brand.affiliate_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-xl bg-[#2a6e47] px-7 py-3.5 text-sm font-medium text-white hover:bg-[#22593a] transition-colors shadow-sm"
          >
            Visit {brand.name}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
          <p className="mt-3 text-xs text-[#a8a29e]">
            External link. No affiliation with {brand.name}.
          </p>
        </div>

        {/* Right column — pricing card */}
        <div className="flex flex-col gap-4">
          {/* Price card */}
          <div className="rounded-2xl bg-white border border-[#e3dfd6] p-7 shadow-sm">
            <p className="text-xs font-medium tracking-[0.12em] text-[#a8a29e] uppercase mb-4">
              Starting from
            </p>
            <div className="flex items-baseline gap-1 mb-1 flex-wrap">
              <span className="text-base text-[#78716c]">From</span>
              <span className="font-[family-name:var(--font-playfair)] text-5xl font-semibold text-[#2a6e47] tabular-nums leading-none">
                ${brand.price_monthly}
              </span>
              <span className="text-base text-[#78716c]">/mo</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm text-[#a8a29e] line-through tabular-nums">
                ${brand.price_retail}/mo
              </span>
              <span className="text-xs font-semibold text-[#2a6e47] bg-[#eaf3ee] px-2 py-0.5 rounded-full">
                {savingsPct}% off
              </span>
            </div>
          </div>

          {/* Savings card */}
          <div className="rounded-2xl bg-[#eaf3ee] border border-[#c6e0d0] p-7">
            <p className="text-xs font-medium tracking-[0.12em] text-[#4a9970] uppercase mb-5">
              Estimated savings
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#44403c]">Standard price</span>
                <span className="text-sm text-[#78716c] line-through tabular-nums">
                  ${brand.price_retail}/mo
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[#1c1917]">
                  This provider
                </span>
                <span className="text-sm font-semibold text-[#2a6e47] tabular-nums">
                  From ${brand.price_monthly}/mo
                </span>
              </div>
              <div className="border-t border-[#b8d9c6] pt-3 flex items-center justify-between">
                <span className="text-sm font-semibold text-[#1c1917]">
                  Monthly savings
                </span>
                <span className="text-sm font-semibold text-[#2a6e47] tabular-nums">
                  ${savings}/mo
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#44403c]">Annual savings</span>
                <span className="text-sm font-semibold text-[#2a6e47] tabular-nums">
                  ${annualSavings}/yr
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-14 pt-10 border-t border-[#e3dfd6] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Link
          href="/testosterone/enclomiphene"
          className="text-sm text-[#78716c] hover:text-[#1c1917] transition-colors"
        >
          ← Back to all enclomiphene providers
        </Link>
        <p className="text-xs text-[#a8a29e] sm:text-right max-w-sm">
          Pricing is indicative and may vary based on consultation and dosage.
        </p>
      </div>
    </div>
  );
}
