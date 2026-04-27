import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import AskAssistant from "./components/AskAssistant";
import GoogleTagManager from "./components/GoogleTagManager";
import MobileNav from "./components/MobileNav";
import { SITE_URL } from "./lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

function siteVerification(): Metadata["verification"] | undefined {
  const google = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();
  const bing = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION?.trim();
  if (!google && !bing) return undefined;
  return {
    ...(google ? { google } : {}),
    ...(bing ? { other: { "msvalidate.01": bing } } : {}),
  };
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "T-Compare — Testosterone Provider Comparison",
    template: "%s | T-Compare",
  },
  description:
    "Browse and compare testosterone-related providers and programs in one place. An independent, informational reference.",
  openGraph: {
    siteName: "T-Compare",
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "T-Compare — Compare Testosterone Providers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@tcompare",
    images: ["/opengraph-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  verification: siteVerification(),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${playfair.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <GoogleTagManager />
        {/* Header — relative so the mobile dropdown can use absolute top-full */}
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

            {/* Desktop nav — hidden on mobile */}
            <nav className="hidden sm:flex items-center gap-6">
              <Link href="/" className="text-sm text-[#78716c] hover:text-[#1c1917] transition-colors">
                Home
              </Link>
              <Link href="/testosterone/enclomiphene" className="text-sm text-[#78716c] hover:text-[#1c1917] transition-colors">
                T Providers
              </Link>
              <Link href="/comparisons" className="text-sm text-[#78716c] hover:text-[#1c1917] transition-colors">
                השוואות
              </Link>
              <Link href="/blog" className="text-sm text-[#78716c] hover:text-[#1c1917] transition-colors">
                Blog
              </Link>
              <Link href="/about" className="text-sm text-[#78716c] hover:text-[#1c1917] transition-colors">
                About
              </Link>
            </nav>

            {/* Mobile nav — hamburger + dropdown, hidden on sm+ */}
            <MobileNav />
          </div>
        </header>

        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="border-t border-[#e3dfd6] bg-[#f5f3ee] mt-auto">
          <div className="mx-auto max-w-5xl px-6 py-10">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
              <div>
                <span className="font-[family-name:var(--font-playfair)] text-base font-bold text-[#1c1917]">
                  T-Compare
                </span>
                <p className="mt-1.5 text-xs text-[#a8a29e] leading-relaxed max-w-xs">
                  Informational comparison of testosterone-related providers.
                  Not medical advice.
                </p>
              </div>
              <nav className="flex flex-wrap gap-x-6 gap-y-2">
                {[
                  { label: "About",          href: "/about" },
                  { label: "Disclaimer",     href: "/disclaimer" },
                  { label: "Privacy Policy", href: "/privacy" },
                  { label: "Terms",          href: "/terms" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-xs text-[#a8a29e] hover:text-[#1c1917] transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <p className="mt-6 text-xs text-[#b5b0a8] leading-relaxed">
              Information is based on publicly available sources and may change
              over time.
            </p>
            <p className="mt-4 pt-6 border-t border-[#e3dfd6] text-xs text-[#b5b0a8] leading-relaxed">
              This site is for informational purposes only and does not
              constitute medical advice, diagnosis, or treatment. Always consult
              a qualified healthcare provider. Prices shown are approximate and
              subject to change.
            </p>
          </div>
        </footer>

        <AskAssistant />
      </body>
    </html>
  );
}
