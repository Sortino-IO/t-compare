/** URL params forwarded from the landing page to ClickBank hop links. */
const FORWARD_PARAMS = [
  "gclid",
  "msclkid",
  "fbclid",
  "ttclid",
  "traffic_source",
  "traffic_type",
  "campaign",
  "creative",
  "ad",
  "aff_sub1",
  "aff_sub2",
  "aff_sub3",
] as const;

/**
 * Appends ad click IDs and tracking params from the current page URL onto a
 * ClickBank hop / direct offer link so S2S conversions can attribute correctly.
 */
export function appendClickTrackingToHopUrl(
  href: string,
  pageSearch?: URLSearchParams,
): string {
  if (!pageSearch) return href;

  try {
    const dest = new URL(href);

    for (const key of FORWARD_PARAMS) {
      if (key === "traffic_source") continue;
      const value = pageSearch.get(key);
      if (value) dest.searchParams.set(key, value);
    }

    const trafficSource =
      pageSearch.get("traffic_source") ??
      (pageSearch.get("msclkid") ? "microsoft" : pageSearch.get("gclid") ? "google" : null);
    if (trafficSource) dest.searchParams.set("traffic_source", trafficSource);

    return dest.toString();
  } catch {
    return href;
  }
}
