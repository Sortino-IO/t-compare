/**
 * Ensures:
 * - Each Unsplash photo-* ID appears at most MAX_USES_GLOBAL times site-wide.
 * - Within a single post, the same photo-* ID never appears twice (featured + inline).
 * Preserves w= / h= query params from each original URL.
 *
 * Run: node scripts/dedupe-blog-images.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { FORBIDDEN_UNSPLASH_PHOTO_IDS } from "./blog-image-banned-ids.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const postsPath = path.join(__dirname, "../app/data/posts.json");

const MAX_USES_GLOBAL = 2;

/** Approved Unsplash photo-* IDs (synced with app/data/posts.json; blog-image-guidelines compliant). */
const PHOTO_IDS_POOL = [
  "photo-1457449205106-d0aad138e99b",
  "photo-1483721310020-03333e577078",
  "photo-1486218119243-13883505764c",
  "photo-1486739985386-d4fae04ca6f7",
  "photo-1528720208104-3d9bd03cc9d4",
  "photo-1547592166-23ac45744acd",
  "photo-1555633514-abcee6ab92e1",
  "photo-1559757148-5c350d0d3c56",
  "photo-1571008887538-b36bb32f4571",
  "photo-1573207185685-5109f337fdf6",
  "photo-1575997038999-5be1cffe6c5d",
  "photo-1577401132921-cb39bb0adcff",
  "photo-1581889470536-467bdbe30cd0",
  "photo-1584308666744-24d5c474f2ae",
  "photo-1587854692152-cbe660dbde88",
  "photo-1593672827643-a49f0af32d88",
  "photo-1609377375724-8fadc82cd50e",
  "photo-1619226860874-d403a6a616b2",
  "photo-1627891284367-0a51738e14a4",
  "photo-1628595351029-c2bf17511435",
  "photo-1629451565902-4c40a51b374e",
  "photo-1630094539376-17c921c45b59",
  "photo-1631119701947-11d4fd05a8de",
  "photo-1631980837307-a8f78d71f97c",
  "photo-1631980837699-be48d6394724",
  "photo-1631980839224-2554f0cb39f1",
  "photo-1631980839248-1a84a60c66ac",
  "photo-1631980839320-77eed020776c",
  "photo-1631980839333-62177bc2a294",
  "photo-1646392206581-2527b1cae5cb",
  "photo-1698671823406-035c77ff6fcd",
  "photo-1705517243962-230c07db6b23",
  "photo-1721588994554-3b4f82e6ec78",
  "photo-1727094141271-9bea5bc8c757",
  "photo-1729280860113-82372b7afad6",
  "photo-1729280924877-4750c0dba51e",
  "photo-1731140172866-1af3dd2672e4",
  "photo-1733119893741-ee2b316a7e85",
  "photo-1769699877650-ed81a504aaee",
  "photo-1769702247711-5f554fcfc103",
  "photo-1770010378611-9663ef633037",
];

for (const id of PHOTO_IDS_POOL) {
  if (FORBIDDEN_UNSPLASH_PHOTO_IDS.has(id)) {
    throw new Error(
      `dedupe-blog-images: PHOTO_IDS_POOL must not contain forbidden id ${id} (see blog-image-banned-ids.mjs)`,
    );
  }
}

/** Global counts across all posts */
const usage = new Map();

function extractPhotoId(url) {
  const m = url.match(/photo-\d+-[a-z0-9]+/);
  return m ? m[0] : null;
}

function extractDims(url) {
  const w = url.match(/[?&]w=(\d+)/)?.[1] ?? "1200";
  const h = url.match(/[?&]h=(\d+)/)?.[1] ?? "630";
  return { w, h };
}

function buildUrl(photoId, w, h) {
  return `https://images.unsplash.com/${photoId}?w=${w}&h=${h}&fit=crop&auto=format&q=85`;
}

function canUse(id, seenPost) {
  if (seenPost.has(id)) return false;
  if ((usage.get(id) || 0) >= MAX_USES_GLOBAL) return false;
  return true;
}

function commit(id, seenPost) {
  usage.set(id, (usage.get(id) || 0) + 1);
  seenPost.add(id);
}

function pickAny(seenPost) {
  for (const id of PHOTO_IDS_POOL) {
    if (canUse(id, seenPost)) {
      commit(id, seenPost);
      return id;
    }
  }
  throw new Error(
    "dedupe-blog-images: pool exhausted - add more PHOTO_IDS_POOL entries or raise MAX_USES_GLOBAL.",
  );
}

function assignUrl(url, seenPost) {
  if (!url || !url.includes("images.unsplash.com")) return url;
  const pid = extractPhotoId(url);
  if (!pid) return url;
  const { w, h } = extractDims(url);

  if (FORBIDDEN_UNSPLASH_PHOTO_IDS.has(pid)) {
    const id = pickAny(seenPost);
    return buildUrl(id, w, h);
  }

  if (canUse(pid, seenPost)) {
    commit(pid, seenPost);
    return buildUrl(pid, w, h);
  }

  const id = pickAny(seenPost);
  return buildUrl(id, w, h);
}

for (const id of PHOTO_IDS_POOL) usage.set(id, usage.get(id) || 0);

const posts = JSON.parse(fs.readFileSync(postsPath, "utf8"));

for (const post of posts) {
  const seenPost = new Set();
  if (post.featuredImage) {
    post.featuredImage = assignUrl(post.featuredImage, seenPost);
  }
  for (const block of post.content ?? []) {
    if (block.type === "image" && block.src) {
      block.src = assignUrl(block.src, seenPost);
    }
  }
}

fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2) + "\n");
console.log(
  "Deduped Unsplash IDs (max",
  MAX_USES_GLOBAL,
  "each site-wide; at most one per post):",
  postsPath,
);
