/**
 * Overwrites scripts/blog-14-posts.mjs using the current objects from app/data/posts.json
 * for each slug in blog batch 14 (keep in sync after posts.json edits).
 *
 * Run: node scripts/export-blog14-from-posts.mjs
 */
import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const BATCH14_SLUGS = [
  "diet-for-low-testosterone-foods-eat-avoid",
  "vitamin-d-testosterone-sunshine-connection",
  "hims-enclomiphene-program-details-pricing-review",
  "maximus-tribe-testosterone-before-signing-up",
  "ttime-enclomiphene-program-overview-review",
  "hims-vs-hone-health-testosterone-comparison",
  "online-testosterone-clinics-compared-2026-guide",
  "does-hims-testosterone-booster-work",
  "choosing-ttime-hims-hone-health-comparison",
  "how-long-clomid-increase-testosterone-timeline",
  "clomid-vs-enclomiphene-low-t-difference",
  "hcg-injections-low-testosterone-guide",
  "can-clomid-fix-low-testosterone-permanently",
  "does-low-testosterone-cause-penile-shrinkage-facts",
];

const postsPath = join(__dirname, "../app/data/posts.json");
const posts = JSON.parse(readFileSync(postsPath, "utf8"));

const batch = BATCH14_SLUGS.map((slug) => {
  const p = posts.find((x) => x.slug === slug);
  if (!p) throw new Error(`Missing slug in posts.json: ${slug}`);
  return p;
});

const out =
  `/**\n` +
  ` * Batch of 14 SEO articles - synced from app/data/posts.json via export-blog14-from-posts.mjs\n` +
  ` * Pricing aligns with app/data/brands.json snapshot; verify on provider sites.\n` +
  ` */\n` +
  `export const blogBatch14 = ${JSON.stringify(batch, null, 2)};\n`;

const dest = join(__dirname, "blog-14-posts.mjs");
writeFileSync(dest, out, "utf8");
console.log(`Wrote ${batch.length} posts to ${dest}`);
