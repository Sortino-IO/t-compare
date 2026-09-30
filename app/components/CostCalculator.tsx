"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { DEFAULT_FOLLOWUP_EVERY_MONTHS, DEFAULT_LAB_COST } from "../lib/provider-facts";
import ExternalCta from "./ui/ExternalCta";
import ExternalTextLink from "./ui/ExternalTextLink";
import Select from "./ui/Select";

export type CalcProvider = {
  slug: string;
  name: string;
  /** Advertised medication/program price per month. */
  monthly: number;
  priceLabel: string;
  /** Internal review page. */
  href: string;
  /** Outbound merchant URL, affiliate parameters already applied. */
  affiliateHref: string;
  /** Months each charge covers (TTime bills every 3, Hims prepays 10). */
  billingIntervalMonths?: number;
  /** Mandatory membership billed on top of medication. */
  membershipMonthly?: number;
  /** Provider's own cheapest initial lab price, when published. */
  initialLab?: number;
  /** Repeat monitoring labs are covered by the plan. */
  followupIncluded?: boolean;
  /** Facts above were checked against the provider's own pages. */
  verified: boolean;
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
  membershipMonthly: number;
  billingIntervalMonths: number;
  initialLab: number;
  followupLab: number;
  followupEvery: number;
  followupIncluded: boolean;
  shipping: number;
  horizon: number;
};

function computeTotals(s: Scenario) {
  const medication = s.monthly * s.horizon;
  const membership = s.membershipMonthly * s.horizon;
  const shipments = Math.ceil(s.horizon / Math.max(1, s.billingIntervalMonths));
  const shippingTotal = s.shipping * shipments;
  const followupCount =
    !s.followupIncluded && s.followupEvery > 0 ? Math.floor(s.horizon / s.followupEvery) : 0;
  const followupTotal = followupCount * s.followupLab;
  const labsTotal = s.initialLab + followupTotal;
  const total = medication + membership + labsTotal + shippingTotal;
  return {
    medication,
    membership,
    shipments,
    shippingTotal,
    followupCount,
    labsTotal,
    total,
    effectiveMonthly: s.horizon > 0 ? total / s.horizon : 0,
  };
}

function readUrlState(): { provider?: string; horizon?: Horizon } {
  const params = new URLSearchParams(window.location.search);
  const h = Number(params.get("horizon"));
  return {
    provider: params.get("provider") ?? undefined,
    horizon: (HORIZONS as readonly number[]).includes(h) ? (h as Horizon) : undefined,
  };
}

export default function CostCalculator({ providers }: Props) {
  const first = providers[0];
  const [providerSlug, setProviderSlug] = useState<string>(first?.slug ?? "custom");
  const [monthly, setMonthly] = useState<string>(String(first?.monthly ?? 99));
  const [membership, setMembership] = useState<string>(String(first?.membershipMonthly ?? 0));
  const [billing, setBilling] = useState<string>(String(first?.billingIntervalMonths ?? 1));
  const [horizon, setHorizon] = useState<Horizon>(12);
  const [initialLab, setInitialLab] = useState<string>(
    String(first?.initialLab ?? DEFAULT_LAB_COST),
  );
  const [followupLab, setFollowupLab] = useState<string>(String(DEFAULT_LAB_COST));
  const [followupEvery, setFollowupEvery] = useState<string>(
    String(DEFAULT_FOLLOWUP_EVERY_MONTHS),
  );
  const [followupIncluded, setFollowupIncluded] = useState<boolean>(
    Boolean(first?.followupIncluded),
  );
  const [shipping, setShipping] = useState<string>("0");

  const selectedProvider = providers.find((p) => p.slug === providerSlug) ?? null;

  function applyProvider(slug: string) {
    setProviderSlug(slug);
    const p = providers.find((x) => x.slug === slug);
    if (!p) return;
    setMonthly(String(p.monthly));
    setMembership(String(p.membershipMonthly ?? 0));
    setBilling(String(p.billingIntervalMonths ?? 1));
    setInitialLab(String(p.initialLab ?? DEFAULT_LAB_COST));
    setFollowupIncluded(Boolean(p.followupIncluded));
  }

  // Deep links like ?provider=ttime&horizon=12 let provider pages open the
  // calculator pre-filled. Read once after mount so SSR output stays stable.
  useEffect(() => {
    const { provider, horizon: h } = readUrlState();
    if (provider && providers.some((p) => p.slug === provider)) applyProvider(provider);
    if (h) setHorizon(h);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (providerSlug === "custom") params.delete("provider");
    else params.set("provider", providerSlug);
    params.set("horizon", String(horizon));
    window.history.replaceState(null, "", `${window.location.pathname}?${params.toString()}`);
  }, [providerSlug, horizon]);

  const scenario: Scenario = useMemo(
    () => ({
      monthly: num(monthly),
      membershipMonthly: num(membership),
      billingIntervalMonths: Math.max(1, num(billing, 1)),
      initialLab: num(initialLab),
      followupLab: num(followupLab),
      followupEvery: num(followupEvery),
      followupIncluded,
      shipping: num(shipping),
      horizon,
    }),
    [monthly, membership, billing, initialLab, followupLab, followupEvery, followupIncluded, shipping, horizon],
  );

  const totals = useMemo(() => computeTotals(scenario), [scenario]);

  // Every provider is priced from its own published facts; your inputs fill
  // only the gaps a provider leaves unpublished.
  const providerRanking = useMemo(() => {
    return providers
      .map((p) => {
        const t = computeTotals({
          ...scenario,
          monthly: p.monthly,
          membershipMonthly: p.membershipMonthly ?? 0,
          billingIntervalMonths: p.billingIntervalMonths ?? 1,
          initialLab: p.initialLab ?? DEFAULT_LAB_COST,
          followupIncluded: Boolean(p.followupIncluded),
        });
        return { provider: p, total: t.total, effectiveMonthly: t.effectiveMonthly };
      })
      .sort((a, b) => a.total - b.total);
  }, [providers, scenario]);

  const labelCls = "block text-xs font-semibold uppercase tracking-[0.08em] text-[#5f757f] mb-1.5";
  const inputCls =
    // Darker than the page hairlines so the field boundary clears WCAG 1.4.11 (3:1).
    "w-full rounded-lg border border-[#949494] bg-white px-3 py-2.5 text-sm text-[#142b3a] outline-none transition-colors focus:border-[#176b87] focus:ring-2 focus:ring-[#176b87]/15";
  const hintCls = "mt-1 text-[11px] leading-snug text-[#5f757f]";

  const onCustomEdit = <T,>(setter: (v: T) => void) => (v: T) => {
    setter(v);
    setProviderSlug("custom");
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
      {/* ── Inputs ── */}
      <div className="rounded-xl border border-[#e3e3e3] bg-white p-5 sm:p-7">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={labelCls} htmlFor="calc-provider">
              Provider (fills in its published prices)
            </label>
            <Select
              id="calc-provider"
              value={providerSlug}
              onChange={applyProvider}
              options={[
                ...providers.map((p) => ({ value: p.slug, label: p.name, meta: p.priceLabel })),
                { value: "custom", label: "Custom / other provider" },
              ]}
            />
          </div>

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
              onChange={(e) => onCustomEdit(setMonthly)(e.target.value)}
            />
          </div>

          <div>
            <label className={labelCls} htmlFor="calc-membership">
              Required membership ($/mo)
            </label>
            <input
              id="calc-membership"
              className={inputCls}
              inputMode="decimal"
              type="number"
              min="0"
              value={membership}
              onChange={(e) => onCustomEdit(setMembership)(e.target.value)}
            />
            <p className={hintCls}>Some providers bill a membership on top of medication.</p>
          </div>

          <div>
            <label className={labelCls} htmlFor="calc-billing">
              Each charge covers
            </label>
            <Select
              id="calc-billing"
              value={billing}
              onChange={onCustomEdit(setBilling)}
              options={[
                { value: "1", label: "1 month" },
                { value: "2", label: "2 months" },
                { value: "3", label: "3 months" },
                { value: "10", label: "10 months (prepaid)" },
                { value: "12", label: "12 months (prepaid)" },
              ]}
            />
          </div>

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

          <div>
            <label className={labelCls} htmlFor="calc-initial-lab">
              Initial labs ($)
            </label>
            <input
              id="calc-initial-lab"
              className={inputCls}
              inputMode="decimal"
              type="number"
              min="0"
              value={initialLab}
              onChange={(e) => onCustomEdit(setInitialLab)(e.target.value)}
            />
          </div>

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
              disabled={followupIncluded}
              onChange={(e) => setFollowupLab(e.target.value)}
            />
            <p className={hintCls}>
              {followupIncluded
                ? "Included in this provider's plan."
                : "Default is a published $49 Quest testosterone panel."}
            </p>
          </div>

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
              disabled={followupIncluded}
              onChange={(e) => setFollowupEvery(e.target.value)}
            />
          </div>

          <div className="flex items-end">
            <label className="flex cursor-pointer items-center gap-2 text-sm text-[#3c535e]">
              <input
                type="checkbox"
                className="h-4 w-4 accent-[#176b87]"
                checked={followupIncluded}
                onChange={(e) => onCustomEdit(setFollowupIncluded)(e.target.checked)}
              />
              Follow-up labs included in plan
            </label>
          </div>
        </div>

        <div className="mt-6">
          <span className={labelCls}>Time horizon</span>
          <div className="inline-flex rounded-lg border border-[#e3e3e3] bg-white p-1">
            {HORIZONS.map((h) => (
              <button
                key={h}
                type="button"
                onClick={() => setHorizon(h)}
                aria-pressed={horizon === h}
                className={`rounded-md px-4 py-1.5 text-sm font-semibold transition-colors ${
                  horizon === h ? "bg-[#176b87] text-white" : "text-[#53666e] hover:text-[#142b3a]"
                }`}
              >
                {h} months
              </button>
            ))}
          </div>
        </div>

        <p className="mt-5 text-xs leading-relaxed text-[#5f757f]">
          Estimates from each provider&apos;s published prices, checked September 2026. Dose,
          promotions and state can change what you pay — confirm on the provider&apos;s checkout.
        </p>
      </div>

      {/* ── Result ── */}
      <div className="rounded-xl border border-[#bcd9e4] bg-[#eef6f9] p-6 lg:sticky lg:top-24">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#176b87]">
          Estimated {horizon}-month total
        </p>
        <p className="mt-1 tc-display text-4xl font-bold tabular-nums text-[#142b3a]">
          {money(totals.total)}
        </p>
        <p className="mt-1 text-sm text-[#53666e]">
          ≈ <span className="font-semibold text-[#176b87]">{money(totals.effectiveMonthly)}/mo</span>{" "}
          effective{selectedProvider ? ` · ${selectedProvider.name}` : ""}
        </p>

        <dl className="mt-5 space-y-2 border-t border-[#bcd9e4] pt-4 text-sm">
          <div className="flex items-center justify-between gap-3">
            <dt className="text-[#53666e]">Medication ({horizon} mo)</dt>
            <dd className="font-medium tabular-nums text-[#142b3a]">{money(totals.medication)}</dd>
          </div>
          {totals.membership > 0 ? (
            <div className="flex items-center justify-between gap-3">
              <dt className="text-[#53666e]">Membership ({horizon} mo)</dt>
              <dd className="font-medium tabular-nums text-[#142b3a]">{money(totals.membership)}</dd>
            </div>
          ) : null}
          <div className="flex items-center justify-between gap-3">
            <dt className="text-[#53666e]">
              Labs (initial
              {followupIncluded
                ? "; follow-ups included"
                : ` + ${totals.followupCount} follow-up${totals.followupCount === 1 ? "" : "s"}`}
              )
            </dt>
            <dd className="font-medium tabular-nums text-[#142b3a]">{money(totals.labsTotal)}</dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="text-[#53666e]">Shipping ({totals.shipments} orders)</dt>
            <dd className="font-medium tabular-nums text-[#142b3a]">{money(totals.shippingTotal)}</dd>
          </div>
        </dl>

        {selectedProvider ? (
          <div className="mt-5 flex flex-col gap-2">
            <ExternalCta
              href={selectedProvider.affiliateHref}
              brand={selectedProvider.name}
              position="pricing"
              label={`Check ${selectedProvider.name} pricing`}
              fullWidth
            />
            <Link href={selectedProvider.href} className="tc-btn tc-btn-secondary w-full">
              Read our {selectedProvider.name} review <span aria-hidden>→</span>
            </Link>
          </div>
        ) : null}
      </div>

      {/* ── Provider ranking at current settings ── */}
      <div className="lg:col-span-2">
        <h2 className="tc-display text-xl font-semibold text-[#142b3a]">
          All providers at these settings ({horizon} months)
        </h2>
        <p className="mt-1 text-sm text-[#53666e]">
          Each provider is priced from its own published medication, membership and lab costs. Your
          inputs only fill in what a provider does not publish.
        </p>
        <div className="mt-4 overflow-hidden rounded-xl border border-[#e3e3e3] bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#e3e3e3] bg-white text-left text-xs uppercase tracking-wide text-[#5f757f]">
                <th className="px-4 py-3 font-semibold">Provider</th>
                <th className="px-4 py-3 text-right font-semibold">Effective/mo</th>
                <th className="px-4 py-3 text-right font-semibold">{horizon}-mo total</th>
                <th className="hidden px-4 py-3 text-right font-semibold sm:table-cell">
                  <span className="sr-only">Visit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {providerRanking.map(({ provider, total, effectiveMonthly }, i) => (
                <tr
                  key={provider.slug}
                  className="border-b border-[#ededed] last:border-0 transition-colors hover:bg-[#f7f7f7]"
                >
                  <td className="px-4 py-3">
                    <Link
                      href={provider.href}
                      className="font-medium text-[#142b3a] hover:text-[#176b87]"
                    >
                      {provider.name}
                    </Link>
                    {i === 0 ? (
                      <span className="ml-2 inline-flex items-center rounded-full bg-[#e2eff5] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#176b87]">
                        Lowest est.
                      </span>
                    ) : null}
                    {!provider.verified ? (
                      <span className="mt-0.5 block text-[11px] italic text-[#5f6b70]">
                        Labs not verified — uses your inputs
                      </span>
                    ) : null}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums text-[#53666e]">
                    {money(effectiveMonthly)}
                  </td>
                  <td className="px-4 py-3 text-right font-semibold tabular-nums text-[#142b3a]">
                    {money(total)}
                  </td>
                  <td className="hidden px-4 py-3 text-right sm:table-cell">
                    <ExternalTextLink
                      href={provider.affiliateHref}
                      className="whitespace-nowrap text-[13px] font-semibold text-[#176b87] hover:underline"
                      track={{ brand: provider.name, position: "comparison", label: "Visit site" }}
                    >
                      Visit site ↗
                    </ExternalTextLink>
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
