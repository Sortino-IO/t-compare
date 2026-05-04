/**
 * Rewrites Unsplash photo IDs in app/data/posts.json to match docs/blog-image-guidelines.md
 * (no money-as-hero, generic office/laptop, couple/fertility stock, landscapes, etc.).
 *
 * Targets use only IDs verified to resolve on images.unsplash.com (wrong suffix → 404;
 * e.g. photo-1582719478250-c89cae4dc85b is hospitality stock, not a clipboard).
 * Run: node scripts/apply-blog-image-guidelines.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { FORBIDDEN_UNSPLASH_PHOTO_IDS } from "./blog-image-banned-ids.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const postsPath = path.join(__dirname, "../app/data/posts.json");

/** [fromPhotoIdPrefix, toPhotoIdPrefix] - replaces path segment after /photo- */
const ID_REPLACEMENTS = [
  ["photo-1563013544-824ae1b704d3", "photo-1584308666744-24d5c474f2ae"],
  ["photo-1631217868264-e5b90bb7e133", "photo-1577401132921-cb39bb0adcff"],
  ["photo-1454165804606-c3d57bc86b40", "photo-1555633514-abcee6ab92e1"],
  ["photo-1551650975-87deedd944c3", "photo-1577401132921-cb39bb0adcff"],
  ["photo-1532938911079-1b06ac7ceec7", "photo-1577401132921-cb39bb0adcff"],
  ["photo-1622253692010-333f2da6031d", "photo-1577401132921-cb39bb0adcff"],
  ["photo-1522337360788-8b13dee7a37e", "photo-1584308666744-24d5c474f2ae"],
  ["photo-1573497019940-1c28c88b4f3e", "photo-1555633514-abcee6ab92e1"],
  ["photo-1529156069898-49953e39b3ac", "photo-1769702247711-5f554fcfc103"],
  ["photo-1461896836934-ffe607ba8211", "photo-1555633514-abcee6ab92e1"],
  ["photo-1512621776951-a57141f2eefd", "photo-1555633514-abcee6ab92e1"],
];

const TELEHEALTH_ID = "photo-1729280860113-82372b7afad6";
/** Meds/lab context - replacement when the telehealth-adjacent hero is duplicated outside the online-care article */
const TELEHEALTH_REPLACE = "photo-1577401132921-cb39bb0adcff";
const ONLINE_SLUG = "online-treatment-mens-health";

for (const [, to] of ID_REPLACEMENTS) {
  if (FORBIDDEN_UNSPLASH_PHOTO_IDS.has(to)) {
    throw new Error(
      `apply-blog-image-guidelines: replacement target must not be forbidden: ${to}`,
    );
  }
}
for (const id of [TELEHEALTH_ID, TELEHEALTH_REPLACE]) {
  if (FORBIDDEN_UNSPLASH_PHOTO_IDS.has(id)) {
    throw new Error(`apply-blog-image-guidelines: telehealth constants must not use forbidden id: ${id}`);
  }
}

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
