import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "../../lib/og-card";

export const alt = "Testosterone supplement head-to-head comparisons";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgCard({
    eyebrow: "Head-to-head",
    title: ["Testosterone Supplement", "Comparisons"],
    subtitle: "Price per bottle, bundles, guarantees and formulas, side by side",
  });
}
