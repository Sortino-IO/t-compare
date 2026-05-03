/**
 * Short list of independent medical/education references to support reader trust.
 * Not exhaustive citation management — articles still cite specifics inline where needed.
 */
export default function BlogArticleTrust() {
  const links = [
    {
      label: "MedlinePlus — Male hypogonadism overview",
      href: "https://medlineplus.gov/ency/article/003707.htm",
    },
    {
      label: "NIH Bookshelf — Overview of male hypogonadism",
      href: "https://www.ncbi.nlm.nih.gov/books/NBK279359/",
    },
    {
      label: "FDA — How to read prescription drug labeling (consumer)",
      href: "https://www.fda.gov/consumers/free-publications-women/understanding-prescription-drug-labels",
    },
  ];

  return (
    <section className="mx-auto mt-14 max-w-3xl border border-[#e3dfd6] rounded-2xl bg-[#fbfaf7] px-6 py-6 sm:px-8">
      <h2 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-[#1c1917] sm:text-xl">
        Authoritative references (education)
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-[#78716c]">
        Independent references for core definitions and labeling—not a substitute for your clinician’s judgment about your case.
      </p>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-[#44403c] marker:text-[#2a6e47]">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#2a6e47] underline decoration-[#2a6e47]/30 underline-offset-2 hover:text-[#1c1917]"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
