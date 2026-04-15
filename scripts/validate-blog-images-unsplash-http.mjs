/**
 * Fails if any images.unsplash.com URL in posts.json returns HTTP error (404, etc.).
 * Uses HEAD with redirect follow; falls back to GET if HEAD is not allowed.
 *
 * Run: node scripts/validate-blog-images-unsplash-http.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const postsPath = path.join(__dirname, "../app/data/posts.json");
const UNSPLASH_HOST = "https://images.unsplash.com/";
const TIMEOUT_MS = 25_000;
const CONCURRENCY = 8;

function collectUnsplashUrls(posts) {
  const set = new Set();
  for (const post of posts) {
    if (post.featuredImage?.startsWith(UNSPLASH_HOST)) {
      set.add(post.featuredImage);
    }
    for (const block of post.content ?? []) {
      if (block.type === "image" && block.src?.startsWith(UNSPLASH_HOST)) {
        set.add(block.src);
      }
    }
  }
  return [...set];
}

async function fetchStatus(url) {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), TIMEOUT_MS);
  try {
    let res = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      signal: ac.signal,
    });
    if (res.status === 405 || res.status === 501) {
      res = await fetch(url, {
        method: "GET",
        redirect: "follow",
        signal: ac.signal,
        headers: { Range: "bytes=0-0" },
      });
    }
    return res.status;
  } finally {
    clearTimeout(timer);
  }
}

async function runPool(urls, worker) {
  let i = 0;
  const results = new Array(urls.length);
  async function workerFn() {
    while (true) {
      const idx = i++;
      if (idx >= urls.length) break;
      results[idx] = await worker(urls[idx]);
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, urls.length) }, () => workerFn()),
  );
  return results;
}

const posts = JSON.parse(fs.readFileSync(postsPath, "utf8"));
const urls = collectUnsplashUrls(posts);

if (urls.length === 0) {
  console.log("Blog Unsplash HTTP check OK (no Unsplash URLs).");
  process.exit(0);
}

const failures = [];

const statuses = await runPool(urls, async (url) => {
  try {
    const status = await fetchStatus(url);
    if (status >= 400) {
      failures.push(`${status} ${url}`);
    }
    return status;
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    failures.push(`ERR ${url} (${msg})`);
    return null;
  }
});

if (failures.length) {
  console.error(
    "Unsplash URL HTTP check failed (fix or replace broken photo ids in app/data/posts.json):\n",
    failures.join("\n"),
  );
  process.exit(1);
}

console.log(
  `Blog Unsplash HTTP check OK (${urls.length} unique URL${urls.length === 1 ? "" : "s"}).`,
);
