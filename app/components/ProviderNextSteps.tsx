import type { Brand } from "../lib/brands";

/**
 * Sets expectations before the outbound click. Enclomiphene is a multi-step
 * prescription flow, and people who know that going in are far more likely to
 * finish intake than people expecting a checkout.
 */
export default function ProviderNextSteps({ brand }: { brand: Brand }) {
  const facts = brand.facts;

  const steps = [
    {
      title: "Online intake",
      body: "Health history and symptoms, submitted on the provider's site.",
    },
    {
      title: "Bloodwork",
      body: facts ? facts.labs.short : "Upload recent results or order a lab kit.",
    },
    {
      title: "Clinician review",
      body: `${facts ? facts.prescriber.short : "A licensed clinician"} decides if enclomiphene is appropriate. Not everyone is approved.`,
    },
    {
      title: "Medication ships",
      body: facts ? facts.billing.short : "Billed on the provider's subscription plan.",
    },
  ];

  return (
    <section aria-labelledby="next-steps-heading" className="tc-card mt-6 p-5 sm:p-6">
      <h2 id="next-steps-heading" className="tc-display text-lg font-semibold text-[#142b3a]">
        What happens after you click
      </h2>

      <ol className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <li key={step.title} className="flex gap-3">
            <span
              aria-hidden
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#bcd9e4] text-xs font-bold text-[#176b87]"
            >
              {i + 1}
            </span>
            <div>
              <p className="text-sm font-semibold text-[#142b3a]">{step.title}</p>
              <p className="mt-0.5 text-[13px] leading-relaxed text-[#53666e]">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
