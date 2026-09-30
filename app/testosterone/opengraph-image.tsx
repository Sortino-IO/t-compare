import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard, siteChips } from "../lib/og-card";

export const alt = "Compare testosterone treatment options";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgCard({
    eyebrow: "Testosterone guide",
    title: "Compare Testosterone Treatment Options",
    subtitle: "Enclomiphene providers and T supplements, side by side",
    chips: siteChips(),
  });
}
