/** Hosts that should receive T-Compare affiliate UTM parameters on outbound links. */
const TTIME_HOST = "ttime.men";

const CLICKBANK_AFFILIATE_BY_HOST: Record<string, string> = {
  "erecprime24.com": "https://accd7grbpfnm6m186ded0bo9dw.hop.clickbank.net/?&traffic_source=blog&traffic_type=paid&campaign=t-compare",
  "www.criticaltboost.com": "https://9dcacr3eqbms0qez2408eyse51.hop.clickbank.net/?&traffic_source=blog&traffic_type=paid&campaign=t-compare",
  "criticaltboost.com": "https://9dcacr3eqbms0qez2408eyse51.hop.clickbank.net/?&traffic_source=blog&traffic_type=paid&campaign=t-compare",
  "heroichustle.com": "https://b0d9bkvcsibq9yawuhqvyty0tn.hop.clickbank.net/?&traffic_source=blog&traffic_type=paid&campaign=t-compare",
  "endopeak24.com": "https://42ad2cskk5msam5atc1eq2ur5a.hop.clickbank.net/?&traffic_source=blog&traffic_type=paid&campaign=t-compare",
};

const UTM = {
  utm_source: "t-compare",
  utm_medium: "compare",
  utm_campaign: "sor",
} as const;

function isTtimeHost(hostname: string): boolean {
  return hostname === TTIME_HOST || hostname.endsWith(`.${TTIME_HOST}`);
}

function resolveClickBankAffiliate(href: string): string | null {
  try {
    const u = new URL(href);
    return CLICKBANK_AFFILIATE_BY_HOST[u.hostname] ?? null;
  } catch {
    for (const host of Object.keys(CLICKBANK_AFFILIATE_BY_HOST)) {
      if (href.includes(host)) {
        return CLICKBANK_AFFILIATE_BY_HOST[host]!;
      }
    }
    return null;
  }
}

/** Rewrites ClickBank partner URLs; adds UTM params to ttime.men. */
export function withTtimeAffiliateParams(href: string): string {
  const clickBank = resolveClickBankAffiliate(href);
  if (clickBank) return clickBank;

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
