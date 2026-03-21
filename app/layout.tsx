import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import Link from "next/link";
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

export const metadata: Metadata = {
  title: {
    default: "EncloCompare — Enclomiphene Provider Comparison",
    template: "%s | EncloCompare",
  },
  description:
    "Compare enclomiphene provider protocols and pricing. An independent, informational reference for testosterone treatment options.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${playfair.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <header className="border-b border-[#e3dfd6] bg-[#f5f3ee]">
          <div className="mx-auto max-w-5xl px-6 py-5 flex items-center justify-between">
            <Link
              href="/"
              className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-[#1c1917] hover:text-[#2a6e47] transition-colors tracking-tight"
            >
              EncloCompare
            </Link>
            <nav className="flex items-center gap-7">
              <Link
                href="/testosterone/enclomiphene"
                className="text-sm text-[#78716c] hover:text-[#1c1917] transition-colors"
              >
                Providers
              </Link>
              <Link
                href="/testosterone"
                className="text-sm text-[#78716c] hover:text-[#1c1917] transition-colors"
              >
                Categories
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-[#e3dfd6] bg-[#f5f3ee] mt-auto">
          <div className="mx-auto max-w-5xl px-6 py-8">
            <p className="text-xs text-[#a8a29e] leading-relaxed max-w-2xl">
              This site is for informational purposes only and does not
              constitute medical advice. Always consult a qualified healthcare
              provider before starting any treatment. Prices shown are
              approximate and may change.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
