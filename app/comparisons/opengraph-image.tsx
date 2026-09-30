import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard, siteChips } from "../lib/og-card";

export const alt = "TRT provider comparisons: cost, labs and plans";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgCard({
    eyebrow: "Head-to-head",
    title: "TRT Provider Comparisons",
    subtitle: "Every provider pair: cost, labs and plan terms",
    chips: siteChips(),
  });
}
