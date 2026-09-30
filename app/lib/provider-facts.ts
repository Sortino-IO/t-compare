import type { Brand, ProviderFacts } from "./brands";

export type FactTone = "good" | "warn" | "neutral";

export function factToneClass(tone: FactTone): string {
  if (tone === "good") return "tc-fact tc-fact-good";
  if (tone === "warn") return "tc-fact tc-fact-warn";
  return "tc-fact";
}

export function labsTone(facts: ProviderFacts): FactTone {
  if (facts.labs.included === "included" || facts.labs.followupIncluded) return "good";
  if (facts.labs.included === "extra") return "warn";
  return "neutral";
}

export function prescriberTone(facts: ProviderFacts): FactTone {
  return facts.prescriber.value === "physician" ? "good" : "neutral";
}

/** Commitment is the fact most likely to surprise a buyer, so it gets its own tone. */
export function commitment(facts: ProviderFacts): { text: string; tone: FactTone } {
  const { commitmentMonths: months, cadenceMonths } = facts.billing;
  if (months <= 1) return { text: "Cancel anytime", tone: "good" };
  if (months > 3) return { text: `${months}-month commitment`, tone: "warn" };
  if (cadenceMonths >= months) return { text: `${months}-month billing blocks`, tone: "neutral" };
  return { text: `${months}-month minimum`, tone: "warn" };
}

export function hasPublishedPrice(brand: Brand): boolean {
  return !brand.facts || typeof brand.facts.billing.headlineMonthly === "number";
}

/** Whether a 12-month total can be stated without guessing the lab price. */
export function labCostKnown(facts: ProviderFacts): boolean {
  return facts.labs.included === "included" || typeof facts.labs.initialCost === "number";
}

export const COST_HORIZON_MONTHS = 12;

/**
 * Stand-in for lab prices a provider does not publish: TTime lists a Quest
 * testosterone panel at $49 (ttime.men/lp-enclomiphene, Sept 2026). Shared
 * with the calculator so the site never shows two different annual totals.
 */
export const DEFAULT_LAB_COST = 49;
export const DEFAULT_FOLLOWUP_EVERY_MONTHS = 3;

/**
 * Twelve months of medication, any mandatory membership, initial labs, and
 * quarterly follow-up labs unless the plan covers them.
 */
export function annualCostBreakdown(
  facts: ProviderFacts,
): { medication: number; membership: number; labs: number; total: number } | null {
  if (typeof facts.billing.headlineMonthly !== "number") return null;
  const medication = facts.billing.headlineMonthly * COST_HORIZON_MONTHS;
  const membership = (facts.billing.membershipMonthly ?? 0) * COST_HORIZON_MONTHS;
  const followups = facts.labs.followupIncluded
    ? 0
    : Math.floor(COST_HORIZON_MONTHS / DEFAULT_FOLLOWUP_EVERY_MONTHS) * DEFAULT_LAB_COST;
  const labs = (facts.labs.initialCost ?? DEFAULT_LAB_COST) + followups;
  return { medication, membership, labs, total: Math.round(medication + membership + labs) };
}

export function publishedAnnualCost(facts: ProviderFacts): number | null {
  return annualCostBreakdown(facts)?.total ?? null;
}

export type Verdict = {
  id: string;
  title: string;
  brand: Brand;
  detail: string;
};

function withFacts(brands: Brand[]): (Brand & { facts: ProviderFacts })[] {
  return brands.filter((b): b is Brand & { facts: ProviderFacts } => Boolean(b.facts));
}

/** Cheapest first; providers without a published price sort last. */
function byAnnualCost<T extends Brand & { facts: ProviderFacts }>(list: T[]): T[] {
  const cost = (b: T) => publishedAnnualCost(b.facts) ?? Number.POSITIVE_INFINITY;
  return [...list].sort((a, b) => cost(a) - cost(b));
}

/**
 * "Best for" picks derived from verified facts only. Each provider wins at most
 * one pick, and a pick is omitted rather than forced when nobody qualifies.
 */
export function buildVerdicts(brands: Brand[]): Verdict[] {
  const verified = withFacts(brands);
  if (verified.length < 2) return [];
  const verdicts: Verdict[] = [];

  const costed = byAnnualCost(verified.filter((b) => labCostKnown(b.facts)));
  if (costed.length > 0) {
    const cheapest = costed[0]!;
    verdicts.push({
      id: "lowest-cost",
      title: "Lowest 12-month cost",
      brand: cheapest,
      detail: `About $${publishedAnnualCost(cheapest.facts)!.toLocaleString("en-US")} for a year, labs included.`,
    });
  }

  const labsCovered = byAnnualCost(verified.filter((b) => b.facts.labs.followupIncluded));
  const labsPick = labsCovered.find((b) => !verdicts.some((v) => v.brand.slug === b.slug));
  if (labsPick) {
    const annual = publishedAnnualCost(labsPick.facts);
    verdicts.push({
      id: "labs-included",
      title: "Follow-up labs included",
      brand: labsPick,
      detail:
        labsCovered.length === 1
          ? "The only verified provider whose plan covers repeat monitoring labs."
          : `Plan covers repeat monitoring labs${annual ? ` — about $${annual.toLocaleString("en-US")} for a year` : ""}.`,
    });
  }

  const byStates = verified
    .filter((b) => typeof b.facts.states.count === "number")
    .sort((a, b) => (b.facts.states.count ?? 0) - (a.facts.states.count ?? 0));
  const statesPick = byStates[0];
  if (statesPick && !verdicts.some((v) => v.brand.slug === statesPick.slug)) {
    verdicts.push({
      id: "most-states",
      title: "Widest state coverage",
      brand: statesPick,
      detail: statesPick.facts.states.short,
    });
  }

  const flexible = byAnnualCost(verified.filter((b) => b.facts.billing.commitmentMonths <= 1));
  const flexPick = flexible.find((f) => !verdicts.some((v) => v.brand.slug === f.slug));
  if (flexPick) {
    verdicts.push({
      id: "no-commitment",
      title: "No commitment",
      brand: flexPick,
      detail: flexPick.facts.cancellation.short,
    });
  }

  return verdicts;
}
