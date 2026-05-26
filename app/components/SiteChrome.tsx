"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AskAssistant from "./AskAssistant";
import MobileNav from "./MobileNav";
import { SupplementsNavDesktop } from "./SupplementsNav";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLandingPage = pathname.startsWith("/lp/");

  if (isLandingPage) {
    return <>{children}</>;
  }

  return (
    <>
      <header className="relative border-b border-[#e3dfd6] bg-[#f5f3ee]">
        <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
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

          <nav className="hidden sm:flex items-center gap-6">
            <Link href="/" className="text-sm text-[#78716c] hover:text-[#1c1917] transition-colors">
              Home
            </Link>
            <Link href="/testosterone/enclomiphene" className="text-sm text-[#78716c] hover:text-[#1c1917] transition-colors">
              T Providers
            </Link>
            <SupplementsNavDesktop />
            <Link href="/comparisons" className="text-sm text-[#78716c] hover:text-[#1c1917] transition-colors">
              Comparisons
            </Link>
            <Link href="/blog" className="text-sm text-[#78716c] hover:text-[#1c1917] transition-colors">
              Blog
            </Link>
            <Link href="/about" className="text-sm text-[#78716c] hover:text-[#1c1917] transition-colors">
              About
            </Link>
          </nav>

          <MobileNav />
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-[#e3dfd6] bg-[#f5f3ee] mt-auto">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            <div className="lg:col-span-2">
              <span className="font-[family-name:var(--font-playfair)] text-base font-bold text-[#1c1917]">
                T-Compare
              </span>
              <p className="mt-1.5 text-xs text-[#a8a29e] leading-relaxed max-w-md">
                Independent, informational comparisons of testosterone-related telehealth programs.
                Not medical advice-always confirm eligibility, pricing, and inclusions with the provider.
              </p>
            </div>

            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#b5b0a8]">
                Explore
              </div>
              <nav className="mt-3 flex flex-col gap-2 text-sm">
                <Link href="/" className="text-[#78716c] hover:text-[#1c1917] transition-colors">
                  Home
                </Link>
                <Link href="/testosterone/enclomiphene" className="text-[#78716c] hover:text-[#1c1917] transition-colors">
                  Enclomiphene providers
                </Link>
                <Link href="/t-supplements" className="text-[#78716c] hover:text-[#1c1917] transition-colors">
                  T-Supplements
                </Link>
                <Link href="/t-supplements/comparisons" className="text-[#78716c] hover:text-[#1c1917] transition-colors">
                  T-Supplements comparisons
                </Link>
                <Link href="/testosterone" className="text-[#78716c] hover:text-[#1c1917] transition-colors">
                  Testosterone topics
                </Link>
                <Link href="/comparisons" className="text-[#78716c] hover:text-[#1c1917] transition-colors">
                  Comparisons index
                </Link>
                <Link href="/blog" className="text-[#78716c] hover:text-[#1c1917] transition-colors">
                  Blog
                </Link>
                <Link href="/about" className="text-[#78716c] hover:text-[#1c1917] transition-colors">
                  About
                </Link>
              </nav>
            </div>

            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#b5b0a8]">
                Legal & policies
              </div>
              <nav className="mt-3 flex flex-col gap-2 text-sm">
                <Link href="/disclaimer" className="text-[#78716c] hover:text-[#1c1917] transition-colors">
                  Disclaimer
                </Link>
                <Link href="/privacy" className="text-[#78716c] hover:text-[#1c1917] transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-[#78716c] hover:text-[#1c1917] transition-colors">
                  Terms
                </Link>
              </nav>
            </div>
          </div>

          <p className="mt-10 text-xs text-[#b5b0a8] leading-relaxed">
            Information is based on publicly available sources and may change over time.
          </p>
          <p className="mt-4 pt-6 border-t border-[#e3dfd6] text-xs text-[#b5b0a8] leading-relaxed">
            This site is for informational purposes only and does not constitute medical advice,
            diagnosis, or treatment. Always consult a qualified healthcare provider. Prices shown are
            approximate and subject to change.
          </p>
        </div>
      </footer>

      <AskAssistant />
    </>
  );
}
