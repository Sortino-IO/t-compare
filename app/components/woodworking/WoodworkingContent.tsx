import type { ReactNode } from "react";
import Image from "next/image";
import type { WoodworkingBlock } from "../../lib/woodworking";
import WoodworkingCta from "./WoodworkingCta";

function renderBlock(block: WoodworkingBlock, i: number, seenFirstH2: { value: boolean }) {
  if (block.type === "woodworkingCta") {
    return <WoodworkingCta key={i} title={block.title} body={block.body} />;
  }

  if (block.type === "paragraph") {
    return (
      <p key={i} className="mb-6 text-base leading-relaxed text-[#44403c] sm:text-lg last:mb-0">
        {"text" in block ? block.text : null}
      </p>
    );
  }

  if (block.type === "heading") {
    const level = block.level ?? 2;
    if (level === 3) {
      return (
        <h3
          key={i}
          className="mb-3 mt-8 scroll-mt-28 font-[family-name:var(--font-playfair)] text-xl font-semibold text-[#3d2914] sm:text-2xl"
        >
          {block.text}
        </h3>
      );
    }
    const isFirst = !seenFirstH2.value;
    seenFirstH2.value = true;
    return (
      <h2
        key={i}
        className={`font-[family-name:var(--font-playfair)] text-2xl font-semibold text-[#3d2914] sm:text-3xl ${
          isFirst ? "mb-5 mt-0" : "mb-5 mt-12 scroll-mt-28"
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
        className="mb-6 list-disc space-y-2.5 pl-6 text-base leading-relaxed text-[#44403c] marker:text-[#92400e] sm:text-lg"
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
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[#e7dcc8] bg-[#ede5d8] shadow-sm">
          <Image
            src={block.src}
            alt={block.alt}
            fill
            sizes="(max-width: 768px) 100vw, 720px"
            className="object-cover"
          />
        </div>
        {block.caption ? (
          <figcaption className="mt-3 text-center text-sm text-[#78716c]">{block.caption}</figcaption>
        ) : null}
      </figure>
    );
  }

  return null;
}

export default function WoodworkingContent({ blocks }: { blocks: WoodworkingBlock[] }) {
  const seenFirstH2 = { value: false };
  const mid = Math.max(2, Math.floor(blocks.length / 2));
  const nodes: ReactNode[] = [];

  for (let i = 0; i < blocks.length; i++) {
    if (i === mid && blocks[i]?.type !== "woodworkingCta") {
      nodes.push(
        <WoodworkingCta
          key="mid-cta"
          title="Skip the bad plans"
          body="Search 16,000 shop-tested projects with exact cut lists — filter by beginner, outdoor, furniture, and more."
        />,
      );
    }
    nodes.push(renderBlock(blocks[i]!, i, seenFirstH2));
  }

  nodes.push(
    <WoodworkingCta
      key="end-cta"
      title="Ready to start your next build?"
      body="Lock in lifetime access to the full TedsWoodworking library — $67 one-time, 60-day guarantee."
    />,
  );

  return <div className="mx-auto max-w-3xl">{nodes}</div>;
}
