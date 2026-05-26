import fs from "fs";
import path from "path";

const src = fs.readFileSync("app/lib/landing-page-media.ts", "utf8");
const paths = [...new Set(src.match(/\/lp\/[^"'`\s]+\.jpg/g) ?? [])];

let failed = 0;
for (const rel of paths) {
  const file = path.join("public", rel);
  if (!fs.existsSync(file)) {
    console.error(`MISSING ${rel}`);
    failed++;
    continue;
  }
  const stat = fs.statSync(file);
  if (stat.size < 1000) {
    console.error(`TOO SMALL ${rel} (${stat.size} bytes)`);
    failed++;
    continue;
  }
  console.log(`OK ${rel} (${stat.size} bytes)`);
}

if (failed > 0) {
  process.exit(1);
}

console.log(`All ${paths.length} LP images present.`);
