import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import type { LandingPageConfig } from "../../lib/landing-pages";
import { ingredientCardImage } from "../../lib/lp-ingredient-images";
import { getLpMedia, withAvatars } from "../../lib/landing-page-media";
import LpCtaButton from "./LpCtaButton";
import LpFooter from "./LpFooter";
import LpPricingFunnel from "./LpPricingFunnel";
import LpStars from "./LpStars";
import LpStickyBar from "./LpStickyBar";
import LpTestimonialCarousel from "./LpTestimonialCarousel";

function TofCtaStrip({
  config,
  tof,
  dark = false,
}: {
  config: LandingPageConfig;
  tof: NonNullable<LandingPageConfig["tof"]>;
  dark?: boolean;
}) {
  const { theme } = config;
  const perks = tof.ctaPerkTriple ?? tof.ctaStrip.perks;
  return (
    <section
      className={`py-12 sm:py-16 px-4 text-center ${dark ? "text-white" : ""}`}
      style={{ background: dark ? theme.primaryDark : theme.sectionBg }}
    >
      <div className="mx-auto max-w-4xl">
        <p
          className="text-base sm:text-xl lg:text-2xl font-black uppercase tracking-wide mb-6 leading-snug"
          style={{ color: dark ? theme.accent : theme.primary }}
        >
          {tof.ctaStrip.headline}
        </p>
        <LpCtaButton
          ctaUrl={config.ctaUrl}
          label={tof.ctaStrip.buttonLabel}
          theme={theme}
          size="xl"
          className="w-full sm:w-auto min-w-[300px] !text-lg sm:!text-xl"
        />
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-7 text-sm sm:text-base font-bold">
          {perks.map((p) => (
            <span key={p} className="inline-flex items-center gap-2">
              <span className="text-lg" style={{ color: theme.accent }}>
                ✔
              </span>
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function TofTrustBadges({
  config,
  tof,
}: {
  config: LandingPageConfig;
  tof: NonNullable<LandingPageConfig["tof"]>;
}) {
  if (!tof.trustBadges?.length) return null;
  const { theme } = config;
  return (
    <section className="bg-white border-b" style={{ borderColor: theme.border }}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 sm:gap-6">
          {tof.trustBadges.map((b) => (
            <div key={b.label} className="flex flex-col items-center text-center gap-2">
              <span className="text-2xl sm:text-3xl" aria-hidden>
                {b.icon}
              </span>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wide leading-tight" style={{ color: theme.muted }}>
                {b.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionTitle({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <h2
      className={`lp-tof-section-title font-black text-center ${className}`}
      style={style}
    >
      {children}
    </h2>
  );
}

/** Keep multi-word product names (e.g. "Critical T") from orphaning the last letter. */
function keepBrandTogether(text: string): string {
  return text.replace(/Critical T\b/g, "Critical\u00A0T");
}

export default function LandingPageViewTof({ config }: { config: LandingPageConfig }) {
  const { theme } = config;
  const tof = config.tof!;
  const media = getLpMedia(config.slug);
  const testimonials = withAvatars(config.testimonials, config.slug);
  const timeline = config.timeline ?? [];

  return (
    <div className="min-h-screen bg-white pb-24 sm:pb-0" style={{ color: theme.text }}>
      {/* Top trust ribbon */}
      <div
        className="text-center py-3 px-4 text-xs sm:text-sm font-bold uppercase tracking-wide text-white"
        style={{ backgroundColor: theme.primary }}
      >
        {tof.trustLine}
      </div>

      {/* Urgency */}
      <div
        className="px-4 py-4 text-center font-black uppercase tracking-wide text-base sm:text-lg border-b-2 border-[#b8860b] lp-urgency-shimmer"
        style={{
          background: `linear-gradient(90deg, ${theme.accent}, #fff176, ${theme.accent})`,
          color: theme.accentText,
        }}
      >
        ⚡ {config.urgencyHeadline} ⚡
      </div>

      {/* Hero */}
      <header className="relative overflow-hidden" style={{ background: theme.heroBg }}>
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_30%_20%,#fff_0%,transparent_55%)]" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 py-14 sm:py-20 text-center text-white">
          <p className="inline-block rounded-full bg-[#c0392b] px-5 py-1.5 text-xs sm:text-sm font-black uppercase tracking-widest mb-5">
            {tof.heroKicker}
          </p>
          {tof.heroPreheadline ? (
            <p className="text-lg sm:text-xl lg:text-2xl font-bold leading-snug mb-4 opacity-95">
              {tof.heroPreheadline}
            </p>
          ) : null}
          <h1 className="lp-tof-display font-black mb-5 lp-headline-shadow">{keepBrandTogether(config.heroHeadline)}</h1>
          <p className="text-xl sm:text-2xl lg:text-3xl font-black mb-3" style={{ color: theme.accent }}>
            (And it&apos;s just {tof.pricePerDay})
          </p>
          {tof.heroOfferLine ? (
            <p className="text-base sm:text-lg font-bold mb-6 opacity-95">{tof.heroOfferLine}</p>
          ) : null}
          <p className="text-base sm:text-lg lg:text-xl opacity-95 max-w-3xl mx-auto leading-relaxed mb-10">
            {config.heroSubheadline}
          </p>

          <div className="relative mx-auto max-w-sm sm:max-w-md aspect-square mb-10">
            <Image
              src={media.heroProductImage ?? "/lp/critical-t-bottles-4.png"}
              alt={media.heroProductImageAlt ?? config.productName}
              fill
              className="object-contain drop-shadow-2xl"
              sizes="480px"
              priority
            />
          </div>

          <LpCtaButton
            ctaUrl={config.ctaUrl}
            label={tof.ctaStrip.buttonLabel}
            theme={theme}
            size="xl"
            className="w-full sm:w-auto min-w-[320px] !text-lg sm:!text-xl"
          />
          <p className="mt-5 text-sm font-semibold opacity-90">
            ✓ 60-day money-back guarantee · ✓ Secure ClickBank checkout
          </p>
        </div>
      </header>

      <TofTrustBadges config={config} tof={tof} />

      {/* Three pillars — full-width stacked (Mountain Drop style) */}
      <section className="divide-y" style={{ borderColor: theme.border }}>
        {tof.pillars.map((pillar, i) => (
          <div
            key={pillar.badge}
            className="py-12 sm:py-16 px-4 sm:px-6"
            style={{ backgroundColor: i % 2 === 0 ? "#fff" : theme.sectionBg }}
          >
            <div className="mx-auto max-w-3xl text-center">
              <span
                className="inline-block rounded-full px-4 py-1.5 text-xs sm:text-sm font-black uppercase tracking-widest mb-5"
                style={{ backgroundColor: theme.accent, color: theme.accentText }}
              >
                {pillar.badge}
              </span>
              <h3 className="lp-tof-pillar-title font-black mb-5" style={{ color: theme.primary }}>
                {pillar.title}
              </h3>
              <p className="text-base sm:text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: theme.muted }}>
                {pillar.body}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Research quote */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <SectionTitle className="mb-10" style={{ color: theme.primary }}>
            {tof.researchSectionTitle ??
              "The Stack Thousands Of Men Are Testing Instead Of Random Boosters"}
          </SectionTitle>
          <blockquote className="text-lg sm:text-xl leading-relaxed italic" style={{ color: theme.muted }}>
            &ldquo;{tof.researchQuote.text}&rdquo;
          </blockquote>
          <p className="mt-6 text-base font-bold" style={{ color: theme.primary }}>
            {tof.researchQuote.attribution}
          </p>
        </div>
      </section>

      {/* Product showcase — the bundle (spreads page, reinforces offer) */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div className="relative aspect-square rounded-3xl overflow-hidden" style={{ backgroundColor: theme.sectionBg }}>
            <Image
              src={media.heroProductImage ?? "/lp/critical-t-bottles-4.png"}
              alt={media.heroProductImageAlt ?? `${config.productName} bundle`}
              fill
              className="object-contain p-6 drop-shadow-2xl"
              sizes="(max-width: 1024px) 90vw, 480px"
            />
            <span
              className="absolute top-5 left-5 rounded-full px-4 py-2 text-xs sm:text-sm font-black uppercase tracking-wide shadow-lg"
              style={{ backgroundColor: theme.accent, color: theme.accentText }}
            >
              {tof.offerBadge}
            </span>
          </div>
          <div>
            <SectionTitle className="text-left mb-5" style={{ color: theme.primary }}>
              Meet Critical T — Your 2-Capsule Morning Stack
            </SectionTitle>
            <p className="text-base sm:text-lg leading-relaxed mb-7" style={{ color: theme.muted }}>
              {tof.heroOfferLine ?? config.heroSubheadline}
            </p>
            <ul className="space-y-4 mb-8">
              {config.heroBullets.map((b) => (
                <li key={b} className="flex gap-3 text-base sm:text-lg">
                  <span className="text-xl shrink-0" style={{ color: theme.accent }}>
                    ✔
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <LpCtaButton
              ctaUrl={config.ctaUrl}
              label={tof.ctaStrip.buttonLabel}
              theme={theme}
              size="xl"
              className="w-full sm:w-auto min-w-[280px] !text-lg sm:!text-xl"
            />
          </div>
        </div>
      </section>

      <TofCtaStrip config={config} tof={tof} />

      {/* Testimonials grid */}
      <section className="py-14 sm:py-20" style={{ backgroundColor: theme.sectionBg }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionTitle className="mb-4" style={{ color: theme.primary }}>
            {keepBrandTogether(tof.testimonialsTitle ?? "Real Critical T Users — Real Results")}
          </SectionTitle>
          <p className="text-center text-base sm:text-lg max-w-3xl mx-auto mb-12" style={{ color: theme.muted }}>
            {tof.testimonialsSubtitle ?? "Verified purchaser feedback · * Results may vary"}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {testimonials.slice(0, 8).map((t) => (
              <blockquote
                key={t.name}
                className="rounded-xl border p-5 sm:p-6 flex flex-col h-full bg-white shadow-sm"
                style={{ borderColor: theme.border }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden shrink-0">
                    <Image src={t.avatarUrl} alt={t.name} fill className="object-cover" sizes="48px" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-sm truncate">{t.name}</p>
                    <p className="text-xs truncate" style={{ color: theme.muted }}>
                      {t.location}
                    </p>
                  </div>
                </div>
                <LpStars />
                <p className="mt-3 text-sm sm:text-base leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
                <p className="mt-3 text-[10px] font-bold uppercase" style={{ color: theme.muted }}>
                  {t.packageLabel}
                </p>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Decline narrative */}
      <section className="py-16 sm:py-24 text-white" style={{ background: theme.heroBg }}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <h2 className="lp-tof-section-title font-black mb-8 uppercase">{tof.declineSection.title}</h2>
          <p className="lp-balance text-xl sm:text-2xl font-bold mb-8 leading-relaxed">{tof.declineSection.statLine}</p>
          {tof.declineSection.paragraphs.map((p) => (
            <p key={p.slice(0, 24)} className="lp-balance text-base sm:text-lg lg:text-xl leading-relaxed mb-5 opacity-95">
              {p}
            </p>
          ))}
          {tof.declineSection.closingLines.map((line) => (
            <p
              key={line}
              className="lp-balance text-lg sm:text-xl lg:text-2xl font-black mt-5 leading-snug"
              style={{ color: theme.accent }}
            >
              {line}
            </p>
          ))}
        </div>
      </section>

      {/* Transformation stories — alternating image/text (Mountain Drop signature) */}
      {tof.storyResults?.length ? (
        <section className="py-14 sm:py-20 bg-white">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <SectionTitle className="mb-4" style={{ color: theme.primary }}>
              {tof.storyResultsTitle ?? "Real Transformation Stories"}
            </SectionTitle>
            {tof.storyResultsIntro ? (
              <p className="text-center text-base sm:text-lg max-w-3xl mx-auto mb-12" style={{ color: theme.muted }}>
                {tof.storyResultsIntro}
              </p>
            ) : null}
            <div className="space-y-12 sm:space-y-16">
              {tof.storyResults.map((story, i) => (
                <article
                  key={story.title}
                  className={`grid lg:grid-cols-2 gap-8 sm:gap-10 items-center ${
                    i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                    <Image src={story.image} alt={story.imageAlt} fill className="object-cover" sizes="50vw" />
                  </div>
                  <div>
                    <h3 className="font-black text-xl sm:text-2xl lg:text-3xl mb-4 leading-snug" style={{ color: theme.primary }}>
                      {story.title}
                    </h3>
                    <p className="text-base sm:text-lg leading-relaxed mb-5" style={{ color: theme.muted }}>
                      {story.mechanism}
                    </p>
                    <blockquote
                      className="rounded-2xl border-l-4 p-5 sm:p-6 text-base sm:text-lg leading-relaxed italic"
                      style={{ borderColor: theme.accent, backgroundColor: theme.sectionBg, color: theme.text }}
                    >
                      &ldquo;{story.quote}&rdquo;
                      <footer className="mt-4 not-italic text-sm font-bold" style={{ color: theme.muted }}>
                        {story.attribution}
                      </footer>
                    </blockquote>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <TofCtaStrip config={config} tof={tof} dark />

      {/* Side effects you want */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <SectionTitle className="mb-3" style={{ color: theme.primary }}>
            {tof.sideEffectsHeadline}
          </SectionTitle>
          <p className="text-center font-black text-xl sm:text-2xl mb-12" style={{ color: theme.muted }}>
            {tof.sideEffectsSubhead}
          </p>
          <div className="space-y-12">
            {tof.benefitBlocks.map((block) => (
              <article
                key={block.title}
                className="rounded-2xl border p-7 sm:p-10"
                style={{ borderColor: theme.border }}
              >
                <h3 className="font-black text-xl sm:text-2xl lg:text-3xl mb-5 leading-snug" style={{ color: theme.primary }}>
                  {block.title}
                </h3>
                {block.paragraphs.map((p) => (
                  <p
                    key={p.slice(0, 30)}
                    className="text-base sm:text-lg leading-relaxed mb-4"
                    style={{ color: theme.muted }}
                  >
                    {p}
                  </p>
                ))}
                <p className="text-base sm:text-lg font-bold mt-5" style={{ color: theme.primary }}>
                  <strong>The Result:</strong> {block.result.replace(/^The result:\s*/i, "")}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <TofCtaStrip config={config} tof={tof} />

      {/* Featured story */}
      <section className="py-14 sm:py-20" style={{ backgroundColor: theme.sectionBg }}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <SectionTitle className="mb-8" style={{ color: theme.primary }}>
            {tof.featuredStory.title}
          </SectionTitle>
          <p className="text-base sm:text-lg leading-relaxed mb-8" style={{ color: theme.muted }}>
            {tof.featuredStory.intro}
          </p>
          <blockquote
            className="rounded-2xl border-l-4 p-7 sm:p-10 bg-white shadow-sm text-base sm:text-lg leading-relaxed italic"
            style={{ borderColor: theme.accent, color: theme.text }}
          >
            &ldquo;{tof.featuredStory.quote}&rdquo;
            <footer className="mt-5 not-italic text-sm font-bold" style={{ color: theme.muted }}>
              {tof.featuredStory.attribution}
            </footer>
          </blockquote>
        </div>
      </section>

      {/* Vision + lifestyle image */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionTitle className="text-left mb-6" style={{ color: theme.primary }}>
              {tof.visionTitle}
            </SectionTitle>
            <p className="text-base sm:text-lg leading-relaxed mb-8" style={{ color: theme.muted }}>
              {tof.visionIntro}
            </p>
            <p className="font-black text-lg mb-4">Imagine a life where:</p>
            <ul className="space-y-4">
              {tof.visionBullets.map((b) => (
                <li key={b} className="flex gap-3 text-base sm:text-lg">
                  <span className="text-xl shrink-0">🔥</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-base sm:text-lg font-bold" style={{ color: theme.primary }}>
              {tof.visionClosing}
            </p>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
            <Image src={media.splitImage} alt={media.splitImageAlt} fill className="object-cover" sizes="50vw" />
          </div>
        </div>
      </section>

      {/* Ingredients deep */}
      <section className="py-14 sm:py-20" style={{ backgroundColor: theme.sectionBg }}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <SectionTitle className="mb-4" style={{ color: theme.primary }}>
            {tof.ingredientDeepTitle}
          </SectionTitle>
          <p className="text-center text-base sm:text-lg max-w-2xl mx-auto mb-12" style={{ color: theme.muted }}>
            {tof.ingredientDeepIntro}
          </p>
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {config.ingredients.map((ing, i) => {
              const img = ingredientCardImage(ing);
              return (
                <div
                  key={ing.name}
                  className="rounded-2xl overflow-hidden bg-white border shadow-sm"
                  style={{ borderColor: i === 1 ? theme.accent : theme.border }}
                >
                  <div className="relative aspect-[4/3]">
                    <Image src={img} alt={ing.name} fill className="object-cover" sizes="320px" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-black text-xl mb-3" style={{ color: theme.primary }}>
                      {ing.name}
                    </h3>
                    <p className="text-sm sm:text-base leading-relaxed" style={{ color: theme.muted }}>
                      {ing.benefit}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <TofCtaStrip config={config} tof={tof} />

      {/* Cost stack */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <SectionTitle className="mb-4" style={{ color: theme.primary }}>
            {tof.costStack.title}
          </SectionTitle>
          <p className="text-center text-base mb-10" style={{ color: theme.muted }}>
            {tof.costStack.subtitle}
          </p>
          <div className="rounded-2xl border overflow-hidden text-base" style={{ borderColor: theme.border }}>
            {tof.costStack.items.map((item) => (
              <div
                key={item.label}
                className="flex justify-between items-center px-5 py-4 border-b"
                style={{ borderColor: theme.border }}
              >
                <span>{item.label}</span>
                <span className="font-bold tabular-nums">{item.price}</span>
              </div>
            ))}
            <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x" style={{ borderColor: theme.border }}>
              <div className="p-6 text-center bg-stone-50">
                <p className="text-sm font-bold uppercase mb-2">DIY stack (monthly)</p>
                <p className="text-3xl font-black line-through text-red-600">{tof.costStack.stackTotal}</p>
                <p className="text-sm mt-2" style={{ color: theme.muted }}>
                  {tof.costStack.stackPerDay}/day
                </p>
              </div>
              <div className="p-6 text-center" style={{ backgroundColor: `${theme.accent}22` }}>
                <p className="text-sm font-bold uppercase mb-2">Critical T Best Value (120 days)</p>
                <p className="text-4xl font-black" style={{ color: theme.primary }}>
                  {tof.costStack.productTotal}
                </p>
                <p className="text-lg font-bold mt-2" style={{ color: theme.primary }}>
                  {tof.costStack.productPerDay}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compare table */}
      <section className="py-14 sm:py-20" style={{ backgroundColor: theme.sectionBg }}>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 overflow-x-auto">
          <SectionTitle className="mb-10" style={{ color: theme.primary }}>
            {tof.compareTitle}
          </SectionTitle>
          <table className="w-full min-w-[520px] text-base border-collapse bg-white rounded-xl overflow-hidden shadow-sm">
            <thead>
              <tr style={{ backgroundColor: theme.primary, color: "#fff" }}>
                <th className="text-left p-4 font-bold">Feature</th>
                <th className="p-4 font-bold text-center">Critical T</th>
                <th className="p-4 font-bold text-center">TRT</th>
                <th className="p-4 font-bold text-center">Random booster</th>
              </tr>
            </thead>
            <tbody>
              {tof.compareRows.map((row, i) => (
                <tr key={row.label} className={i % 2 === 0 ? "bg-white" : "bg-stone-50"}>
                  <td className="p-4 font-semibold border-t" style={{ borderColor: theme.border }}>
                    {row.label}
                  </td>
                  <td
                    className="p-4 text-center border-t font-bold"
                    style={{ borderColor: theme.border, color: theme.primary }}
                  >
                    {row.criticalT}
                  </td>
                  <td className="p-4 text-center border-t" style={{ borderColor: theme.border }}>
                    {row.trt}
                  </td>
                  <td className="p-4 text-center border-t" style={{ borderColor: theme.border }}>
                    {row.randomBooster}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Transformation timeline */}
      {timeline.length > 0 ? (
        <section className="py-14 sm:py-20 bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <SectionTitle className="mb-4" style={{ color: theme.primary }}>
              Reclaim Your Edge In Weeks — Not Years
            </SectionTitle>
            <p className="text-center text-base mb-12" style={{ color: theme.muted }}>
              Individual results vary. Most men plan a 60–90 day runway for a fair assessment.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              {timeline.map((step) => (
                <div key={step.milestone} className="rounded-xl border p-6 sm:p-7" style={{ borderColor: theme.border }}>
                  <p className="text-sm font-black uppercase tracking-widest mb-2" style={{ color: theme.accent }}>
                    {step.milestone}
                  </p>
                  <h3 className="font-black text-xl mb-3">{step.title}</h3>
                  <p className="text-base leading-relaxed" style={{ color: theme.muted }}>
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Pricing funnel */}
      {config.pricingFunnel?.layout === "supplement-funnel" ? <LpPricingFunnel config={config} /> : null}

      {/* Guarantee cards */}
      <section className="py-14 sm:py-20" style={{ backgroundColor: theme.sectionBg }}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <SectionTitle className="mb-10" style={{ color: theme.primary }}>
            {config.guaranteeTitle}
          </SectionTitle>
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {tof.guaranteeCards.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl bg-white border p-7 text-center shadow-sm"
                style={{ borderColor: theme.border }}
              >
                <div
                  className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full text-3xl"
                  style={{ backgroundColor: `${theme.accent}33` }}
                >
                  🛡️
                </div>
                <h3 className="font-black text-lg mb-4">{card.title}</h3>
                <p className="text-base leading-relaxed" style={{ color: theme.muted }}>
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Carousel reviews */}
      <section className="py-14 sm:py-20 text-white" style={{ background: theme.primaryDark }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="lp-tof-section-title font-black text-center mb-12">More Verified Reviews</h2>
          <LpTestimonialCarousel
            testimonials={testimonials}
            accentColor={theme.accent}
            cardBg="#0f172a"
            mutedColor="#94a3b8"
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <h2 className="lp-tof-section-title font-black text-center mb-10">Frequently Asked Questions</h2>
          <div className="divide-y" style={{ borderColor: theme.border }}>
            {config.faq.map((item) => (
              <details key={item.q} className="py-5 group">
                <summary className="cursor-pointer font-bold text-base sm:text-lg list-none flex justify-between gap-4">
                  {item.q}
                  <span className="opacity-40 group-open:rotate-45 transition-transform text-2xl leading-none">
                    +
                  </span>
                </summary>
                <p className="pt-4 text-base leading-relaxed" style={{ color: theme.muted }}>
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA — no countdown */}
      <section className="py-16 sm:py-24 text-center text-white" style={{ background: theme.heroBg }}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="lp-tof-section-title font-black mb-10">{keepBrandTogether(config.finalCtaHeadline)}</h2>
          <LpCtaButton
            ctaUrl={config.ctaUrl}
            label={tof.ctaStrip.buttonLabel}
            theme={theme}
            size="xl"
            className="w-full sm:w-auto min-w-[320px] !text-lg sm:!text-xl"
          />
          <p className="mt-6 text-sm font-semibold opacity-90">60-day money-back guarantee · Secure ClickBank checkout</p>
        </div>
      </section>

      <LpFooter />
      <LpStickyBar config={config} />
    </div>
  );
}
