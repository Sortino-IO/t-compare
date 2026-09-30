import { AUTHORITY_SOURCES } from "../lib/authority-sources";
import ExternalTextLink from "./ui/ExternalTextLink";

type Props = {
  heading?: string;
  className?: string;
};

export default function AuthoritySources({
  heading = "Sources we use for clinical context",
  className = "",
}: Props) {
  return (
    <section className={`rounded-xl border border-[#e3e3e3] bg-[#f4f8fa] px-5 py-4 ${className}`}>
      <h2 className="text-sm font-semibold uppercase tracking-wide text-[#3c535e]">{heading}</h2>
      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[#53666e]">
        {AUTHORITY_SOURCES.map((s) => (
          <li key={s.href}>
            <ExternalTextLink href={s.href}>{s.label}</ExternalTextLink>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs leading-relaxed text-[#5f757f]">
        Provider pricing and plan terms are checked against each company&apos;s public pages; use
        official checkout for live totals.
      </p>
    </section>
  );
}
