"use client";

import type { LandingPageConfig } from "../../lib/landing-pages";
import LpCtaButton from "./LpCtaButton";

type Props = {
  config: LandingPageConfig;
};

export default function LpStickyBar({ config }: Props) {
  const label =
    config.productMeta?.stickyCtaLabel ??
    config.offerStack?.ctaLabel ??
    `Get ${config.productName} →`;
  return (
    <div
      className="fixed bottom-0 inset-x-0 z-50 border-t p-3 sm:hidden shadow-[0_-4px_24px_rgba(0,0,0,0.15)]"
      style={{ backgroundColor: config.theme.primaryDark, borderColor: config.theme.border }}
    >
      <LpCtaButton
        ctaUrl={config.ctaUrl}
        label={label}
        theme={config.theme}
        size="md"
        className="w-full"
      />
    </div>
  );
}
