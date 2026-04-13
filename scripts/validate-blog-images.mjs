/**
 * Fails if posts.json references missing local /blog/featured or /blog/inline assets.
 * Use remote URLs (e.g. Unsplash) or add files under public/blog/...
 * Run: node scripts/validate-blog-images.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const postsPath = path.join(__dirname, "../app/data/posts.json");
const publicDir = path.join(__dirname, "../public");

const raw = fs.readFileSync(postsPath, "utf8");
const posts = JSON.parse(raw);
const errors = [];

for (const post of posts) {
  if (post.featuredImage?.startsWith("/blog/")) {
    const rel = post.featuredImage.replace(/^\//, "");
    const abs = path.join(publicDir, rel);
    if (!fs.existsSync(abs)) {
      errors.push(`featured missing: ${post.slug} -> ${post.featuredImage}`);
    }
  }
  for (const block of post.content ?? []) {
    if (block.type === "image" && block.src?.startsWith("/blog/")) {
      const rel = block.src.replace(/^\//, "");
      const abs = path.join(publicDir, rel);
      if (!fs.existsSync(abs)) {
        errors.push(`inline missing: ${post.slug} -> ${block.src}`);
      }
    }
  }
}

if (errors.length) {
  console.error("Blog image path validation failed:\n", errors.join("\n"));
  process.exit(1);
}
console.log("Blog image paths OK (no broken local /blog/... references).");
