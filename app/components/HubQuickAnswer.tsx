import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

/** Visible summary block tuned for featured snippets and AI overviews. */
export default function HubQuickAnswer({ children, className = "" }: Props) {
  return (
    <aside
      className={`rounded-xl border border-[#cfe4ec] bg-[#eef6f9] px-5 py-4 text-[15px] leading-relaxed text-[#3c535e] ${className}`}
    >
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#176b87]">
        Quick answer
      </p>
      {children}
    </aside>
  );
}
