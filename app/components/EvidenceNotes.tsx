import { EVIDENCE, type Evidence, type EvidenceId } from "../data/evidence";

type Props = {
  ids: EvidenceId[];
  title?: string;
  className?: string;
};

/**
 * Short, sourced research findings. Each statement is limited to what its
 * cited abstract supports, with the study population and caveat kept visible.
 */
export default function EvidenceNotes({
  ids,
  title = "What the research says",
  className = "",
}: Props) {
  const notes: Evidence[] = ids.map((id) => EVIDENCE[id]);
  if (notes.length === 0) return null;

  return (
    <section aria-label={title} className={className}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#176b87]">
        {title}
      </p>
      <ul
        className={`mt-3 grid gap-3 ${
          notes.length >= 3 ? "md:grid-cols-3" : notes.length === 2 ? "md:grid-cols-2" : ""
        }`}
      >
        {notes.map((n) => (
          <li
            key={n.sourceLabel}
            className="flex flex-col rounded-xl border border-[#e3e3e3] border-l-[3px] border-l-[#176b87] bg-white p-4"
          >
            <p className="flex-1 text-sm leading-relaxed text-[#142b3a]">{n.statement}</p>
            {n.caveat ? (
              <p className="mt-2 text-xs leading-snug text-[#5f757f]">{n.caveat}</p>
            ) : null}
            <a
              href={n.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 text-xs font-semibold text-[#176b87] underline decoration-[#176b87]/30 underline-offset-2 hover:text-[#10556d]"
            >
              {n.sourceLabel} ↗
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
