import type { Metadata } from "next";
import Link from "next/link";
import ComparisonTable, { type ComparisonRow } from "../../components/ComparisonTable";

export const metadata: Metadata = {
  title: "Maximus vs Hims",
  description:
    "Compare Maximus vs Hims: published enclomiphene pricing structure, plan commitments, and what each provider says is included (with sources).",
};

const sources = {
  maximusEnclo: "https://www.maximustribe.com/king",
  himsVsHone: "https://www.hims.com/blog/hims-vs-hone",
  trueselfArticle:
    "https://www.trueself.com/hims-vs-maximus-which-platform-delivers-the-most-effective-testosterone-care",
};

export default function MaximusVsHimsPage() {
  const rows: ComparisonRow[] = [
    {
      label: "Published starting price",
      left: (
        <>
          Maximus publishes <strong>$99.99/month</strong> for enclomiphene{" "}
          <strong>after the first month</strong> with an <strong>annual commitment</strong> on its
          enclomiphene page.
        </>
      ),
      right: (
        <>
          Hims publishes a starting price of <strong>$99/month</strong> for a{" "}
          <strong>10‑month plan</strong>, with <strong>$139/month (5‑month)</strong> and{" "}
          <strong>$199/month (3‑month)</strong> options listed.
        </>
      ),
    },
    {
      label: "Commitment & billing",
      left: (
        <>
          Enclomiphene pricing is shown in the context of an <strong>annual commitment</strong> on the
          Maximus page (and references “after the first month”).
        </>
      ),
      right: (
        <>
          Hims frames pricing by <strong>plan length</strong> (3 / 5 / 10 months) with a lower monthly
          number at longer commitments.
        </>
      ),
    },
    {
      label: "Treatments mentioned",
      left: (
        <>
          Maximus markets enclomiphene as one of several testosterone treatment formats (their site
          also lists injectable, oral testosterone, and cream options in navigation).
        </>
      ),
      right: (
        <>
          Hims markets enclomiphene-based prescriptions for testosterone support (including a
          combination option with tadalafil in published materials).
        </>
      ),
    },
    {
      label: "How to compare fairly",
      left: (
        <>
          If the Maximus price you qualify for depends on annual commitment or first-month promos,
          compare using the <strong>same time horizon</strong> (e.g., 3 months or 12 months).
        </>
      ),
      right: (
        <>
          Use the plan length you’d actually buy: a 3‑month Hims plan and a 10‑month Hims plan can
          have very different effective monthly pricing.
        </>
      ),
    },
    {
      label: "Third‑party editorial note",
      left: (
        <>
          A third‑party comparison article states it is “in partnership with Maximus” and includes
          its own claims and scoring; treat it as editorial/sponsored content, not a primary source.
        </>
      ),
      right: (
        <>
          Same note: sponsored/editorial comparisons can be useful for discovering questions to ask,
          but prices and inclusions should be verified on the provider’s own pages.
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
              Maximus vs Hims
            </h1>
            <p className="mt-3 text-sm sm:text-base text-[#57534e] max-w-2xl leading-relaxed">
              This page focuses on the parts you can validate quickly: published pricing, commitment
              structure, and what each provider says is included.
            </p>
          </div>
          <Link href="/comparisons" className="text-sm font-medium text-[#2a6e47] hover:underline">
            ← All comparisons
          </Link>
        </div>

        <ComparisonTable
          leftName="Maximus"
          leftHref="/testosterone/enclomiphene/maximus-tribe"
          rightName="Hims"
          rightHref="/testosterone/enclomiphene/hims"
          rows={rows}
        />

        <div className="mt-8 rounded-2xl border border-[#e3dfd6] bg-white p-6">
          <h2 className="text-lg font-semibold text-[#1c1917]">Sources</h2>
          <ul className="mt-3 space-y-2 text-sm text-[#57534e]">
            <li>
              Maximus enclomiphene pricing page:{" "}
              <a className="text-[#2a6e47] hover:underline" href={sources.maximusEnclo}>
                {sources.maximusEnclo}
              </a>
            </li>
            <li>
              Hims pricing and inclusions (Hims vs Hone article):{" "}
              <a className="text-[#2a6e47] hover:underline" href={sources.himsVsHone}>
                {sources.himsVsHone}
              </a>
            </li>
            <li>
              Example third‑party comparison (sponsored disclosure on page):{" "}
              <a className="text-[#2a6e47] hover:underline" href={sources.trueselfArticle}>
                {sources.trueselfArticle}
              </a>
            </li>
          </ul>
          <p className="mt-4 text-xs text-[#78716c] leading-relaxed">
            This is not medical advice. Prices and eligibility can change by state, labs, and plan
            length; confirm current totals on each provider’s checkout.
          </p>
        </div>
      </div>
    </div>
  );
}

