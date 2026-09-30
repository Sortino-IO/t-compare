"use client";

import { useEffect, useState } from "react";
import { useTrackedHopUrl } from "../hooks/useTrackedHopUrl";
import { trackAffiliateClick } from "../lib/analytics";

type Props = {
  /** Merchant destination, passed through unchanged. */
  href: string;
  brand: string;
  label: string;
  /** Short qualifier shown above the button, e.g. the starting-price anchor. */
  priceLabel?: string;
};

const SHOW_AFTER_PX = 520;

/**
 * Restrained mobile-only action bar for commercial pages. It only appears once
 * the reader has scrolled past the in-page hero CTA and sits below all navigation.
 */
export default function MobileStickyCta({
  href,
  brand,
  label,
  priceLabel,
}: Props) {
  const [visible, setVisible] = useState(false);
  const trackedHref = useTrackedHopUrl(href);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-[#e3e3e3] bg-white/95 backdrop-blur-[2px] px-4 pt-2.5 sm:hidden transition-[transform,opacity] duration-200 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-full opacity-0"
      }`}
      style={{ paddingBottom: "max(0.625rem, env(safe-area-inset-bottom))" }}
      aria-hidden={!visible}
    >
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-semibold text-[#142b3a]">
            {brand}
          </p>
          {priceLabel ? (
            <p className="truncate text-[11px] text-[#5f757f]">{priceLabel}</p>
          ) : null}
        </div>
        <a
          href={trackedHref}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={visible ? undefined : -1}
          onClick={() =>
            trackAffiliateClick({ href, brand, position: "sticky", label })
          }
          className="tc-btn tc-btn-primary tc-btn-sm shrink-0"
        >
          {label}
        </a>
      </div>
    </div>
  );
}
