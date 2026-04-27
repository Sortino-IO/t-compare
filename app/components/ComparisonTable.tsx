import Link from "next/link";

export type ComparisonRow = {
  label: string;
  left: React.ReactNode;
  right: React.ReactNode;
};

function Cell({ children }: { children: React.ReactNode }) {
  return <div className="text-sm text-[#1c1917] leading-relaxed">{children}</div>;
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
      <div className="grid grid-cols-1 sm:grid-cols-[220px_1fr_1fr]">
        <div className="hidden sm:block border-b border-[#e3dfd6] bg-[#fbfaf7]" />
        <div className="border-b border-[#e3dfd6] bg-[#fbfaf7] p-4">
          {leftHref ? (
            <Link href={leftHref} className="font-semibold text-[#1c1917] hover:underline">
              {leftName}
            </Link>
          ) : (
            <div className="font-semibold text-[#1c1917]">{leftName}</div>
          )}
        </div>
        <div className="border-b border-[#e3dfd6] bg-[#fbfaf7] p-4">
          {rightHref ? (
            <Link href={rightHref} className="font-semibold text-[#1c1917] hover:underline">
              {rightName}
            </Link>
          ) : (
            <div className="font-semibold text-[#1c1917]">{rightName}</div>
          )}
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

