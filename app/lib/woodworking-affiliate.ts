import { TEDPLANS_AFFILIATE_URL } from "./affiliate-links";

/** TedsWoodworking ClickBank hop — all woodworking section outbound CTAs. */
export const WOODWORKING_AFFILIATE_URL = TEDPLANS_AFFILIATE_URL;

export function woodworkingAffiliateUrl(_href?: string): string {
  return WOODWORKING_AFFILIATE_URL;
}
