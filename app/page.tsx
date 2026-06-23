import type { Metadata } from "next";
import HomeLanding from "./components/HomeLanding";
import { SITE_URL } from "./lib/site";

export const metadata: Metadata = {
  title: "Compare Testosterone Providers & Supplements: Prices & Plans",
  description:
    "Compare enclomiphene telehealth providers and testosterone supplements in minutes. Review pricing, labs, onboarding, guarantees, and formulas side by side before you choose.",
  openGraph: {
    title: "Compare Testosterone Providers & Supplements | T-Compare",
    description:
      "Compare enclomiphene telehealth providers and testosterone supplements in minutes. Review pricing, labs, onboarding, guarantees, and formulas side by side before you choose.",
    url: SITE_URL,
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Compare Testosterone Providers & Supplements",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Compare Testosterone Providers & Supplements | T-Compare",
    description:
      "Compare enclomiphene telehealth providers and testosterone supplements in minutes. Review pricing, labs, onboarding, guarantees, and formulas side by side before you choose.",
    images: ["/opengraph-image.png"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "T-Compare",
  url: SITE_URL,
  description:
    "T-Compare is an informational website that helps users browse and compare testosterone-related providers and programs.",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "T-Compare",
  url: SITE_URL,
  description:
    "Browse and compare testosterone-related providers and enclomiphene programs in one place.",
};

export default function HomePage() {
  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      <HomeLanding />
    </>
  );
}
