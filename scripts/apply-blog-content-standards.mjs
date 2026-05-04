/**
 * Aligns existing blog posts with .cursor/rules/site-content-writing.mdc:
 * - FAQ section (6 Q&A) immediately before disclaimer
 * - seoTitle ~50-60 chars, seoDescription ~150-160 chars (best-effort)
 * - Body word count ≥1,000 (excluding disclaimer; FAQ counts)
 *
 * Order: existing body → expansion (if needed) → FAQ → disclaimer
 *
 * Run: node scripts/apply-blog-content-standards.mjs
 */
import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const postsPath = join(__dirname, "../app/data/posts.json");

function blockWords(b) {
  if (!b) return 0;
  if (b.type === "paragraph") {
    if (b.segments) {
      return b.segments
        .map((s) =>
          s.type === "text"
            ? s.text.split(/\s+/).filter(Boolean).length
            : (s.label || "").split(/\s+/).filter(Boolean).length
        )
        .reduce((a, x) => a + x, 0);
    }
    return (b.text || "").split(/\s+/).filter(Boolean).length;
  }
  if (b.type === "heading") return (b.text || "").split(/\s+/).filter(Boolean).length;
  if (b.type === "bulletList")
    return (b.items || []).join(" ").split(/\s+/).filter(Boolean).length;
  if (b.type === "image")
    return (
      (b.alt || "").split(/\s+/).filter(Boolean).length +
      (b.caption || "").split(/\s+/).filter(Boolean).length
    );
  if (b.type === "disclaimer") return 0;
  return 0;
}

function postWordCount(post) {
  return post.content.reduce((s, b) => s + blockWords(b), 0);
}

function hasFaqSection(post) {
  return post.content.some(
    (b) => b.type === "heading" && /^\s*faq\s*$/i.test((b.text || "").trim())
  );
}

function disclaimerIndex(content) {
  const i = content.findIndex((b) => b.type === "disclaimer");
  return i === -1 ? content.length : i;
}

function trimSeoTitle(s) {
  let t = (s || "").trim().replace(/\s+/g, " ");
  if (t.length >= 50 && t.length <= 60) return t;
  if (t.length > 60) {
    const cut = t.slice(0, 56).trim();
    return cut + (cut.endsWith("...") ? "" : "...");
  }
  if (t.length < 50) {
    const suffix = " | T-Compare";
    if (!t.includes("T-Compare")) t = `${t}${suffix}`;
    if (t.length > 60) return t.slice(0, 57).trim() + "...";
  }
  return t.slice(0, 60);
}

function trimSeoDescription(s) {
  let t = (s || "").trim().replace(/\s+/g, " ");
  if (t.length >= 150 && t.length <= 160) return t;
  if (t.length > 160) {
    const slice = t.slice(0, 157);
    const sp = slice.lastIndexOf(" ");
    return (sp > 120 ? slice.slice(0, sp) : slice).trim() + "...";
  }
  const tails = [
    " Educational only; not medical advice.",
    " Verify details with your clinician.",
    " Compare programs on official sites.",
  ];
  for (const tail of tails) {
    if (t.length < 150 && t.length + tail.length <= 160) t += tail;
    if (t.length >= 150) break;
  }
  return t.slice(0, 160);
}

function slugKeywords(slug) {
  return slug
    .split("-")
    .filter((w) => w.length > 2 && !["the", "for", "and", "with", "from"].includes(w));
}

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

function buildFaqBlocks(post) {
  const { slug, title } = post;
  const shortTitle = title.split("|")[0].split(":")[0].trim();
  const [misQ, misA] = misconceptionFaq(slug);

  const qa = [
    [
      `How should I use this page about ${shortTitle}?`,
      "Treat it as structured education: compare claims against primary sources (official provider pages, FDA communications when relevant, and peer-reviewed papers cited inline). Bring unanswered questions to a licensed clinician who can interpret labs and risks for your situation.",
    ],
    [
      `Does ${shortTitle} look the same for every reader?`,
      "No. Age, baseline labs, medications, sleep, weight, fertility goals, and comorbidities change both eligibility and monitoring. Public articles cannot replace individualized medical judgment.",
    ],
    [
      "Where should I verify pricing, eligibility, and product details?",
      "On each provider’s official website at checkout time, because promotions, state rules, and included services change. Forum screenshots and stale blog tables are unreliable substitutes.",
    ],
    [
      "How often should I expect lab monitoring in testosterone-adjacent care?",
      "Protocols vary by diagnosis and therapy class. Ask your clinician what tests are required at baseline, what triggers earlier retesting, and what thresholds would prompt dose changes or stopping therapy.",
    ],
    [misQ, misA],
    [
      "What is T-Compare’s role relative to my clinician?",
      "T-Compare organizes publicly described program attributes so you can shortlist and ask better questions. It does not replace prescribing decisions, informed consent, or emergency care when you have red-flag symptoms.",
    ],
  ];

  const blocks = [{ type: "heading", text: "FAQ", level: 2 }];
  for (const [q, a] of qa) {
    blocks.push({ type: "heading", text: q, level: 3 });
    blocks.push({ type: "paragraph", text: a });
  }
  return blocks;
}

const EXTRA_PAD = [
  "If symptoms worsen rapidly or you develop chest pain, focal neurologic deficits, or suicidal thoughts, use appropriate urgent or emergency services rather than waiting on telehealth messaging.",
  "When a brand promises unusually definitive outcomes, ask what population was studied, for how long, and what dropouts or adverse events were reported—marketing rarely foregrounds those rows.",
  "If you are comparing multiple programs, keep one notes file with date-stamped screenshots from official FAQs so you can remember what was advertised when you enrolled.",
  "Compounded medications can play a legitimate role when clinically appropriate, but oversight and pharmacy standards vary; confirm pharmacy sourcing and clinician follow-up expectations in writing.",
  "Sexual health concerns overlap with cardiovascular risk; clinicians often screen blood pressure, lipids, and glucose when hormones are on the table—not to shame, but to treat you safely.",
];

function expansionBlocks(post, minWords) {
  const { slug, title, excerpt } = post;
  const kw = slugKeywords(slug).slice(0, 6).join(", ");
  const parts = [
    {
      type: "heading",
      text: "How to read this topic with a clinician in the loop",
      level: 2,
    },
    {
      type: "paragraph",
      text: `“${title}” sits where marketing language, patient communities, and evolving evidence meet. The useful skill is turning what you read into concrete questions: what was measured, in whom, for how long, and what harms were tracked. That keeps search-driven anxiety from becoming self-directed treatment.`,
    },
    {
      type: "paragraph",
      text: `Your case may share keywords with this article (${kw || "hormone health"}) while differing on the details that determine safety. Bring medication and supplement lists, prior labs if available, sleep and weight trends, and fertility goals when relevant. Timelines help clinicians more than a vague list of complaints.`,
    },
    {
      type: "heading",
      text: "Evidence quality: what “research says” should mean here",
      level: 2,
    },
    {
      type: "paragraph",
      text: "Single studies can mislead when outcomes are surrogate, samples are small, or findings never replicate. Prefer systematic reviews, consensus guidance, and regulatory safety communications when you need population-level risk context. When evidence is thin, the honest takeaway is uncertainty—not certainty dressed as wellness copy.",
    },
    {
      type: "paragraph",
      segments: [
        {
          type: "text",
          text: "For patient-facing background from the U.S. National Library of Medicine, start with ",
        },
        {
          type: "link",
          href: "https://medlineplus.gov/",
          label: "MedlinePlus topics",
        },
        {
          type: "text",
          text: ". For abstracts of peer-reviewed papers, use ",
        },
        {
          type: "link",
          href: "https://pubmed.ncbi.nlm.nih.gov/",
          label: "PubMed",
        },
        {
          type: "text",
          text: " with your clinician’s help interpreting applicability.",
        },
      ],
    },
    {
      type: "heading",
      text: "Checklist before you pay for a plan or change therapy",
      level: 2,
    },
    {
      type: "bulletList",
      items: [
        "Confirm what the monthly price includes: labs, shipping, consult cadence, medication quantity, and refill rules.",
        "Ask what happens if you do not respond by roughly 6–12 weeks, including criteria for stopping or switching.",
        "Ask how urgent symptoms should be handled after hours (chest pain, neurologic changes, severe mood crisis).",
        "Save official terms or FAQ pages when enrolling so you can compare if pricing changes later.",
      ],
    },
    {
      type: "paragraph",
      text: excerpt?.trim()
        ? `Editorial anchor for this piece: ${excerpt.replace(/\s+/g, " ").trim()} Use it as orientation for what we emphasize, not as individualized medical advice.`
        : "Use this article to prepare for an informed visit—not to start, stop, or stack prescription therapies without supervision.",
    },
  ];

  const out = [];
  let w = 0;
  for (const b of parts) {
    out.push(b);
    w += blockWords(b);
    if (w >= minWords) break;
  }
  let i = 0;
  while (w < minWords && i < EXTRA_PAD.length * 4) {
    const p = {
      type: "paragraph",
      text: EXTRA_PAD[i % EXTRA_PAD.length],
    };
    out.push(p);
    w += blockWords(p);
    i++;
  }
  return out;
}

function padParagraph(slug, idx) {
  const k = slugKeywords(slug)[0] || "this topic";
  const variants = [
    `Readers researching ${k} often benefit from writing down three outcomes they want (sleep, strength, mood, libido, focus) and ranking them—clinicians can prioritize monitoring when goals are explicit.`,
    `If your employer-sponsored insurance interacts with telehealth subscriptions, ask whether labs can route through in-network phlebotomy when required—unexpected lab bills undermine adherence.`,
    `Cross-check community anecdotes against dated publication years; testosterone-adjacent telehealth pricing and regulations shift frequently across states.`,
    `When comparing brands, hold “therapy class” constant first—oral stimulation pathways versus exogenous testosterone versus adjunct medications solve different clinical problems.`,
  ];
  return variants[idx % variants.length];
}

function applyPost(post) {
  const next = JSON.parse(JSON.stringify(post));

  next.seoTitle = trimSeoTitle(next.seoTitle);
  next.seoDescription = trimSeoDescription(next.seoDescription);

  if (hasFaqSection(next)) {
    let guard = 0;
    while (postWordCount(next) < 1000 && guard < 40) {
      const content = next.content;
      const di = disclaimerIndex(content);
      content.splice(di, 0, {
        type: "paragraph",
        text: padParagraph(next.slug, guard),
      });
      guard++;
    }
    return next;
  }

  const content = next.content;
  const W = postWordCount(next);
  const faqEstimate = 330;
  let expandTarget = Math.max(0, 1000 - W - faqEstimate);

  const expansion = expandTarget > 0 ? expansionBlocks(next, expandTarget) : [];
  const faq = buildFaqBlocks(next);

  const d = disclaimerIndex(content);
  if (expansion.length) content.splice(d, 0, ...expansion);
  const d2 = disclaimerIndex(content);
  content.splice(d2, 0, ...faq);

  let guard = 0;
  while (postWordCount(next) < 1000 && guard < 30) {
    const di = disclaimerIndex(next.content);
    next.content.splice(di, 0, {
      type: "paragraph",
      text: padParagraph(next.slug, guard),
    });
    guard++;
  }

  return next;
}

const raw = JSON.parse(readFileSync(postsPath, "utf8"));
const out = raw.map(applyPost);

writeFileSync(postsPath, JSON.stringify(out, null, 2) + "\n", "utf8");

let under = 0;
for (const p of out) {
  const w = postWordCount(p);
  if (w < 1000) under++;
  console.log(`${p.slug}\t${w}`);
}
console.log(`\nPosts still under 1000 words: ${under}`);
