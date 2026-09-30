import type { Metadata } from "next";
import Link from "next/link";
import { getBrandPairs, getBrandsByCategory, getComparePairPath } from "../lib/brands";
import EvidenceNotes from "../components/EvidenceNotes";
import QuickCostEstimator from "../components/QuickCostEstimator";
import { buildEstimatorRows } from "../lib/cost-estimator";
import ComparisonPairsGrid from "../components/ComparisonPairsGrid";
import { OG_BASE, SITE_URL } from "../lib/site";

export const metadata: Metadata = {
  title: "TRT Provider Comparisons: Cost, Labs & Plans",
  description:
    "Explore side-by-side TRT and enclomiphene provider comparisons. Check 90-day total cost, lab cadence, commitment terms, and what each plan includes.",
  openGraph: {
    ...OG_BASE,
    title: "TRT Provider Comparisons: Cost, Labs & Plans | T-Compare",
    description:
      "Explore side-by-side TRT and enclomiphene provider comparisons. Check 90-day total cost, lab cadence, commitment terms, and what each plan includes.",
    url: `${SITE_URL}/comparisons`,
  },
  twitter: {
    card: "summary_large_image",
    title: "TRT Provider Comparisons: Cost, Labs & Plans | T-Compare",
    description:
      "Explore side-by-side TRT and enclomiphene provider comparisons. Check 90-day total cost, lab cadence, commitment terms, and what each plan includes.",
  },
};

function allEnclomiphenePairs() {
  return getBrandPairs("enclomiphene").map(({ a, b }) => ({
    title: `${a.name} vs ${b.name}`,
    href: getComparePairPath("enclomiphene", a.slug, b.slug),
    description: `Compare ${a.name} and ${b.name} side-by-side.`,
  }));
}

const FAQS = [
  {
    question: "Is the cheapest monthly price always the cheapest total cost?",
    answer:
      "Often no. Many plans front-load labs, kits, or memberships. Compare the same window (for example 90 days or 12 months) and include shipping, required retesting, and whether messaging visits count as extras.",
  },
  {
    question: "Why do two brands feel incomparable even when both mention testosterone?",
    answer:
      "Therapy class differs: oral enclomiphene pathways versus injections or gels target different goals, risks, and monitoring. Holding therapy type constant makes comparisons honest.",
  },
  {
    question: "Where should I verify pricing and eligibility?",
    answer:
      "On each provider's official checkout flow for your state today. Third-party tables age quickly; rely on primary sources before you pay.",
  },
  {
    question: "Common misconception: is telehealth always async-only care?",
    answer:
      "Not always. Some states or protocols require synchronous visits for certain prescriptions or escalations. Read each program's intake rules rather than assuming text-only care forever.",
  },
  {
    question: "What should I ask about labs before I subscribe?",
    answer:
      "Ask which panels are required at baseline, what triggers follow-up testing, and whether phlebotomy is in-network with your insurance when that matters to you.",
  },
  {
    question: "How does T-Compare stay useful if prices change?",
    answer:
      "We link to official pages so you can re-check details. Use comparison pages to structure questions, then confirm numbers on the provider site the day you enroll.",
  },
];

export default function ComparisonsIndexPage() {
  const pairs = allEnclomiphenePairs();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Comparisons", item: `${SITE_URL}/comparisons` },
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
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex flex-wrap items-center gap-2 text-[13px] text-[#5f757f]"
        >
          <Link href="/" className="hover:text-[#176b87] hover:underline">
            Home
          </Link>
          <span aria-hidden>/</span>
          <span className="text-[#3c535e]">Comparisons</span>
        </nav>

        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#176b87]">
          Independent comparison
        </p>
        <h1 className="tc-display text-[1.75rem] font-bold leading-tight sm:text-4xl">
          Comparisons
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-[#53666e]">
          If you’re comparing testosterone-related telehealth providers, the “$X/mo” headline is only a
          starting point. The real differences usually show up in total 90‑day cost, lab/testing requirements,
          commitment length, what’s included (medication, follow‑ups, messaging, shipping), and how flexible
          the program is if your plan needs adjustments.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-3 lg:grid-cols-3">
          <div className="tc-card p-4 sm:p-5">
            <div className="text-sm font-bold text-[#142b3a]">What to compare first</div>
            <ul className="mt-3 list-disc pl-5 text-sm text-[#53666e] space-y-2">
              <li>
                <span className="font-medium text-[#142b3a]">Total cost over 90 days</span> (not just monthly)
              </li>
              <li>
                <span className="font-medium text-[#142b3a]">Labs & testing</span> (initial kit, follow‑ups, cadence)
              </li>
              <li>
                <span className="font-medium text-[#142b3a]">Plan length</span> (3 vs 10 months vs annual commitment)
              </li>
              <li>
                <span className="font-medium text-[#142b3a]">What’s included</span> (visits, messaging, shipping)
              </li>
            </ul>
          </div>

          <div className="tc-card p-4 sm:p-5">
            <div className="text-sm font-bold text-[#142b3a]">Questions worth asking</div>
            <ul className="mt-3 list-disc pl-5 text-sm text-[#53666e] space-y-2">
              <li>What does “starting at” assume (commitment, promos, dose)?</li>
              <li>Are labs included or billed separately (and how often)?</li>
              <li>What happens if you need a dose change: does the pricing reset?</li>
              <li>Is a live visit required, or is care primarily async messaging?</li>
            </ul>
          </div>

          <div className="tc-card p-4 sm:p-5">
            <div className="text-sm font-bold text-[#142b3a]">A quick reality check</div>
            <p className="mt-3 text-sm text-[#53666e] leading-relaxed">
              Most people are better served by comparing <span className="font-medium text-[#142b3a]">the same time horizon</span>{" "}
              across providers (e.g., 90 days or 12 months) and reading the fine print for what the plan actually
              includes. Our pages link out so you can verify details on the provider’s site.
            </p>
          </div>
        </div>

        <QuickCostEstimator
          rows={buildEstimatorRows(getBrandsByCategory("enclomiphene"))}
          className="mt-6"
        />

        <ComparisonPairsGrid pairs={pairs} />

        <EvidenceNotes
          ids={["enclomiphene-sperm", "enclomiphene-not-approved", "aua-diagnosis"]}
          className="mt-10"
        />

        <section className="tc-card mt-10 p-5 sm:p-6">
          <h2 className="tc-display text-xl font-bold sm:text-2xl">FAQ</h2>
          <p className="mt-2 text-sm text-[#53666e] max-w-3xl leading-relaxed">
            Short answers to how people actually search when comparing online hormone programs. Not medical advice;
            follow your clinician’s plan.
          </p>
          <dl className="mt-6 space-y-6">
            {FAQS.map((faq) => (
              <div key={faq.question}>
                <dt className="text-sm font-semibold text-[#142b3a]">{faq.question}</dt>
                <dd className="mt-2 text-sm text-[#53666e] leading-relaxed">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </div>
  );
}

