import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "../lib/og-card";

export const alt = "Terms of use - T-Compare";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgCard({
    eyebrow: "Terms",
    title: "Terms of Use",
  });
}
