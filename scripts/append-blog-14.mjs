/**
 * Appends scripts/blog-14-posts.mjs to app/data/posts.json (idempotent).
 * Run: node scripts/append-blog-14.mjs
 */
import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { blogBatch14 } from "./blog-14-posts.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const postsPath = join(__dirname, "../app/data/posts.json");

const posts = JSON.parse(readFileSync(postsPath, "utf8"));
const marker = blogBatch14[0]?.slug;
if (posts.some((p) => p.slug === marker)) {
  console.log("Blog batch 14 already merged; skipping.");
  process.exit(0);
}
for (const p of blogBatch14) {
  if (posts.some((x) => x.slug === p.slug)) {
    throw new Error(`Duplicate slug: ${p.slug}`);
  }
}
posts.push(...blogBatch14);
writeFileSync(postsPath, JSON.stringify(posts, null, 2) + "\n", "utf8");
console.log(`Appended ${blogBatch14.length} posts.`);
