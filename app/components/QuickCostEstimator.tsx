"use client";

import Link from "next/link";
import { useState } from "react";
import ExternalCta from "./ui/ExternalCta";
import Select from "./ui/Select";

export type EstimatorRow = {
  slug: string;
  name: string;
  affiliateHref: string;
  ctaLabel: string;
  medication: number;
  membership: number;
  labs: number;
  total: number;
  /** Provider does not publish its lab price, so the default panel price is used. */
  labAssumed: boolean;
  billing: string;
};

const CALCULATOR_PATH = "/tools/enclomiphene-cost-calculator";

function money(n: number): string {
  return `$${Math.round(n).toLocaleString("en-US")}`;
}

export default function QuickCostEstimator({
  rows,
  initialSlug,
  className = "",
}: {
  rows: EstimatorRow[];
  initialSlug?: string;
  className?: string;
}) {
  const ranked = [...rows].sort((a, b) => a.total - b.total);
  const [slug, setSlug] = useState(initialSlug ?? ranked[0]?.slug ?? "");
  const row = ranked.find((r) => r.slug === slug) ?? ranked[0];
  if (!row) return null;
  const cheapest = ranked[0]!;
  const gap = row.total - cheapest.total;

  const lines = [
    { label: "Medication", value: row.medication },
    ...(row.membership > 0 ? [{ label: "Required membership", value: row.membership }] : []),
    { label: row.labAssumed ? "Labs (price not published, estimated)" : "Labs", value: row.labs },
  ];

  return (
    <section
      aria-labelledby="quick-cost-heading"
      className={`tc-card ${className}`}
    >
      <div className="grid lg:grid-cols-[1fr_1.1fr]">
        <div className="p-5 sm:p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#176b87]">
            Cost calculator
          </p>
          <h2 id="quick-cost-heading" className="tc-display mt-1 text-xl font-semibold text-[#142b3a]">
            What will a year actually cost?
          </h2>
          <p className="mt-1 text-sm text-[#53666e]">
            Medication, any required membership, and lab tests for 12 months.
          </p>

          <label htmlFor="quick-cost-provider" className="mt-4 block text-sm font-semibold text-[#142b3a]">
            Provider
          </label>
          <Select
            id="quick-cost-provider"
            className="mt-1.5"
            value={row.slug}
            onChange={setSlug}
            options={ranked.map((r) => ({
              value: r.slug,
              label: r.name,
              meta: `${money(r.total)}/yr`,
            }))}
          />

          <p className="mt-3 text-[13px] text-[#53666e]">{row.billing}</p>
        </div>

        <div className="border-t border-[#e3e3e3] p-5 sm:p-6 lg:border-l lg:border-t-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#3c535e]">
            {row.name} · 12 months
          </p>
          <p className="mt-1 text-4xl font-bold tabular-nums leading-none text-[#142b3a]">
            {money(row.total)}
          </p>
          <p className="mt-1.5 text-[13px] text-[#53666e]">
            {gap === 0
              ? "Lowest 12-month total of the providers listed."
              : `${money(gap)} more than ${cheapest.name}, the lowest listed.`}
          </p>

          <dl className="mt-4 space-y-1.5 text-sm">
            {lines.map((l) => (
              <div key={l.label} className="flex justify-between gap-4">
                <dt className="text-[#53666e]">{l.label}</dt>
                <dd className="font-semibold tabular-nums text-[#142b3a]">{money(l.value)}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            <ExternalCta
              href={row.affiliateHref}
              brand={row.name}
              position="calculator"
              label={row.ctaLabel}
              size="sm"
              fullWidth
            />
            <Link
              href={`${CALCULATOR_PATH}?provider=${row.slug}&horizon=12`}
              className="tc-btn tc-btn-secondary w-full text-sm"
            >
              Adjust in full calculator
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
