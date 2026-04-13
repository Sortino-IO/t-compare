/**
 * Rewrites Unsplash photo IDs in app/data/posts.json to match docs/blog-image-guidelines.md
 * (no money-as-hero, generic office/laptop, couple/fertility stock, landscapes, etc.).
 * Run: node scripts/apply-blog-image-guidelines.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const postsPath = path.join(__dirname, "../app/data/posts.json");

/** [fromPhotoIdPrefix, toPhotoIdPrefix] — replaces path segment after /photo- */
const ID_REPLACEMENTS = [
  ["photo-1563013544-824ae1b704d3", "photo-1582719478250-c89cae4dc85b"],
  ["photo-1631217868264-e5b90bb7e133", "photo-1579684385127-1ef15d5081de"],
  ["photo-1454165804606-c3d57bc86b40", "photo-1571019613454-1cb2f99b2d8b"],
  ["photo-1551650975-87deedd944c3", "photo-1579154204601-01588f351e67"],
  ["photo-1532938911079-1b06ac7ceec7", "photo-1579154204601-01588f351e67"],
  ["photo-1622253692010-333f2da6031d", "photo-1579684385127-1ef15d5081de"],
  ["photo-1522337360788-8b13dee7a37e", "photo-1582719478250-c89cae4dc85b"],
  ["photo-1573497019940-1c28c88b4f3e", "photo-1571019613454-1cb2f99b2d8b"],
  ["photo-1529156069898-49953e39b3ac", "photo-1505751172876-fa1923c5c528"],
  ["photo-1461896836934-ffe607ba8211", "photo-1571019613454-1cb2f99b2d8b"],
  ["photo-1512621776951-a57141f2eefd", "photo-1571019613454-1cb2f99b2d8b"],
];

const TELEHEALTH_ID = "photo-1576091160399-112ba8d25d1d";
const TELEHEALTH_REPLACE = "photo-1579684385127-1ef15d5081de";
const ONLINE_SLUG = "online-treatment-mens-health";

function rewriteUrl(url, slug) {
  if (!url || typeof url !== "string") return url;
  let out = url;
  const keepTelehealth = slug === ONLINE_SLUG;
  if (!keepTelehealth && out.includes(TELEHEALTH_ID)) {
    out = out.replaceAll(TELEHEALTH_ID, TELEHEALTH_REPLACE);
  }
  for (const [from, to] of ID_REPLACEMENTS) {
    out = out.replaceAll(from, to);
  }
  return out;
}

const raw = fs.readFileSync(postsPath, "utf8");
const posts = JSON.parse(raw);

for (const post of posts) {
  const slug = post.slug;
  if (post.featuredImage) {
    post.featuredImage = rewriteUrl(post.featuredImage, slug);
  }
  for (const block of post.content ?? []) {
    if (block.type === "image" && block.src) {
      block.src = rewriteUrl(block.src, slug);
    }
  }
}

fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2) + "\n");
console.log("Updated", postsPath);
