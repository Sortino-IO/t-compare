import type { FaqItem } from "../components/FaqSection";
import type { EstimatorRow } from "../components/QuickCostEstimator";

const AUA_GUIDELINE =
  "https://www.auanet.org/guidelines-and-quality/guidelines/testosterone-deficiency-guideline";
const FDA_COMPOUNDING =
  "https://www.fda.gov/drugs/human-drug-compounding/compounding-and-fda-questions-and-answers";
const CALCULATOR = "/tools/enclomiphene-cost-calculator";

function money(n: number): string {
  return `$${Math.round(n).toLocaleString("en-US")}`;
}

/** Cost answers are computed from the same verified facts as the table, so they cannot drift. */
export function buildEnclomipheneFaq(rows: EstimatorRow[]): FaqItem[] {
  const ranked = [...rows].sort((a, b) => a.total - b.total);
  const low = ranked[0];
  const high = ranked[ranked.length - 1];

  const items: FaqItem[] = [
    {
      question: "What is enclomiphene and how does it work?",
      answer:
        "Enclomiphene is an oral prescription medication for men with low testosterone. Rather than adding testosterone, it blocks estrogen's feedback signal at the pituitary gland. That raises LH and FSH, the hormones that tell the testes to make their own testosterone and sperm.",
    },
    {
      question: "Is enclomiphene FDA-approved?",
      answer:
        "No. The FDA states that no approved drug product contains enclomiphene, and a 2015 application was not approved. Online programs supply it through compounding pharmacies, and the FDA does not review compounded drugs for safety, effectiveness or quality before they are sold.",
      link: { href: FDA_COMPOUNDING, label: "FDA: compounding questions and answers" },
    },
    {
      question: "Does enclomiphene affect fertility the way TRT does?",
      answer:
        "The research points the other way. In two 16-week phase III trials, enclomiphene raised testosterone while keeping sperm counts in the normal range, whereas testosterone gel markedly reduced sperm production. The trials were short and in overweight men, so discuss your plans with a clinician.",
      link: { href: "https://pubmed.ncbi.nlm.nih.gov/26496621/", label: "Kim et al., BJU International, 2016" },
    },
  ];

  if (low && high && low.slug !== high.slug) {
    items.push({
      question: "How much does enclomiphene cost for a year?",
      answer: `Across the providers we track, 12 months of medication, any required membership and lab tests runs from about ${money(low.total)} (${low.name}) to about ${money(high.total)} (${high.name}). Where a provider does not publish lab prices, we use a $49 panel estimate.`,
      link: { href: CALCULATOR, label: "See the full breakdown" },
    });
  }

  items.push(
    {
      question: "Is the lowest monthly price the cheapest option?",
      answer:
        "Often not. Some low monthly prices require paying for a full year upfront, and others sit on top of a separate required membership. Lab fees add more. Compare 12-month totals and the commitment in the \"How you pay\" column, not the headline price.",
    },
    {
      question: "Do I need blood tests before getting enclomiphene?",
      answer:
        "Yes. Every provider we list requires lab work before prescribing. The American Urological Association diagnoses low testosterone only when two early-morning tests come back below 300 ng/dL and there are symptoms.",
      link: { href: AUA_GUIDELINE, label: "AUA testosterone deficiency guideline" },
    },
    {
      question: "Can I cancel an enclomiphene subscription?",
      answer:
        "It depends on the provider. Some bill month to month, some bill in 2- or 3-month blocks, and others tie their lowest price to a 12-month commitment or prepayment. Most do not refund medication once it ships, so check the terms before your first charge.",
    },
  );

  return items;
}
