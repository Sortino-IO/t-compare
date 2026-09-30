import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard, siteChips } from "../../lib/og-card";

export const alt = "Enclomiphene 12-month cost calculator";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgCard({
    eyebrow: "Free tool",
    title: "Enclomiphene Cost Calculator",
    subtitle: "Medication, membership and labs over 12 months",
    chips: siteChips(),
  });
}
