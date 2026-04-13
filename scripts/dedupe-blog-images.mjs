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

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const postsPath = path.join(__dirname, "../app/data/posts.json");

const MAX_USES_GLOBAL = 2;

/** Known-broken Unsplash segments — always substitute from pool */
const BROKEN_IDS = new Set(["photo-1476480862126-207bf8fa9edc"]);

const PHOTO_IDS_POOL = [
  "photo-1579154204601-01588f351e67",
  "photo-1733119893741-ee2b316a7e85",
  "photo-1559757148-5c350d0d3c56",
  "photo-1587854692152-cbe660dbde88",
  "photo-1584308666744-24d5c474f2ae",
  "photo-1593672827643-a49f0af32d88",
  "photo-1646392206581-2527b1cae5cb",
  "photo-1631980839320-77eed020776c",
  "photo-1630094539376-17c921c45b59",
  "photo-1575879711582-0024b37f2bfa",
  "photo-1575997038999-5be1cffe6c5d",
  "photo-1573207185685-5109f337fdf6",
  "photo-1631980837699-be48d6394724",
  "photo-1631980839224-2554f0cb39f1",
  "photo-1631980839333-62177bc2a294",
  "photo-1631980837307-a8f78d71f97c",
  "photo-1631980839248-1a84a60c66ac",
  "photo-1571019613454-1cb2f99b2d8b",
  "photo-1612349317150-e413f6a5b16d",
  "photo-1628595351029-c2bf17511435",
  "photo-1581889470536-467bdbe30cd0",
  "photo-1486218119243-13883505764c",
  "photo-1528720208104-3d9bd03cc9d4",
  "photo-1457449205106-d0aad138e99b",
  "photo-1486739985386-d4fae04ca6f7",
  "photo-1727094141271-9bea5bc8c757",
  "photo-1571008887538-b36bb32f4571",
  "photo-1505751172876-fa1923c5c528",
  "photo-1551601651-2a8555f1a136",
  "photo-1576091160550-2173dba999ef",
  "photo-1547592166-23ac45744acd",
  "photo-1576091160399-112ba8d25d1d",
  "photo-1551884170-09fb70a3a2ed",
  "photo-1483721310020-03333e577078",
  "photo-1698671823406-035c77ff6fcd",
  "photo-1597892653980-3cec697283fe",
  "photo-1609377375724-8fadc82cd50e",
  "photo-1769699877650-ed81a504aaee",
  "photo-1769702247711-5f554fcfc103",
];

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
    "dedupe-blog-images: pool exhausted — add more PHOTO_IDS_POOL entries or raise MAX_USES_GLOBAL.",
  );
}

function assignUrl(url, seenPost) {
  if (!url || !url.includes("images.unsplash.com")) return url;
  const pid = extractPhotoId(url);
  if (!pid) return url;
  const { w, h } = extractDims(url);

  if (BROKEN_IDS.has(pid)) {
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
