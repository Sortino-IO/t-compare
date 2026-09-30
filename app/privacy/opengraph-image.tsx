import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "../lib/og-card";

export const alt = "Privacy policy - T-Compare";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgCard({
    eyebrow: "Privacy",
    title: "Privacy Policy",
  });
}
