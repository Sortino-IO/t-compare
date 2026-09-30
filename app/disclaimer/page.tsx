import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "../lib/site";

export const metadata: Metadata = {
  title: "Medical Disclaimer",
  description:
    "Read T-Compare's medical disclaimer, content limitations, and why all provider details should be verified directly before making health decisions.",
  openGraph: {
    title: "Medical Disclaimer | T-Compare",
    description:
      "Read T-Compare's medical disclaimer, content limitations, and why all provider details should be verified directly before making health decisions.",
    url: `${SITE_URL}/disclaimer`,
    images: [
      {
        url: "/disclaimer/opengraph-image",
        width: 1200,
        height: 630,
        alt: "T-Compare Medical Disclaimer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Medical Disclaimer | T-Compare",
    description:
      "Read T-Compare's medical disclaimer, content limitations, and why all provider details should be verified directly before making health decisions.",
    images: ["/disclaimer/opengraph-image"],
  },
};

const sections = [
  {
    heading: "Informational purposes only",
    body: "This website is for informational purposes only and does not provide medical advice, diagnosis, or treatment. Content on this site should not be used as a substitute for professional medical advice.",
  },
  {
    heading: "No endorsements",
    body: "T-Compare does not endorse or recommend any specific provider, product, or treatment. Listings are presented for informational comparison purposes only.",
  },
  {
    heading: "Accuracy of information",
    body: null,
    bullets: [
      "While we aim to keep information up to date, details such as pricing, availability, and program structure may change without notice.",
      "Users should verify all information directly with the provider before making any decisions.",
      "We do not guarantee the completeness or accuracy of the information presented.",
      "This website is for informational purposes only and does not provide medical advice, diagnosis, or treatment.",
    ],
  },
  {
    heading: "External links",
    body: "This site contains links to external websites. We are not responsible for the content, accuracy, or practices of any third-party sites. Links to provider websites may be affiliate links.",
  },
  {
    heading: "Consult a professional",
    body: "Always consult a qualified healthcare professional before starting, stopping, or changing any medical treatment or program.",
  },
];

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
      <nav className="flex items-center gap-2 text-sm text-[#5f757f] mb-10">
        <Link href="/" className="hover:text-[#176b87] hover:underline">Home</Link>
        <span>/</span>
        <span className="text-[#53666e]">Disclaimer</span>
      </nav>

      <div className="max-w-2xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#176b87] mb-4">
          Legal
        </p>
        <h1 className="tc-display text-[1.75rem] font-bold leading-tight sm:text-4xl mb-10">
          Disclaimer
        </h1>

        <div className="rounded-xl bg-white border border-[#e3e3e3] overflow-hidden">
          {sections.map((section, i) => (
            <div
              key={section.heading}
              className={`px-7 py-6 ${i < sections.length - 1 ? "border-b border-[#ededed]" : ""}`}
            >
              <p className="text-[11px] font-semibold text-[#5f757f] uppercase tracking-[0.12em] mb-3">
                {section.heading}
              </p>
              {section.body && (
                <p className="text-sm text-[#3c535e] leading-relaxed">
                  {section.body}
                </p>
              )}
              {section.bullets && (
                <ul className="flex flex-col gap-2">
                  {section.bullets.map((bullet, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-[#3c535e] leading-relaxed">
                      <span className="text-[#5f757f] mt-0.5 shrink-0">-</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
