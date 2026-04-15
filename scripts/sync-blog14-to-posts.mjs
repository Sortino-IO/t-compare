/**
 * Overwrites each blog batch 14 post in app/data/posts.json with the
 * current object from scripts/blog-14-posts.mjs (keeps JSON in sync after edits).
 * Run: node scripts/sync-blog14-to-posts.mjs
 */
import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { blogBatch14 } from "./blog-14-posts.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const postsPath = join(__dirname, "../app/data/posts.json");

const posts = JSON.parse(readFileSync(postsPath, "utf8"));
let n = 0;
for (const updated of blogBatch14) {
  const i = posts.findIndex((p) => p.slug === updated.slug);
  if (i === -1) {
    throw new Error(`Missing slug in posts.json: ${updated.slug}`);
  }
  posts[i] = JSON.parse(JSON.stringify(updated));
  n += 1;
}
writeFileSync(postsPath, JSON.stringify(posts, null, 2) + "\n", "utf8");
console.log(`Synced ${n} posts from blog-14-posts.mjs → posts.json`);
