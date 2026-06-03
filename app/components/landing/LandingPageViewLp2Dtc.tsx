import Image from "next/image";
import type { LandingPageConfig } from "../../lib/landing-pages";
import { getLpMedia, withAvatars } from "../../lib/landing-page-media";
import LpCtaButton from "./LpCtaButton";
import LpFooter from "./LpFooter";
import LpCriticalTPricing from "./LpCriticalTPricing";
import LpOfferStackBlock from "./LpOfferStack";
import LpStars from "./LpStars";
import LpStickyBar from "./LpStickyBar";

function ProductCard({
  config,
  productImage,
  productImageAlt,
  productImagePosition,
}: {
  config: LandingPageConfig;
  productImage?: string;
  productImageAlt?: string;
  productImagePosition?: string;
}) {
  const { theme, brandName, productName } = config;
  const popular = config.packages.find((p) => p.highlight) ?? config.packages[0]!;
  const priceLabel = config.packagePriceLabel ?? "per bottle";
  const imgSrc = productImage ?? popular.productImage;

  return (
    <div
      className="rounded-2xl border bg-white shadow-lg overflow-hidden"
      style={{ borderColor: theme.border }}
    >
      <div className="relative aspect-square bg-[#f0f4f8]">
        {imgSrc ? (
          <>
            <Image
              src={imgSrc}
              alt={productImageAlt ?? popular.productImageAlt ?? productName}
              fill
              className="object-cover scale-125"
              style={{ objectPosition: productImagePosition ?? popular.productImagePosition ?? "18% 45%" }}
              sizes="400px"
            />
            <div className="absolute top-3 left-3 right-3 flex justify-center">
              <span
                className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest shadow-sm"
                style={{ backgroundColor: theme.accent, color: theme.accentText }}
              >
                {brandName}
              </span>
            </div>
          </>
        ) : (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center p-6"
            style={{ background: `linear-gradient(145deg, ${theme.primary} 0%, ${theme.primaryDark} 100%)` }}
          >
            <span
              className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest mb-3"
              style={{ backgroundColor: theme.accent, color: theme.accentText }}
            >
              {brandName}
            </span>
            <p className="text-white font-black text-2xl text-center">{productName}</p>
            <p className="text-white/60 text-xs uppercase tracking-widest mt-1">
              {config.productBadgeLine ?? "Daily Formula · 60 caps"}
            </p>
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <LpStars />
          <span className="text-xs font-semibold text-slate-600">4.9 · 2,400+ reviews</span>
        </div>
        <p className="text-3xl font-black tabular-nums" style={{ color: theme.primary }}>
          {popular.priceDisplay ?? popular.pricePerBottle}
          <span className="text-sm font-semibold text-slate-500">
            {popular.priceDisplay ? "" : ` / ${priceLabel}`}
          </span>
        </p>
        {popular.savings ? <p className="text-sm font-bold text-emerald-600 mt-1">{popular.savings}</p> : null}
        <LpCtaButton
          ctaUrl={config.ctaUrl}
          label={popular.ctaLabel}
          theme={theme}
          size="lg"
          className="w-full mt-4 !rounded-lg !normal-case !tracking-normal"
          pulse={false}
        />
        <ul className="mt-4 space-y-2 text-xs text-slate-600">
          <li className="flex gap-2">
            <span className="text-emerald-600">✓</span> 60-day money-back guarantee
          </li>
          <li className="flex gap-2">
            <span className="text-emerald-600">✓</span> Secure ClickBank checkout
          </li>
          <li className="flex gap-2">
            <span className="text-emerald-600">✓</span> {popular.shipping}
          </li>
          {config.offerStack ? (
            <li className="flex gap-2">
              <span className="text-emerald-600">✓</span> 4 bonuses included ($190+ value)
            </li>
          ) : null}
        </ul>
      </div>
    </div>
  );
}

export default function LandingPageViewLp2Dtc({ config }: { config: LandingPageConfig }) {
  const { theme } = config;
  const meta = config.productMeta;
  const media = getLpMedia(config.slug);
  const testimonials = withAvatars(config.testimonials);
  const timeline = config.timeline ?? [];
  const priceLabel = config.packagePriceLabel ?? "per bottle";

  return (
    <div className="min-h-screen bg-white pb-24 sm:pb-0" style={{ color: theme.text }}>
      {/* Minimal top bar — DTC shop feel */}
      <div className="border-b bg-white sticky top-0 z-40" style={{ borderColor: theme.border }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3 flex items-center justify-between">
          <span className="font-black text-lg tracking-tight" style={{ color: theme.primary }}>
            {config.brandName}
          </span>
          <div className="hidden sm:flex items-center gap-6 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <span>Ingredients</span>
            <span>Reviews</span>
            <span>FAQ</span>
          </div>
          <LpCtaButton
            ctaUrl={config.ctaUrl}
            label={config.offerStack?.ctaLabel ?? "Shop Now"}
            theme={theme}
            size="md"
            className="!rounded-lg !normal-case !tracking-normal !text-sm"
            pulse={false}
          />
        </div>
      </div>

      {/* Promo ribbon */}
      <div className="text-center py-2 text-xs font-bold uppercase tracking-wider text-white" style={{ backgroundColor: theme.accent }}>
        {config.urgencyHeadline}
      </div>

      {/* Product hero — Shopify layout */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-10 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <div className="space-y-4 order-1">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-slate-100 shadow-md">
              <Image src={media.heroImage} alt={media.heroImageAlt} fill className="object-cover" sizes="50vw" priority />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {media.gallery.slice(0, 4).map((img) => (
                <div key={img.src} className="relative aspect-square rounded-lg overflow-hidden border" style={{ borderColor: theme.border }}>
                  <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="120px" />
                </div>
              ))}
            </div>
          </div>

          <div className="order-2 lg:sticky lg:top-20 space-y-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: theme.accent }}>
                {meta?.heroTagline ?? "Natural testosterone support"}
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black leading-[1.08] tracking-tight mb-4">
                {config.heroHeadline}
              </h1>
              <p className="text-base sm:text-lg leading-relaxed mb-6" style={{ color: theme.muted }}>
                {config.heroSubheadline}
              </p>
              <div className="flex items-center gap-2 mb-6">
                <LpStars />
                <span className="text-sm font-semibold" style={{ color: theme.muted }}>
                  Rated 4.9/5 by verified buyers
                </span>
              </div>
              <ul className="space-y-3 mb-6">
                {config.heroBullets.map((b) => (
                  <li key={b} className="flex gap-3 text-sm sm:text-base">
                    <span
                      className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold"
                      style={{ backgroundColor: theme.accent }}
                    >
                      ✓
                    </span>
                    <span>
                      {b.split(/\*\*(.*?)\*\*/).map((part, i) =>
                        i % 2 === 1 ? <strong key={i}>{part}</strong> : part,
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <ProductCard
              config={config}
              productImage={media.heroProductImage ?? config.packages.find((p) => p.highlight)?.productImage}
              productImageAlt={media.heroProductImageAlt}
              productImagePosition={media.heroProductImagePosition}
            />
          </div>
        </div>
      </section>

      {/* Day 7 / 30 / 90 timeline — GemPages pattern */}
      {timeline.length > 0 ? (
        <section className="py-14 sm:py-20" style={{ backgroundColor: theme.sectionBg }}>
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-black text-center mb-3">
              {meta?.isDigitalProduct ? "Your First Build Starts Here" : "What to Expect Over Time"}
            </h2>
            <p className="text-center text-sm mb-12 max-w-xl mx-auto" style={{ color: theme.muted }}>
              {meta?.isDigitalProduct
                ? "Instant access → pick a plan → buy lumber → finish your project."
                : "Individual results vary. Most men plan a 60–90 day runway for a fair assessment."}
            </p>
            <div className="grid sm:grid-cols-3 gap-6">
              {timeline.map((step, i) => (
                <div key={step.milestone} className="relative rounded-2xl bg-white border p-6 shadow-sm" style={{ borderColor: theme.border }}>
                  <div
                    className="inline-flex items-center justify-center w-12 h-12 rounded-full text-white font-black text-sm mb-4"
                    style={{ backgroundColor: theme.accent }}
                  >
                    {i + 1}
                  </div>
                  <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: theme.accent }}>
                    {step.milestone}
                  </p>
                  <h3 className="font-black text-lg mb-2">{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: theme.muted }}>
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Ingredients table */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-black text-center mb-10">{config.ingredientsTitle}</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {config.ingredients.map((ing, i) => (
              <div
                key={ing.name}
                className="rounded-2xl border overflow-hidden bg-white shadow-sm"
                style={{ borderColor: i % 2 === 0 ? theme.accent : theme.border }}
              >
                {ing.image ? (
                  <div className="relative aspect-[4/3] bg-slate-100">
                    <Image src={ing.image} alt={ing.name} fill className="object-cover" sizes="320px" />
                  </div>
                ) : null}
                <div className="p-4">
                  <h3 className="font-black text-base mb-1" style={{ color: theme.primary }}>
                    {ing.name}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: theme.muted }}>
                    {ing.benefit}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Split story + image */}
      <section className="py-14 sm:py-20" style={{ backgroundColor: theme.sectionBg }}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4 text-sm sm:text-base leading-relaxed" style={{ color: theme.muted }}>
            {config.solutionParagraphs.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
            <Image src={media.splitImage} alt={media.splitImageAlt} fill className="object-cover" sizes="50vw" />
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-black text-center mb-10">Verified Customer Reviews</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <blockquote key={t.name} className="rounded-2xl border p-6" style={{ borderColor: theme.border }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden">
                    <Image src={t.avatarUrl} alt={t.name} fill className="object-cover" sizes="48px" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">{t.name}</p>
                    <p className="text-xs" style={{ color: theme.muted }}>
                      {t.location}
                    </p>
                  </div>
                </div>
                <LpStars />
                <p className="mt-3 text-sm leading-relaxed italic">&ldquo;{t.quote}&rdquo;</p>
                <p className="mt-2 text-[10px] font-bold uppercase" style={{ color: theme.muted }}>
                  {t.packageLabel}
                </p>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Full value stack — primary conversion block */}
      {config.offerStack ? <LpOfferStackBlock stack={config.offerStack} config={config} /> : null}

      {config.pricingFunnel?.layout === "critical-t-funnel" ? (
        <LpCriticalTPricing config={config} />
      ) : (
        <section className="py-14 sm:py-20" style={{ backgroundColor: theme.sectionBg }}>
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-black text-center mb-10">
              {meta?.pricingHeadline ?? "Choose Your Supply"}
            </h2>
            <div className={`grid gap-6 ${config.packages.length > 1 ? "md:grid-cols-3" : "max-w-md mx-auto"}`}>
              {config.packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`rounded-2xl border-2 p-6 bg-white flex flex-col ${pkg.highlight ? "ring-2 ring-offset-2 shadow-xl" : "shadow-sm"}`}
                  style={{ borderColor: pkg.highlight ? theme.accent : theme.border }}
                >
                  {pkg.badge ? (
                    <span className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: theme.accent }}>
                      {pkg.badge}
                    </span>
                  ) : null}
                  <h3 className="font-black text-xl">{pkg.title}</h3>
                  <p className="text-xs mb-4" style={{ color: theme.muted }}>
                    {pkg.subtitle}
                  </p>
                  <p className="text-4xl font-black tabular-nums">{pkg.pricePerBottle}</p>
                  <p className="text-xs font-semibold mb-1" style={{ color: theme.muted }}>
                    {priceLabel} · {pkg.total}
                  </p>
                  {pkg.savings ? <p className="text-sm font-bold text-emerald-600 mb-4">{pkg.savings}</p> : <div className="mb-4" />}
                  <LpCtaButton
                    ctaUrl={config.ctaUrl}
                    label={pkg.ctaLabel}
                    theme={theme}
                    size="md"
                    className="w-full mt-auto !rounded-lg !normal-case"
                    pulse={false}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <h2 className="text-2xl font-black text-center mb-8">FAQ</h2>
          <div className="divide-y" style={{ borderColor: theme.border }}>
            {config.faq.map((item) => (
              <details key={item.q} className="py-4 group">
                <summary className="cursor-pointer font-bold text-sm list-none flex justify-between gap-4">
                  {item.q}
                  <span className="opacity-40 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="pt-3 text-sm leading-relaxed" style={{ color: theme.muted }}>
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <LpFooter />
      <LpStickyBar config={config} />
    </div>
  );
}
