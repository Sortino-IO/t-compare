import type { Metadata } from "next";
import { TESTOSTERONE_SUPPLEMENT_LP_SLUGS } from "./testosterone-lp";

/** Paid / bridge landing pages — not for organic indexing. */
export const LP_NOINDEX_ROBOTS: Metadata["robots"] = {
  index: false,
  follow: false,
  googleBot: { index: false, follow: false },
};

const TEDPLANS_LP_SLUGS = ["tedplansdiy-lp1", "tedplansdiy-lp2", "tedplansdiy-lp3"] as const;

const NOINDEX_LP_SLUGS = new Set<string>([
  ...TESTOSTERONE_SUPPLEMENT_LP_SLUGS,
  ...TEDPLANS_LP_SLUGS,
]);

export function isNoindexLandingPageSlug(slug: string): boolean {
  return NOINDEX_LP_SLUGS.has(slug);
}

export function landingPageRobots(slug: string): Metadata["robots"] | undefined {
  return isNoindexLandingPageSlug(slug) ? LP_NOINDEX_ROBOTS : undefined;
}

/** Copy-safe manufacturing line (facility registration ≠ product approval). */
export const SUPPLEMENT_FACILITY_BULLET =
  "Made in a US facility registered with the FDA for dietary supplements · GMP-certified (per official site)";

export const SUPPLEMENT_FACILITY_FAQ =
  "Per official vendor copy, the formula is manufactured in a US facility registered with the FDA for dietary supplements, using GMP-certified processes. Dietary supplements are not FDA-approved to treat disease. Consult your doctor if you take medications or have health conditions.";
