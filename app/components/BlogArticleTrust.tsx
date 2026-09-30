/**
 * Short list of independent medical/education references to support reader trust.
 * Not exhaustive citation management - articles still cite specifics inline where needed.
 */
export default function BlogArticleTrust() {
  const links = [
    {
      label: "MedlinePlus - Male hypogonadism overview",
      href: "https://medlineplus.gov/ency/article/003707.htm",
    },
    {
      label: "NIH Bookshelf - Overview of male hypogonadism",
      href: "https://www.ncbi.nlm.nih.gov/books/NBK279359/",
    },
    {
      label: "FDA - How to read prescription drug labeling (consumer)",
      href: "https://www.fda.gov/consumers/free-publications-women/understanding-prescription-drug-labels",
    },
  ];

  return (
    <section className="mx-auto mt-14 max-w-3xl border border-[#e3e3e3] rounded-xl bg-white px-6 py-6 sm:px-8">
      <h2 className="tc-display text-lg font-semibold text-[#142b3a] sm:text-xl">
        Authoritative references (education)
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-[#53666e]">
        Independent references for core definitions and labeling-not a substitute for your clinician’s judgment about your case.
      </p>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-[#3c535e] marker:text-[#176b87]">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#176b87] underline decoration-[#176b87]/30 underline-offset-2 hover:text-[#142b3a]"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
