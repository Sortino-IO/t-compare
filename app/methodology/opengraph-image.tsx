import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard, siteChips } from "../lib/og-card";

export const alt = "How T-Compare compares enclomiphene providers";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgCard({
    eyebrow: "Methodology",
    title: ["How We Compare", "Enclomiphene Providers"],
    subtitle: "What we check, how 12-month cost is calculated, and where the data comes from",
    chips: siteChips(),
  });
}
