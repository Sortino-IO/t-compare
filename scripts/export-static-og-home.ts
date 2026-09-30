import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";
import { renderOgCard, siteChips } from "../app/lib/og-card";

async function main() {
  const dir = join(process.cwd(), "public/og");
  mkdirSync(dir, { recursive: true });

  const res = await renderOgCard({
    eyebrow: "Independent comparison",
    title: ["Compare Testosterone", "Providers & Supplements"],
    subtitle: "Prices, labs and plan terms side by side",
    chips: siteChips(),
  });

  const png = Buffer.from(await res.arrayBuffer());
  writeFileSync(join(dir, "home.png"), png);

  const jpg = await sharp(png).flatten({ background: "#ffffff" }).jpeg({ quality: 88 }).toBuffer();
  writeFileSync(join(dir, "share.jpg"), jpg);

  console.log(`Wrote public/og/home.png (${png.byteLength} bytes)`);
  console.log(`Wrote public/og/share.jpg (${jpg.byteLength} bytes)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
