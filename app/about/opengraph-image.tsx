import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "../lib/og-card";

export const alt = "About T-Compare";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgCard({
    eyebrow: "About",
    title: "About T-Compare",
    subtitle: "How we compare providers and where our data comes from",
  });
}
