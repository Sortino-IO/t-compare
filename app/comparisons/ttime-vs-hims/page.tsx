import type { Metadata } from "next";
import Link from "next/link";
import ComparisonTable, { type ComparisonRow } from "../../components/ComparisonTable";
import { withTtimeAffiliateParams } from "../../lib/affiliate-links";

export const metadata: Metadata = {
  title: "TTime vs Hims",
  description:
    "Compare TTime vs Hims for enclomiphene-based testosterone Rx programs: published pricing structure, what’s included, and sources.",
};

const sources = {
  ttimeHome: "https://ttime.men/",
  himsVsHone: "https://www.hims.com/blog/hims-vs-hone",
  himsTestosterone: "https://www.hims.com/testosterone",
};

export default function TtimeVsHimsPage() {
  const rows: ComparisonRow[] = [
    {
      label: "Published starting price",
      left: (
        <>
          Published as <strong>$2.3/day</strong> for a <strong>90‑day treatment plan</strong> on the
          homepage. (Convert to a monthly equivalent only as an estimate.)
        </>
      ),
      right: (
        <>
          Published as <strong>$99/month</strong> starting price on a <strong>10‑month plan</strong>,
          with other options listed at <strong>$139/month (5‑month)</strong> and{" "}
          <strong>$199/month (3‑month)</strong>.
        </>
      ),
    },
    {
      label: "Plan structure",
      left: (
        <>
          Marketed as a <strong>90‑day plan</strong> with physician review and quarterly supply.
        </>
      ),
      right: (
        <>
          Marketed as <strong>3-, 5-, or 10‑month plans</strong> with all‑inclusive pricing language
          on Hims materials.
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
          <li>Medication</li>
          <li>Ongoing lab work</li>
          <li>Provider messaging</li>
          <li>Free, discreet shipping</li>
        </ul>
      ),
    },
    {
      label: "Notes for comparison",
      left: (
        <>
          TTime’s headline price is presented as “per day” on a 90‑day plan. To compare fairly, model
          your <strong>first 90 days</strong> including any labs, shipping, and follow‑ups specified at
          checkout.
        </>
      ),
      right: (
        <>
          Hims publishes plan‑length pricing and also states an <strong>initial lab kit cost</strong>{" "}
          in some materials. Use the plan length you’d actually buy (3 vs 10 months) because it
          changes the effective monthly rate.
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
              TTime vs Hims
            </h1>
            <p className="mt-3 text-sm sm:text-base text-[#57534e] max-w-2xl leading-relaxed">
              A structured, source-backed comparison focused on items you can verify: published prices,
              plan structure, and what’s included.
            </p>
          </div>
          <Link href="/comparisons" className="text-sm font-medium text-[#2a6e47] hover:underline">
            ← All comparisons
          </Link>
        </div>

        <ComparisonTable
          leftName="TTime"
          leftHref="/testosterone/enclomiphene/ttime"
          rightName="Hims"
          rightHref="/testosterone/enclomiphene/hims"
          rows={rows}
        />

        <div className="mt-8 rounded-2xl border border-[#e3dfd6] bg-white p-6">
          <h2 className="text-lg font-semibold text-[#1c1917]">Objective summary</h2>
          <div className="mt-3 grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="rounded-xl border border-[#ede9e0] bg-[#fbfaf7] p-4">
              <div className="text-sm font-semibold text-[#1c1917]">The pricing headline</div>
              <p className="mt-2 text-sm text-[#57534e] leading-relaxed">
                TTime frames cost as <strong>$2.3/day</strong> on a 90‑day plan, while Hims frames it
                as <strong>$99/month</strong> starting on a 10‑month plan. The “cheapest” option can
                flip once you compare the same time horizon and add any required testing.
              </p>
            </div>
            <div className="rounded-xl border border-[#ede9e0] bg-[#fbfaf7] p-4">
              <div className="text-sm font-semibold text-[#1c1917]">What to model (90‑day total)</div>
              <ul className="mt-2 list-disc pl-5 text-sm text-[#57534e] space-y-1.5">
                <li>Upfront labs / test kit cost (and whether follow‑ups are included)</li>
                <li>Shipping fees (if any) and refill cadence</li>
                <li>What counts as “included” support (messaging, follow‑ups, dose changes)</li>
              </ul>
            </div>
            <div className="rounded-xl border border-[#ede9e0] bg-[#fbfaf7] p-4">
              <div className="text-sm font-semibold text-[#1c1917]">A practical decision rule</div>
              <p className="mt-2 text-sm text-[#57534e] leading-relaxed">
                If you want to minimize commitment, compare Hims’ shortest plan to a single 90‑day
                cycle. If you’re comfortable committing longer to reduce the monthly rate, compare
                <strong> 12 months vs 12 months</strong> (not month‑one promos).
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
              Hims pricing and inclusions (Hims vs Hone article):{" "}
              <a className="text-[#2a6e47] hover:underline" href={sources.himsVsHone}>
                {sources.himsVsHone}
              </a>
            </li>
            <li>
              Hims testosterone program overview:{" "}
              <a className="text-[#2a6e47] hover:underline" href={sources.himsTestosterone}>
                {sources.himsTestosterone}
              </a>
            </li>
          </ul>
          <p className="mt-4 text-xs text-[#78716c] leading-relaxed">
            Prices and inclusions can change. Always confirm eligibility, lab requirements, and total
            out‑of‑pocket cost on the provider’s checkout flow.
          </p>
        </div>
      </div>
    </div>
  );
}

