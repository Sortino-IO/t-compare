import type { Metadata } from "next";
import HomeLanding from "./components/HomeLanding";
import { HOME_OG_IMAGE_PATH, OG_BASE, SITE_URL } from "./lib/site";

const homeOgImage = {
  url: HOME_OG_IMAGE_PATH,
  width: 1200,
  height: 630,
  type: "image/png" as const,
  alt: "T-Compare: compare testosterone providers and supplements",
};

export const metadata: Metadata = {
  title: "Compare Testosterone Providers & Supplements: Prices & Plans",
  description:
    "Compare enclomiphene telehealth providers and testosterone supplements in minutes. Review pricing, labs, onboarding, guarantees, and formulas side by side before you choose.",
  openGraph: {
    ...OG_BASE,
    title: "Compare Testosterone Providers & Supplements | T-Compare",
    description:
      "Compare enclomiphene telehealth providers and testosterone supplements in minutes. Review pricing, labs, onboarding, guarantees, and formulas side by side before you choose.",
    url: SITE_URL,
    images: [homeOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Compare Testosterone Providers & Supplements | T-Compare",
    description:
      "Compare enclomiphene telehealth providers and testosterone supplements in minutes. Review pricing, labs, onboarding, guarantees, and formulas side by side before you choose.",
    images: [HOME_OG_IMAGE_PATH],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "T-Compare",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/logo.png`,
  },
  description:
    "T-Compare is an independent, informational website that helps users browse and compare testosterone-related providers, enclomiphene programs, and testosterone supplements.",
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
