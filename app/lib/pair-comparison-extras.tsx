import type { ComparisonRow } from "../components/ComparisonTable";
import { withTtimeAffiliateParams } from "./affiliate-links";

export type PairComparisonExtras = {
  /** Appended after the default snapshot rows (columns follow alphabetical provider name order). */
  rows: ComparisonRow[];
  /** Shown under Sources - educational / verification links beyond each brand’s primary URLs. */
  extraSources?: { label: string; href: string }[];
};

/**
 * Richer, pair-specific rows migrated from legacy `/comparisons/*` long-form pages.
 * Left/right columns match `compare/[pair]`: providers sorted alphabetically by **display name**.
 */
export function getPairComparisonExtras(canonicalPairSlug: string): PairComparisonExtras | null {
  switch (canonicalPairSlug) {
    case "hims-vs-ttime":
      return himsVsTtime;
    case "maximus-tribe-vs-ttime":
      return maximusTribeVsTtime;
    case "hims-vs-maximus-tribe":
      return himsVsMaximusTribe;
    default:
      return null;
  }
}

/** Left = Hims, Right = TTime */
const himsVsTtime: PairComparisonExtras = {
  rows: [
    {
      label: "Published starting price (detail)",
      left: (
        <>
          Published as <strong>$99/month</strong> starting price on a <strong>10‑month plan</strong>, with
          other options listed at <strong>$139/month (5‑month)</strong> and{" "}
          <strong>$199/month (3‑month)</strong>.
        </>
      ),
      right: (
        <>
          Published as <strong>$2.3/day</strong> for a <strong>90‑day treatment plan</strong> on the homepage.
          (Convert to a monthly equivalent only as an estimate.)
        </>
      ),
    },
    {
      label: "Plan structure",
      left: (
        <>
          Marketed as <strong>3‑, 5‑, or 10‑month plans</strong> with all‑inclusive pricing language on Hims
          materials.
        </>
      ),
      right: (
        <>
          Marketed as a <strong>90‑day plan</strong> with physician review and quarterly supply.
        </>
      ),
    },
    {
      label: "What’s included (as published)",
      left: (
        <ul className="list-disc pl-5 space-y-1">
          <li>Medication</li>
          <li>Ongoing lab work</li>
          <li>Provider messaging</li>
          <li>Free, discreet shipping</li>
        </ul>
      ),
      right: (
        <ul className="list-disc pl-5 space-y-1">
          <li>Physician review & prescription (if approved)</li>
          <li>90‑day supply of oral enclomiphene shipped quarterly</li>
          <li>Monitoring & dose adjustments (as described on the site)</li>
        </ul>
      ),
    },
    {
      label: "Notes for comparison",
      left: (
        <>
          Hims publishes plan‑length pricing and also states an <strong>initial lab kit cost</strong> in some
          materials. Use the plan length you’d actually buy (3 vs 10 months) because it changes the effective
          monthly rate.
        </>
      ),
      right: (
        <>
          TTime’s headline price is presented as “per day” on a 90‑day plan. To compare fairly, model your{" "}
          <strong>first 90 days</strong> including any labs, shipping, and follow‑ups specified at checkout.
        </>
      ),
    },
  ],
  extraSources: [
    {
      label: "Hims pricing context (Hims vs Hone article)",
      href: "https://www.hims.com/blog/hims-vs-hone",
    },
    {
      label: "Hims testosterone program overview",
      href: "https://www.hims.com/testosterone",
    },
    {
      label: "TTime homepage",
      href: withTtimeAffiliateParams("https://ttime.men/"),
    },
  ],
};

/** Left = Maximus Tribe, Right = TTime */
const maximusTribeVsTtime: PairComparisonExtras = {
  rows: [
    {
      label: "Published starting price (detail)",
      left: (
        <>
          Published as <strong>$99.99/month</strong> for enclomiphene <strong>after the first month</strong> with an{" "}
          <strong>annual commitment</strong>.
        </>
      ),
      right: (
        <>
          Published as <strong>$2.3/day</strong> on a <strong>90‑day treatment plan</strong>.
        </>
      ),
    },
    {
      label: "Plan / cadence framing",
      left: (
        <>
          Maximus markets enclomiphene as a <strong>monthly</strong> program on its enclomiphene page, with language
          tied to annual commitment.
        </>
      ),
      right: (
        <>
          TTime markets a <strong>90‑day supply</strong> shipped quarterly with physician review and monitoring
          language on the homepage.
        </>
      ),
    },
    {
      label: "What’s included (as published)",
      left: (
        <ul className="list-disc pl-5 space-y-1">
          <li>Enclomiphene prescription pathway (if approved)</li>
          <li>Free priority shipping (as listed on the enclomiphene page)</li>
          <li>Board-certified doctors (as listed on the enclomiphene page)</li>
        </ul>
      ),
      right: (
        <ul className="list-disc pl-5 space-y-1">
          <li>Physician review & prescription (if approved)</li>
          <li>90‑day supply of oral enclomiphene shipped quarterly</li>
          <li>Monitoring & dose adjustments (as described on the site)</li>
        </ul>
      ),
    },
    {
      label: "How to compare totals",
      left: (
        <>
          If pricing depends on annual commitment and “after first month” promos, compare the{" "}
          <strong>same commitment length</strong> (e.g., 12 months) and not just the headline number.
        </>
      ),
      right: (
        <>
          Because pricing is framed per‑day on a 90‑day plan, compare by building a <strong>90‑day total</strong>{" "}
          including any labs and follow‑ups required at checkout.
        </>
      ),
    },
  ],
  extraSources: [
    { label: "Maximus enclomiphene pricing page", href: "https://www.maximustribe.com/king" },
    { label: "TTime homepage", href: withTtimeAffiliateParams("https://ttime.men/") },
  ],
};

/** Left = Hims, Right = Maximus Tribe */
const himsVsMaximusTribe: PairComparisonExtras = {
  rows: [
    {
      label: "Published starting price (detail)",
      left: (
        <>
          Hims publishes a starting price of <strong>$99/month</strong> for a <strong>10‑month plan</strong>, with{" "}
          <strong>$139/month (5‑month)</strong> and <strong>$199/month (3‑month)</strong> options listed.
        </>
      ),
      right: (
        <>
          Maximus publishes <strong>$99.99/month</strong> for enclomiphene <strong>after the first month</strong> with
          an <strong>annual commitment</strong> on its enclomiphene page.
        </>
      ),
    },
    {
      label: "Commitment & billing",
      left: (
        <>
          Hims frames pricing by <strong>plan length</strong> (3 / 5 / 10 months) with a lower monthly number at longer
          commitments.
        </>
      ),
      right: (
        <>
          Enclomiphene pricing is shown in the context of an <strong>annual commitment</strong> on the Maximus page (and
          references “after the first month”).
        </>
      ),
    },
    {
      label: "Treatments mentioned",
      left: (
        <>
          Hims markets enclomiphene-based prescriptions for testosterone support (including a combination option with
          tadalafil in published materials).
        </>
      ),
      right: (
        <>
          Maximus markets enclomiphene as one of several testosterone treatment formats (their site also lists
          injectable, oral testosterone, and cream options in navigation).
        </>
      ),
    },
    {
      label: "How to compare fairly",
      left: (
        <>
          Use the plan length you’d actually buy: a 3‑month Hims plan and a 10‑month Hims plan can have very different
          effective monthly pricing.
        </>
      ),
      right: (
        <>
          If the Maximus price you qualify for depends on annual commitment or first-month promos, compare using the{" "}
          <strong>same time horizon</strong> (e.g., 3 months or 12 months).
        </>
      ),
    },
    {
      label: "Third‑party editorial note",
      left: (
        <>
          Sponsored/editorial comparisons can be useful for discovering questions to ask, but prices and inclusions
          should be verified on the provider’s own pages.
        </>
      ),
      right: (
        <>
          A third‑party comparison article states it is “in partnership with Maximus” and includes its own claims and
          scoring; treat it as editorial/sponsored content, not a primary source.
        </>
      ),
    },
  ],
  extraSources: [
    { label: "Maximus enclomiphene pricing page", href: "https://www.maximustribe.com/king" },
    {
      label: "Hims pricing context (Hims vs Hone article)",
      href: "https://www.hims.com/blog/hims-vs-hone",
    },
    {
      label: "Example third‑party comparison (sponsored disclosure on page)",
      href: "https://www.trueself.com/hims-vs-maximus-which-platform-delivers-the-most-effective-testosterone-care",
    },
  ],
};
