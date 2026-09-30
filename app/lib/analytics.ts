/**
 * Analytics helpers for outbound commercial links.
 *
 * Google Tag Manager is loaded in `GoogleTagManager.tsx`; the container owns GA4
 * and any ad tags. Before this module the site pushed no custom events at all,
 * so affiliate clicks were invisible to the container. `trackAffiliateClick`
 * fills that gap.
 *
 * Nothing health-related, no full destination URL and no affiliate query string
 * is ever pushed — only the bare destination hostname plus placement metadata.
 */

export type CtaPosition =
  | "hero"
  | "pricing"
  | "calculator"
  | "verdict"
  | "comparison"
  | "card"
  | "inline"
  | "sticky"
  | "footer";

type DataLayerWindow = Window & {
  dataLayer?: Record<string, unknown>[];
};

function destinationHostname(href: string): string {
  try {
    return new URL(href).hostname;
  } catch {
    return "";
  }
}

export function trackAffiliateClick(params: {
  href: string;
  brand: string;
  position: CtaPosition;
  label: string;
}): void {
  if (typeof window === "undefined") return;

  const w = window as DataLayerWindow;
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push({
    event: "affiliate_click",
    affiliate_brand: params.brand,
    page_path: window.location.pathname,
    cta_position: params.position,
    cta_label: params.label,
    destination_hostname: destinationHostname(params.href),
  });
}
