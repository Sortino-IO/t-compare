/**
 * Fails if posts.json uses a forbidden Unsplash photo-* id (broken or policy-banned).
 * Run: node scripts/validate-blog-image-banned.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { FORBIDDEN_UNSPLASH_PHOTO_IDS } from "./blog-image-banned-ids.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const postsPath = path.join(__dirname, "../app/data/posts.json");

const posts = JSON.parse(fs.readFileSync(postsPath, "utf8"));
const hits = [];

function check(url, where) {
  if (!url || !url.includes("unsplash")) return;
  const m = url.match(/photo-\d+-[a-z0-9]+/);
  if (!m) return;
  if (FORBIDDEN_UNSPLASH_PHOTO_IDS.has(m[0])) {
    hits.push(`${where}: ${m[0]}`);
  }
}

for (const post of posts) {
  check(post.featuredImage, `${post.slug} featuredImage`);
  for (const block of post.content ?? []) {
    if (block.type === "image" && block.src) {
      check(block.src, `${post.slug} inline`);
    }
  }
}

if (hits.length) {
  console.error(
    "Forbidden Unsplash photo id(s) in posts.json (see scripts/blog-image-banned-ids.mjs and docs/blog-image-guidelines.md):\n",
    hits.join("\n"),
  );
  process.exit(1);
}
console.log("Blog image banned-id check OK (no broken/forbidden Unsplash photo ids).");
