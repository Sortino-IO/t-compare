/**
 * Post-build SEO audit over every prerendered HTML page in .next/server/app.
 * Fails (exit 1) on errors: missing/ellipsis titles and descriptions, missing
 * canonical, Open Graph, or Twitter preview tags on indexable pages.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.join(process.cwd(), ".next/server/app");
const SKIP = new Set(["/_not-found", "/_global-error"]);
const ELLIPSIS = /(\.\.\.|…)\s*$/;

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith(".html")) out.push(p);
  }
  return out;
}

const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

function meta(html, attr, key) {
  const re = new RegExp(`<meta[^>]*${attr}="${key}"[^>]*content="([^"]*)"`, "i");
  const re2 = new RegExp(`<meta[^>]*content="([^"]*)"[^>]*${attr}="${key}"`, "i");
  const m = html.match(re) || html.match(re2);
  return m ? decode(m[1]) : null;
}

const errors = [];
const warnings = [];
let checked = 0;

for (const file of walk(ROOT)) {
  const route = "/" + path.relative(ROOT, file).replace(/\.html$/, "").replace(/(^|\/)index$/, "");
  const r = route === "/" ? "/" : route.replace(/\/$/, "");
  if (SKIP.has(r)) continue;
  const html = fs.readFileSync(file, "utf8");
  const head = html.slice(0, html.indexOf("</head>") > 0 ? html.indexOf("</head>") : 60000);

  const robots = meta(head, "name", "robots") || "";
  if (/noindex/i.test(robots)) continue;
  const redirect = /NEXT_REDIRECT|http-equiv="refresh"|id="__next_error__"/i.test(html.slice(0, 400)) || /NEXT_REDIRECT/.test(html);
  if (redirect) continue;
  checked++;

  const err = (m) => errors.push(`${r}: ${m}`);
  const warn = (m) => warnings.push(`${r}: ${m}`);

  const titleMatch = head.match(/<title>([^<]*)<\/title>/);
  const title = titleMatch ? decode(titleMatch[1]) : "";
  const desc = meta(head, "name", "description");
  const canonical = head.match(/<link[^>]*rel="canonical"[^>]*href="([^"]*)"/)?.[1];

  if (!title) err("missing <title>");
  else {
    if (ELLIPSIS.test(title)) err(`title ends with an ellipsis: "${title}"`);
    const core = title.replace(/\s*\|\s*T-Compare$/, "");
    if (core.length > 65) warn(`title ${core.length} chars (aim ≤ 60): "${core}"`);
    if (core.length < 25) warn(`title short (${core.length}): "${core}"`);
  }
  if (!desc) err("missing meta description");
  else {
    if (ELLIPSIS.test(desc)) err(`description ends with an ellipsis: "${desc}"`);
    if (desc.length > 165) warn(`description ${desc.length} chars (aim 120-160)`);
    if (desc.length < 110) warn(`description short (${desc.length})`);
  }
  if (!canonical) err("missing canonical");

  for (const [attr, key] of [
    ["property", "og:title"],
    ["property", "og:description"],
    ["property", "og:url"],
    ["property", "og:type"],
    ["property", "og:site_name"],
    ["property", "og:image"],
    ["property", "og:image:width"],
    ["property", "og:image:height"],
    ["property", "og:image:alt"],
    ["name", "twitter:card"],
    ["name", "twitter:title"],
    ["name", "twitter:description"],
    ["name", "twitter:image"],
  ]) {
    const v = meta(head, attr, key);
    if (!v) err(`missing ${key}`);
    else if (/title|description/.test(key) && ELLIPSIS.test(v)) err(`${key} ends with an ellipsis: "${v}"`);
  }

  const ogUrl = meta(head, "property", "og:url");
  if (ogUrl && canonical && ogUrl !== canonical) warn(`og:url (${ogUrl}) != canonical (${canonical})`);
  if (!/<h1[\s>]/i.test(html)) warn("no <h1>");
  if (!/application\/ld\+json/.test(html)) warn("no JSON-LD");
}

console.log(`SEO meta audit: ${checked} indexable pages checked`);
if (warnings.length && process.argv.includes("--verbose")) {
  console.log(`\nWarnings (${warnings.length}):\n` + warnings.join("\n"));
} else if (warnings.length) {
  console.log(`${warnings.length} warnings (run with --verbose to list)`);
}
if (errors.length) {
  console.error(`\nErrors (${errors.length}):\n` + errors.join("\n"));
  process.exit(1);
}
console.log("No errors.");
