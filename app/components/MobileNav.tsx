"use client";

import { useState, useEffect, useRef, startTransition } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "T Providers", href: "/testosterone/enclomiphene" },
  { label: "Comparisons", href: "/comparisons" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close when navigating (e.g. browser back/forward); defer so we don’t sync-setState in the effect body
  useEffect(() => {
    startTransition(() => {
      setOpen(false);
    });
  }, [pathname]);

  // Close on outside tap / click
  useEffect(() => {
    if (!open) return;
    function handleOutside(e: MouseEvent | TouchEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside, { passive: true });
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  return (
    // wrapperRef covers both button and dropdown so outside-click works correctly
    <div ref={wrapperRef} className="sm:hidden">
      {/* Hamburger / close button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="p-2 -mr-2 text-[#78716c] hover:text-[#1c1917] transition-colors rounded-lg"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
      >
        {open ? (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="4" y1="7" x2="20" y2="7" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="17" x2="20" y2="17" />
          </svg>
        )}
      </button>

      {/* Dropdown - absolutely positioned below the header (header must be relative) */}
      {open && (
        <div
          id="mobile-menu"
          className="absolute top-full left-0 right-0 z-50 bg-[#f5f3ee] border-b border-[#e3dfd6] shadow-lg"
        >
          <nav className="mx-auto max-w-5xl px-6 py-2 flex flex-col">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-4 text-[15px] font-medium text-[#1c1917] border-b border-[#ede9e0] last:border-0 hover:text-[#2a6e47] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
