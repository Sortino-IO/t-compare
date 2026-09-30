import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "../lib/og-card";

export const alt = "Medical disclaimer - T-Compare";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgCard({
    eyebrow: "Disclaimer",
    title: "Medical Disclaimer",
    subtitle: "Informational comparisons, not medical advice",
  });
}
