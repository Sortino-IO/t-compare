"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const SUPPLEMENTS_HREF = "/t-supplements";
const SUPPLEMENTS_COMPARISONS_HREF = "/t-supplements/comparisons";

function isSupplementsActive(pathname: string): boolean {
  return pathname === SUPPLEMENTS_HREF || pathname.startsWith(`${SUPPLEMENTS_HREF}/`);
}

export function SupplementsNavDesktop() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const active = isSupplementsActive(pathname);

  useEffect(() => {
    if (!open) return;
    function handleOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-1 text-sm transition-colors ${
          active ? "text-[#1c1917] font-medium" : "text-[#78716c] hover:text-[#1c1917]"
        }`}
        aria-expanded={open}
        aria-haspopup="true"
      >
        T-Supplements
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open ? (
        <div className="absolute top-full left-0 mt-2 min-w-[220px] rounded-xl border border-[#e3dfd6] bg-white py-1.5 shadow-lg z-50">
          <Link
            href={SUPPLEMENTS_HREF}
            className="block px-4 py-2.5 text-sm text-[#44403c] hover:bg-[#f5f3ee] hover:text-[#2a6e47] transition-colors"
          >
            T-Supplements
          </Link>
          <Link
            href={SUPPLEMENTS_COMPARISONS_HREF}
            className="block px-4 py-2.5 text-sm text-[#44403c] hover:bg-[#f5f3ee] hover:text-[#2a6e47] transition-colors"
          >
            T-Supplements Comparisons
          </Link>
        </div>
      ) : null}
    </div>
  );
}

export function SupplementsNavMobile({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const active = isSupplementsActive(pathname);

  return (
    <div className="border-b border-[#ede9e0] last:border-0">
      <Link
        href={SUPPLEMENTS_HREF}
        onClick={onNavigate}
        className={`block py-4 text-[15px] font-medium transition-colors ${
          active && pathname === SUPPLEMENTS_HREF
            ? "text-[#2a6e47]"
            : "text-[#1c1917] hover:text-[#2a6e47]"
        }`}
      >
        T-Supplements
      </Link>
      <Link
        href={SUPPLEMENTS_COMPARISONS_HREF}
        onClick={onNavigate}
        className={`block pb-4 pl-4 text-[14px] transition-colors ${
          pathname === SUPPLEMENTS_COMPARISONS_HREF
            ? "text-[#2a6e47] font-medium"
            : "text-[#78716c] hover:text-[#2a6e47]"
        }`}
      >
        T-Supplements Comparisons
      </Link>
    </div>
  );
}
