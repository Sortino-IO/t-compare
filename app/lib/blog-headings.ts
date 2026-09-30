import type { BlogBlock } from "./blog";

/** Stable, URL-safe anchor derived from the heading text. */
export function headingId(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u2018\u2019\u201c\u201d]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export type TocEntry = { id: string; text: string };

/**
 * Level-2 headings of an article, used for the table of contents. Ids are
 * de-duplicated so two identically-titled sections still get distinct anchors.
 */
export function extractTopLevelHeadings(blocks: BlogBlock[]): TocEntry[] {
  const seen = new Map<string, number>();
  const out: TocEntry[] = [];

  for (const block of blocks) {
    if (block.type !== "heading") continue;
    if ((block.level ?? 2) !== 2) continue;
    const text = block.text.trim();
    if (!text) continue;

    const base = headingId(text) || `section-${out.length + 1}`;
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    out.push({ id: count === 0 ? base : `${base}-${count + 1}`, text });
  }

  return out;
}
