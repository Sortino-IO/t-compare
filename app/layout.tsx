import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { headers } from "next/headers";
import SiteChrome from "./components/SiteChrome";
import GoogleTagManager from "./components/GoogleTagManager";
import { HOME_OG_IMAGE_URL, OG_BASE, SITE_URL } from "./lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
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
    default: "T-Compare: Compare Testosterone Providers",
    template: "%s | T-Compare",
  },
  description:
    "Compare testosterone and enclomiphene providers by pricing, labs, onboarding, and plan terms. Independent, informational comparisons to help you choose faster.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    ...OG_BASE,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  verification: siteVerification(),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = (await headers()).get("x-pathname") ?? "";
  const isHome = pathname === "/";

  return (
    <html lang="en" className={`${geistSans.variable} h-full`}>
      <head>
        {isHome ? (
          <>
            <meta property="og:image" content={HOME_OG_IMAGE_URL} />
            <meta property="og:image:secure_url" content={HOME_OG_IMAGE_URL} />
            <meta property="og:image:type" content="image/jpeg" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta name="twitter:image" content={HOME_OG_IMAGE_URL} />
            <link rel="image_src" href={HOME_OG_IMAGE_URL} />
          </>
        ) : null}
        {/* Slack reads only the first ~32KB; site-wide OG fields belong early in head. */}
        <meta property="og:site_name" content="T-Compare" />
        <meta property="og:locale" content="en_US" />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className="min-h-full flex flex-col">
        <GoogleTagManager />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
