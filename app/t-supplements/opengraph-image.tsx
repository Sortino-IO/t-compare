import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "../lib/og-card";

export const alt = "Testosterone supplements compared";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgCard({
    eyebrow: "Supplement guide",
    title: "Testosterone Supplements Compared",
    subtitle: "Price per bottle, bundles, guarantees and formulas",
  });
}
