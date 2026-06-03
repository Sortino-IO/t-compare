"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const SUPPLEMENTS_HREF = "/t-supplements";
const SUPPLEMENTS_COMPARISONS_HREF = "/t-supplements/comparisons";

const SUB_LINKS = [
  { label: "Browse all supplements", href: SUPPLEMENTS_HREF },
  { label: "Head-to-head comparisons", href: SUPPLEMENTS_COMPARISONS_HREF },
] as const;

function isSupplementsActive(pathname: string): boolean {
  return pathname === SUPPLEMENTS_HREF || pathname.startsWith(`${SUPPLEMENTS_HREF}/`);
}

function subLinkActive(pathname: string, href: string): boolean {
  return pathname === href || (href !== SUPPLEMENTS_HREF && pathname.startsWith(href));
}

export function SupplementsNavDesktop() {
  const pathname = usePathname();
  const active = isSupplementsActive(pathname);

  return (
    <div className="relative group/nav">
      <button
        type="button"
        className={`inline-flex items-center gap-1 text-sm transition-colors ${
          active ? "text-[#1c1917] font-medium" : "text-[#78716c] group-hover/nav:text-[#1c1917]"
        }`}
        aria-haspopup="true"
      >
        T-Supplements
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
          className="transition-transform group-hover/nav:rotate-180 group-focus-within/nav:rotate-180"
        >
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div
        className="absolute top-full left-0 z-50 pt-2 min-w-[240px] opacity-0 invisible translate-y-1 pointer-events-none transition-all duration-150 group-hover/nav:opacity-100 group-hover/nav:visible group-hover/nav:translate-y-0 group-hover/nav:pointer-events-auto group-focus-within/nav:opacity-100 group-focus-within/nav:visible group-focus-within/nav:translate-y-0 group-focus-within/nav:pointer-events-auto"
        role="menu"
      >
        <div className="rounded-xl border border-[#e3dfd6] bg-white py-1.5 shadow-lg">
          {SUB_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              role="menuitem"
              className={`block px-4 py-2.5 text-sm transition-colors ${
                subLinkActive(pathname, item.href)
                  ? "bg-[#f0f7f3] text-[#2a6e47] font-medium"
                  : "text-[#44403c] hover:bg-[#f5f3ee] hover:text-[#2a6e47]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SupplementsNavMobile({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const active = isSupplementsActive(pathname);

  return (
    <div className="rounded-xl bg-white/80 border border-[#e3dfd6] px-3 py-2">
      <p
        className={`px-2 pt-2 pb-1 text-[11px] font-semibold uppercase tracking-[0.12em] ${
          active ? "text-[#2a6e47]" : "text-[#a8a29e]"
        }`}
      >
        T-Supplements
      </p>
      <div className="flex flex-col">
        {SUB_LINKS.map((item) => {
          const isActive = subLinkActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`rounded-lg px-3 py-3 text-[15px] transition-colors ${
                isActive
                  ? "bg-[#f0f7f3] text-[#2a6e47] font-medium"
                  : "text-[#44403c] hover:bg-[#f5f3ee] hover:text-[#2a6e47]"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
