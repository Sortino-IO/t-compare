"use client";

import { useState, useEffect, useRef, startTransition } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SupplementsNavMobile } from "./SupplementsNav";

const NAV_LINKS_BEFORE = [
  { label: "Home", href: "/" },
  { label: "T Providers", href: "/testosterone/enclomiphene" },
] as const;

const NAV_LINKS_AFTER = [
  { label: "Comparisons", href: "/comparisons" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
] as const;

function navLinkClass(isActive: boolean) {
  return `block rounded-lg px-3 py-3.5 text-[15px] font-medium transition-colors ${
    isActive ? "bg-white/90 text-[#2a6e47] shadow-sm" : "text-[#1c1917] hover:bg-white/70 hover:text-[#2a6e47]"
  }`;
}

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    startTransition(() => {
      setOpen(false);
    });
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

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

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  const close = () => setOpen(false);

  return (
    <div ref={wrapperRef} className="sm:hidden">
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

      {open ? (
        <>
          <button
            type="button"
            className="fixed inset-0 top-[var(--site-header-height,4.25rem)] z-40 bg-[#1c1917]/25"
            aria-label="Close menu"
            onClick={close}
          />

          <div
            id="mobile-menu"
            className="fixed left-0 right-0 z-50 border-b border-[#e3dfd6] bg-[#f5f3ee] shadow-xl top-[var(--site-header-height,4.25rem)] max-h-[calc(100dvh-var(--site-header-height,4.25rem))] overflow-y-auto overscroll-contain"
          >
            <nav className="mx-auto max-w-5xl px-4 py-4 flex flex-col gap-1.5">
              {NAV_LINKS_BEFORE.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  className={navLinkClass(pathname === link.href)}
                >
                  {link.label}
                </Link>
              ))}

              <SupplementsNavMobile onNavigate={close} />

              {NAV_LINKS_AFTER.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  className={navLinkClass(pathname === link.href || pathname.startsWith(`${link.href}/`))}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="h-6 safe-area-pb" aria-hidden="true" />
          </div>
        </>
      ) : null}
    </div>
  );
}
