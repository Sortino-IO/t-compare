import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import type { BlogBlock, ParagraphSegment } from "../lib/blog";
import { extractTopLevelHeadings } from "../lib/blog-headings";
import { createLinkifyCounters, linkifyPlainText, type LinkifyCounters } from "../lib/blog-linkify";
import { withTtimeAffiliateParams } from "../lib/affiliate-links";
import BlogComparisonBanner, { type BannerCta } from "./BlogComparisonBanner";

function isExternalHref(href: string): boolean {
  return href.startsWith("https://") || href.startsWith("http://");
}

function InlineSegments({ segments }: { segments: ParagraphSegment[] }) {
  return (
    <>
      {segments.map((seg, j) =>
        seg.type === "text" ? (
          <span key={j}>{seg.text}</span>
        ) : isExternalHref(seg.href) ? (
          <a
            key={j}
            href={withTtimeAffiliateParams(seg.href)}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[#176b87] underline decoration-[#176b87]/30 underline-offset-2 transition-colors hover:text-[#142b3a] hover:decoration-[#142b3a]/40"
          >
            {seg.label}
          </a>
        ) : (
          <Link
            key={j}
            href={withTtimeAffiliateParams(seg.href)}
            className="font-medium text-[#176b87] underline decoration-[#176b87]/30 underline-offset-2 transition-colors hover:text-[#142b3a] hover:decoration-[#142b3a]/40"
          >
            {seg.label}
          </Link>
        )
      )}
    </>
  );
}

function RichParagraph({ segments }: { segments: ParagraphSegment[] }) {
  return (
    <p className="mb-5 text-[1.0625rem] leading-[1.7] text-[#3c535e] last:mb-0">
      <InlineSegments segments={segments} />
    </p>
  );
}

type RenderCtx = {
  seenFirstH2: boolean;
  linkify: LinkifyCounters;
  /** Anchor ids for level-2 headings, consumed in document order. */
  h2Ids: string[];
  h2Index: number;
};

function renderBlock(block: BlogBlock, i: number, ctx: RenderCtx) {
  if (block.type === "paragraph") {
    if ("segments" in block && block.segments?.length) {
      return <RichParagraph key={i} segments={block.segments} />;
    }
    if ("text" in block && block.text) {
      const segments = linkifyPlainText(block.text, ctx.linkify);
      return <RichParagraph key={i} segments={segments} />;
    }
    return null;
  }

  if (block.type === "heading") {
    const level = block.level ?? 2;
    if (level === 3) {
      return (
        <h3
          key={i}
          className="tc-display mb-2.5 mt-8 scroll-mt-20 text-lg font-bold sm:text-xl"
        >
          {block.text}
        </h3>
      );
    }
    const isFirstH2 = !ctx.seenFirstH2;
    ctx.seenFirstH2 = true;
    const id = ctx.h2Ids[ctx.h2Index];
    ctx.h2Index += 1;
    return (
      <h2
        key={i}
        id={id}
        className={`tc-display scroll-mt-20 border-b border-[#ededed] pb-2 text-xl font-bold sm:text-2xl ${
          isFirstH2 ? "mb-4 mt-0" : "mb-4 mt-10"
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
        className="mb-5 list-disc space-y-2 pl-5 text-[1.0625rem] leading-[1.7] text-[#3c535e] marker:text-[#176b87]"
      >
        {block.items.map((item, li) => (
          <li key={li}>
            <InlineSegments segments={linkifyPlainText(item, ctx.linkify)} />
          </li>
        ))}
      </ul>
    );
  }

  if (block.type === "disclaimer") {
    return (
      <aside
        key={i}
        className="mt-12 rounded-xl border border-[#e3e3e3] bg-white p-4 text-xs leading-relaxed text-[#5f757f] sm:p-5"
      >
        <p className="mb-2 font-semibold uppercase tracking-[0.12em] text-[#3c535e]">
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
      <figure key={i} className="my-8 sm:my-10">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-[#e3e3e3] bg-[#ededed]">
          <Image
            src={block.src}
            alt={block.alt}
            fill
            sizes="(max-width: 768px) 100vw, 720px"
            className="object-cover"
          />
        </div>
        {block.caption ? (
          <figcaption className="mt-2.5 text-center text-sm text-[#5f757f]">
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

export default function BlogContent({
  blocks,
  cta,
}: {
  blocks: BlogBlock[];
  cta?: BannerCta;
}) {
  const ctx: RenderCtx = {
    seenFirstH2: false,
    linkify: createLinkifyCounters(),
    h2Ids: extractTopLevelHeadings(blocks).map((h) => h.id),
    h2Index: 0,
  };
  const n = blocks.length;
  const mid = findMidBannerInsertIndex(blocks);

  const nodes: ReactNode[] = [];
  let endBannerPlaced = false;

  for (let i = 0; i < n; i++) {
    if (mid !== -1 && i === mid) {
      nodes.push(<BlogComparisonBanner key={`compare-mid-${i}`} cta={cta} />);
    }
    if (blocks[i].type === "disclaimer" && !endBannerPlaced) {
      nodes.push(<BlogComparisonBanner key="compare-end" variant="end" cta={cta} />);
      endBannerPlaced = true;
    }
    const el = renderBlock(blocks[i], i, ctx);
    if (el !== null) nodes.push(el);
  }

  if (n > 0 && !endBannerPlaced) {
    nodes.push(<BlogComparisonBanner key="compare-end" variant="end" cta={cta} />);
  }

  return <div className="mx-auto max-w-[45rem]">{nodes}</div>;
}
