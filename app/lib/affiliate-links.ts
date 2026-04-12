/** Hosts that should receive T-Compare affiliate UTM parameters on outbound links. */
const TTIME_HOST = "ttime.men";

const UTM = {
  utm_source: "t-compare",
  utm_medium: "compare",
  utm_campaign: "sor",
} as const;

function isTtimeHost(hostname: string): boolean {
  return hostname === TTIME_HOST || hostname.endsWith(`.${TTIME_HOST}`);
}

/** Appends UTM params to ttime.men URLs (existing query params preserved unless keys conflict). */
export function withTtimeAffiliateParams(href: string): string {
  try {
    const u = new URL(href);
    if (!isTtimeHost(u.hostname)) return href;
    for (const [k, v] of Object.entries(UTM)) {
      u.searchParams.set(k, v);
    }
    return u.toString();
  } catch {
    return href;
  }
}
