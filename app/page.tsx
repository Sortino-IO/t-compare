import type { Metadata } from "next";
import HomeLanding from "./components/HomeLanding";
import { canonicalAlternates } from "./lib/seo";
import { HOME_OG_IMAGE_PATH, HOME_OG_IMAGE_URL, OG_BASE, SITE_URL } from "./lib/site";

const homeOgImage = {
  url: HOME_OG_IMAGE_PATH,
  secureUrl: HOME_OG_IMAGE_URL,
  width: 1200,
  height: 630,
  type: "image/jpeg" as const,
  alt: "T-Compare: compare testosterone providers and supplements",
};

export const metadata: Metadata = {
  title: "Compare Enclomiphene Providers & T Supplements (2026)",
  description:
    "Independent tables, 12-month cost calculator, and head-to-head compares for enclomiphene telehealth and testosterone supplements — prices, labs, and plan terms checked against official sites.",
  alternates: canonicalAlternates("/"),
  openGraph: {
    images: [homeOgImage],
    ...OG_BASE,
    title: "Compare Testosterone Providers & Supplements | T-Compare",
    description:
      "Compare enclomiphene telehealth providers and testosterone supplements in minutes. Review pricing, labs, onboarding, guarantees, and formulas side by side before you choose.",
    url: SITE_URL,
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
  "@id": `${SITE_URL}/#organization`,
  name: "T-Compare",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/logo.png`,
  },
  image: HOME_OG_IMAGE_URL,
  description:
    "T-Compare is an independent, informational website that helps users browse and compare testosterone-related providers, enclomiphene programs, and testosterone supplements.",
  knowsAbout: [
    "Enclomiphene telehealth",
    "Testosterone deficiency",
    "Testosterone supplements",
    "Telehealth pricing comparison",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "T-Compare",
  url: SITE_URL,
  description:
    "Browse and compare testosterone-related providers and enclomiphene programs in one place.",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

const siteNavigationSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Main comparison hubs",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Enclomiphene providers compared",
      url: `${SITE_URL}/testosterone/enclomiphene`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Head-to-head provider comparisons",
      url: `${SITE_URL}/comparisons`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "12-month enclomiphene cost calculator",
      url: `${SITE_URL}/tools/enclomiphene-cost-calculator`,
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Testosterone supplements compared",
      url: `${SITE_URL}/t-supplements`,
    },
  ],
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNavigationSchema) }}
      />

      <HomeLanding />
    </>
  );
}
