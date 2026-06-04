import Image from "next/image";
import type { LandingPageConfig } from "../../lib/landing-pages";
import { ingredientCardImage } from "../../lib/lp-ingredient-images";
import { getLpMedia, withAvatars } from "../../lib/landing-page-media";
import { isTestosteroneSupplementLp } from "../../lib/testosterone-lp";
import LpCountdown from "./LpCountdown";
import LpCtaButton from "./LpCtaButton";
import LpOfferStackBlock from "./LpOfferStack";
import LpStars from "./LpStars";
import LpStickyBar from "./LpStickyBar";
import LpStorySection from "./LpStorySection";
import LpPricingFunnel from "./LpPricingFunnel";
import LpProductBottle from "./LpProductBottle";

function TrustRow({ theme, items }: { theme: LandingPageConfig["theme"]; items?: readonly string[] }) {
  const defaults = ["60-Day Guarantee", "Free Shipping Options", "Secure Checkout", "4.9★ Reviews"];
  const list = items ?? defaults;
  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
      {list.map((item) => (
        <span
          key={item}
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-wide border"
          style={{
            backgroundColor: theme.cardBg,
            borderColor: theme.accent,
            color: theme.primary,
          }}
        >
          <span style={{ color: theme.accent }}>✓</span> {item}
        </span>
      ))}
    </div>
  );
}

function HeroProductCard({
  config,
  imageSrc,
  imageAlt,
}: {
  config: LandingPageConfig;
  imageSrc: string;
  imageAlt: string;
}) {
  const { theme, productName, brandName } = config;
  return (
    <div
      className="relative mx-auto w-44 sm:w-52 aspect-[3/4] rounded-2xl shadow-2xl border-4 overflow-hidden"
      style={{ borderColor: theme.accent }}
    >
      <Image src={imageSrc} alt={imageAlt} fill className="object-contain p-2" sizes="208px" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
      <div
        className="absolute top-3 inset-x-3 rounded-lg py-2 px-2 text-[10px] sm:text-xs font-black uppercase leading-tight text-center shadow-md"
        style={{ backgroundColor: theme.accent, color: theme.accentText }}
      >
        {brandName}
      </div>
      <div className="absolute bottom-0 inset-x-0 p-4 text-center">
        <p className="text-white font-black text-lg sm:text-xl leading-tight">{productName}</p>
        <p className="text-white/80 text-[10px] uppercase tracking-widest mt-1">
          {config.productBadgeLine ?? "Daily Formula"}
        </p>
      </div>
    </div>
  );
}

function renderBoldInline(text: string) {
  const parts = text.split(/\*\*(.*?)\*\*/);
  if (parts.length === 1) return text;
  return parts.map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part));
}

function CheckList({ items, color, bold }: { items: string[]; color: string; bold?: boolean }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li
          key={item}
          className={`flex gap-3 text-sm sm:text-base leading-relaxed ${bold ? "font-semibold" : ""}`}
        >
          <span
            className="shrink-0 mt-0.5 flex h-6 w-6 items-center justify-center rounded-full text-white text-xs font-bold"
            style={{ backgroundColor: color }}
          >
            ✓
          </span>
          <span>{renderBoldInline(item)}</span>
        </li>
      ))}
    </ul>
  );
}

export default function LandingPageView({ config }: { config: LandingPageConfig }) {
  const { theme } = config;
  const meta = config.productMeta;
  const media = getLpMedia(config.slug);
  const testimonials = withAvatars(config.testimonials, config.slug);
  const heroBottleCount =
    meta?.heroBottleCount ?? (isTestosteroneSupplementLp(config.slug) ? 1 : undefined);
  const priceLabel = config.packagePriceLabel ?? "per bottle";
  const showPricingGrid =
    config.pricingFunnel?.layout !== "supplement-funnel" && (!config.offerStack || config.packages.length > 1);

  return (
    <div className="min-h-screen pb-24 sm:pb-0 bg-[#f0f0f0]" style={{ color: theme.text }}>
      {/* Urgency strip */}
      <div
        className="px-4 py-3 sm:py-4 text-center font-black uppercase tracking-wide text-sm sm:text-base lp-urgency-shimmer border-b-2 border-[#b8860b]"
        style={{
          background: `linear-gradient(90deg, ${theme.accent}, #fff176, ${theme.accent})`,
          color: theme.accentText,
        }}
      >
        ⚡ {config.urgencyHeadline} ⚡
      </div>

      {/* Hero */}
      <header className="relative overflow-hidden" style={{ background: theme.heroBg }}>
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_70%_30%,#fff_0%,transparent_50%)]" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-white text-center lg:text-left">
              <p className="inline-block rounded-full bg-[#c0392b] px-4 py-1 text-xs font-black uppercase tracking-widest mb-4">
                Limited offer · Act now
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-[2.85rem] font-black leading-[1.1] mb-5 lp-headline-shadow">
                {config.heroHeadline}
              </h1>
              <p className="text-base sm:text-lg font-medium opacity-95 leading-relaxed mb-6">{config.heroSubheadline}</p>

              <div className="rounded-xl bg-white p-5 sm:p-6 mb-6 text-left shadow-xl" style={{ color: theme.text }}>
                <CheckList items={config.heroBullets} color={theme.primary} bold />
              </div>

              <div className="mb-6">
                <LpCountdown variant="light" minutes={47} label="Your reserved pricing expires in:" />
              </div>

              <LpCtaButton
                ctaUrl={config.ctaUrl}
                label={config.offerStack?.ctaLabel ?? `Yes! Get ${config.productName} Now →`}
                theme={theme}
                size="xl"
                className="w-full sm:w-auto"
              />
              <p className="mt-4 text-xs sm:text-sm opacity-90 font-semibold">
                ✓ 60-day money-back guarantee · ✓ Secure ClickBank checkout
              </p>
            </div>

            <div className="relative flex flex-col items-center gap-6">
              {isTestosteroneSupplementLp(config.slug) && (media.heroProductImage || heroBottleCount) ? (
                <div
                  className="relative w-full max-w-sm aspect-[4/5] rounded-2xl shadow-2xl border-4 bg-[#f8fafc] flex flex-col items-center justify-center py-8 px-6"
                  style={{ borderColor: theme.accent }}
                >
                  {media.heroProductImage ? (
                    <div className="relative w-full flex-1 min-h-[220px] max-h-[340px]">
                      <Image
                        src={media.heroProductImage}
                        alt={media.heroProductImageAlt ?? `${config.productName} supplement bottle`}
                        fill
                        className="object-contain drop-shadow-md"
                        sizes="(max-width: 1024px) 85vw, 400px"
                        priority
                      />
                    </div>
                  ) : (
                    <LpProductBottle
                      productName={config.productName}
                      brandName={config.brandName}
                      count={heroBottleCount}
                      size="lg"
                      labelColor={theme.primary}
                      capColor={theme.accent}
                    />
                  )}
                  <p className="mt-6 text-center font-black text-lg" style={{ color: theme.primary }}>
                    {media.heroImageCaption ?? "Feel the difference."}
                  </p>
                  <p className="mt-1 text-center text-sm" style={{ color: theme.muted }}>
                    {media.heroImageSubcaption ??
                      meta?.heroSocialProof ??
                      `Join thousands of men already on ${config.productName}`}
                  </p>
                </div>
              ) : (
                <>
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/30">
                    <Image
                      src={media.heroImage}
                      alt={media.heroImageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-4 sm:p-5">
                      <p className="text-white font-black text-lg sm:text-xl">
                        {media.heroImageCaption ?? "Feel the difference."}
                      </p>
                      <p className="text-white/90 text-sm">
                        {media.heroImageSubcaption ??
                          meta?.heroSocialProof ??
                          `Join thousands of men already on ${config.productName}`}
                      </p>
                    </div>
                  </div>
                  {heroBottleCount ? (
                    <div
                      className="mx-auto w-44 sm:w-52 rounded-2xl shadow-2xl border-4 bg-[#f8fafc] flex items-center justify-center py-6"
                      style={{ borderColor: theme.accent }}
                    >
                      <LpProductBottle
                        productName={config.productName}
                        brandName={config.brandName}
                        count={heroBottleCount}
                        size="md"
                        labelColor={theme.primary}
                        capColor={theme.accent}
                      />
                    </div>
                  ) : media.heroProductImage ? (
                    <HeroProductCard
                      config={config}
                      imageSrc={media.heroProductImage}
                      imageAlt={media.heroProductImageAlt ?? config.productName}
                    />
                  ) : null}
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="py-4 px-4" style={{ backgroundColor: theme.sectionBg }}>
        <TrustRow theme={theme} items={meta?.trustItems} />
      </div>

      {/* Hook */}
      <section className="px-4 sm:px-6 py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-5xl">
          <h2
            className="text-2xl sm:text-4xl font-black text-center mb-8 leading-tight"
            style={{ color: theme.primary }}
          >
            Your Benefits at a Glance
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4 text-base sm:text-lg leading-relaxed" style={{ color: theme.muted }}>
              {config.hookParagraphs.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border-2" style={{ borderColor: theme.accent }}>
              <Image src={media.splitImage} alt={media.splitImageAlt} fill className="object-cover" sizes="50vw" />
            </div>
          </div>
          <div className="mt-10 text-center">
            <LpCtaButton ctaUrl={config.ctaUrl} label={`Try ${config.productName} Risk-Free →`} theme={theme} size="xl" />
          </div>
        </div>
      </section>

      {/* Problem — red tinted */}
      <section className="px-4 sm:px-6 py-12 sm:py-16 bg-[#fff5f5] border-y-4 border-red-200">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-black text-center mb-8 text-[#922b21] leading-snug">
            {config.problemTitle}
          </h2>
          <ul className="space-y-4">
            {config.problemBullets.map((item) => (
              <li
                key={item}
                className="flex gap-4 rounded-xl bg-white border-2 border-red-200 p-4 sm:p-5 shadow-sm text-sm sm:text-base leading-relaxed"
              >
                <span className="shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white font-black text-sm">
                  ✕
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Solution — brand colored */}
      <section className="px-4 sm:px-6 py-12 sm:py-16 text-white" style={{ background: theme.heroBg }}>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl sm:text-4xl font-black mb-8 leading-tight lp-headline-shadow">{config.solutionTitle}</h2>
          <div className="space-y-5 text-base sm:text-lg leading-relaxed opacity-95 text-left max-w-3xl mx-auto">
            {config.solutionParagraphs.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
          <div className="mt-10">
            <LpCtaButton ctaUrl={config.ctaUrl} label={`Get ${config.productName} Today →`} theme={theme} size="xl" />
          </div>
        </div>
      </section>

      {/* Ingredients grid with color cards */}
      <section className="px-4 sm:px-6 py-12 sm:py-16" style={{ backgroundColor: theme.sectionBg }}>
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl sm:text-4xl font-black text-center mb-10" style={{ color: theme.primary }}>
            {config.ingredientsTitle}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {config.ingredients.map((ing, i) => {
              const ingImage = ingredientCardImage(ing);
              return (
              <div
                key={ing.name}
                className="rounded-2xl border-2 bg-white overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                style={{ borderColor: i % 2 === 0 ? theme.accent : theme.primary }}
              >
                <div className="relative aspect-[4/3] w-full bg-slate-100">
                  <Image src={ingImage} alt={ing.name} fill className="object-cover" sizes="(max-width:768px) 100vw, 320px" />
                </div>
                <div className="p-5">
                  <div
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white font-black text-lg mb-3"
                    style={{ backgroundColor: theme.primary }}
                  >
                    {i + 1}
                  </div>
                  <h3 className="font-black text-lg mb-2" style={{ color: theme.primary }}>
                    {ing.name}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: theme.muted }}>
                    {ing.benefit}
                  </p>
                </div>
              </div>
            );
            })}
          </div>
        </div>
      </section>

      {/* Benefits — green check section */}
      <section className="px-4 sm:px-6 py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-black text-center mb-8" style={{ color: theme.primary }}>
            {config.benefitsTitle}
          </h2>
          <div
            className="rounded-2xl border-2 p-6 sm:p-8 shadow-inner"
            style={{ borderColor: theme.accent, backgroundColor: theme.sectionBg }}
          >
            <CheckList items={config.benefits} color="#16a34a" bold />
          </div>
        </div>
      </section>

      {/* Testimonials — erecprime style */}
      <section className="px-4 sm:px-6 py-12 sm:py-16 bg-[#ececec]">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl sm:text-4xl font-black text-center mb-2" style={{ color: theme.primary }}>
            Real {config.productName} Users, Real Results
          </h2>
          <p className="text-center text-sm font-semibold mb-10" style={{ color: theme.muted }}>
            Verified purchaser feedback · * Results may vary
          </p>

          <div className="space-y-0 bg-white rounded-2xl shadow-xl overflow-hidden border border-[#ddd]">
            {testimonials.map((t, idx) => (
              <blockquote
                key={t.name}
                className={`flex flex-col sm:flex-row gap-5 sm:gap-8 p-6 sm:p-8 ${idx > 0 ? "border-t border-[#ddd]" : ""}`}
              >
                <div className="flex sm:flex-col items-center sm:items-start gap-4 sm:gap-3 shrink-0 sm:w-36">
                  <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-full overflow-hidden border-4 border-white shadow-lg ring-2 ring-[#f5b800]">
                    <Image src={t.avatarUrl} alt={t.name} fill className="object-cover" sizes="96px" />
                  </div>
                  <div className="text-center sm:text-left">
                    <p className="font-black text-sm uppercase tracking-wide">{t.name}</p>
                    <p className="text-xs font-semibold" style={{ color: theme.muted }}>
                      {t.location}
                    </p>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-base sm:text-lg leading-relaxed italic mb-4">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs font-black uppercase tracking-wider">Verified Purchase</span>
                    <LpStars />
                  </div>
                  <p className="text-xs mt-2 font-semibold" style={{ color: theme.muted }}>
                    Purchased {t.packageLabel}
                  </p>
                </div>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {config.storySection ? (
        <LpStorySection section={config.storySection} theme={theme} />
      ) : (
        <section className="px-4 sm:px-6 py-12 sm:py-16 bg-white">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-2xl sm:text-3xl font-black text-center mb-8" style={{ color: theme.primary }}>
              {meta?.galleryTitle ?? "Men Like You Are Already Feeling the Surge"}
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {media.gallery.map((img, i) => (
                <div
                  key={img.src}
                  className={`relative rounded-xl overflow-hidden shadow-lg border-2 border-[#eee] ${
                    i < 2 ? "aspect-[3/4] sm:aspect-[4/5]" : "aspect-[4/3]"
                  }`}
                >
                  <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="(max-width:768px) 50vw, 25vw" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Value stack + pricing anchor */}
      {config.offerStack ? <LpOfferStackBlock stack={config.offerStack} config={config} /> : null}

      {config.pricingFunnel?.layout === "supplement-funnel" ? <LpPricingFunnel config={config} /> : null}

      {/* Pricing cards (supplements / multi-tier) */}
      {showPricingGrid ? (
      <section className="px-4 sm:px-6 py-12 sm:py-16" style={{ backgroundColor: theme.sectionBg }}>
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-4xl font-black text-center mb-2" style={{ color: theme.primary }}>
            {meta?.pricingHeadline ?? "Choose Your Package — Save More When You Stock Up"}
          </h2>
          <p className="text-center text-sm font-bold mb-6 uppercase tracking-wide" style={{ color: theme.muted }}>
            Secure SSL checkout · Official {config.brandName} order page
          </p>
          <div className="max-w-lg mx-auto mb-10">
            <LpCountdown variant="urgent" minutes={47} label="Inventory hold expires in:" />
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {config.packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative rounded-2xl border-[3px] p-6 flex flex-col bg-white ${
                  pkg.highlight ? "shadow-2xl md:scale-105 z-10 ring-4 ring-[#f5b800]/40" : "shadow-lg"
                }`}
                style={{ borderColor: pkg.highlight ? theme.accent : theme.border }}
              >
                {pkg.badge ? (
                  <span
                    className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-wide shadow-lg"
                    style={{ backgroundColor: "#c0392b", color: "#fff" }}
                  >
                    {pkg.badge}
                  </span>
                ) : null}

                <h3 className="text-xl font-black text-center mt-2" style={{ color: theme.primary }}>
                  {pkg.title}
                </h3>
                <p className="text-sm text-center font-semibold mt-1 mb-5" style={{ color: theme.muted }}>
                  {pkg.subtitle}
                </p>

                <div className="text-center mb-4 py-4 rounded-xl" style={{ backgroundColor: theme.sectionBg }}>
                  <div className="text-4xl sm:text-5xl font-black tabular-nums" style={{ color: theme.primary }}>
                    {pkg.pricePerBottle}
                  </div>
                  <div className="text-xs font-bold uppercase tracking-widest mt-1" style={{ color: theme.muted }}>
                    {priceLabel}
                  </div>
                </div>

                {pkg.savings ? (
                  <p className="text-center text-base font-black text-green-700 mb-2">{pkg.savings}</p>
                ) : null}
                {pkg.regularTotal ? (
                  <p className="text-center text-lg mb-1">
                    <span className="line-through text-red-600 font-bold opacity-80">{pkg.regularTotal}</span>
                  </p>
                ) : null}
                <p className="text-center text-2xl font-black mb-1">{pkg.total}</p>
                <p className="text-center text-xs font-bold uppercase mb-6" style={{ color: theme.muted }}>
                  {pkg.shipping}
                </p>

                <div className="mt-auto">
                  <LpCtaButton
                    ctaUrl={config.ctaUrl}
                    label={pkg.ctaLabel}
                    theme={theme}
                    size="md"
                    className="w-full !text-sm"
                  />
                </div>
                <p className="text-[10px] text-center mt-3 font-bold uppercase opacity-70">60-day guarantee</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      ) : null}

      {/* Guarantee */}
      <section className="px-4 sm:px-6 py-12 sm:py-16 bg-[#fffbea] border-y-4" style={{ borderColor: theme.accent }}>
        <div className="mx-auto max-w-3xl text-center">
          <div className="text-6xl mb-4">🛡️</div>
          <h2 className="text-2xl sm:text-3xl font-black mb-6" style={{ color: theme.primary }}>
            {config.guaranteeTitle}
          </h2>
          <div className="space-y-4 text-base leading-relaxed text-left" style={{ color: theme.muted }}>
            {config.guaranteeParagraphs.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
          <div className="mt-10">
            <LpCtaButton
            ctaUrl={config.ctaUrl}
            label={config.offerStack?.ctaLabel ?? `Start My ${config.productName} Trial →`}
            theme={theme}
            size="xl"
          />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 sm:px-6 py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-black text-center mb-8" style={{ color: theme.primary }}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {config.faq.map((item) => (
              <details
                key={item.q}
                className="rounded-xl border-2 bg-[#fafafa] group open:shadow-lg"
                style={{ borderColor: theme.border }}
              >
                <summary className="cursor-pointer list-none px-5 py-4 font-bold text-sm sm:text-base flex items-center justify-between gap-2">
                  {item.q}
                  <span className="text-2xl font-light opacity-40 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="px-5 pb-5 text-sm leading-relaxed border-t pt-4" style={{ color: theme.muted }}>
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 sm:px-6 py-14 sm:py-20 text-white text-center" style={{ background: theme.heroBg }}>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-black mb-6 lp-headline-shadow">{config.finalCtaHeadline}</h2>
          <div className="mb-8">
            <LpCountdown variant="light" minutes={47} label="Last chance — pricing expires in:" />
          </div>
          <LpCtaButton
            ctaUrl={config.ctaUrl}
            label={config.offerStack?.ctaLabel ?? `Claim ${config.productName} Now →`}
            theme={theme}
            size="xl"
            className="w-full sm:w-auto"
          />
          <TrustRow theme={{ ...theme, cardBg: "rgba(255,255,255,0.95)" }} items={meta?.trustItems} />
        </div>
      </section>

      <footer className="px-4 sm:px-6 py-8 text-[10px] sm:text-xs leading-relaxed text-center max-w-3xl mx-auto opacity-70 bg-[#f0f0f0]">
        {meta?.isDigitalProduct ? (
          <>
            <p className="mb-3">
              This is an independent affiliate page. Purchases are processed securely through ClickBank. Digital product
              — instant access after checkout. Individual build results vary based on skill, tools, and plan followed.
            </p>
            <p>
              Testimonials reflect reported member experiences and are not guaranteed. Plan licenses may restrict
              commercial resale — check terms before selling finished pieces.
            </p>
          </>
        ) : (
          <>
            <p className="mb-3">
              These statements have not been evaluated by the Food and Drug Administration. This product is not intended to
              diagnose, treat, cure, or prevent any disease.
            </p>
            <p>
              Consult your healthcare provider before starting any supplement. Individual results vary. Testimonials reflect
              reported user experiences and are not guaranteed.
            </p>
          </>
        )}
        <p className="mt-4">
          <a href="/disclaimer" className="underline">
            Disclaimer
          </a>
          {" · "}
          <a href="/privacy" className="underline">
            Privacy
          </a>
        </p>
      </footer>

      <LpStickyBar config={config} />
    </div>
  );
}
