import Image from "next/image";
import type { LandingPageConfig, LpPackage } from "../../lib/landing-pages";
import { getLpMedia } from "../../lib/landing-page-media";
import { isTestosteroneSupplementLp } from "../../lib/testosterone-lp";
import LpCtaButton from "./LpCtaButton";
import LpProductBottle from "./LpProductBottle";

const PAYMENT_LABELS = ["Discover", "Amex", "Mastercard", "Visa"];

function savingsCheckLine(pkg: LpPackage): string | null {
  if (pkg.savingsBurst) {
    const burst = pkg.savingsBurst.toUpperCase();
    return burst.startsWith("YOU ") ? pkg.savingsBurst : `YOU ${pkg.savingsBurst}`;
  }
  if (pkg.savings?.toUpperCase().includes("SAVE")) return pkg.savings;
  return null;
}

function FunnelColumn({
  pkg,
  config,
  isCenter,
  highlightHeaderBg,
  officialStyle,
}: {
  pkg: LpPackage;
  config: LandingPageConfig;
  isCenter: boolean;
  highlightHeaderBg: string;
  officialStyle: boolean;
}) {
  const { theme, ctaUrl, brandName, productName } = config;
  const media = getLpMedia(config.slug);
  const useBottlePhoto =
    Boolean(pkg.bottleCount) &&
    isTestosteroneSupplementLp(config.slug) &&
    Boolean(media.heroProductImage) &&
    !pkg.productImage;
  const savingsLine = savingsCheckLine(pkg);
  const perkLines = pkg.perkLines ?? [];
  const showFreeShippingBadge =
    officialStyle &&
    (pkg.shipping.toLowerCase().includes("free") || perkLines.some((l) => l.toUpperCase().includes("FREE SHIPPING")));
  const shippingFooter = pkg.shipping.toLowerCase().includes("free")
    ? "+ FREE US SHIPPING"
    : pkg.shipping.startsWith("+")
      ? pkg.shipping.toUpperCase()
      : `+ ${pkg.shipping.toUpperCase()}`;

  return (
    <div
      className={`flex flex-col rounded-lg overflow-hidden bg-white shadow-lg border border-stone-200 ${
        isCenter ? "md:-mt-3 md:mb-0 ring-2 ring-[#f5b800] md:scale-[1.02] z-10" : ""
      }`}
    >
      <div
        className="px-3 py-2.5 text-center border-b border-stone-100"
        style={{
          backgroundColor: isCenter ? highlightHeaderBg : "#ffffff",
          color: "#0f172a",
        }}
      >
        <p className="text-sm sm:text-base font-black leading-tight">{pkg.title}</p>
        <p className="text-[11px] sm:text-xs font-semibold mt-0.5">
          {pkg.funnelSubheader ?? pkg.subtitle}
        </p>
      </div>

      <div className="relative px-3 pt-3 pb-2 bg-white min-h-[150px] sm:min-h-[180px] flex items-center justify-center">
        {showFreeShippingBadge ? (
          <span className="absolute top-2 left-2 z-10 rounded bg-red-600 text-white text-[8px] sm:text-[9px] font-black px-2 py-1 shadow-md uppercase tracking-wide">
            Free Shipping
          </span>
        ) : null}
        {!officialStyle && pkg.savingsBurst ? (
          <span className="absolute top-2 right-2 z-10 rounded-full bg-red-600 text-white text-[9px] sm:text-[10px] font-black px-2 py-1 shadow-md rotate-6">
            {pkg.savingsBurst}
          </span>
        ) : null}
        {pkg.productImage ? (
          <div className="relative w-full h-36 sm:h-44">
            <Image
              src={pkg.productImage}
              alt={pkg.productImageAlt ?? pkg.title}
              fill
              className="object-contain p-1"
              sizes="280px"
            />
          </div>
        ) : useBottlePhoto ? (
          <div className="relative w-full h-32 sm:h-40">
            <Image
              src={media.heroProductImage!}
              alt={media.heroProductImageAlt ?? productName}
              fill
              className="object-contain p-2 drop-shadow-sm"
              sizes="240px"
            />
            {(pkg.bottleCount ?? 1) > 1 ? (
              <span className="absolute bottom-1 right-2 rounded bg-white/90 px-2 py-0.5 text-[10px] font-black text-stone-800 shadow">
                ×{pkg.bottleCount}
              </span>
            ) : null}
          </div>
        ) : pkg.bottleCount ? (
          <LpProductBottle
            productName={productName}
            brandName={brandName}
            count={pkg.bottleCount}
            size="md"
            labelColor={theme.primary}
            capColor={theme.accent}
          />
        ) : null}
      </div>

      <div className="px-4 pb-5 flex flex-col flex-1 text-center">
        {officialStyle ? (
          <>
            <p className="text-3xl sm:text-[2.35rem] font-black text-stone-900 tabular-nums leading-none">
              {pkg.pricePerBottle}
              <span className="text-sm sm:text-base font-bold text-stone-800 ml-1">Per Bottle</span>
            </p>

            {savingsLine ? (
              <p className="mt-2 rounded bg-stone-100 px-2 py-1.5 text-xs sm:text-sm font-black text-emerald-700 uppercase">
                ✔ {savingsLine}
              </p>
            ) : null}
            {perkLines.map((line) => (
              <p key={line} className="mt-1.5 text-xs sm:text-sm font-black text-stone-900 uppercase">
                ✔ {line}
              </p>
            ))}

            <div className="mt-auto pt-4 space-y-3">
              <LpCtaButton
                ctaUrl={ctaUrl}
                label={pkg.ctaLabel}
                theme={{
                  ...theme,
                  accent: "#f5b800",
                  accentHover: "#e5a800",
                  accentText: "#0f172a",
                }}
                size="md"
                className="w-full !rounded-md !normal-case !tracking-wide !font-black !text-sm !border-[#b8860b]"
                pulse={false}
              />
              <p className="text-[9px] font-bold uppercase text-stone-500">60 Day Money Back Guarantee</p>
              <div className="flex flex-wrap justify-center gap-1 opacity-80">
                {PAYMENT_LABELS.map((pay) => (
                  <span
                    key={pay}
                    className="text-[8px] font-bold border border-stone-300 px-1.5 py-0.5 rounded bg-white text-stone-600"
                  >
                    {pay}
                  </span>
                ))}
              </div>
              <p className="text-xs sm:text-sm font-bold text-stone-900 pt-1">
                TOTAL:{" "}
                {pkg.regularTotal ? (
                  <span className="line-through text-red-600 font-black mr-1">{pkg.regularTotal}</span>
                ) : null}
                <span className="font-black">{pkg.total}</span>
              </p>
              <p
                className={`text-[11px] sm:text-xs font-black uppercase ${
                  pkg.shipping.toLowerCase().includes("free") ? "text-red-600" : "text-stone-700"
                }`}
              >
                {shippingFooter}
              </p>
            </div>
          </>
        ) : (
          <>
            {pkg.regularTotal ? (
              <p className="text-xs sm:text-sm text-stone-600 mb-1">
                Regular Price: <span className="line-through font-bold">{pkg.regularTotal}</span>
              </p>
            ) : null}

            <p className="text-3xl sm:text-4xl font-black text-stone-900 tabular-nums leading-none">
              {pkg.priceDisplay ?? pkg.total}
            </p>
            {pkg.priceSubline ? (
              <p className="text-sm font-bold text-stone-700 mt-1">{pkg.priceSubline}</p>
            ) : (
              <p className="text-xs font-semibold text-stone-600 mt-1">
                {pkg.pricePerBottle}
                {pkg.id === "starter" ? "/month" : ""}
              </p>
            )}

            {pkg.savings && !pkg.savingsBurst ? (
              <p className="text-sm font-bold text-emerald-700 mt-2">{pkg.savings}</p>
            ) : null}

            {perkLines.map((line) => (
              <p
                key={line}
                className="mt-2 text-[10px] sm:text-xs font-bold uppercase tracking-wide text-white py-1.5 px-2 rounded"
                style={{
                  backgroundColor:
                    line.toUpperCase().includes("FREE") && line.toUpperCase().includes("SHIPPING")
                      ? "#0d5c63"
                      : "#c0392b",
                }}
              >
                ✔ {line}
              </p>
            ))}

            {pkg.badge && !perkLines.length ? (
              <p className="mt-2 text-[10px] font-bold uppercase" style={{ color: theme.accent }}>
                {pkg.badge}
              </p>
            ) : null}

            <p className="text-[10px] text-stone-500 mt-2 mb-4">{pkg.shipping}</p>

            <div className="mt-auto space-y-3">
              <LpCtaButton
                ctaUrl={ctaUrl}
                label={pkg.ctaLabel}
                theme={{
                  ...theme,
                  accent: "#f5b800",
                  accentHover: "#e5a800",
                  accentText: "#0f172a",
                }}
                size="md"
                className="w-full !rounded-sm !normal-case !tracking-wide !font-black !text-sm !border-[#b8860b]"
                pulse={false}
              />
              <p className="text-[9px] font-bold uppercase text-stone-500">60 Day Money Back Guarantee</p>
              <div className="flex flex-wrap justify-center gap-1 opacity-70">
                {PAYMENT_LABELS.map((pay) => (
                  <span key={pay} className="text-[8px] font-bold border border-stone-300 px-1 py-0.5 rounded bg-white">
                    {pay}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

type Props = {
  config: LandingPageConfig;
};

export default function LpPricingFunnel({ config }: Props) {
  const funnel = config.pricingFunnel;
  const { theme } = config;
  const order = funnel?.columnOrder ?? config.packages.map((p) => p.id);
  const packages = order
    .map((id) => config.packages.find((p) => p.id === id))
    .filter((p): p is LpPackage => Boolean(p));

  const officialStyle = funnel?.sectionStyle === "light";
  const sectionBg = officialStyle
    ? "#f3f4f6"
    : `linear-gradient(180deg, ${theme.primaryDark} 0%, ${theme.primary} 100%)`;
  const highlightHeaderBg = funnel?.highlightHeaderBg ?? "#f5b800";

  return (
    <section className="py-10 sm:py-14 px-4 sm:px-6" style={{ background: sectionBg }}>
      <div className="mx-auto max-w-6xl">
        <h2
          className={`text-2xl sm:text-3xl font-black text-center mb-8 sm:mb-10 ${
            officialStyle ? "text-stone-900" : "text-white"
          }`}
        >
          {funnel?.sectionTitle ?? "Choose Your Package"}
        </h2>
        <div className="grid md:grid-cols-3 gap-4 sm:gap-5 items-end">
          {packages.map((pkg) => (
            <FunnelColumn
              key={pkg.id}
              pkg={pkg}
              config={config}
              isCenter={Boolean(pkg.highlight)}
              highlightHeaderBg={highlightHeaderBg}
              officialStyle={officialStyle}
            />
          ))}
        </div>
        <p
          className={`text-center text-xs mt-6 max-w-2xl mx-auto ${
            officialStyle ? "text-stone-500" : "text-white/70"
          }`}
        >
          {funnel?.footerNote ??
            `Secure checkout · Official ${config.brandName} bundle tiers · 60-day guarantee per vendor terms`}
        </p>
        {funnel?.trustBadges?.length ? (
          <div className="mt-8 grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4 max-w-4xl mx-auto">
            {funnel.trustBadges.map((label) => (
              <div key={label} className="flex flex-col items-center gap-2 text-center">
                <span className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border-2 border-stone-300 bg-white text-[9px] sm:text-[10px] font-black uppercase text-stone-600 shadow-sm">
                  {label.split(" ")[0]}
                </span>
                <span className="text-[8px] sm:text-[9px] font-semibold leading-tight text-stone-600">{label}</span>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
