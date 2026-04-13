/**
 * Fails if any Unsplash photo-* ID appears more than MAX times in posts.json.
 * Run: node scripts/validate-blog-image-cap.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const postsPath = path.join(__dirname, "../app/data/posts.json");
const MAX = 2;

const posts = JSON.parse(fs.readFileSync(postsPath, "utf8"));
const ids = {};

function add(u) {
  if (!u || !u.includes("unsplash")) return;
  const m = u.match(/photo-\d+-[a-z0-9]+/);
  if (!m) return;
  ids[m[0]] = (ids[m[0]] || 0) + 1;
}

for (const p of posts) {
  add(p.featuredImage);
  for (const b of p.content ?? []) {
    if (b.type === "image" && b.src) add(b.src);
  }
}

const over = Object.entries(ids).filter(([, c]) => c > MAX);
if (over.length) {
  console.error(
    `Blog image cap exceeded (max ${MAX} per Unsplash photo id):\n`,
    over.map(([id, c]) => `${id}: ${c}`).join("\n"),
  );
  process.exit(1);
}
console.log(`Blog image cap OK (each Unsplash id ≤ ${MAX} uses, ${Object.keys(ids).length} unique ids).`);
