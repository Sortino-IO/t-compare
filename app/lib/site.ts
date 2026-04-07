/**
 * Canonical public site origin (no trailing slash).
 * Override with NEXT_PUBLIC_SITE_URL in .env / Vercel.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.t-compare.com"
).replace(/\/$/, "");
