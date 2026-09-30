import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "../lib/og-card";

export const alt = "Testosterone and enclomiphene guides";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgCard({
    eyebrow: "T-Compare blog",
    title: "Testosterone & Enclomiphene Guides",
    subtitle: "Plain-English articles with sources",
  });
}
