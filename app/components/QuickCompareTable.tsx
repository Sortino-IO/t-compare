import Link from "next/link";
import { BRAND_CATEGORY_CONFIG, getBrandDetailPath, type Brand } from "../lib/brands";
import { brandMonogram, merchantCtaLabel, reviewCtaLabel } from "../lib/brand-display";
import { withTtimeAffiliateParams } from "../lib/affiliate-links";
import {
  commitment,
  factToneClass,
  labsTone,
  prescriberTone,
} from "../lib/provider-facts";
import ExternalCta from "./ui/ExternalCta";

type Props = {
  brands: Brand[];
  /** Slug of the lowest-priced entry, flagged as a saving. */
  lowestSlug?: string;
  caption: string;
};

type Column = {
  label: string;
  render: (brand: Brand) => React.ReactNode;
};

const NOT_VERIFIED = <span className="tc-fact tc-fact-muted">Not yet verified</span>;

const PROVIDER_COLUMNS: Column[] = [
  {
    label: "How you pay",
    render: (b) => {
      if (!b.facts) return NOT_VERIFIED;
      const c = commitment(b.facts);
      return (
        <span className="flex flex-col gap-1">
          <span className="text-sm text-[#3c535e]">{b.facts.billing.short}</span>
          <span className={factToneClass(c.tone)}>{c.text}</span>
        </span>
      );
    },
  },
  {
    label: "Labs",
    render: (b) =>
      b.facts ? (
        <span className={factToneClass(labsTone(b.facts))}>{b.facts.labs.short}</span>
      ) : (
        NOT_VERIFIED
      ),
  },
  {
    label: "Prescriber",
    render: (b) =>
      b.facts ? (
        <span className={factToneClass(prescriberTone(b.facts))}>{b.facts.prescriber.short}</span>
      ) : (
        NOT_VERIFIED
      ),
  },
];

function supplementColumns(brands: Brand[]): Column[] {
  const config = BRAND_CATEGORY_CONFIG[brands[0]!.category];
  return [
    {
      label: config.whyLabels.onboarding,
      render: (b) => <span className="block text-sm text-[#1a6249]">{b.why.onboarding}</span>,
    },
    {
      label: config.whyLabels.pricing,
      render: (b) => <span className="block text-sm text-[#3c535e]">{b.why.pricing}</span>,
    },
    {
      label: "Approach",
      render: (b) => <span className="block text-sm text-[#3c535e]">{b.shortDescription}</span>,
    },
  ];
}

/**
 * Compact scan-first comparison of every listed brand, shown above the full
 * cards. Provider rows use verified decision facts; a provider that has not
 * been verified says so instead of showing filler.
 *
 * On narrow screens the table collapses into stacked rows rather than hiding
 * columns, so no comparison value is lost on mobile.
 */
export default function QuickCompareTable({ brands, lowestSlug, caption }: Props) {
  if (brands.length === 0) return null;

  const isSupplement = brands[0]!.category === "supplement";
  const dataColumns = isSupplement ? supplementColumns(brands) : PROVIDER_COLUMNS;
  const headers = [
    isSupplement ? "Supplement" : "Provider",
    "Starting price",
    ...dataColumns.map((c) => c.label),
    "Actions",
  ];

  return (
    <div className="tc-card overflow-hidden">
      <table className="w-full border-collapse text-left">
        <caption className="border-b border-[#e3e3e3] bg-white px-4 py-3 text-left text-[13px] leading-relaxed text-[#53666e] sm:px-5">
          {caption}
        </caption>

        <thead className="hidden md:table-header-group">
          <tr className="border-b border-[#e3e3e3] bg-white">
            {headers.map((c) => (
              <th
                key={c}
                scope="col"
                className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#3c535e]"
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-[#ededed]">
          {brands.map((brand) => {
            const detailPath = getBrandDetailPath(brand);
            const isLowest = brand.slug === lowestSlug;
            return (
              <tr
                key={brand.slug}
                className="block border-b border-[#e3e3e3] p-4 last:border-b-0 md:table-row md:border-b-0 md:p-0 md:align-top md:hover:bg-[#f7f7f7]"
              >
                <th
                  scope="row"
                  className="block text-left font-normal md:table-cell md:px-4 md:py-3.5"
                >
                  <span className="flex items-center gap-2.5">
                    <span
                      aria-hidden
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[#e3e3e3] bg-white text-[11px] font-bold text-[#176b87]"
                    >
                      {brandMonogram(brand.name)}
                    </span>
                    <Link
                      href={detailPath}
                      className="text-sm font-semibold text-[#142b3a] hover:text-[#176b87] hover:underline"
                    >
                      {brand.name}
                    </Link>
                  </span>
                </th>

                <td className="mt-3 block md:table-cell md:px-4 md:py-3.5">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#5f757f] md:hidden">
                    Starting price
                  </span>
                  <span className="block text-sm font-semibold text-[#142b3a]">
                    {brand.priceLabel}
                  </span>
                  {isLowest ? (
                    <span className="tc-tag tc-tag-positive mt-1.5 uppercase">
                      Lowest listed price
                    </span>
                  ) : null}
                </td>

                {dataColumns.map((col) => (
                  <td key={col.label} className="mt-3 block md:table-cell md:px-4 md:py-3.5">
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#5f757f] md:hidden">
                      {col.label}
                    </span>
                    {col.render(brand)}
                  </td>
                ))}

                <td className="mt-3.5 block md:table-cell md:w-px md:px-4 md:py-3.5">
                  <span className="flex flex-col gap-2 [&_a]:whitespace-nowrap">
                    <ExternalCta
                      href={withTtimeAffiliateParams(brand.affiliateUrl)}
                      brand={brand.name}
                      position="comparison"
                      label={merchantCtaLabel(brand)}
                      size="sm"
                    />
                    <Link
                      href={detailPath}
                      className="tc-btn tc-btn-secondary tc-btn-sm whitespace-nowrap"
                    >
                      {reviewCtaLabel(brand)}
                      <span aria-hidden>→</span>
                    </Link>
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
