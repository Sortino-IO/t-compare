import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import type { BlogBlock, ParagraphSegment } from "../lib/blog";
import { withTtimeAffiliateParams } from "../lib/affiliate-links";
import BlogComparisonBanner from "./BlogComparisonBanner";

function isExternalHref(href: string): boolean {
  return href.startsWith("https://") || href.startsWith("http://");
}

function RichParagraph({ segments }: { segments: ParagraphSegment[] }) {
  return (
    <p className="mb-6 text-base leading-relaxed text-[#44403c] sm:text-lg last:mb-0">
      {segments.map((seg, j) =>
        seg.type === "text" ? (
          <span key={j}>{seg.text}</span>
        ) : isExternalHref(seg.href) ? (
          <a
            key={j}
            href={withTtimeAffiliateParams(seg.href)}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[#2a6e47] underline decoration-[#2a6e47]/30 underline-offset-2 transition-colors hover:text-[#1c1917] hover:decoration-[#1c1917]/40"
          >
            {seg.label}
          </a>
        ) : (
          <Link
            key={j}
            href={withTtimeAffiliateParams(seg.href)}
            className="font-medium text-[#2a6e47] underline decoration-[#2a6e47]/30 underline-offset-2 transition-colors hover:text-[#1c1917] hover:decoration-[#1c1917]/40"
          >
            {seg.label}
          </Link>
        )
      )}
    </p>
  );
}

type RenderCtx = { seenFirstH2: boolean };

function renderBlock(block: BlogBlock, i: number, ctx: RenderCtx) {
  if (block.type === "paragraph") {
    if ("segments" in block && block.segments?.length) {
      return <RichParagraph key={i} segments={block.segments} />;
    }
    if ("text" in block && block.text) {
      return (
        <p
          key={i}
          className="mb-6 text-base leading-relaxed text-[#44403c] sm:text-lg last:mb-0"
        >
          {block.text}
        </p>
      );
    }
    return null;
  }

  if (block.type === "heading") {
    const level = block.level ?? 2;
    if (level === 3) {
      return (
        <h3
          key={i}
          className="mb-3 mt-8 scroll-mt-24 font-[family-name:var(--font-playfair)] text-xl font-semibold text-[#1c1917] sm:text-2xl"
        >
          {block.text}
        </h3>
      );
    }
    const isFirstH2 = !ctx.seenFirstH2;
    ctx.seenFirstH2 = true;
    return (
      <h2
        key={i}
        className={`font-[family-name:var(--font-playfair)] text-2xl font-semibold text-[#1c1917] sm:text-3xl ${
          isFirstH2 ? "mb-5 mt-0" : "mb-5 mt-12 scroll-mt-24"
        }`}
      >
        {block.text}
      </h2>
    );
  }

  if (block.type === "bulletList") {
    return (
      <ul
        key={i}
        className="mb-6 list-disc space-y-2.5 pl-6 text-base leading-relaxed text-[#44403c] marker:text-[#2a6e47] sm:text-lg"
      >
        {block.items.map((item, li) => (
          <li key={li}>{item}</li>
        ))}
      </ul>
    );
  }

  if (block.type === "disclaimer") {
    return (
      <aside
        key={i}
        className="mt-14 border-t border-[#e3dfd6] pt-6 text-[11px] leading-relaxed text-[#a8a29e] sm:text-xs"
      >
        <p className="mb-2 font-semibold uppercase tracking-[0.12em] text-[#b5b0a8]">
          Disclaimer
        </p>
        {block.paragraphs.map((para, di) => (
          <p key={di} className={di < block.paragraphs.length - 1 ? "mb-3" : "mb-0"}>
            {para}
          </p>
        ))}
      </aside>
    );
  }

  if (block.type === "image") {
    return (
      <figure key={i} className="my-10 sm:my-12">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[#e3dfd6] bg-[#edeae2] shadow-sm">
          <Image
            src={block.src}
            alt={block.alt}
            fill
            sizes="(max-width: 768px) 100vw, 720px"
            className="object-cover"
          />
        </div>
        {block.caption ? (
          <figcaption className="mt-3 text-center text-sm text-[#a8a29e]">
            {block.caption}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  return null;
}

/** Index before which the mid CTA is inserted. Avoids placing the banner right after a section heading. */
function findMidBannerInsertIndex(blocks: BlogBlock[]): number {
  const disclaimerIdx = blocks.findIndex((b) => b.type === "disclaimer");
  const end = disclaimerIdx === -1 ? blocks.length : disclaimerIdx;
  if (end <= 2) return -1;

  let mid = Math.ceil(end / 2);
  while (mid < end && blocks[mid - 1]?.type === "heading") {
    mid += 1;
  }
  if (mid >= end) {
    mid = Math.ceil(end / 2);
    while (mid > 1 && blocks[mid - 1]?.type === "heading") {
      mid -= 1;
    }
  }
  if (mid <= 0 || mid >= end) return -1;
  if (blocks[mid - 1]?.type === "heading") return -1;
  return mid;
}

export default function BlogContent({ blocks }: { blocks: BlogBlock[] }) {
  const ctx: RenderCtx = { seenFirstH2: false };
  const n = blocks.length;
  const mid = findMidBannerInsertIndex(blocks);

  const nodes: ReactNode[] = [];
  let endBannerPlaced = false;

  for (let i = 0; i < n; i++) {
    if (mid !== -1 && i === mid) {
      nodes.push(<BlogComparisonBanner key={`compare-mid-${i}`} />);
    }
    if (blocks[i].type === "disclaimer" && !endBannerPlaced) {
      nodes.push(<BlogComparisonBanner key="compare-end" variant="end" />);
      endBannerPlaced = true;
    }
    const el = renderBlock(blocks[i], i, ctx);
    if (el !== null) nodes.push(el);
  }

  if (n > 0 && !endBannerPlaced) {
    nodes.push(<BlogComparisonBanner key="compare-end" variant="end" />);
  }

  return <div className="mx-auto max-w-3xl">{nodes}</div>;
}
