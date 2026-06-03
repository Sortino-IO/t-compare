import Image from "next/image";
import type { LandingPageConfig, LpPackage } from "../../lib/landing-pages";
import LpCtaButton from "./LpCtaButton";
import LpProductBottle from "./LpProductBottle";

const PAYMENT_LABELS = ["Discover", "Amex", "Mastercard", "Visa"];

function FunnelColumn({
  pkg,
  config,
  isCenter,
  highlightHeaderBg,
}: {
  pkg: LpPackage;
  config: LandingPageConfig;
  isCenter: boolean;
  highlightHeaderBg: string;
}) {
  const { theme, ctaUrl, brandName, productName } = config;
  const headerBg = isCenter ? highlightHeaderBg : "#b8d4e8";
  const headerText = "#0f172a";

  return (
    <div
      className={`flex flex-col rounded-lg overflow-hidden bg-white shadow-xl ${isCenter ? "md:-mt-2 md:mb-0 ring-2 ring-[#f5b800] md:scale-[1.03] z-10" : ""}`}
    >
      <div className="px-3 py-3 text-center" style={{ backgroundColor: headerBg, color: headerText }}>
        <p className="text-xs sm:text-sm font-black uppercase tracking-wide leading-tight">
          {pkg.funnelHeader ?? pkg.badge ?? pkg.title}
        </p>
        {pkg.funnelSubheader ? (
          <p className="text-[10px] sm:text-xs font-bold mt-1 leading-snug">{pkg.funnelSubheader}</p>
        ) : (
          <p className="text-[10px] sm:text-xs font-semibold mt-1">{pkg.subtitle}</p>
        )}
      </div>

      <div className="relative px-4 pt-4 pb-2 bg-[#f0f4f8] min-h-[140px] sm:min-h-[168px] flex items-center justify-center">
        {pkg.savingsBurst ? (
          <span className="absolute top-2 right-2 z-10 rounded-full bg-red-600 text-white text-[9px] sm:text-[10px] font-black px-2 py-1 shadow-md rotate-6">
            {pkg.savingsBurst}
          </span>
        ) : null}
        {pkg.productImage ? (
          <div className="relative w-full h-32 sm:h-40 overflow-hidden">
            <Image
              src={pkg.productImage}
              alt={pkg.productImageAlt ?? pkg.title}
              fill
              className="object-cover scale-[1.35]"
              style={{ objectPosition: pkg.productImagePosition ?? "center" }}
              sizes="240px"
            />
          </div>
        ) : pkg.bottleCount ? (
          <LpProductBottle
            productName={productName}
            brandName={brandName}
            count={pkg.bottleCount}
            labelColor={theme.primary}
            capColor={theme.accent}
          />
        ) : null}
      </div>

      <div className="px-4 pb-5 flex flex-col flex-1 text-center">
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

        {pkg.perkLines?.map((line) => (
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
            ✓ {line}
          </p>
        ))}

        {pkg.badge && !pkg.perkLines?.length ? (
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

  const sectionBg = `linear-gradient(180deg, ${theme.primaryDark} 0%, ${theme.primary} 100%)`;
  const highlightHeaderBg = funnel?.highlightHeaderBg ?? "#f5b800";

  return (
    <section className="py-14 sm:py-20 px-4 sm:px-6" style={{ background: sectionBg }}>
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl sm:text-3xl font-black text-center text-white mb-10 sm:mb-12">
          {funnel?.sectionTitle ?? "Choose Your Package"}
        </h2>
        <div className="grid md:grid-cols-3 gap-4 sm:gap-6 items-end">
          {packages.map((pkg) => (
            <FunnelColumn
              key={pkg.id}
              pkg={pkg}
              config={config}
              isCenter={Boolean(pkg.highlight)}
              highlightHeaderBg={highlightHeaderBg}
            />
          ))}
        </div>
        <p className="text-center text-xs text-white/70 mt-8 max-w-2xl mx-auto">
          {funnel?.footerNote ??
            `Secure checkout · Official ${config.brandName} bundle tiers · 60-day guarantee per vendor terms`}
        </p>
      </div>
    </section>
  );
}
