"use client";

import type { LandingPageConfig } from "../../lib/landing-pages";

type Props = {
  ctaUrl: string;
  label: string;
  theme: LandingPageConfig["theme"];
  className?: string;
  size?: "md" | "lg" | "xl";
  pulse?: boolean;
};

export default function LpCtaButton({
  ctaUrl,
  label,
  theme,
  className = "",
  size = "lg",
  pulse = true,
}: Props) {
  const sizeClass =
    size === "xl"
      ? "px-6 py-5 sm:px-10 sm:py-5 text-base sm:text-xl"
      : size === "lg"
        ? "px-8 py-4 sm:py-5 text-base sm:text-lg"
        : "px-5 py-3.5 text-sm sm:text-base";

  return (
    <a
      href={ctaUrl}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className={`inline-flex items-center justify-center rounded-md font-extrabold uppercase tracking-wide border-2 border-[#b8860b] ${pulse ? "lp-cta-pulse" : "shadow-xl"} transition-transform hover:scale-[1.03] active:scale-[0.98] ${sizeClass} ${className}`}
      style={{
        background: `linear-gradient(180deg, ${theme.accent} 0%, ${theme.accentHover} 100%)`,
        color: theme.accentText,
      }}
    >
      {label}
    </a>
  );
}
