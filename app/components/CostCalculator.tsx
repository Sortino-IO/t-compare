"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export type CalcProvider = {
  slug: string;
  name: string;
  monthly: number;
  priceLabel: string;
  href: string;
  /** Some providers bill every 2 months instead of monthly. */
  billingIntervalMonths?: 1 | 2;
};

type Props = {
  providers: CalcProvider[];
};

const HORIZONS = [3, 6, 12] as const;
type Horizon = (typeof HORIZONS)[number];

function money(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Math.max(0, Math.round(n)));
}

function num(value: string, fallback = 0): number {
  const n = parseFloat(value);
  return Number.isFinite(n) && n >= 0 ? n : fallback;
}

type Scenario = {
  monthly: number;
  billingIntervalMonths: number;
  initialLab: number;
  followupLab: number;
  followupEvery: number;
  shipping: number;
  horizon: number;
};

function computeTotals(s: Scenario) {
  const medication = s.monthly * s.horizon;
  const shipments = Math.ceil(s.horizon / s.billingIntervalMonths);
  const shippingTotal = s.shipping * shipments;
  const followupCount =
    s.followupEvery > 0 ? Math.floor(s.horizon / s.followupEvery) : 0;
  const followupTotal = followupCount * s.followupLab;
  const labsTotal = s.initialLab + followupTotal;
  const total = medication + labsTotal + shippingTotal;
  const effectiveMonthly = s.horizon > 0 ? total / s.horizon : 0;
  return {
    medication,
    shipments,
    shippingTotal,
    followupCount,
    followupTotal,
    initialLab: s.initialLab,
    labsTotal,
    total,
    effectiveMonthly,
  };
}

export default function CostCalculator({ providers }: Props) {
  const [providerSlug, setProviderSlug] = useState<string>(
    providers[0]?.slug ?? "custom"
  );
  const [monthly, setMonthly] = useState<string>(
    String(providers[0]?.monthly ?? 99)
  );
  const [horizon, setHorizon] = useState<Horizon>(12);
  const [initialLab, setInitialLab] = useState<string>("90");
  const [followupLab, setFollowupLab] = useState<string>("60");
  const [followupEvery, setFollowupEvery] = useState<string>("3");
  const [shipping, setShipping] = useState<string>("0");
  const [billing, setBilling] = useState<"1" | "2">("1");

  const selectedProvider = providers.find((p) => p.slug === providerSlug) ?? null;

  function onProviderChange(slug: string) {
    setProviderSlug(slug);
    const p = providers.find((x) => x.slug === slug);
    if (p) {
      setMonthly(String(p.monthly));
      setBilling(String(p.billingIntervalMonths ?? 1) as "1" | "2");
    }
  }

  const scenario: Scenario = useMemo(
    () => ({
      monthly: num(monthly, 0),
      billingIntervalMonths: Number(billing) as 1 | 2,
      initialLab: num(initialLab, 0),
      followupLab: num(followupLab, 0),
      followupEvery: num(followupEvery, 0),
      shipping: num(shipping, 0),
      horizon,
    }),
    [monthly, billing, initialLab, followupLab, followupEvery, shipping, horizon]
  );

  const totals = useMemo(() => computeTotals(scenario), [scenario]);

  // Rank every provider at the current lab/shipping/horizon settings.
  const providerRanking = useMemo(() => {
    return providers
      .map((p) => {
        const t = computeTotals({
          ...scenario,
          monthly: p.monthly,
          billingIntervalMonths: p.billingIntervalMonths ?? 1,
        });
        return { provider: p, total: t.total, effectiveMonthly: t.effectiveMonthly };
      })
      .sort((a, b) => a.total - b.total);
  }, [providers, scenario]);

  const labelCls = "block text-xs font-semibold uppercase tracking-[0.08em] text-[#a8a29e] mb-1.5";
  const inputCls =
    "w-full rounded-lg border border-[#d8d3c8] bg-white px-3 py-2.5 text-sm text-[#1c1917] outline-none transition-colors focus:border-[#2a6e47] focus:ring-2 focus:ring-[#2a6e47]/15";

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
      {/* ── Inputs ── */}
      <div className="rounded-2xl border border-[#e3dfd6] bg-white p-5 shadow-sm sm:p-7">
        <div className="grid gap-5 sm:grid-cols-2">
          {/* Provider */}
          <div className="sm:col-span-2">
            <label className={labelCls} htmlFor="calc-provider">
              Provider (pre-fills monthly price)
            </label>
            <select
              id="calc-provider"
              className={inputCls}
              value={providerSlug}
              onChange={(e) => onProviderChange(e.target.value)}
            >
              {providers.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.name} — {p.priceLabel}
                </option>
              ))}
              <option value="custom">Custom / other provider</option>
            </select>
          </div>

          {/* Monthly medication */}
          <div>
            <label className={labelCls} htmlFor="calc-monthly">
              Monthly medication ($)
            </label>
            <input
              id="calc-monthly"
              className={inputCls}
              inputMode="decimal"
              type="number"
              min="0"
              value={monthly}
              onChange={(e) => {
                setMonthly(e.target.value);
                setProviderSlug("custom");
              }}
            />
          </div>

          {/* Billing cadence */}
          <div>
            <label className={labelCls} htmlFor="calc-billing">
              Billing cadence
            </label>
            <select
              id="calc-billing"
              className={inputCls}
              value={billing}
              onChange={(e) => setBilling(e.target.value as "1" | "2")}
            >
              <option value="1">Monthly</option>
              <option value="2">Every 2 months</option>
            </select>
          </div>

          {/* Initial lab */}
          <div>
            <label className={labelCls} htmlFor="calc-initial-lab">
              Initial lab / bloodwork ($)
            </label>
            <input
              id="calc-initial-lab"
              className={inputCls}
              inputMode="decimal"
              type="number"
              min="0"
              value={initialLab}
              onChange={(e) => setInitialLab(e.target.value)}
            />
          </div>

          {/* Shipping */}
          <div>
            <label className={labelCls} htmlFor="calc-shipping">
              Shipping per order ($)
            </label>
            <input
              id="calc-shipping"
              className={inputCls}
              inputMode="decimal"
              type="number"
              min="0"
              value={shipping}
              onChange={(e) => setShipping(e.target.value)}
            />
          </div>

          {/* Follow-up lab */}
          <div>
            <label className={labelCls} htmlFor="calc-followup-lab">
              Follow-up lab cost ($)
            </label>
            <input
              id="calc-followup-lab"
              className={inputCls}
              inputMode="decimal"
              type="number"
              min="0"
              value={followupLab}
              onChange={(e) => setFollowupLab(e.target.value)}
            />
          </div>

          {/* Follow-up frequency */}
          <div>
            <label className={labelCls} htmlFor="calc-followup-every">
              Follow-up labs every (months)
            </label>
            <input
              id="calc-followup-every"
              className={inputCls}
              inputMode="numeric"
              type="number"
              min="0"
              value={followupEvery}
              onChange={(e) => setFollowupEvery(e.target.value)}
            />
          </div>
        </div>

        {/* Horizon toggle */}
        <div className="mt-6">
          <span className={labelCls}>Time horizon</span>
          <div className="inline-flex rounded-lg border border-[#d8d3c8] bg-[#f5f3ee] p-1">
            {HORIZONS.map((h) => (
              <button
                key={h}
                type="button"
                onClick={() => setHorizon(h)}
                className={`rounded-md px-4 py-1.5 text-sm font-semibold transition-colors ${
                  horizon === h
                    ? "bg-[#2a6e47] text-white shadow-sm"
                    : "text-[#78716c] hover:text-[#1c1917]"
                }`}
              >
                {h} months
              </button>
            ))}
          </div>
        </div>

        <p className="mt-5 text-xs leading-relaxed text-[#b5b0a8]">
          Estimates only. Actual pricing varies by provider, dose, promotions, state,
          and lab vendor. Always confirm on the provider&apos;s official checkout.
        </p>
      </div>

      {/* ── Result ── */}
      <div className="rounded-2xl border border-[#c6e0d0] bg-[#f3f8f4] p-6 shadow-sm lg:sticky lg:top-24">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2a6e47]">
          Estimated {horizon}-month total
        </p>
        <p className="mt-1 font-[family-name:var(--font-playfair)] text-4xl font-bold tabular-nums text-[#1c1917]">
          {money(totals.total)}
        </p>
        <p className="mt-1 text-sm text-[#57534e]">
          ≈ <span className="font-semibold text-[#2a6e47]">{money(totals.effectiveMonthly)}/mo</span>{" "}
          effective{selectedProvider ? ` · ${selectedProvider.name}` : ""}
        </p>

        <dl className="mt-5 space-y-2 border-t border-[#c6e0d0] pt-4 text-sm">
          <div className="flex items-center justify-between gap-3">
            <dt className="text-[#78716c]">Medication ({horizon} mo)</dt>
            <dd className="font-medium tabular-nums text-[#1c1917]">{money(totals.medication)}</dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="text-[#78716c]">
              Labs (initial + {totals.followupCount} follow-up{totals.followupCount === 1 ? "" : "s"})
            </dt>
            <dd className="font-medium tabular-nums text-[#1c1917]">{money(totals.labsTotal)}</dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="text-[#78716c]">Shipping ({totals.shipments} orders)</dt>
            <dd className="font-medium tabular-nums text-[#1c1917]">{money(totals.shippingTotal)}</dd>
          </div>
        </dl>

        {selectedProvider ? (
          <Link
            href={selectedProvider.href}
            className="mt-5 flex w-full items-center justify-center rounded-xl bg-[#2a6e47] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#22593a]"
          >
            See {selectedProvider.name} details →
          </Link>
        ) : null}
      </div>

      {/* ── Provider ranking at current settings ── */}
      <div className="lg:col-span-2">
        <h2 className="font-[family-name:var(--font-playfair)] text-xl font-semibold text-[#1c1917]">
          All providers at these settings ({horizon} months)
        </h2>
        <p className="mt-1 text-sm text-[#78716c]">
          Same labs, shipping, and horizon applied to each provider&apos;s published monthly anchor —
          ranked by estimated total cost.
        </p>
        <div className="mt-4 overflow-hidden rounded-2xl border border-[#e3dfd6] bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#e3dfd6] bg-[#faf9f6] text-left text-xs uppercase tracking-wide text-[#a8a29e]">
                <th className="px-4 py-3 font-semibold">Provider</th>
                <th className="px-4 py-3 text-right font-semibold">Effective/mo</th>
                <th className="px-4 py-3 text-right font-semibold">{horizon}-mo total</th>
              </tr>
            </thead>
            <tbody>
              {providerRanking.map(({ provider, total, effectiveMonthly }, i) => (
                <tr
                  key={provider.slug}
                  className="border-b border-[#f0ece4] last:border-0 transition-colors hover:bg-[#faf9f6]"
                >
                  <td className="px-4 py-3">
                    <Link
                      href={provider.href}
                      className="font-medium text-[#1c1917] hover:text-[#2a6e47]"
                    >
                      {provider.name}
                    </Link>
                    {i === 0 ? (
                      <span className="ml-2 inline-flex items-center rounded-full bg-[#d4eddf] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#2a6e47]">
                        Lowest est.
                      </span>
                    ) : null}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-[#57534e]">
                    {money(effectiveMonthly)}
                  </td>
                  <td className="px-4 py-3 text-right font-semibold tabular-nums text-[#1c1917]">
                    {money(total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
