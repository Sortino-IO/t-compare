import Link from "next/link";
import AffiliateDisclosure from "./AffiliateDisclosure";
import BrandCard from "./BrandCard";
import BlogCard from "./BlogCard";
import ComparisonPairsGrid from "./ComparisonPairsGrid";
import EvidenceNotes from "./EvidenceNotes";
import FaqSection, { type FaqItem } from "./FaqSection";
import QuickCostEstimator from "./QuickCostEstimator";
import TrustStrip from "./TrustStrip";
import { buildEstimatorRows } from "../lib/cost-estimator";
import { formatReviewedDate, latestReviewedDate } from "../lib/brand-display";
import { getBrandsByCategory } from "../lib/brands";
import { getPostBySlug } from "../lib/blog";
import {
  ENCLO_COMPARISONS,
  SUPP_COMPARISONS,
  KEY_BLOG_POSTS,
} from "../lib/nav-data";

const FEATURED_PROVIDER_COUNT = 4;
const FEATURED_SUPPLEMENT_COUNT = 4;

/** Turn a "A vs B" nav label into a short SEO description. */
function pairDescription(label: string, kind: "provider" | "supplement"): string {
  if (kind === "provider") {
    return `${label} compared on monthly price, labs, onboarding, and plan terms.`;
  }
  return `${label} compared on entry price, bulk bundles, guarantee length, and formula.`;
}

function SectionHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#176b87]">
        {eyebrow}
      </p>
      <h2 className="tc-display text-xl font-bold leading-tight sm:text-2xl">
        {title}
      </h2>
      <p className="mt-2 text-[15px] leading-relaxed text-[#53666e]">{intro}</p>
    </div>
  );
}

function SectionCta({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <div className="mt-6">
      <Link href={href} className="tc-btn tc-btn-secondary">
        {children}
        <span aria-hidden>→</span>
      </Link>
    </div>
  );
}

const HOME_FAQ: FaqItem[] = [
  {
    question: "How does T-Compare make money?",
    answer:
      "Some providers and brands pay us a commission when you sign up or buy through our links. Your price is the same either way, and every provider in a table is described using the same published terms.",
    link: { href: "/about", label: "How we work" },
  },
  {
    question: "What is the difference between enclomiphene and testosterone supplements?",
    answer:
      "Enclomiphene is a prescription medication that needs a clinician and blood tests. Over-the-counter testosterone supplements are herbal or nutrient formulas sold without a prescription, and they are not FDA-approved to treat low testosterone.",
  },
  {
    question: "Is enclomiphene the same as testosterone replacement therapy (TRT)?",
    answer:
      "No. TRT supplies testosterone directly. Enclomiphene signals the pituitary gland to release more LH and FSH, which prompts the testes to make more of their own testosterone.",
    link: { href: "/blog/enclomiphene-vs-trt-difference", label: "Enclomiphene vs TRT explained" },
  },
  {
    question: "How do I know if I have low testosterone?",
    answer:
      "Only a blood test can tell. The American Urological Association diagnoses low testosterone when two early-morning total testosterone tests come back below 300 ng/dL and there are symptoms such as low libido or fatigue.",
    link: {
      href: "https://www.auanet.org/guidelines-and-quality/guidelines/testosterone-deficiency-guideline",
      label: "AUA guideline",
    },
  },
  {
    question: "How current are the prices on T-Compare?",
    answer:
      "We check each provider's own website and show the review date on every listing. Prices and promotions change, so confirm the final total on the provider's checkout before you pay.",
  },
];

export default function HomeLanding() {
  const providers = getBrandsByCategory("enclomiphene");
  const supplements = getBrandsByCategory("supplement");
  const featuredProviders = providers.slice(0, FEATURED_PROVIDER_COUNT);
  const featuredSupplements = supplements.slice(0, FEATURED_SUPPLEMENT_COUNT);
  const reviewedOn = latestReviewedDate([...providers, ...supplements]);

  const encloPairs = ENCLO_COMPARISONS.slice(0, 4).map((c) => ({
    title: c.label,
    href: c.href,
    description: pairDescription(c.label, "provider"),
  }));

  const suppPairs = SUPP_COMPARISONS.slice(0, 4).map((c) => ({
    title: c.label,
    href: c.href,
    description: pairDescription(c.label, "supplement"),
  }));

  const blogPosts = KEY_BLOG_POSTS.map((p) => getPostBySlug(p.href.replace("/blog/", "")))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      {/* ── Hero ── */}
      <section className="max-w-3xl">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#176b87]">
          Independent informational comparisons
        </p>
        <h1 className="tc-display text-[1.875rem] font-bold leading-[1.15] sm:text-[2.75rem]">
          Compare Testosterone Providers &amp; Supplements
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#53666e] sm:text-lg">
          Enclomiphene telehealth programs and over-the-counter testosterone
          supplements, side by side. Review pricing, labs, onboarding, guarantees,
          and formulas in one place — then verify directly with each brand before you decide.
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-2.5">
          <Link href="/testosterone/enclomiphene" className="tc-btn tc-btn-primary">
            Compare enclomiphene providers <span aria-hidden>→</span>
          </Link>
          <Link href="/t-supplements" className="tc-btn tc-btn-secondary">
            Compare supplements <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      <TrustStrip
        className="mt-7"
        items={[
          { label: "Providers listed", value: String(providers.length) },
          { label: "Supplements listed", value: String(supplements.length) },
          ...(reviewedOn
            ? [
                {
                  label: "Listings last reviewed",
                  value: formatReviewedDate(reviewedOn),
                },
              ]
            : []),
        ]}
      />

      <AffiliateDisclosure className="mt-3" />

      {/* ── Enclomiphene providers ── */}
      <section className="mt-12 border-t border-[#e3e3e3] pt-10">
        <SectionHeader
          eyebrow="Telehealth programs"
          title="Enclomiphene providers"
          intro="Enclomiphene is a prescription option some men use to support their body's own testosterone production. Compare the leading telehealth providers by monthly price, lab requirements, and how fast you can start."
        />

        <div className="mt-5 flex flex-col gap-3">
          {featuredProviders.map((brand, i) => (
            <BrandCard key={brand.slug} brand={brand} highlight={i === 0} />
          ))}
        </div>

        <QuickCostEstimator rows={buildEstimatorRows(providers)} className="mt-6" />

        <EvidenceNotes
          ids={["enclomiphene-sperm", "t-trials-sexual-function", "traverse-heart"]}
          className="mt-6"
        />

        <SectionCta href="/testosterone/enclomiphene">
          View all {providers.length} enclomiphene providers
        </SectionCta>
      </section>

      {/* ── Enclomiphene comparisons ── */}
      <section className="mt-12 border-t border-[#e3e3e3] pt-10">
        <SectionHeader
          eyebrow="Head-to-head"
          title="Enclomiphene comparisons"
          intro="Not sure which program fits? These side-by-side breakdowns line up two providers on price, labs, onboarding, and plan terms so the trade-offs are easy to see."
        />

        <ComparisonPairsGrid pairs={encloPairs} />

        <SectionCta href="/comparisons">See all enclomiphene comparisons</SectionCta>
      </section>

      {/* ── Testosterone supplements ── */}
      <section className="mt-12 border-t border-[#e3e3e3] pt-10">
        <SectionHeader
          eyebrow="Over-the-counter"
          title="Testosterone supplements"
          intro="OTC testosterone boosters use ingredients like Tongkat Ali, fenugreek, and DAA. Compare the most-searched supplements on entry price, bulk-bundle math, money-back guarantees, and formula focus."
        />

        <div className="mt-5 flex flex-col gap-3">
          {featuredSupplements.map((brand, i) => (
            <BrandCard key={brand.slug} brand={brand} highlight={i === 0} />
          ))}
        </div>

        <SectionCta href="/t-supplements">
          View all {supplements.length} testosterone supplements
        </SectionCta>
      </section>

      {/* ── Supplement comparisons ── */}
      <section className="mt-12 border-t border-[#e3e3e3] pt-10">
        <SectionHeader
          eyebrow="Head-to-head"
          title="Testosterone Supplement comparisons"
          intro="Testosterone Supplement funnels often hide the real cost behind multi-bottle bundles. These comparisons normalize price, guarantee length, and ingredients so you can pick the better value before checkout."
        />

        <ComparisonPairsGrid pairs={suppPairs} />

        <SectionCta href="/t-supplements/comparisons">
          See all supplement comparisons
        </SectionCta>
      </section>

      {/* ── From the blog ── */}
      {blogPosts.length > 0 && (
        <section className="mt-12 border-t border-[#e3e3e3] pt-10">
          <SectionHeader
            eyebrow="Guides & research"
            title="From the blog"
            intro="In-depth, independent guides on testosterone therapy, enclomiphene, and supplement ingredients — written to answer the questions men actually search for."
          />

          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
            {blogPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>

          <SectionCta href="/blog">Read all articles</SectionCta>
        </section>
      )}

      <FaqSection items={HOME_FAQ} className="mt-12 border-t border-[#e3e3e3] pt-10" />

      {/* ── Trust / closing ── */}
      <section className="mt-12 border-t border-[#e3e3e3] pt-10">
        <div className="max-w-3xl">
          <h2 className="tc-display text-xl font-bold leading-tight sm:text-2xl">
            Built to make comparison easier
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#53666e]">
            T-Compare gathers publicly available information about testosterone-related
            providers and supplements into one place, so you can review pricing, onboarding
            style, and formula differences more clearly before verifying directly with each brand.
            We do not run clinical testing, collect user reviews, or assign star ratings.
          </p>
          <p className="mt-4 max-w-2xl text-xs leading-relaxed text-[#5f757f]">
            This site is for informational purposes only and does not constitute medical
            advice. Pricing is indicative and subject to change — always confirm details with
            the provider. Supplements are not FDA-approved to treat low testosterone.
          </p>
        </div>
      </section>
    </div>
  );
}
