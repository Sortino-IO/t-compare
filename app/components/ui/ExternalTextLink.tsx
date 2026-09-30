"use client";

import { useTrackedHopUrl } from "../../hooks/useTrackedHopUrl";
import { trackAffiliateClick, type CtaPosition } from "../../lib/analytics";

type Props = {
  href: string;
  className?: string;
  children: React.ReactNode;
  /** When set, the click is reported as an `affiliate_click` event. */
  track?: { brand: string; position: CtaPosition; label: string };
};

/**
 * Plain outbound link that still picks up per-page attribution. Used for
 * source / "visit" links, which are not CTAs but do reach merchant sites.
 */
export default function ExternalTextLink({ href, className, children, track }: Props) {
  const trackedHref = useTrackedHopUrl(href);

  return (
    <a
      className={className}
      href={trackedHref}
      target="_blank"
      rel="noopener noreferrer"
      onClick={track ? () => trackAffiliateClick({ href, ...track }) : undefined}
    >
      {children}
    </a>
  );
}
