import Link from "next/link";

export type ComparisonRow = {
  label: string;
  left: React.ReactNode;
  right: React.ReactNode;
};

function Cell({ children }: { children: React.ReactNode }) {
  return <div className="text-sm text-[#1c1917] leading-relaxed">{children}</div>;
}

function ProviderName({
  name,
  href,
}: {
  name: string;
  href?: string;
}) {
  if (!href) return <div className="font-semibold text-[#1c1917]">{name}</div>;
  return (
    <Link href={href} className="font-semibold text-[#1c1917] hover:underline">
      {name}
    </Link>
  );
}

export default function ComparisonTable(props: {
  leftName: string;
  leftHref?: string;
  rightName: string;
  rightHref?: string;
  rows: ComparisonRow[];
}) {
  const { leftName, leftHref, rightName, rightHref, rows } = props;

  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-[#e3dfd6] bg-white">
      {/* Mobile layout: each row is a compact card with provider labels */}
      <div className="sm:hidden">
        <div className="border-b border-[#e3dfd6] bg-[#fbfaf7] p-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <ProviderName name={leftName} href={leftHref} />
            </div>
            <div>
              <ProviderName name={rightName} href={rightHref} />
            </div>
          </div>
        </div>

        {rows.map((row) => (
          <section key={row.label} className="border-b border-[#ede9e0] p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-[#78716c]">
              {row.label}
            </div>
            <div className="mt-3 grid grid-cols-1 gap-3">
              <div className="rounded-xl border border-[#ede9e0] bg-white p-3">
                <div className="text-[11px] font-semibold text-[#78716c] uppercase tracking-wide">
                  {leftName}
                </div>
                <div className="mt-1.5">
                  <Cell>{row.left}</Cell>
                </div>
              </div>
              <div className="rounded-xl border border-[#ede9e0] bg-white p-3">
                <div className="text-[11px] font-semibold text-[#78716c] uppercase tracking-wide">
                  {rightName}
                </div>
                <div className="mt-1.5">
                  <Cell>{row.right}</Cell>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Desktop/tablet layout */}
      <div className="hidden sm:grid grid-cols-[220px_1fr_1fr]">
        <div className="border-b border-[#e3dfd6] bg-[#fbfaf7]" />
        <div className="border-b border-[#e3dfd6] bg-[#fbfaf7] p-4">
          <ProviderName name={leftName} href={leftHref} />
        </div>
        <div className="border-b border-[#e3dfd6] bg-[#fbfaf7] p-4">
          <ProviderName name={rightName} href={rightHref} />
        </div>

        {rows.map((row) => (
          <div key={row.label} className="contents">
            <div className="border-b border-[#ede9e0] bg-[#fbfaf7] p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-[#78716c]">
                {row.label}
              </div>
            </div>
            <div className="border-b border-[#ede9e0] p-4">
              <Cell>{row.left}</Cell>
            </div>
            <div className="border-b border-[#ede9e0] p-4">
              <Cell>{row.right}</Cell>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

