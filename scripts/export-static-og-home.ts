import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { renderOgCard, siteChips } from "../app/lib/og-card";

async function main() {
  const outPath = join(process.cwd(), "public/og/home.png");
  mkdirSync(join(process.cwd(), "public/og"), { recursive: true });

  const res = await renderOgCard({
    eyebrow: "Independent comparison",
    title: ["Compare Testosterone", "Providers & Supplements"],
    subtitle: "Prices, labs and plan terms side by side",
    chips: siteChips(),
  });

  const buf = Buffer.from(await res.arrayBuffer());
  writeFileSync(outPath, buf);
  console.log(`Wrote ${outPath} (${buf.byteLength} bytes)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
