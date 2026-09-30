"use client";

import { usePathname } from "next/navigation";
import { useMemo, useSyncExternalStore } from "react";
import { appendClickTrackingToHopUrl } from "../lib/clickbank-hop-link";
import { withPageAttribution } from "../lib/click-attribution";

function isClickBankHop(href: string): boolean {
  try {
    return new URL(href).hostname.endsWith("hop.clickbank.net");
  } catch {
    return false;
  }
}

const noopSubscribe = () => () => {};

/**
 * False during SSR and hydration, true afterwards — so the first client render
 * matches the server HTML and the attributed href is applied on the next one.
 */
function useIsHydrated(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

/**
 * Resolves a merchant URL with the page id, plus (for ClickBank) any ad click
 * ids present on the current page.
 */
export function useTrackedHopUrl(baseUrl: string): string {
  const pathname = usePathname();
  const hydrated = useIsHydrated();

  return useMemo(() => {
    if (!hydrated) return baseUrl;
    const attributed = withPageAttribution(baseUrl, pathname ?? window.location.pathname);
    if (!isClickBankHop(attributed)) return attributed;
    const pageSearch = new URL(window.location.href).searchParams;
    return appendClickTrackingToHopUrl(attributed, pageSearch);
  }, [hydrated, baseUrl, pathname]);
}
