"use client";

import type { LandingPageConfig } from "../../lib/landing-pages";

type Props = {
  ctaUrl: string;
  label: string;
  theme: LandingPageConfig["theme"];
  className?: string;
  size?: "md" | "lg";
};

export default function LpCtaButton({
  ctaUrl,
  label,
  theme,
  className = "",
  size = "lg",
}: Props) {
  const sizeClass =
    size === "lg"
      ? "px-8 py-4 text-base sm:text-lg"
      : "px-6 py-3 text-sm sm:text-base";

  return (
    <a
      href={ctaUrl}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className={`inline-flex items-center justify-center rounded-lg font-bold uppercase tracking-wide shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] ${sizeClass} ${className}`}
      style={{
        backgroundColor: theme.accent,
        color: theme.accentText,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = theme.accentHover;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = theme.accent;
      }}
    >
      {label}
    </a>
  );
}
