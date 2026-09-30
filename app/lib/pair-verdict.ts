import type { Brand, ProviderFacts } from "./brands";
import { annualCostBreakdown, commitment, labCostKnown } from "./provider-facts";

type Verified = Brand & { facts: ProviderFacts };

export type PairVerdict = {
  summary: string;
  chooseIf: { brand: Brand; reasons: string[] }[];
  watchOut: { brand: Brand; text: string }[];
  faqs: { question: string; answer: string }[];
};

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

function checkedLabel(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  return d.toLocaleString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
}

function annual(b: Verified) {
  const breakdown = annualCostBreakdown(b.facts);
  return breakdown ? { total: breakdown.total, assumedLabs: !labCostKnown(b.facts) } : null;
}

function costSentence(a: Verified, b: Verified): { text: string; cheaper?: Verified } {
  const ca = annual(a);
  const cb = annual(b);
  if (ca && cb) {
    const [lo, hi, clo, chi] = ca.total <= cb.total ? [a, b, ca, cb] : [b, a, cb, ca];
    const gap = chi.total - clo.total;
    const assumed = [a, b].filter((x) => annual(x)?.assumedLabs).map((x) => x.name);
    const caveat = assumed.length
      ? ` (${assumed.join(" and ")} ${assumed.length > 1 ? "don't" : "doesn't"} publish a lab price, so we assume $49 per panel)`
      : "";
    if (gap < 50) {
      return {
        text: `Over 12 months the two cost about the same: roughly ${usd(clo.total)} for ${lo.name} and ${usd(chi.total)} for ${hi.name}, including medication, membership and labs${caveat}.`,
      };
    }
    return {
      text: `Over 12 months, ${lo.name} works out cheaper at about ${usd(clo.total)} versus ${usd(chi.total)} for ${hi.name}, a gap of roughly ${usd(gap)} once medication, membership and labs are added${caveat}.`,
      cheaper: lo,
    };
  }
  const priced = [a, b].find((x) => annual(x));
  const unpriced = [a, b].find((x) => !annual(x));
  if (priced && unpriced) {
    return {
      text: `${unpriced.name} doesn't publish an enclomiphene price, so only ${priced.name} can be costed: about ${usd(annual(priced)!.total)} over 12 months including labs.`,
    };
  }
  return { text: "Neither provider publishes enough pricing to estimate a 12-month total." };
}

function reasonsFor(self: Verified, other: Verified, cheaper?: Verified): string[] {
  const r: string[] = [];
  if (cheaper?.slug === self.slug) r.push("you want the lower 12-month total");
  const cs = self.facts.billing.commitmentMonths;
  const co = other.facts.billing.commitmentMonths;
  if (cs <= 1 && co > 1) r.push("you want to be able to cancel month to month");
  else if (cs < co) r.push(`you prefer a shorter commitment (${commitment(self.facts).text.toLowerCase()})`);
  if (self.facts.labs.followupIncluded && !other.facts.labs.followupIncluded)
    r.push("you want follow-up labs covered by the plan");
  if (self.facts.prescriber.value === "physician" && other.facts.prescriber.value !== "physician")
    r.push("you want a physician, not just a licensed provider, to prescribe");
  const ss = self.facts.states.count;
  const so = other.facts.states.count;
  if (typeof ss === "number" && (typeof so !== "number" || ss > so))
    r.push(`you need wide state coverage (${self.facts.states.short})`);
  return r;
}

/** Pair-specific verdict and FAQ, written only from verified provider facts. */
export function buildPairVerdict(a: Brand, b: Brand): PairVerdict | null {
  if (!a.facts || !b.facts) return null;
  const va = a as Verified;
  const vb = b as Verified;
  const cost = costSentence(va, vb);
  const checked = checkedLabel(
    [va.facts.checkedOn, vb.facts.checkedOn].sort().at(-1)!,
  );

  const summary = `${cost.text} ${a.name} bills ${va.facts.billing.short.charAt(0).toLowerCase()}${va.facts.billing.short.slice(1)}; ${b.name} bills ${vb.facts.billing.short.charAt(0).toLowerCase()}${vb.facts.billing.short.slice(1)}. Terms checked ${checked}.`;

  const chooseIf = [va, vb]
    .map((self) => ({
      brand: self as Brand,
      reasons: reasonsFor(self, self === va ? vb : va, cost.cheaper),
    }))
    .filter((c) => c.reasons.length > 0);

  const watchOut = [va, vb].map((x) => ({ brand: x as Brand, text: x.facts.limitation.text }));

  const faqs = [
    {
      question: `Is ${a.name} or ${b.name} cheaper for enclomiphene?`,
      answer: `${cost.text} Monthly headline prices alone can mislead because plan length, membership fees and lab costs differ.`,
    },
    {
      question: `Do ${a.name} and ${b.name} include lab testing?`,
      answer: `${a.name}: ${va.facts.labs.short}. ${b.name}: ${vb.facts.labs.short}. Baseline testosterone and LH/FSH testing is standard before a clinician prescribes enclomiphene.`,
    },
    {
      question: `Can I cancel ${a.name} or ${b.name} anytime?`,
      answer: `${a.name}: ${commitment(va.facts).text}; ${va.facts.cancellation.short.charAt(0).toLowerCase()}${va.facts.cancellation.short.slice(1)}. ${b.name}: ${commitment(vb.facts).text}; ${vb.facts.cancellation.short.charAt(0).toLowerCase()}${vb.facts.cancellation.short.slice(1)}.`,
    },
    {
      question: `Who prescribes at ${a.name} vs ${b.name}?`,
      answer: `${a.name}: ${va.facts.prescriber.short}. ${b.name}: ${vb.facts.prescriber.short}. Either way, a licensed clinician must review your labs and history before prescribing.`,
    },
  ];

  return { summary, chooseIf, watchOut, faqs };
}
