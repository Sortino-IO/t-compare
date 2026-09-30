import Link from "next/link";

type Pair = { title: string; href: string; description: string };

export default function ComparisonPairsGrid({ pairs }: { pairs: Pair[] }) {
  return (
    <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
      {pairs.map((p) => (
        <li key={p.href}>
          <Link
            href={p.href}
            className="flex h-full flex-col rounded-xl border border-[#e3e3e3] bg-white p-4 transition-colors hover:border-[#a9cbd8] hover:bg-[#f4f8fa] sm:p-5"
          >
            <span className="tc-display text-base font-bold">{p.title}</span>
            <span className="mt-1.5 flex-1 text-sm leading-relaxed text-[#53666e]">
              {p.description}
            </span>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#176b87]">
              View comparison <span aria-hidden>→</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
