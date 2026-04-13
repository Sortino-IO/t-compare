import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const posts = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../app/data/posts.json"), "utf8"),
);

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

const sorted = Object.entries(ids).sort((a, b) => b[1] - a[1]);
let total = 0;
for (const [, c] of sorted) total += c;
console.log("Total refs:", total);
console.log(sorted.map(([i, c]) => `${c}\t${i}`).join("\n"));
