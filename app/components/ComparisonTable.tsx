import Link from "next/link";

export type ComparisonRow = {
  label: string;
  left: React.ReactNode;
  right: React.ReactNode;
};

function Cell({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-sm leading-relaxed text-[#3c535e]">{children}</div>
  );
}

function ProviderName({ name, href }: { name: string; href?: string }) {
  if (!href) {
    return <div className="text-sm font-bold text-[#142b3a]">{name}</div>;
  }
  return (
    <Link
      href={href}
      className="text-sm font-bold text-[#142b3a] hover:text-[#176b87] hover:underline"
    >
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
    <div className="tc-card mt-4 overflow-hidden">
      {/* Mobile layout: each attribute is one card with both values stacked */}
      <div className="sm:hidden">
        <div className="grid grid-cols-2 gap-3 border-b border-[#e3e3e3] bg-white p-4">
          <ProviderName name={leftName} href={leftHref} />
          <ProviderName name={rightName} href={rightHref} />
        </div>

        {rows.map((row) => (
          <section
            key={row.label}
            className="border-b border-[#ededed] p-4 last:border-b-0"
          >
            <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#3c535e]">
              {row.label}
            </div>
            <div className="mt-2.5 grid grid-cols-1 gap-2.5">
              <div className="rounded-lg border border-[#ededed] bg-white p-3">
                <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#5f757f]">
                  {leftName}
                </div>
                <div className="mt-1.5">
                  <Cell>{row.left}</Cell>
                </div>
              </div>
              <div className="rounded-lg border border-[#ededed] bg-white p-3">
                <div className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#5f757f]">
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
      <div className="hidden sm:grid grid-cols-[minmax(150px,200px)_1fr_1fr]">
        <div className="border-b border-[#e3e3e3] bg-white" />
        <div className="border-b border-[#e3e3e3] bg-white p-4">
          <ProviderName name={leftName} href={leftHref} />
        </div>
        <div className="border-b border-[#e3e3e3] bg-white p-4">
          <ProviderName name={rightName} href={rightHref} />
        </div>

        {rows.map((row) => (
          <div key={row.label} className="contents">
            <div className="border-b border-[#ededed] bg-white p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#3c535e]">
                {row.label}
              </div>
            </div>
            <div className="border-b border-[#ededed] p-4">
              <Cell>{row.left}</Cell>
            </div>
            <div className="border-b border-l border-[#ededed] p-4">
              <Cell>{row.right}</Cell>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
