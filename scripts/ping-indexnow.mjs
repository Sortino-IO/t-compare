/**
 * Pings IndexNow (Bing) with ALL site URLs from the live sitemap.
 * Run after deploying new content:  node scripts/ping-indexnow.mjs
 */

const SITE_URL = "https://www.t-compare.com";
const KEY = "28a3b57c4bf84d6d8433296f0e7696f8";
const KEY_LOCATION = `${SITE_URL}/${KEY}.txt`;
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

// ── 1. Fetch sitemap and extract all URLs ──────────────────────────────────
console.log(`Fetching sitemap from ${SITE_URL}/sitemap.xml ...`);

const sitemapRes = await fetch(`${SITE_URL}/sitemap.xml`);
if (!sitemapRes.ok) {
  console.error(`✗ Could not fetch sitemap (HTTP ${sitemapRes.status})`);
  process.exit(1);
}

const xml = await sitemapRes.text();

// Extract all <loc> values
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());

if (urls.length === 0) {
  console.error("✗ No URLs found in sitemap.");
  process.exit(1);
}

console.log(`Found ${urls.length} URLs in sitemap.`);

// ── 2. IndexNow accepts max 10 000 URLs per call — chunk if needed ─────────
const CHUNK_SIZE = 10_000;

for (let i = 0; i < urls.length; i += CHUNK_SIZE) {
  const batch = urls.slice(i, i + CHUNK_SIZE);
  const batchNum = Math.floor(i / CHUNK_SIZE) + 1;

  console.log(`Sending batch ${batchNum} (${batch.length} URLs) to IndexNow...`);

  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: new URL(SITE_URL).host,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList: batch,
    }),
  });

  if (res.ok || res.status === 202) {
    console.log(`✓ Batch ${batchNum} accepted (HTTP ${res.status})`);
  } else {
    const text = await res.text();
    console.error(`✗ Batch ${batchNum} failed (HTTP ${res.status}): ${text}`);
    process.exit(1);
  }
}

console.log(`\n✓ Done — ${urls.length} URLs submitted to IndexNow.`);
