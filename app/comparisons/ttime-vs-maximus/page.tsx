import type { Metadata } from "next";
import Link from "next/link";
import ComparisonTable, { type ComparisonRow } from "../../components/ComparisonTable";
import { withTtimeAffiliateParams } from "../../lib/affiliate-links";

export const metadata: Metadata = {
  title: "TTime vs Maximus",
  description:
    "Compare TTime vs Maximus for enclomiphene programs: published plan format, starting pricing, and what’s included (with sources).",
};

const sources = {
  ttimeHome: "https://ttime.men/",
  maximusEnclo: "https://www.maximustribe.com/king",
};

export default function TtimeVsMaximusPage() {
  const rows: ComparisonRow[] = [
    {
      label: "Published starting price",
      left: (
        <>
          Published as <strong>$2.3/day</strong> on a <strong>90‑day treatment plan</strong>.
        </>
      ),
      right: (
        <>
          Published as <strong>$99.99/month</strong> for enclomiphene{" "}
          <strong>after the first month</strong> with an <strong>annual commitment</strong>.
        </>
      ),
    },
    {
      label: "Plan / cadence framing",
      left: (
        <>
          TTime markets a <strong>90‑day supply</strong> shipped quarterly with physician review and
          monitoring language on the homepage.
        </>
      ),
      right: (
        <>
          Maximus markets enclomiphene as a <strong>monthly</strong> program on its enclomiphene page,
          with language tied to annual commitment.
        </>
      ),
    },
    {
      label: "What’s included (as published)",
      left: (
        <ul className="list-disc pl-5 space-y-1">
          <li>Physician review & prescription (if approved)</li>
          <li>90‑day supply of oral enclomiphene shipped quarterly</li>
          <li>Monitoring & dose adjustments (as described on the site)</li>
        </ul>
      ),
      right: (
        <ul className="list-disc pl-5 space-y-1">
          <li>Enclomiphene prescription pathway (if approved)</li>
          <li>Free priority shipping (as listed on the enclomiphene page)</li>
          <li>Board-certified doctors (as listed on the enclomiphene page)</li>
        </ul>
      ),
    },
    {
      label: "How to compare totals",
      left: (
        <>
          Because pricing is framed per‑day on a 90‑day plan, compare by building a{" "}
          <strong>90‑day total</strong> including any labs and follow‑ups required at checkout.
        </>
      ),
      right: (
        <>
          If pricing depends on annual commitment and “after first month” promos, compare the{" "}
          <strong>same commitment length</strong> (e.g., 12 months) and not just the headline number.
        </>
      ),
    },
  ];

  return (
    <div className="bg-[#f5f3ee]">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#1c1917] font-[family-name:var(--font-playfair)]">
              TTime vs Maximus
            </h1>
            <p className="mt-3 text-sm sm:text-base text-[#57534e] max-w-2xl leading-relaxed">
              A side-by-side grid that stays grounded in what’s published publicly, with sources.
            </p>
          </div>
          <Link href="/comparisons" className="text-sm font-medium text-[#2a6e47] hover:underline">
            ← All comparisons
          </Link>
        </div>

        <ComparisonTable
          leftName="TTime"
          leftHref="/testosterone/enclomiphene/ttime"
          rightName="Maximus"
          rightHref="/testosterone/enclomiphene/maximus-tribe"
          rows={rows}
        />

        <div className="mt-8 rounded-2xl border border-[#e3dfd6] bg-white p-6">
          <h2 className="text-lg font-semibold text-[#1c1917]">Objective summary</h2>
          <div className="mt-3 grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="rounded-xl border border-[#ede9e0] bg-[#fbfaf7] p-4">
              <div className="text-sm font-semibold text-[#1c1917]">Different pricing frames</div>
              <p className="mt-2 text-sm text-[#57534e] leading-relaxed">
                TTime markets a <strong>90‑day plan</strong> and shows cost per day. Maximus markets
                an enclomiphene price that references <strong>annual commitment</strong> and “after the
                first month”. Put both on the same timeline before comparing.
              </p>
            </div>
            <div className="rounded-xl border border-[#ede9e0] bg-[#fbfaf7] p-4">
              <div className="text-sm font-semibold text-[#1c1917]">What’s most likely to change</div>
              <ul className="mt-2 list-disc pl-5 text-sm text-[#57534e] space-y-1.5">
                <li>Promos (“first month” discounts) and commitment terms</li>
                <li>Required labs and how often they’re repeated</li>
                <li>What “monitoring” includes (messaging, follow‑ups, dose adjustments)</li>
              </ul>
            </div>
            <div className="rounded-xl border border-[#ede9e0] bg-[#fbfaf7] p-4">
              <div className="text-sm font-semibold text-[#1c1917]">How to decide quickly</div>
              <p className="mt-2 text-sm text-[#57534e] leading-relaxed">
                If you prefer a quarterly cadence, compare a single 90‑day cycle to the first 90 days
                of the alternative. If you’re evaluating longer‑term membership, compare <strong>12 months</strong>{" "}
                including any required follow‑up testing.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-[#e3dfd6] bg-white p-6">
          <h2 className="text-lg font-semibold text-[#1c1917]">Sources</h2>
          <ul className="mt-3 space-y-2 text-sm text-[#57534e]">
            <li>
              TTime homepage:{" "}
              <a
                className="text-[#2a6e47] hover:underline"
                href={withTtimeAffiliateParams(sources.ttimeHome)}
              >
                {sources.ttimeHome}
              </a>
            </li>
            <li>
              Maximus enclomiphene pricing page:{" "}
              <a className="text-[#2a6e47] hover:underline" href={sources.maximusEnclo}>
                {sources.maximusEnclo}
              </a>
            </li>
          </ul>
          <p className="mt-4 text-xs text-[#78716c] leading-relaxed">
            Prices and inclusions can change. Verify the current totals directly with each provider.
          </p>
        </div>
      </div>
    </div>
  );
}

