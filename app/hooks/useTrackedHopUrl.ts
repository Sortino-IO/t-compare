"use client";

import { useEffect, useState } from "react";
import { appendClickTrackingToHopUrl } from "../lib/clickbank-hop-link";

/** Resolves a hop URL with gclid/msclkid from the current page after mount. */
export function useTrackedHopUrl(baseUrl: string): string {
  const [href, setHref] = useState(baseUrl);

  useEffect(() => {
    const pageSearch = new URL(window.location.href).searchParams;
    setHref(appendClickTrackingToHopUrl(baseUrl, pageSearch));
  }, [baseUrl]);

  return href;
}
