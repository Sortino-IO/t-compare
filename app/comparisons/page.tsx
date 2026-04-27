import type { Metadata } from "next";
import Link from "next/link";
import { getAllBrands } from "../lib/brands";
import ComparisonPairsGrid from "../components/ComparisonPairsGrid";

export const metadata: Metadata = {
  title: "Comparisons",
  description:
    "Side-by-side comparisons of testosterone-related providers using publicly available information and cited sources.",
};

function allPairs() {
  const brands = getAllBrands();
  const out: { title: string; href: string; description: string }[] = [];
  for (let i = 0; i < brands.length; i++) {
    for (let j = i + 1; j < brands.length; j++) {
      const a = brands[i]!;
      const b = brands[j]!;
      out.push({
        title: `${a.name} vs ${b.name}`,
        href: `/comparisons/${[a.slug, b.slug].sort().join("-vs-")}`,
        description: `Compare ${a.name} and ${b.name} side-by-side.`,
      });
    }
  }
  return out;
}

export default function ComparisonsIndexPage() {
  const pairs = allPairs();
  return (
    <div className="bg-[#f5f3ee]">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1c1917] font-[family-name:var(--font-playfair)]">
          Comparisons
        </h1>
        <p className="mt-3 text-sm sm:text-base text-[#57534e] max-w-3xl leading-relaxed">
          If you’re comparing testosterone-related telehealth providers, the “$X/mo” headline is only a
          starting point. The real differences usually show up in total 90‑day cost, lab/testing requirements,
          commitment length, what’s included (medication, follow‑ups, messaging, shipping), and how flexible
          the program is if your plan needs adjustments.
        </p>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-[#e3dfd6] bg-white p-5">
            <div className="text-sm font-semibold text-[#1c1917]">What to compare first</div>
            <ul className="mt-3 list-disc pl-5 text-sm text-[#57534e] space-y-2">
              <li>
                <span className="font-medium text-[#1c1917]">Total cost over 90 days</span> (not just monthly)
              </li>
              <li>
                <span className="font-medium text-[#1c1917]">Labs & testing</span> (initial kit, follow‑ups, cadence)
              </li>
              <li>
                <span className="font-medium text-[#1c1917]">Plan length</span> (3 vs 10 months vs annual commitment)
              </li>
              <li>
                <span className="font-medium text-[#1c1917]">What’s included</span> (visits, messaging, shipping)
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-[#e3dfd6] bg-white p-5">
            <div className="text-sm font-semibold text-[#1c1917]">Questions worth asking</div>
            <ul className="mt-3 list-disc pl-5 text-sm text-[#57534e] space-y-2">
              <li>What does “starting at” assume (commitment, promos, dose)?</li>
              <li>Are labs included or billed separately (and how often)?</li>
              <li>What happens if you need a dose change—does the pricing reset?</li>
              <li>Is a live visit required, or is care primarily async messaging?</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-[#e3dfd6] bg-white p-5">
            <div className="text-sm font-semibold text-[#1c1917]">A quick reality check</div>
            <p className="mt-3 text-sm text-[#57534e] leading-relaxed">
              Most people are better served by comparing <span className="font-medium text-[#1c1917]">the same time horizon</span>{" "}
              across providers (e.g., 90 days or 12 months) and reading the fine print for what the plan actually
              includes. Our pages link out so you can verify details on the provider’s site.
            </p>
          </div>
        </div>

        <ComparisonPairsGrid pairs={pairs} />
      </div>
    </div>
  );
}

