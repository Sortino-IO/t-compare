import Link from "next/link";
import WoodworkingNav from "./WoodworkingNav";

export default function WoodworkingShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6] text-[#292524]">
      <header className="border-b border-[#e7dcc8] bg-[#f5efe6]">
        <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6">
          <Link href="/lp/woodworking" className="group inline-block">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#92400e] mb-1">
              Woodworking Guide
            </p>
            <p className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-[#3d2914] group-hover:text-[#92400e] transition-colors sm:text-3xl">
              Build smarter. Waste less lumber.
            </p>
          </Link>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#78716c]">
            Practical guides on tools, projects, and plans for beginners — written for garage shops and real budgets.
          </p>
        </div>
      </header>
      <WoodworkingNav />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-[#e7dcc8] bg-[#f5efe6] mt-auto">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 text-xs leading-relaxed text-[#78716c]">
          <p className="mb-3">
            Guides are for educational purposes. Always follow tool manufacturer safety instructions and local codes.
          </p>
          <p>
            Some links on this section go to partner offers. We may earn a commission at no extra cost to you.{" "}
            <Link href="/disclaimer" className="underline hover:text-[#292524]">
              Disclaimer
            </Link>
            {" · "}
            <Link href="/privacy" className="underline hover:text-[#292524]">
              Privacy
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
