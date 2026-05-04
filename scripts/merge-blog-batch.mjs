/**
 * One-time merge: append new SEO posts + refresh beginner enclomiphene guide metadata/blocks.
 * Run: node scripts/merge-blog-batch.mjs
 */
import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { batchPosts } from "./blog-batch-posts-data.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const postsPath = join(__dirname, "../app/data/posts.json");

const posts = JSON.parse(readFileSync(postsPath, "utf8"));
const batch = batchPosts;

const beginnerIdx = posts.findIndex(
  (p) => p.slug === "what-is-enclomiphene-how-it-works"
);
if (beginnerIdx === -1) {
  throw new Error("Beginner enclomiphene post not found");
}

const b = posts[beginnerIdx];
const batchAlreadyPresent = posts.some((p) =>
  batch.some((n) => n.slug === p.slug)
);

const beginnerLead = [
  {
    type: "heading",
    text: "What is enclomiphene in one paragraph (plus what trials have measured)",
    level: 2,
  },
  {
    type: "paragraph",
    text: 'Enclomiphene citrate is the trans-isomer of clomiphene citrate-a selective estrogen receptor modulator (SERM) that has been studied as an oral option for men with secondary hypogonadism, where the brain-pituitary-testis axis may still respond to upstream signaling rather than relying solely on exogenous testosterone. If you are searching "what is enclomiphene," you are usually trying to connect a medication name to a mechanism: block estrogen feedback at the hypothalamus/pituitary, raise LH/FSH signaling, and increase endogenous testosterone production compared with baseline in trial populations.',
  },
  {
    type: "paragraph",
    text: "Published randomized work has compared enclomiphene with topical testosterone in secondary hypogonadism and reported increases in morning testosterone alongside preserved sperm parameters in the enclomiphene arm in that study design (Wiehle et al., Fertil Steril, 2014; ClinicalTrials.gov NCT01270841). That single sentence is not a prediction about you-it is a summary of why enclomiphene gets discussed alongside fertility-aware pathways. Regulatory status varies by country; in the United States, compounded enclomiphene is commonly discussed off-label, and you should confirm product sourcing and clinician oversight directly.",
  },
  {
    type: "bulletList",
    items: [
      "Mechanism (high level): SERM effects on estrogen signaling → altered gonadotropin drive → increased testicular testosterone production in responsive syndromes.",
      "Different from classic TRT: exogenous testosterone can suppress LH/FSH; enclomiphene trials are framed around stimulating production rather than replacing it outright.",
      "Why keywords cluster: people search what is enclomiphene alongside fertility, prescriptions, and side effects-those are the same domains you should discuss with a licensed prescriber.",
    ],
  },
];

const hasBeginnerLead = b.content.some(
  (block) =>
    block.type === "heading" &&
    block.text ===
      "What is enclomiphene in one paragraph (plus what trials have measured)"
);

if (!batchAlreadyPresent) {
  b.title = "What Is Enclomiphene and How Does It Work? A Beginner's Guide";
  b.excerpt =
    "Beginner-friendly explainer for what is enclomiphene: definition, how it is studied in secondary hypogonadism trials, and what questions belong with your clinician-not a headline.";
  b.publishedAt = "2026-04-15";
  b.seoTitle = "What Is Enclomiphene? Beginner's Guide & Mechanism | T-Compare";
  b.seoDescription =
    "What is enclomiphene: plain-language basics, selective estrogen receptor modulator (SERM) framing, published trial context, and safe next steps. Educational only; not medical advice.";
  if (!hasBeginnerLead) {
    b.content = [...beginnerLead, ...b.content];
  }
  for (const p of batch) {
    if (posts.some((x) => x.slug === p.slug)) {
      throw new Error(`Duplicate slug in posts.json: ${p.slug}`);
    }
  }
  posts.push(...batch);
  writeFileSync(postsPath, JSON.stringify(posts, null, 2) + "\n", "utf8");
  console.log(`Merged ${batch.length} posts + updated beginner guide.`);
} else {
  console.log("Blog batch already present; no changes written.");
}
