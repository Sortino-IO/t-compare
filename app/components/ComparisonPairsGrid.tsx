"use client";

type Pair = { title: string; href: string; description: string };

export default function ComparisonPairsGrid({ pairs }: { pairs: Pair[] }) {
  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {pairs.map((p) => (
        <a
          key={p.href}
          href={p.href}
          onClickCapture={(e) => {
            // Hard-navigation fallback in case something prevents default link handling.
            // If another handler called preventDefault earlier in the capture/bubble chain,
            // we still force navigation.
            if (e.defaultPrevented) {
              window.location.assign(p.href);
            }
          }}
          onClick={(e) => {
            // If click is somehow intercepted/neutralized, force navigation.
            if (e.defaultPrevented) {
              window.location.assign(p.href);
            }
          }}
          className="block rounded-2xl border border-[#e3dfd6] bg-white p-5 hover:border-[#c6c0b4] transition-colors cursor-pointer"
        >
          <div className="text-lg font-semibold text-[#1c1917]">{p.title}</div>
          <div className="mt-1.5 text-sm text-[#78716c] leading-relaxed">{p.description}</div>
          <div className="mt-4 text-sm font-medium text-[#2a6e47]">View comparison →</div>
        </a>
      ))}
    </div>
  );
}

