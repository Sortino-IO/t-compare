"use client";

import { useTrackedHopUrl } from "../../hooks/useTrackedHopUrl";
import { trackAffiliateClick, type CtaPosition } from "../../lib/analytics";

type Variant = "primary" | "secondary" | "link";

type Props = {
  /**
   * The merchant destination. Passed through to `href` byte-for-byte — callers
   * resolve affiliate parameters before handing the URL over.
   */
  href: string;
  brand: string;
  position: CtaPosition;
  label: string;
  variant?: Variant;
  fullWidth?: boolean;
  size?: "md" | "sm";
  className?: string;
};

function ExternalIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

/**
 * Outbound merchant action. Always rendered as a filled blue button (or a plain
 * link) so external actions stay visually distinct from internal navigation.
 */
export default function ExternalCta({
  href,
  brand,
  position,
  label,
  variant = "primary",
  fullWidth = false,
  size = "md",
  className = "",
}: Props) {
  const trackedHref = useTrackedHopUrl(href);

  const base =
    variant === "link"
      ? "inline-flex items-center gap-1.5 text-sm font-semibold text-[#176b87] underline decoration-[#176b87]/30 underline-offset-2 hover:text-[#10556d] hover:decoration-[#10556d]"
      : `tc-btn ${variant === "primary" ? "tc-btn-primary" : "tc-btn-secondary"} ${
          size === "sm" ? "tc-btn-sm" : ""
        } ${fullWidth ? "w-full" : ""}`;

  return (
    <a
      href={trackedHref}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackAffiliateClick({ href, brand, position, label })}
      className={`${base} ${className}`.trim()}
    >
      {label}
      <ExternalIcon />
    </a>
  );
}
