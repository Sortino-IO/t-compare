import type { ParagraphSegment } from "./blog";

/** Mutable per-article counters so auto-links stay readable (no keyword stuffing). */
export type LinkifyCounters = {
  tcompare: number;
  enclomiphene: number;
  testosterone: number;
  comparisons: number;
  hypogonadism: number;
};

export function createLinkifyCounters(): LinkifyCounters {
  return {
    tcompare: 0,
    enclomiphene: 0,
    testosterone: 0,
    comparisons: 0,
    hypogonadism: 0,
  };
}

type Rule = {
  key: keyof LinkifyCounters;
  max: number;
  pattern: RegExp;
  href: string;
  external?: boolean;
};

const RULES: Rule[] = [
  {
    key: "tcompare",
    max: 3,
    pattern: /\bT[·-]Compare\b/g,
    href: "/",
  },
  {
    key: "enclomiphene",
    max: 4,
    pattern: /\benclomiphene\b/gi,
    href: "/testosterone/enclomiphene",
  },
  {
    key: "testosterone",
    max: 3,
    pattern: /\btestosterone\b/gi,
    href: "/testosterone",
  },
  {
    key: "comparisons",
    max: 2,
    pattern: /\bprovider comparisons\b/gi,
    href: "/comparisons",
  },
  {
    key: "hypogonadism",
    max: 2,
    pattern: /\bhypogonadism\b/gi,
    href: "https://medlineplus.gov/ency/article/003707.htm",
    external: true,
  },
];

function applyRule(segments: ParagraphSegment[], rule: Rule, c: LinkifyCounters): ParagraphSegment[] {
  return segments.flatMap((seg) => {
    if (seg.type !== "text") return [seg];

    const text = seg.text;
    const out: ParagraphSegment[] = [];
    const re = new RegExp(rule.pattern.source, rule.pattern.flags.includes("g") ? rule.pattern.flags : `${rule.pattern.flags}g`);
    re.lastIndex = 0;

    let last = 0;
    let m: RegExpExecArray | null;
    while (c[rule.key] < rule.max) {
      m = re.exec(text);
      if (!m) break;
      const start = m.index;
      const end = start + m[0].length;
      if (start > last) {
        out.push({ type: "text", text: text.slice(last, start) });
      }
      c[rule.key] += 1;
      out.push({
        type: "link",
        href: rule.href,
        label: m[0],
      });
      last = end;
    }

    if (last < text.length) {
      out.push({ type: "text", text: text.slice(last) });
    }

    return out.length ? out : [{ type: "text", text }];
  });
}

/**
 * Turns plain article copy into segments with conservative internal + authoritative external links.
 * Paragraphs that already use `segments` in JSON are left untouched by the caller.
 */
export function linkifyPlainText(text: string, c: LinkifyCounters): ParagraphSegment[] {
  let segments: ParagraphSegment[] = [{ type: "text", text }];
  for (const rule of RULES) {
    segments = applyRule(segments, rule, c);
  }
  return segments;
}
