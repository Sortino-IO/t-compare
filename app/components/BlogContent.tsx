import Image from "next/image";
import Link from "next/link";
import type { BlogBlock, ParagraphSegment } from "../lib/blog";

function RichParagraph({ segments }: { segments: ParagraphSegment[] }) {
  return (
    <p className="mb-6 text-base leading-relaxed text-[#44403c] sm:text-lg last:mb-0">
      {segments.map((seg, j) =>
        seg.type === "text" ? (
          <span key={j}>{seg.text}</span>
        ) : (
          <Link
            key={j}
            href={seg.href}
            className="font-medium text-[#2a6e47] underline decoration-[#2a6e47]/30 underline-offset-2 transition-colors hover:text-[#1c1917] hover:decoration-[#1c1917]/40"
          >
            {seg.label}
          </Link>
        )
      )}
    </p>
  );
}

export default function BlogContent({ blocks }: { blocks: BlogBlock[] }) {
  let seenFirstH2 = false;

  return (
    <div className="mx-auto max-w-3xl">
      {blocks.map((block, i) => {
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
          const isFirstH2 = !seenFirstH2;
          seenFirstH2 = true;
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
      })}
    </div>
  );
}
