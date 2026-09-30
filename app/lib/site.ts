/**
 * Canonical public site origin (no trailing slash).
 * Override with NEXT_PUBLIC_SITE_URL in .env / Vercel.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.t-compare.com"
).replace(/\/$/, "");

/**
 * Next.js replaces (not merges) a parent's `openGraph` object, so every page
 * that sets its own must spread this in to keep the site-wide fields.
 */
export const OG_BASE = {
  siteName: "T-Compare",
  type: "website",
  locale: "en_US",
} as const;

/** Stable homepage share image (JPEG, no query string — Slack imgproxy is picky about PNG alpha). */
export const HOME_OG_IMAGE_PATH = "/og/share.jpg";
export const HOME_OG_IMAGE_URL = `${SITE_URL}${HOME_OG_IMAGE_PATH}`;
