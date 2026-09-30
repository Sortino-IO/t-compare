import Link from "next/link";

const linkCls =
  "font-medium text-[#176b87] underline decoration-[#176b87]/30 underline-offset-2 hover:text-[#10556d]";

/**
 * Three facts a careful buyer should know before choosing a provider, each
 * tied to a primary source. Quotes verified against the live pages
 * (September 2026).
 */
export default function ClinicalContext({ className = "" }: { className?: string }) {
  return (
    <section aria-labelledby="before-you-choose" className={`tc-card p-5 sm:p-6 ${className}`}>
      <h2 id="before-you-choose" className="tc-display text-lg font-semibold text-[#142b3a]">
        Three things to know before you choose
      </h2>

      <ul className="mt-4 space-y-4">
        <li>
          <p className="text-sm font-semibold text-[#142b3a]">The bloodwork is not a formality.</p>
          <p className="mt-1 text-sm leading-relaxed text-[#53666e]">
            The American Urological Association&apos;s{" "}
            <a
              href="https://www.auanet.org/guidelines-and-quality/guidelines/testosterone-deficiency-guideline"
              target="_blank"
              rel="noopener noreferrer"
              className={linkCls}
            >
              testosterone deficiency guideline
            </a>{" "}
            uses total testosterone below 300 ng/dL as the cut-off, and says low testosterone
            should only be diagnosed after two early-morning tests on separate occasions. That is
            why every provider we have verified requires labs before prescribing.
          </p>
        </li>

        <li>
          <p className="text-sm font-semibold text-[#142b3a]">
            Online enclomiphene is compounded, not FDA-approved.
          </p>
          <p className="mt-1 text-sm leading-relaxed text-[#53666e]">
            Every provider we have verified dispenses compounded enclomiphene. The{" "}
            <a
              href="https://www.fda.gov/drugs/human-drug-compounding/compounding-and-fda-questions-and-answers"
              target="_blank"
              rel="noopener noreferrer"
              className={linkCls}
            >
              FDA&apos;s guidance on compounded drugs
            </a>{" "}
            is that they are not FDA-approved, so the FDA does not verify their safety,
            effectiveness or quality before they are sold. Ask which pharmacy fills your
            prescription.
          </p>
        </li>

        <li>
          <p className="text-sm font-semibold text-[#142b3a]">
            Compare the 12-month cost, not the monthly price.
          </p>
          <p className="mt-1 text-sm leading-relaxed text-[#53666e]">
            Headline prices hide prepayments, memberships and lab fees. The{" "}
            <Link href="/tools/enclomiphene-cost-calculator" className={linkCls}>
              cost calculator
            </Link>{" "}
            prices each provider from its own published terms.
          </p>
        </li>
      </ul>
    </section>
  );
}
