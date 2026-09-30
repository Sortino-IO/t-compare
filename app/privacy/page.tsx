import type { Metadata } from "next";
import Link from "next/link";
import { OG_BASE, SITE_URL } from "../lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Review how T-Compare handles analytics, cookies, and external links, and what data is or is not collected when you use the site.",
  openGraph: {
    ...OG_BASE,
    title: "Privacy Policy | T-Compare",
    description:
      "Review how T-Compare handles analytics, cookies, and external links, and what data is or is not collected when you use the site.",
    url: `${SITE_URL}/privacy`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | T-Compare",
    description:
      "Review how T-Compare handles analytics, cookies, and external links, and what data is or is not collected when you use the site.",
  },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
      <nav className="flex items-center gap-2 text-sm text-[#5f757f] mb-10">
        <Link href="/" className="hover:text-[#176b87] hover:underline">
          Home
        </Link>
        <span>/</span>
        <span className="text-[#53666e]">Privacy Policy</span>
      </nav>

      <div className="max-w-2xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#176b87] mb-4">
          Legal
        </p>
        <h1 className="tc-display text-[1.75rem] font-bold leading-tight sm:text-4xl mb-4">
          Privacy Policy
        </h1>
        <p className="text-sm text-[#5f757f] mb-10">
          Last updated: March 2026
        </p>

        <div className="rounded-xl bg-white border border-[#e3e3e3] overflow-hidden">
          {[
            {
              heading: "Information we collect",
              body: "T-Compare is a static informational website. We do not collect personal information, require account registration, or store user data. We may use analytics tools to understand aggregate traffic patterns (e.g. page views).",
            },
            {
              heading: "Cookies",
              body: "This site may use minimal cookies for analytics purposes. No personally identifiable information is collected via cookies. You can disable cookies in your browser settings.",
            },
            {
              heading: "Third-party links",
              body: "This site links to third-party provider websites. We are not responsible for the privacy practices of any external sites. Please review the privacy policies of any third-party sites you visit.",
            },
            {
              heading: "Analytics",
              body: "We may use third-party analytics services to understand how visitors use this site. These services collect anonymous, aggregated data only. No personal information is sold or shared.",
            },
            {
              heading: "Changes to this policy",
              body: "We may update this Privacy Policy from time to time. Continued use of the site following any changes constitutes acceptance of the updated policy.",
            },
            {
              heading: "Contact",
              body: "If you have questions about this Privacy Policy, please use the contact information available on the About page.",
            },
          ].map((section, i, arr) => (
            <div
              key={section.heading}
              className={`px-7 py-6 ${i < arr.length - 1 ? "border-b border-[#ededed]" : ""}`}
            >
              <p className="text-[11px] font-semibold text-[#5f757f] uppercase tracking-[0.12em] mb-3">
                {section.heading}
              </p>
              <p className="text-sm text-[#3c535e] leading-relaxed">
                {section.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
