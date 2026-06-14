/** Hosts that should receive T-Compare affiliate UTM parameters on outbound links. */
const TTIME_HOST = "ttime.men";

/** Query string for paid-ad landing pages (Google/Bing; gclid/msclkid appended at click time). */
const LP_PAID_QUERY = "traffic_source=google&traffic_type=paid&campaign=sortino";

export const ERECPRIME_AFFILIATE_URL =
  `https://af3f4qzpqenm3wfb1cff-atz7n.hop.clickbank.net/?&${LP_PAID_QUERY}`;

export const CRITICAL_T_AFFILIATE_URL =
  `https://8cf8ej-qngjwdt32x53bo30mdg.hop.clickbank.net/?&${LP_PAID_QUERY}`;

export const ENDOPEAK_AFFILIATE_URL =
  `https://42ad2cskk5msam5atc1eq2ur5a.hop.clickbank.net/?&${LP_PAID_QUERY}`;

export const TEDPLANS_AFFILIATE_URL =
  `https://8a4d3jpqq6py4refm24ow8ul9y.hop.clickbank.net/?&${LP_PAID_QUERY}`;

export const NITRIC_BOOST_AFFILIATE_URL =
  `https://getnitricboost.com/?${LP_PAID_QUERY}#order`;

const BLOG_AFFILIATE_QUERY = "traffic_source=blog&traffic_type=paid&campaign=t-compare";

const CLICKBANK_AFFILIATE_BY_HOST: Record<string, string> = {
  "erecprime24.com": ERECPRIME_AFFILIATE_URL,
  "www.erecprime24.com": ERECPRIME_AFFILIATE_URL,
  "af3f4qzpqenm3wfb1cff-atz7n.hop.clickbank.net": ERECPRIME_AFFILIATE_URL,
  "accd7grbpfnm6m186ded0bo9dw.hop.clickbank.net": ERECPRIME_AFFILIATE_URL,
  "www.criticaltboost.com": `https://8cf8ej-qngjwdt32x53bo30mdg.hop.clickbank.net/?&${BLOG_AFFILIATE_QUERY}`,
  "criticaltboost.com": `https://8cf8ej-qngjwdt32x53bo30mdg.hop.clickbank.net/?&${BLOG_AFFILIATE_QUERY}`,
  "8cf8ej-qngjwdt32x53bo30mdg.hop.clickbank.net": CRITICAL_T_AFFILIATE_URL,
  "heroichustle.com": `https://b0d9bkvcsibq9yawuhqvyty0tn.hop.clickbank.net/?&${BLOG_AFFILIATE_QUERY}`,
  "endopeak24.com": `https://42ad2cskk5msam5atc1eq2ur5a.hop.clickbank.net/?&${BLOG_AFFILIATE_QUERY}`,
  "getnitricboost.com": `https://getnitricboost.com/?${BLOG_AFFILIATE_QUERY}`,
  "www.getnitricboost.com": `https://getnitricboost.com/?${BLOG_AFFILIATE_QUERY}`,
  "tedplansdiy.com": `https://8a4d3jpqq6py4refm24ow8ul9y.hop.clickbank.net/?&${BLOG_AFFILIATE_QUERY}`,
  "www.tedplansdiy.com": `https://8a4d3jpqq6py4refm24ow8ul9y.hop.clickbank.net/?&${BLOG_AFFILIATE_QUERY}`,
  "8a4d3jpqq6py4refm24ow8ul9y.hop.clickbank.net": TEDPLANS_AFFILIATE_URL,
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
