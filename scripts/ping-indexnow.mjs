/**
 * Pings IndexNow (Bing) with all site URLs.
 * Run after deploying new content:  node scripts/ping-indexnow.mjs
 */

import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const SITE_URL = "https://www.t-compare.com";
const KEY = "28a3b57c4bf84d6d8433296f0e7696f8";
const KEY_LOCATION = `${SITE_URL}/${KEY}.txt`;

// Read sitemap and extract URLs
// For simplicity, list the most important URLs manually here
// (extend as needed — IndexNow has no strict limit but recommend max ~10k per call)
const URLS = [
  "/",
  "/about",
  "/comparisons",
  "/blog",
  "/t-supplements",
  "/t-supplements/comparisons",
  "/t-supplements/critical-t",
  "/t-supplements/testoprime",
  "/t-supplements/endopeak",
  "/t-supplements/erecprime",
  "/t-supplements/testogen",
  "/t-supplements/prime-male",
  "/t-supplements/alpha-surge",
  "/testosterone/enclomiphene",
  "/testosterone/enclomiphene/ttime",
  "/testosterone/enclomiphene/hims",
  "/testosterone/enclomiphene/maximus-tribe",
  "/testosterone/enclomiphene/hone-health",
  "/testosterone/enclomiphene/joi-blokes",
  "/testosterone/enclomiphene/petermd",
  "/testosterone/enclomiphene/defy-medical",
  "/testosterone/enclomiphene/concierge-md",
  "/blog/critical-t-review-2026",
  "/blog/critical-t-ingredients-explained",
  "/blog/does-critical-t-work",
  "/blog/critical-t-price-where-to-buy",
  "/blog/critical-t-side-effects",
  "/blog/critical-t-vs-trt",
  "/blog/best-testosterone-supplements-2026",
  "/blog/signs-of-low-testosterone",
  "/blog/natural-ways-to-boost-testosterone",
  "/blog/how-ttime-cut-enclomiphene-costs",
  "/blog/topics/critical-t",
].map((path) => `${SITE_URL}${path}`);

const body = {
  host: new URL(SITE_URL).host,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList: URLS,
};

console.log(`Pinging IndexNow with ${URLS.length} URLs...`);

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(body),
});

if (res.ok || res.status === 202) {
  console.log(`✓ IndexNow accepted (HTTP ${res.status})`);
} else {
  const text = await res.text();
  console.error(`✗ IndexNow error (HTTP ${res.status}): ${text}`);
  process.exit(1);
}
