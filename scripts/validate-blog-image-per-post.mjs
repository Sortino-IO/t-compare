/**
 * Fails if the same Unsplash photo-* ID appears more than once within a single post
 * (featured + inline images).
 * Run: node scripts/validate-blog-image-per-post.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const postsPath = path.join(__dirname, "../app/data/posts.json");

const posts = JSON.parse(fs.readFileSync(postsPath, "utf8"));
const errors = [];

function collectIds(post) {
  const ids = [];
  if (post.featuredImage?.includes("unsplash")) {
    const m = post.featuredImage.match(/photo-\d+-[a-z0-9]+/);
    if (m) ids.push(m[0]);
  }
  for (const b of post.content ?? []) {
    if (b.type === "image" && b.src?.includes("unsplash")) {
      const m = b.src.match(/photo-\d+-[a-z0-9]+/);
      if (m) ids.push(m[0]);
    }
  }
  return ids;
}

for (const post of posts) {
  const ids = collectIds(post);
  const seen = new Map();
  for (const id of ids) {
    seen.set(id, (seen.get(id) || 0) + 1);
  }
  for (const [id, c] of seen) {
    if (c > 1) {
      errors.push(`${post.slug}: ${id} appears ${c} times in the same article`);
    }
  }
}

if (errors.length) {
  console.error("Duplicate Unsplash image within a post:\n", errors.join("\n"));
  process.exit(1);
}
console.log("Blog per-post image uniqueness OK (no duplicate photo id within an article).");
