import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard, siteChips } from "./lib/og-card";

export const alt = "T-Compare: compare testosterone providers and supplements";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgCard({
    eyebrow: "Independent comparison",
    title: "Compare Testosterone Providers & Supplements",
    subtitle: "Prices, labs and plan terms side by side",
    chips: siteChips(),
  });
}
