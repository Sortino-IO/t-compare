"use client";

import { useState, useEffect, useRef, startTransition } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ENCLO_PROVIDERS,
  SUPP_BRANDS,
  ENCLO_COMPARISONS,
  SUPP_COMPARISONS,
  KEY_BLOG_POSTS,
  type NavLink,
} from "../lib/nav-data";

// ── Helpers ───────────────────────────────────────────────────────────────────
function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={`shrink-0 text-[#a8a29e] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function navLinkClass(isActive: boolean) {
  return `block rounded-lg px-3 py-3 text-[15px] font-medium transition-colors ${
    isActive
      ? "bg-white/90 text-[#2a6e47] shadow-sm"
      : "text-[#1c1917] hover:bg-white/70 hover:text-[#2a6e47]"
  }`;
}

// ── Accordion section ─────────────────────────────────────────────────────────
function AccordionSection({
  label,
  links,
  allHref,
  allLabel,
  activePrefix,
  onNavigate,
}: {
  label: string;
  links: NavLink[];
  allHref: string;
  allLabel: string;
  activePrefix: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === activePrefix || pathname.startsWith(`${activePrefix}/`);
  const [open, setOpen] = useState(isActive);

  return (
    <div className="rounded-xl border border-[#e3dfd6] bg-white/60 overflow-hidden">
      {/* Accordion header */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex w-full items-center justify-between px-4 py-3 text-left text-[15px] font-medium transition-colors ${
          isActive ? "text-[#2a6e47]" : "text-[#1c1917]"
        }`}
        aria-expanded={open}
      >
        {label}
        <ChevronIcon open={open} />
      </button>

      {/* Accordion body */}
      {open && (
        <div className="border-t border-[#e3dfd6] pb-2">
          {links.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className={`block px-5 py-2.5 text-[14px] transition-colors ${
                  active
                    ? "text-[#2a6e47] font-medium"
                    : "text-[#44403c] hover:text-[#2a6e47]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="mx-4 my-1.5 border-t border-[#f0ece4]" />
          <Link
            href={allHref}
            onClick={onNavigate}
            className="block px-5 py-2.5 text-[14px] font-semibold text-[#2a6e47] hover:opacity-80 transition-opacity"
          >
            {allLabel} →
          </Link>
        </div>
      )}
    </div>
  );
}

// ── Mobile nav (hamburger) ────────────────────────────────────────────────────
export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close on route change
  useEffect(() => {
    startTransition(() => setOpen(false));
  }, [pathname]);

  // Lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handle(e: MouseEvent | TouchEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handle);
    document.addEventListener("touchstart", handle, { passive: true });
    return () => {
      document.removeEventListener("mousedown", handle);
      document.removeEventListener("touchstart", handle);
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, []);

  const close = () => setOpen(false);

  return (
    // Visible only below xl (1280px)
    <div ref={wrapperRef} className="xl:hidden">
      {/* Hamburger / close button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="p-2 -mr-2 text-[#78716c] hover:text-[#1c1917] transition-colors rounded-lg"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="4" y1="7" x2="20" y2="7" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="17" x2="20" y2="17" />
          </svg>
        )}
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <button
            type="button"
            className="fixed inset-0 top-[var(--site-header-height,4.25rem)] z-40 bg-[#1c1917]/25"
            aria-label="Close menu"
            onClick={close}
          />

          {/* Drawer */}
          <div
            id="mobile-menu"
            className="fixed left-0 right-0 z-50 border-b border-[#e3dfd6] bg-[#f5f3ee] shadow-xl top-[var(--site-header-height,4.25rem)] max-h-[calc(100dvh-var(--site-header-height,4.25rem))] overflow-y-auto overscroll-contain"
          >
            <nav className="mx-auto max-w-5xl px-4 py-4 flex flex-col gap-2">

              {/* Home */}
              <Link
                href="/"
                onClick={close}
                className={navLinkClass(pathname === "/")}
              >
                Home
              </Link>

              {/* Enclomiphene Providers */}
              <AccordionSection
                label="Enclomiphene Providers"
                links={ENCLO_PROVIDERS}
                allHref="/testosterone/enclomiphene"
                allLabel="All providers"
                activePrefix="/testosterone/enclomiphene"
                onNavigate={close}
              />

              {/* Testosterone Supplements */}
              <AccordionSection
                label="Testosterone Supplements"
                links={SUPP_BRANDS}
                allHref="/t-supplements"
                allLabel="All supplements"
                activePrefix="/t-supplements"
                onNavigate={close}
              />

              {/* Enclomiphene Comparisons */}
              <AccordionSection
                label="Enclomiphene Comparisons"
                links={ENCLO_COMPARISONS}
                allHref="/comparisons"
                allLabel="All comparisons"
                activePrefix="/compare"
                onNavigate={close}
              />

              {/* Supplement Comparisons */}
              <AccordionSection
                label="Supplement Comparisons"
                links={SUPP_COMPARISONS}
                allHref="/t-supplements/comparisons"
                allLabel="All comparisons"
                activePrefix="/t-supplements/compare"
                onNavigate={close}
              />

              {/* Blog */}
              <AccordionSection
                label="Blog"
                links={KEY_BLOG_POSTS}
                allHref="/blog"
                allLabel="All articles"
                activePrefix="/blog"
                onNavigate={close}
              />

              {/* About */}
              <Link
                href="/about"
                onClick={close}
                className={navLinkClass(pathname === "/about")}
              >
                About
              </Link>
            </nav>

            <div className="h-6" aria-hidden="true" />
          </div>
        </>
      )}
    </div>
  );
}
