/**
 * Per-page attribution for outbound merchant links.
 *
 * Both live partner programs previously reported every click into a single
 * bucket: the ClickBank hop links carried no `tid` at all, and ttime.men got a
 * constant `utm_campaign`. Neither could answer "which page sells", so this
 * adds a page-level id without touching the parameters partners already
 * report on.
 */

/** ClickBank truncates the tracking id at 24 characters and drops punctuation. */
const CLICKBANK_TID_MAX = 24;
const CLICKBANK_TID_SLUG_MAX = 18;

const TTIME_HOST = "ttime.men";

function isClickBankHop(hostname: string): boolean {
  return hostname.endsWith("hop.clickbank.net");
}

function isTtimeHost(hostname: string): boolean {
  return hostname === TTIME_HOST || hostname.endsWith(`.${TTIME_HOST}`);
}

/** FNV-1a, so two pages that truncate to the same prefix stay distinguishable. */
function shortHash(input: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(36).padStart(6, "0").slice(0, 6);
}

/** Slug form used for GA-style params, where punctuation is fine. */
export function pageSlugFromPath(pathname: string): string {
  const cleaned = pathname.replace(/^\/+|\/+$/g, "").replace(/[^a-zA-Z0-9/-]/g, "");
  return cleaned === "" ? "home" : cleaned.replace(/\//g, "-").toLowerCase();
}

/**
 * ClickBank tracking id: readable enough to recognise the page in a report,
 * hashed enough that two long slugs sharing a prefix do not collide.
 */
export function clickBankTidFromPath(pathname: string): string {
  const slug = pageSlugFromPath(pathname);
  const alnum = slug.replace(/[^a-z0-9]/g, "");
  const tid = `${alnum.slice(0, CLICKBANK_TID_SLUG_MAX)}${shortHash(slug)}`;
  return tid.slice(0, CLICKBANK_TID_MAX);
}

/**
 * Adds the page id to a merchant URL. Every other parameter is left untouched
 * so existing partner reporting keeps working.
 */
export function withPageAttribution(href: string, pathname: string): string {
  try {
    const url = new URL(href);

    if (isClickBankHop(url.hostname)) {
      url.searchParams.set("tid", clickBankTidFromPath(pathname));
      return url.toString();
    }

    if (isTtimeHost(url.hostname)) {
      url.searchParams.set("utm_content", pageSlugFromPath(pathname));
      return url.toString();
    }

    return href;
  } catch {
    return href;
  }
}
