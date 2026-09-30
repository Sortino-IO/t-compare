import Link from "next/link";

export type FaqItem = {
  question: string;
  answer: string;
  link?: { href: string; label: string };
};

type Props = {
  items: FaqItem[];
  title?: string;
  intro?: string;
  className?: string;
};

function isExternal(href: string): boolean {
  return /^https?:\/\//.test(href);
}

/** FAQ list plus matching FAQPage structured data, kept in one place so they never drift. */
export default function FaqSection({ items, title = "FAQ", intro, className = "" }: Props) {
  if (items.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <section aria-labelledby="faq-heading" className={className}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <h2 id="faq-heading" className="tc-display text-xl font-semibold text-[#142b3a]">
        {title}
      </h2>
      {intro ? <p className="mt-1 text-sm text-[#53666e]">{intro}</p> : null}

      <div className="tc-card mt-4 divide-y divide-[#ededed]">
        {items.map((f) => (
          <details key={f.question} className="group px-5 py-4 sm:px-6">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-[15px] font-semibold text-[#142b3a] marker:hidden hover:text-[#176b87] [&::-webkit-details-marker]:hidden">
              {f.question}
              <span
                aria-hidden
                className="mt-0.5 shrink-0 text-lg leading-none text-[#176b87] transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-2 text-sm leading-relaxed text-[#53666e]">
              {f.answer}
              {f.link ? (
                <>
                  {" "}
                  {isExternal(f.link.href) ? (
                    <a
                      href={f.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-[#176b87] underline decoration-[#176b87]/30 underline-offset-2 hover:text-[#10556d]"
                    >
                      {f.link.label}
                    </a>
                  ) : (
                    <Link
                      href={f.link.href}
                      className="font-semibold text-[#176b87] underline decoration-[#176b87]/30 underline-offset-2 hover:text-[#10556d]"
                    >
                      {f.link.label}
                    </Link>
                  )}
                </>
              ) : null}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
