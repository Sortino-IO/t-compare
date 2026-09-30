type Item = { label: string; value: string };

/** Static lookup — Tailwind cannot see class names built at runtime. */
const COLUMNS: Record<number, string> = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
};

/**
 * Compact facts strip. Only renders values that exist in the dataset — callers
 * omit an item rather than substituting a placeholder, so nothing here is
 * inferred or decorative.
 */
export default function TrustStrip({
  items,
  className = "",
}: {
  items: Item[];
  className?: string;
}) {
  if (items.length === 0) return null;

  return (
    <dl
      className={`grid grid-cols-1 divide-y divide-[#ededed] rounded-xl border border-[#e3e3e3] bg-white sm:divide-x sm:divide-y-0 ${
        COLUMNS[items.length] ?? "sm:grid-cols-3"
      } ${className}`.trim()}
    >
      {items.map((item) => (
        <div key={item.label} className="px-4 py-3">
          <dt className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#5f757f]">
            {item.label}
          </dt>
          <dd className="mt-1 text-sm font-semibold text-[#142b3a]">
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
