import type { Metadata } from "next";
import Link from "next/link";
import AuthoritySources from "../components/AuthoritySources";
import { getBrandsByCategory } from "../lib/brands";
import { formatReviewedDate } from "../lib/brand-display";
import {
  COST_HORIZON_MONTHS,
  DEFAULT_FOLLOWUP_EVERY_MONTHS,
  DEFAULT_LAB_COST,
} from "../lib/provider-facts";
import { breadcrumbListSchema, canonicalAlternates } from "../lib/seo";
import { OG_BASE, SITE_URL } from "../lib/site";

const PAGE_PATH = "/methodology";
const TITLE = "How We Compare Enclomiphene Providers: Methodology";
const DESCRIPTION =
  "Exactly what T-Compare checks for each enclomiphene provider, how the 12-month cost estimate is calculated, where the data comes from, and what we don't do.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: canonicalAlternates(PAGE_PATH),
  openGraph: { ...OG_BASE, title: `${TITLE} | T-Compare`, description: DESCRIPTION, url: `${SITE_URL}${PAGE_PATH}` },
  twitter: { card: "summary_large_image", title: `${TITLE} | T-Compare`, description: DESCRIPTION },
};

const CHECKS = [
  ["Billing", "The advertised monthly price, any separate membership fee, how often you are charged, and what is charged on day one."],
  ["Commitment", "How many months the headline price locks you in, and whether you can cancel month to month."],
  ["Labs", "Whether testing is required, the cheapest published initial lab price, and whether follow-up labs are covered."],
  ["Prescriber", "Who reviews your case: a physician (MD/DO) or another licensed provider, as each company states it."],
  ["State coverage", "How many states the provider says it serves, when it publishes a number or list."],
  ["Cancellation and refunds", "The published cancellation route, notice period, and refund limits."],
  ["Main limitation", "The one term most likely to surprise a buyer, quoted from or paraphrasing the provider's own pages."],
] as const;

export default function MethodologyPage() {
  const providers = getBrandsByCategory("enclomiphene");
  const checked = providers
    .map((b) => b.facts?.checkedOn)
    .filter((d): d is string => Boolean(d))
    .sort()
    .at(-1);
  const followups = Math.floor(COST_HORIZON_MONTHS / DEFAULT_FOLLOWUP_EVERY_MONTHS);

  const breadcrumb = breadcrumbListSchema([
    { name: "Home", path: "/" },
    { name: "Methodology", path: PAGE_PATH },
  ]);

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-sm text-[#5f757f]">
        <Link href="/" className="hover:text-[#176b87] hover:underline">Home</Link>
        <span aria-hidden>/</span>
        <span className="text-[#53666e]">Methodology</span>
      </nav>

      <h1 className="tc-display text-[1.75rem] font-bold leading-tight sm:text-4xl">
        How we compare enclomiphene providers
      </h1>
      <p className="mt-4 text-base leading-relaxed text-[#53666e]">
        Every price, lab cost and plan term on T-Compare comes from the provider&apos;s own public
        pages. We record the same seven fields for all {providers.length} enclomiphene providers,
        link the source page next to each one, and date the check
        {checked ? ` (latest: ${formatReviewedDate(checked)})` : ""}.
      </p>

      <h2 className="tc-display mt-10 text-xl font-bold">What we check for each provider</h2>
      <ul className="mt-4 space-y-3">
        {CHECKS.map(([label, text]) => (
          <li key={label} className="rounded-lg border border-[#e3e3e3] bg-white p-4 text-sm leading-relaxed text-[#53666e]">
            <span className="font-semibold text-[#142b3a]">{label}.</span> {text}
          </li>
        ))}
      </ul>

      <h2 className="tc-display mt-10 text-xl font-bold">How the 12-month cost is calculated</h2>
      <p className="mt-3 text-sm leading-relaxed text-[#53666e]">
        Monthly prices hide the real cost, so we add everything a typical first year includes:
      </p>
      <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-[#53666e]">
        <li>Medication: the published monthly price × {COST_HORIZON_MONTHS}.</li>
        <li>Membership: any required separate fee × {COST_HORIZON_MONTHS}.</li>
        <li>
          Initial labs: the provider&apos;s cheapest published panel, or ${DEFAULT_LAB_COST} when no
          price is published.
        </li>
        <li>
          Follow-up labs: {followups} panels at ${DEFAULT_LAB_COST} (one every{" "}
          {DEFAULT_FOLLOWUP_EVERY_MONTHS} months), unless the plan covers them.
        </li>
      </ul>
      <p className="mt-3 text-sm leading-relaxed text-[#53666e]">
        The ${DEFAULT_LAB_COST} stand-in is TTime&apos;s published Quest testosterone panel price.
        Providers without a published lab price are excluded from the &quot;lowest cost&quot; pick.
        You can change every assumption in the{" "}
        <Link href="/tools/enclomiphene-cost-calculator" className="text-[#176b87] underline">
          cost calculator
        </Link>
        .
      </p>

      <h2 className="tc-display mt-10 text-xl font-bold">How &quot;best for&quot; picks work</h2>
      <p className="mt-3 text-sm leading-relaxed text-[#53666e]">
        Picks such as lowest 12-month cost, follow-up labs included, widest state coverage and no
        commitment are chosen by fixed rules from the fields above. Each provider can win one pick at
        most, and a pick is left out rather than forced when no provider qualifies.
      </p>

      <h2 className="tc-display mt-10 text-xl font-bold">What we don&apos;t do</h2>
      <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-[#53666e]">
        <li>We don&apos;t run clinical tests or rate medical outcomes.</li>
        <li>We don&apos;t give medical advice. A licensed clinician decides whether enclomiphene suits you.</li>
        <li>
          We don&apos;t see private or logged-in pricing. When a provider hides its price, we say so
          instead of guessing.
        </li>
      </ul>

      <h2 className="tc-display mt-10 text-xl font-bold">Affiliate links</h2>
      <p className="mt-3 text-sm leading-relaxed text-[#53666e]">
        Some outbound links are affiliate links, and we may earn a commission if you sign up. This is
        disclosed on the pages where those links appear.
      </p>

      <AuthoritySources className="mt-10" heading="Clinical sources we rely on" />

      <p className="mt-8 text-sm text-[#53666e]">
        Start comparing:{" "}
        <Link href="/testosterone/enclomiphene" className="text-[#176b87] underline">all enclomiphene providers</Link>
        {" · "}
        <Link href="/comparisons" className="text-[#176b87] underline">head-to-head comparisons</Link>
      </p>
    </div>
  );
}
