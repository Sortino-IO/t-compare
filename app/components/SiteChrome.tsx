"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import AskAssistant from "./AskAssistant";
import MobileNav from "./MobileNav";
import {
  ENCLO_PROVIDERS,
  SUPP_BRANDS,
  ENCLO_COMPARISONS,
  SUPP_COMPARISONS,
  KEY_BLOG_POSTS,
  type NavLink,
} from "../lib/nav-data";

// ── Chevron SVG ───────────────────────────────────────────────────────────────
function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M2 4l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── Desktop dropdown nav item ─────────────────────────────────────────────────
interface DropdownProps {
  label: string;
  links: NavLink[];
  allHref: string;
  allLabel: string;
  /** If any link.href starts with this prefix, the parent label is highlighted */
  activePrefix: string;
}

function NavDropdown({ label, links, allHref, allLabel, activePrefix }: DropdownProps) {
  const pathname = usePathname();
  const isActive = pathname === activePrefix || pathname.startsWith(`${activePrefix}/`);

  return (
    <div className="relative group/nd">
      <button
        type="button"
        aria-haspopup="true"
        className={`inline-flex items-center gap-1 text-[13px] font-medium transition-colors ${
          isActive
            ? "text-[#1c1917]"
            : "text-[#78716c] group-hover/nd:text-[#1c1917]"
        }`}
      >
        {label}
        <Chevron className="transition-transform duration-150 group-hover/nd:rotate-180 group-focus-within/nd:rotate-180" />
      </button>

      {/* Dropdown panel */}
      <div
        role="menu"
        className="absolute top-full left-0 z-50 pt-2 min-w-[220px] pointer-events-none opacity-0 invisible translate-y-1 transition-all duration-150 group-hover/nd:pointer-events-auto group-hover/nd:opacity-100 group-hover/nd:visible group-hover/nd:translate-y-0 group-focus-within/nd:pointer-events-auto group-focus-within/nd:opacity-100 group-focus-within/nd:visible group-focus-within/nd:translate-y-0"
      >
        <div className="rounded-xl border border-[#e3dfd6] bg-white py-1.5 shadow-lg">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              role="menuitem"
              className={`block px-4 py-2 text-[13px] transition-colors ${
                pathname === item.href || pathname.startsWith(`${item.href}/`)
                  ? "bg-[#f0f7f3] text-[#2a6e47] font-medium"
                  : "text-[#44403c] hover:bg-[#f5f3ee] hover:text-[#2a6e47]"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="mx-4 my-1.5 border-t border-[#f0ece4]" />
          <Link
            href={allHref}
            role="menuitem"
            className="block px-4 py-2 text-[13px] font-semibold text-[#2a6e47] hover:bg-[#f5f3ee]"
          >
            {allLabel} →
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Footer accordion section (mobile: collapsible, desktop: always open) ─────
function FooterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      {/* Mobile header (toggle) */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between border-t border-[#e3dfd6] py-4 text-left xl:hidden"
      >
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#b5b0a8]">
          {title}
        </span>
        <Chevron
          className={`text-[#b5b0a8] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Desktop header (static) */}
      <div className="hidden xl:block mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#b5b0a8]">
        {title}
      </div>

      {/* Content */}
      <div className={`${open ? "block" : "hidden"} pb-4 xl:block xl:pb-0`}>
        {children}
      </div>
    </div>
  );
}

// ── Footer link helper ────────────────────────────────────────────────────────
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="block text-sm text-[#78716c] hover:text-[#1c1917] transition-colors leading-relaxed py-0.5"
    >
      {children}
    </Link>
  );
}

function FooterLinkDivider() {
  return <div className="my-2 border-t border-[#f0ece4]" />;
}

// ── Main SiteChrome ───────────────────────────────────────────────────────────
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLandingPage = pathname.startsWith("/lp/");

  if (isLandingPage) {
    return <>{children}</>;
  }

  return (
    <>
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 border-b border-[#e3dfd6] bg-[#f5f3ee] [--site-header-height:4.25rem] sm:[--site-header-height:4.5rem]">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between gap-6">
          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center py-1 transition-opacity hover:opacity-85"
            aria-label="T-Compare home"
          >
            <Image
              src="/logo.png"
              alt="T-Compare"
              width={200}
              height={44}
              className="h-9 w-auto max-h-9 sm:h-10 sm:max-h-10"
              priority
            />
          </Link>

          {/* Desktop nav — visible on xl (≥1280px) */}
          <nav className="hidden xl:flex items-center gap-4 flex-wrap">
            <Link
              href="/"
              className={`text-[13px] font-medium transition-colors ${
                pathname === "/" ? "text-[#1c1917]" : "text-[#78716c] hover:text-[#1c1917]"
              }`}
            >
              Home
            </Link>

            <NavDropdown
              label="Enclomiphene Providers"
              links={ENCLO_PROVIDERS}
              allHref="/testosterone/enclomiphene"
              allLabel="All providers"
              activePrefix="/testosterone/enclomiphene"
            />

            <NavDropdown
              label="Testosterone Supplements"
              links={SUPP_BRANDS}
              allHref="/t-supplements"
              allLabel="All supplements"
              activePrefix="/t-supplements"
            />

            <NavDropdown
              label="Enclomiphene Comparisons"
              links={ENCLO_COMPARISONS}
              allHref="/comparisons"
              allLabel="All comparisons"
              activePrefix="/compare"
            />

            <NavDropdown
              label="Supplement Comparisons"
              links={SUPP_COMPARISONS}
              allHref="/t-supplements/comparisons"
              allLabel="All comparisons"
              activePrefix="/t-supplements/compare"
            />

            <NavDropdown
              label="Blog"
              links={KEY_BLOG_POSTS}
              allHref="/blog"
              allLabel="All articles"
              activePrefix="/blog"
            />

            <Link
              href="/about"
              className={`text-[13px] font-medium transition-colors ${
                pathname === "/about" ? "text-[#1c1917]" : "text-[#78716c] hover:text-[#1c1917]"
              }`}
            >
              About
            </Link>
          </nav>

          {/* Mobile hamburger — hidden on xl */}
          <MobileNav />
        </div>
      </header>

      {/* ── Page content ── */}
      <main className="flex-1">{children}</main>

      {/* ── Footer ── */}
      <footer className="border-t border-[#e3dfd6] bg-[#f5f3ee] mt-auto">
        <div className="mx-auto max-w-7xl px-6 pt-10 pb-6">

          {/* Brand row */}
          <div className="mb-8">
            <Link href="/" aria-label="T-Compare home">
              <Image
                src="/logo.png"
                alt="T-Compare"
                width={160}
                height={36}
                className="h-8 w-auto"
              />
            </Link>
            <p className="mt-3 text-xs text-[#a8a29e] leading-relaxed max-w-md">
              Independent, informational comparisons of testosterone-related telehealth
              programs and supplements. Not medical advice — always confirm eligibility,
              pricing, and inclusions with the provider.
            </p>
          </div>

          {/* Link columns grid */}
          <div className="grid grid-cols-1 xl:grid-cols-5 xl:gap-8">

            {/* Enclomiphene Providers */}
            <FooterSection title="Enclomiphene Providers">
              <nav className="flex flex-col">
                {ENCLO_PROVIDERS.map((link) => (
                  <FooterLink key={link.href} href={link.href}>
                    {link.label}
                  </FooterLink>
                ))}
                <FooterLinkDivider />
                <FooterLink href="/testosterone/enclomiphene">All providers →</FooterLink>
              </nav>
            </FooterSection>

            {/* Testosterone Supplements */}
            <FooterSection title="Testosterone Supplements">
              <nav className="flex flex-col">
                {SUPP_BRANDS.map((link) => (
                  <FooterLink key={link.href} href={link.href}>
                    {link.label}
                  </FooterLink>
                ))}
                <FooterLinkDivider />
                <FooterLink href="/t-supplements">All supplements →</FooterLink>
              </nav>
            </FooterSection>

            {/* Comparisons */}
            <FooterSection title="Comparisons">
              <nav className="flex flex-col">
                <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#c8c2bb] py-1">
                  Enclomiphene
                </span>
                {ENCLO_COMPARISONS.map((link) => (
                  <FooterLink key={link.href} href={link.href}>
                    {link.label}
                  </FooterLink>
                ))}
                <FooterLink href="/comparisons">All enclo comparisons →</FooterLink>

                <FooterLinkDivider />

                <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#c8c2bb] py-1">
                  Supplements
                </span>
                {SUPP_COMPARISONS.map((link) => (
                  <FooterLink key={link.href} href={link.href}>
                    {link.label}
                  </FooterLink>
                ))}
                <FooterLink href="/t-supplements/comparisons">All supplement comparisons →</FooterLink>
              </nav>
            </FooterSection>

            {/* Blog */}
            <FooterSection title="Blog">
              <nav className="flex flex-col">
                {KEY_BLOG_POSTS.map((link) => (
                  <FooterLink key={link.href} href={link.href}>
                    {link.label}
                  </FooterLink>
                ))}
                <FooterLinkDivider />
                <FooterLink href="/blog">All articles →</FooterLink>
              </nav>
            </FooterSection>

            {/* Legal */}
            <FooterSection title="Legal & Policies">
              <nav className="flex flex-col">
                <FooterLink href="/disclaimer">Disclaimer</FooterLink>
                <FooterLink href="/privacy">Privacy Policy</FooterLink>
                <FooterLink href="/terms">Terms</FooterLink>
                <FooterLinkDivider />
                <FooterLink href="/about">About</FooterLink>
              </nav>
            </FooterSection>
          </div>

          {/* Bottom disclaimer */}
          <div className="mt-8 border-t border-[#e3dfd6] pt-6 space-y-3">
            <p className="text-xs text-[#b5b0a8] leading-relaxed">
              Information is based on publicly available sources and may change over time.
            </p>
            <p className="text-xs text-[#b5b0a8] leading-relaxed">
              This site is for informational purposes only and does not constitute medical
              advice, diagnosis, or treatment. Always consult a qualified healthcare provider.
              Prices shown are approximate and subject to change.
            </p>
          </div>
        </div>
      </footer>

      <AskAssistant />
    </>
  );
}
