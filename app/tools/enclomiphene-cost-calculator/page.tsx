import type { Metadata } from "next";
import Link from "next/link";
import CostCalculator, { type CalcProvider } from "../../components/CostCalculator";
import { getBrandsByCategory, getBrandDetailPath } from "../../lib/brands";
import { SITE_URL } from "../../lib/site";

const PAGE_URL = `${SITE_URL}/tools/enclomiphene-cost-calculator`;

export const metadata: Metadata = {
  title: "Enclomiphene & TRT Cost Calculator (2026)",
  description:
    "Estimate the real cost of enclomiphene or TRT over 3, 6, or 12 months — medication, labs, and shipping combined. Compare providers by true total, not just the monthly headline.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Enclomiphene & TRT Cost Calculator (2026) | T-Compare",
    description:
      "Estimate the real cost of enclomiphene or TRT over 3, 6, or 12 months — medication, labs, and shipping combined. Compare providers by true total cost.",
    url: PAGE_URL,
    images: [
      {
        url: "/testosterone/enclomiphene/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Enclomiphene & TRT Cost Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Enclomiphene & TRT Cost Calculator (2026) | T-Compare",
    description:
      "Estimate the real cost of enclomiphene or TRT over 3, 6, or 12 months — medication, labs, and shipping combined.",
    images: ["/testosterone/enclomiphene/opengraph-image"],
  },
};

// Providers known to bill on a 2-month medication cycle rather than monthly.
const BIMONTHLY_SLUGS = new Set(["petermd"]);

const FAQS = [
  {
    question: "How much does enclomiphene cost per month?",
    answer:
      "Published monthly anchors for online enclomiphene programs typically range from about $69 to $199 per month for the medication alone. Your true monthly cost also depends on initial and follow-up bloodwork, shipping, and whether shorter plans carry higher effective rates. Use the calculator above to add labs and shipping to the headline price.",
  },
  {
    question: "Why is the monthly price not the real cost?",
    answer:
      "Most programs bill labs, shipping, and sometimes membership separately from the medication. A $69/mo plan that adds $90 baseline labs plus quarterly $60 draws can cost more over 90 days than a $99/mo plan that bundles testing. Comparing the full total over the same time horizon is the only fair way to rank providers.",
  },
  {
    question: "How often do you need labs on enclomiphene?",
    answer:
      "Cadence is set by your clinician, but many programs draw baseline labs before starting and recheck testosterone, LH/FSH, and related markers roughly every 3 months early on, then less often once stable. Dose changes usually trigger an earlier recheck. Adjust the follow-up frequency in the calculator to match your plan.",
  },
  {
    question: "Is enclomiphene cheaper than TRT injections?",
    answer:
      "It depends on the program. Enclomiphene is an oral option and is often priced competitively with injectable TRT once you include labs and clinician oversight, but injectable testosterone medication itself can be inexpensive while requiring different monitoring. Compare the all-in total for each pathway rather than the medication line alone.",
  },
  {
    question: "Are these calculator numbers exact?",
    answer:
      "No — they are planning estimates. Provider pricing changes with promotions, dose, state availability, and lab vendor. Use the estimate to shortlist and to know which questions to ask, then confirm the live total on each provider's official checkout before you enroll.",
  },
];

export default function EnclomipheneCostCalculatorPage() {
  const providers: CalcProvider[] = getBrandsByCategory("enclomiphene").map((b) => ({
    slug: b.slug,
    name: b.name,
    monthly: b.priceFromMonthly,
    priceLabel: b.priceLabel,
    href: getBrandDetailPath(b),
    billingIntervalMonths: BIMONTHLY_SLUGS.has(b.slug) ? 2 : 1,
  }));

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Enclomiphene Providers", item: `${SITE_URL}/testosterone/enclomiphene` },
      { "@type": "ListItem", position: 3, name: "Cost Calculator", item: PAGE_URL },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="mx-auto max-w-5xl px-6 py-10 sm:py-14">
        {/* Breadcrumb */}
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[#b5b0a8]">
          <Link href="/" className="transition-colors hover:text-[#1c1917]">
            Home
          </Link>
          <span>/</span>
          <Link href="/testosterone/enclomiphene" className="transition-colors hover:text-[#1c1917]">
            Enclomiphene Providers
          </Link>
          <span>/</span>
          <span className="text-[#78716c]">Cost Calculator</span>
        </nav>

        {/* Header */}
        <div className="max-w-2xl">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#a8a29e]">
            Free Tool
          </p>
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-semibold leading-tight text-[#1c1917] sm:text-4xl lg:text-5xl">
            Enclomiphene &amp; TRT Cost Calculator
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[#78716c]">
            The &quot;$X/mo&quot; headline rarely reflects what you actually pay. This calculator
            adds medication, initial and follow-up labs, and shipping across 3, 6, or 12 months so
            you can compare providers by <span className="font-medium text-[#57534e]">true total cost</span>.
          </p>
        </div>

        {/* Calculator */}
        <div className="mt-10">
          <CostCalculator providers={providers} />
        </div>

        {/* Explainer */}
        <section className="mt-14 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-[#e3dfd6] bg-white p-5 shadow-sm">
            <div className="text-sm font-semibold text-[#1c1917]">Medication</div>
            <p className="mt-2 text-sm leading-relaxed text-[#57534e]">
              The monthly (or per-cycle) prescription price. Longer plans often lower the effective
              rate, so check the commitment length behind any &quot;starting at&quot; number.
            </p>
          </div>
          <div className="rounded-2xl border border-[#e3dfd6] bg-white p-5 shadow-sm">
            <div className="text-sm font-semibold text-[#1c1917]">Labs</div>
            <p className="mt-2 text-sm leading-relaxed text-[#57534e]">
              Baseline bloodwork plus periodic follow-ups (testosterone, LH/FSH, estradiol, and
              more). Some programs bundle labs; others bill each draw separately.
            </p>
          </div>
          <div className="rounded-2xl border border-[#e3dfd6] bg-white p-5 shadow-sm">
            <div className="text-sm font-semibold text-[#1c1917]">Shipping &amp; fees</div>
            <p className="mt-2 text-sm leading-relaxed text-[#57534e]">
              Per-order shipping and any membership fees add up over a year. Bimonthly billing
              means fewer shipments but a larger charge each cycle.
            </p>
          </div>
        </section>

        {/* Internal links */}
        <section className="mt-12 rounded-2xl border border-[#c6e0d0] bg-[#f3f8f4] p-6 sm:p-8">
          <h2 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-[#1c1917] sm:text-2xl">
            Next steps
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[#57534e]">
            Once you have a shortlist, dig into the details and see head-to-head breakdowns.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/testosterone/enclomiphene"
              className="inline-flex items-center rounded-xl bg-[#2a6e47] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#22593a]"
            >
              Compare all providers →
            </Link>
            <Link
              href="/comparisons"
              className="inline-flex items-center rounded-xl border border-[#2a6e47]/30 bg-white px-6 py-3 text-sm font-semibold text-[#2a6e47] transition-colors hover:bg-[#f5f3ee]"
            >
              Head-to-head comparisons →
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-14">
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-[#1c1917]">
            Frequently asked questions
          </h2>
          <dl className="mt-6 space-y-6">
            {FAQS.map((faq) => (
              <div key={faq.question}>
                <dt className="text-sm font-semibold text-[#1c1917]">{faq.question}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-[#57534e]">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        <p className="mt-10 text-xs leading-relaxed text-[#b5b0a8]">
          Informational only; not medical or financial advice. Estimates are based on publicly
          available pricing and general lab-cadence assumptions and may not reflect your plan.
          Confirm all costs directly with the provider.
        </p>
      </div>
    </>
  );
}
