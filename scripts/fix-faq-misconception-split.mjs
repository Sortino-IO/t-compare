/**
 * Repairs FAQ misconception blocks that were saved as four single-character
 * heading/paragraph pairs (bug: misQ/misA were bare strings in qa[], so
 * destructuring took only the first two characters of each string).
 *
 * Run once: node scripts/fix-faq-misconception-split.mjs
 */
import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const postsPath = join(__dirname, "../app/data/posts.json");

function misconceptionFaq(slug) {
  if (slug.includes("enclomiphene") || slug.includes("trt") || slug.includes("testosterone")) {
    return [
      "Is a higher testosterone number always better?",
      "Not necessarily. Clinicians track symptoms, safety labs (including hematocrit), fertility goals, and cardiovascular risk—not a single lab value in isolation. Treatment aims for an individualized balance, not the top of the reference range for everyone.",
    ];
  }
  if (slug.includes("sleep") || slug.includes("apnea")) {
    return [
      "Will treating low testosterone fix my sleep apnea?",
      "Usually not by itself. Obstructive sleep apnea often needs targeted evaluation and therapy (for example positive airway pressure when indicated). Hormone discussions may overlap with sleep symptoms, but they are not interchangeable treatments.",
    ];
  }
  if (slug.includes("diet") || slug.includes("vitamin") || slug.includes("weight")) {
    return [
      "Can I raise testosterone reliably with food alone?",
      "Diet quality affects weight and metabolic health, which can relate to androgen patterns in research populations. Food is not a substitute for evaluating causes of symptoms or diagnosed hypogonadism with a clinician when medication is appropriate.",
    ];
  }
  return [
    "Can I self-diagnose low testosterone from an article checklist?",
    "No. Symptom overlap is huge—thyroid issues, depression, sleep apnea, and medications can mimic complaints that send people to hormone keywords. Use articles to prepare questions; let testing and history confirm what applies to you.",
  ];
}

function isSplitMisconceptionQuartet(b0, b1, b2, b3) {
  if (
    b0?.type !== "heading" ||
    b0.level !== 3 ||
    (b0.text?.length ?? 0) !== 1 ||
    b1?.type !== "paragraph" ||
    b1.segments ||
    (b1.text?.length ?? 0) !== 1 ||
    b2?.type !== "heading" ||
    b2.level !== 3 ||
    (b2.text?.length ?? 0) !== 1 ||
    b3?.type !== "paragraph" ||
    b3.segments ||
    (b3.text?.length ?? 0) !== 1
  ) {
    return false;
  }
  const s = b0.text + b1.text + b2.text + b3.text;
  return s === "IsNo" || s === "CaNo";
}

function repairContent(content, slug) {
  const blocks = [...content];
  const [q, a] = misconceptionFaq(slug);
  for (let i = 0; i <= blocks.length - 4; i++) {
    if (isSplitMisconceptionQuartet(blocks[i], blocks[i + 1], blocks[i + 2], blocks[i + 3])) {
      blocks.splice(i, 4, { type: "heading", text: q, level: 3 }, { type: "paragraph", text: a });
      return blocks;
    }
  }
  return content;
}

const posts = JSON.parse(readFileSync(postsPath, "utf8"));
let fixed = 0;
const out = posts.map((post) => {
  const next = { ...post, content: repairContent(post.content, post.slug) };
  if (next.content !== post.content) fixed++;
  return next;
});

writeFileSync(postsPath, JSON.stringify(out, null, 2) + "\n", "utf8");
console.log(`Repaired misconception FAQ split in ${fixed} posts.`);
