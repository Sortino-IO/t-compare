/** All testosterone / men's supplement landing pages (excludes Ted's, woodworking). */
export const TESTOSTERONE_SUPPLEMENT_LP_SLUGS = [
  "critical-t-lp1",
  "critical-t-lp2",
  "endopeak24-lp1",
  "endopeak24-lp2",
  "erecprime24-lp1",
  "erecprime24-lp2",
  "nitric-boost-lp1",
  "nitric-boost-lp2",
] as const;

export type TestosteroneSupplementLpSlug = (typeof TESTOSTERONE_SUPPLEMENT_LP_SLUGS)[number];

export function isTestosteroneSupplementLp(slug: string): boolean {
  return (TESTOSTERONE_SUPPLEMENT_LP_SLUGS as readonly string[]).includes(slug);
}
