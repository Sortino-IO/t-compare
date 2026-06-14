import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import type { LandingPageConfig } from "../../lib/landing-pages";
import { ingredientCardImage } from "../../lib/lp-ingredient-images";
import { getLpMedia, withAvatars } from "../../lib/landing-page-media";
import LpCountdown from "./LpCountdown";
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
  return (
    <section
      className={`py-10 sm:py-12 px-4 text-center ${dark ? "text-white" : ""}`}
      style={{ background: dark ? theme.primaryDark : theme.sectionBg }}
    >
      <div className="mx-auto max-w-3xl">
        <p
          className="text-xs sm:text-sm font-black uppercase tracking-widest mb-2"
          style={{ color: dark ? theme.accent : theme.primary }}
        >
          {tof.ctaStrip.headline}
        </p>
        <div className="flex flex-wrap justify-center gap-3 mb-6 text-xs sm:text-sm font-bold">
          {tof.ctaStrip.perks.map((p) => (
            <span key={p} className="inline-flex items-center gap-1.5">
              <span style={{ color: theme.accent }}>✔</span> {p}
            </span>
          ))}
        </div>
        <LpCtaButton
          ctaUrl={config.ctaUrl}
          label={tof.ctaStrip.buttonLabel}
          theme={theme}
          size="xl"
          className="w-full sm:w-auto min-w-[280px]"
        />
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
    <h2 className={`font-black text-2xl sm:text-3xl lg:text-[2rem] leading-tight text-center ${className}`} style={style}>
      {children}
    </h2>
  );
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
        className="text-center py-2.5 px-4 text-[10px] sm:text-xs font-bold uppercase tracking-wide text-white"
        style={{ backgroundColor: theme.primary }}
      >
        {tof.trustLine}
      </div>

      {/* Urgency */}
      <div
        className="px-4 py-3 text-center font-black uppercase tracking-wide text-sm sm:text-base border-b-2 border-[#b8860b] lp-urgency-shimmer"
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
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-16 text-center text-white">
          <p className="inline-block rounded-full bg-[#c0392b] px-4 py-1 text-[10px] sm:text-xs font-black uppercase tracking-widest mb-4">
            {tof.heroKicker}
          </p>
          <p className="text-sm sm:text-base font-black uppercase tracking-widest mb-3" style={{ color: theme.accent }}>
            {tof.offerBadge}
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-black leading-[1.08] mb-4 lp-headline-shadow">
            {config.heroHeadline}
          </h1>
          <p className="text-lg sm:text-xl font-bold mb-2" style={{ color: theme.accent }}>
            (And it&apos;s just {tof.pricePerDay} on the Best Value bundle)
          </p>
          <p className="text-base sm:text-lg opacity-95 max-w-3xl mx-auto leading-relaxed mb-8">
            {config.heroSubheadline}
          </p>

          <div className="relative mx-auto max-w-xs sm:max-w-sm aspect-square mb-8">
            <Image
              src={media.heroProductImage ?? "/lp/critical-t-bottles-4.png"}
              alt={media.heroProductImageAlt ?? config.productName}
              fill
              className="object-contain drop-shadow-2xl"
              sizes="400px"
              priority
            />
          </div>

          <LpCountdown variant="light" minutes={47} label="Reserved pricing expires in:" />
          <div className="mt-8">
            <LpCtaButton
              ctaUrl={config.ctaUrl}
              label={tof.ctaStrip.buttonLabel}
              theme={theme}
              size="xl"
              className="w-full sm:w-auto min-w-[300px]"
            />
          </div>
          <p className="mt-4 text-xs font-semibold opacity-90">✓ 60-day money-back guarantee · ✓ Secure ClickBank checkout</p>
        </div>
      </header>

      {/* Three pillars */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 grid md:grid-cols-3 gap-6 sm:gap-8">
          {tof.pillars.map((pillar) => (
            <div
              key={pillar.badge}
              className="rounded-2xl border p-6 sm:p-7 text-center shadow-sm"
              style={{ borderColor: theme.border, backgroundColor: theme.cardBg }}
            >
              <span
                className="inline-block rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest mb-4"
                style={{ backgroundColor: theme.accent, color: theme.accentText }}
              >
                {pillar.badge}
              </span>
              <h3 className="font-black text-lg sm:text-xl mb-3" style={{ color: theme.primary }}>
                {pillar.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: theme.muted }}>
                {pillar.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Research quote */}
      <section className="py-12 sm:py-16" style={{ backgroundColor: theme.sectionBg }}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <SectionTitle className="mb-8" style={{ color: theme.primary }}>
            The Stack Thousands Of Men Are Testing Instead Of Random Boosters
          </SectionTitle>
          <blockquote className="text-base sm:text-lg leading-relaxed italic" style={{ color: theme.muted }}>
            &ldquo;{tof.researchQuote.text}&rdquo;
          </blockquote>
          <p className="mt-4 text-sm font-bold" style={{ color: theme.primary }}>
            {tof.researchQuote.attribution}
          </p>
        </div>
      </section>

      <TofCtaStrip config={config} tof={tof} />

      {/* Testimonials grid */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionTitle className="mb-3" style={{ color: theme.primary }}>
            Real Critical T Users — Real Results
          </SectionTitle>
          <p className="text-center text-sm mb-10" style={{ color: theme.muted }}>
            Verified purchaser feedback · * Results may vary
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {testimonials.slice(0, 8).map((t) => (
              <blockquote
                key={t.name}
                className="rounded-xl border p-4 sm:p-5 flex flex-col h-full"
                style={{ borderColor: theme.border }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden shrink-0">
                    <Image src={t.avatarUrl} alt={t.name} fill className="object-cover" sizes="40px" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-xs truncate">{t.name}</p>
                    <p className="text-[10px] truncate" style={{ color: theme.muted }}>
                      {t.location}
                    </p>
                  </div>
                </div>
                <LpStars />
                <p className="mt-2 text-xs leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
                <p className="mt-2 text-[9px] font-bold uppercase" style={{ color: theme.muted }}>
                  {t.packageLabel}
                </p>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Decline narrative */}
      <section className="py-12 sm:py-16 text-white" style={{ background: theme.heroBg }}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <SectionTitle className="mb-6">{tof.declineSection.title}</SectionTitle>
          <p className="text-base sm:text-lg font-bold mb-6 leading-relaxed">{tof.declineSection.statLine}</p>
          {tof.declineSection.paragraphs.map((p) => (
            <p key={p.slice(0, 24)} className="text-sm sm:text-base leading-relaxed mb-4 opacity-95">
              {p}
            </p>
          ))}
          {tof.declineSection.closingLines.map((line) => (
            <p key={line} className="text-base sm:text-lg font-black mt-4" style={{ color: theme.accent }}>
              {line}
            </p>
          ))}
        </div>
      </section>

      {/* Side effects you want */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <SectionTitle className="mb-2" style={{ color: theme.primary }}>
            {tof.sideEffectsHeadline}
          </SectionTitle>
          <p className="text-center font-bold text-lg mb-10" style={{ color: theme.muted }}>
            {tof.sideEffectsSubhead}
          </p>
          <div className="space-y-10">
            {tof.benefitBlocks.map((block) => (
              <article key={block.title} className="rounded-2xl border p-6 sm:p-8" style={{ borderColor: theme.border }}>
                <h3 className="font-black text-xl sm:text-2xl mb-4" style={{ color: theme.primary }}>
                  {block.title}
                </h3>
                {block.paragraphs.map((p) => (
                  <p key={p.slice(0, 30)} className="text-sm sm:text-base leading-relaxed mb-3" style={{ color: theme.muted }}>
                    {p}
                  </p>
                ))}
                <p className="text-sm sm:text-base font-bold mt-4" style={{ color: theme.primary }}>
                  <strong>The Result:</strong> {block.result.replace(/^The result:\s*/i, "")}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <TofCtaStrip config={config} tof={tof} dark />

      {/* Featured story */}
      <section className="py-12 sm:py-16" style={{ backgroundColor: theme.sectionBg }}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <SectionTitle className="mb-6" style={{ color: theme.primary }}>
            {tof.featuredStory.title}
          </SectionTitle>
          <p className="text-sm sm:text-base leading-relaxed mb-6" style={{ color: theme.muted }}>
            {tof.featuredStory.intro}
          </p>
          <blockquote
            className="rounded-2xl border-l-4 p-6 sm:p-8 bg-white shadow-sm text-sm sm:text-base leading-relaxed italic"
            style={{ borderColor: theme.accent, color: theme.text }}
          >
            &ldquo;{tof.featuredStory.quote}&rdquo;
            <footer className="mt-4 not-italic text-xs font-bold" style={{ color: theme.muted }}>
              {tof.featuredStory.attribution}
            </footer>
          </blockquote>
        </div>
      </section>

      {/* Vision + lifestyle image */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <SectionTitle className="text-left mb-4" style={{ color: theme.primary }}>
              {tof.visionTitle}
            </SectionTitle>
            <p className="text-sm sm:text-base leading-relaxed mb-6" style={{ color: theme.muted }}>
              {tof.visionIntro}
            </p>
            <p className="font-bold mb-3">Imagine a life where:</p>
            <ul className="space-y-3">
              {tof.visionBullets.map((b) => (
                <li key={b} className="flex gap-2 text-sm sm:text-base">
                  <span>🔥</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm font-semibold" style={{ color: theme.primary }}>
              {tof.visionClosing}
            </p>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
            <Image src={media.splitImage} alt={media.splitImageAlt} fill className="object-cover" sizes="50vw" />
          </div>
        </div>
      </section>

      {/* Ingredients deep */}
      <section className="py-12 sm:py-16" style={{ backgroundColor: theme.sectionBg }}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <SectionTitle className="mb-3" style={{ color: theme.primary }}>
            {tof.ingredientDeepTitle}
          </SectionTitle>
          <p className="text-center text-sm max-w-2xl mx-auto mb-10" style={{ color: theme.muted }}>
            {tof.ingredientDeepIntro}
          </p>
          <div className="grid md:grid-cols-3 gap-6">
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
                  <div className="p-5">
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

      <TofCtaStrip config={config} tof={tof} />

      {/* Cost stack */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <SectionTitle className="mb-3" style={{ color: theme.primary }}>
            {tof.costStack.title}
          </SectionTitle>
          <p className="text-center text-sm mb-8" style={{ color: theme.muted }}>
            {tof.costStack.subtitle}
          </p>
          <div className="rounded-2xl border overflow-hidden" style={{ borderColor: theme.border }}>
            {tof.costStack.items.map((item) => (
              <div
                key={item.label}
                className="flex justify-between items-center px-5 py-3 border-b text-sm"
                style={{ borderColor: theme.border }}
              >
                <span>{item.label}</span>
                <span className="font-bold tabular-nums">{item.price}</span>
              </div>
            ))}
            <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x" style={{ borderColor: theme.border }}>
              <div className="p-5 text-center bg-stone-50">
                <p className="text-xs font-bold uppercase mb-1">DIY stack (monthly)</p>
                <p className="text-2xl font-black line-through text-red-600">{tof.costStack.stackTotal}</p>
                <p className="text-xs mt-1" style={{ color: theme.muted }}>
                  {tof.costStack.stackPerDay}/day
                </p>
              </div>
              <div className="p-5 text-center" style={{ backgroundColor: `${theme.accent}22` }}>
                <p className="text-xs font-bold uppercase mb-1">Critical T Best Value (120 days)</p>
                <p className="text-3xl font-black" style={{ color: theme.primary }}>
                  {tof.costStack.productTotal}
                </p>
                <p className="text-sm font-bold mt-1" style={{ color: theme.primary }}>
                  {tof.costStack.productPerDay}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compare table */}
      <section className="py-12 sm:py-16" style={{ backgroundColor: theme.sectionBg }}>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 overflow-x-auto">
          <SectionTitle className="mb-8" style={{ color: theme.primary }}>
            {tof.compareTitle}
          </SectionTitle>
          <table className="w-full min-w-[520px] text-sm border-collapse bg-white rounded-xl overflow-hidden shadow-sm">
            <thead>
              <tr style={{ backgroundColor: theme.primary, color: "#fff" }}>
                <th className="text-left p-3 font-bold">Feature</th>
                <th className="p-3 font-bold text-center">Critical T</th>
                <th className="p-3 font-bold text-center">TRT</th>
                <th className="p-3 font-bold text-center">Random booster</th>
              </tr>
            </thead>
            <tbody>
              {tof.compareRows.map((row, i) => (
                <tr key={row.label} className={i % 2 === 0 ? "bg-white" : "bg-stone-50"}>
                  <td className="p-3 font-semibold border-t" style={{ borderColor: theme.border }}>
                    {row.label}
                  </td>
                  <td className="p-3 text-center border-t font-bold" style={{ borderColor: theme.border, color: theme.primary }}>
                    {row.criticalT}
                  </td>
                  <td className="p-3 text-center border-t" style={{ borderColor: theme.border }}>
                    {row.trt}
                  </td>
                  <td className="p-3 text-center border-t" style={{ borderColor: theme.border }}>
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
        <section className="py-12 sm:py-16 bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <SectionTitle className="mb-3" style={{ color: theme.primary }}>
              Reclaim Your Edge In Weeks — Not Years
            </SectionTitle>
            <p className="text-center text-sm mb-10" style={{ color: theme.muted }}>
              Individual results vary. Most men plan a 60–90 day runway for a fair assessment.
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
              {timeline.map((step) => (
                <div
                  key={step.milestone}
                  className="rounded-xl border p-5"
                  style={{ borderColor: theme.border }}
                >
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

      {/* Pricing funnel */}
      {config.pricingFunnel?.layout === "supplement-funnel" ? <LpPricingFunnel config={config} /> : null}

      {/* Guarantee cards */}
      <section className="py-12 sm:py-16" style={{ backgroundColor: theme.sectionBg }}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <SectionTitle className="mb-8" style={{ color: theme.primary }}>
            {config.guaranteeTitle}
          </SectionTitle>
          <div className="grid md:grid-cols-3 gap-6">
            {tof.guaranteeCards.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl bg-white border p-6 text-center shadow-sm"
                style={{ borderColor: theme.border }}
              >
                <div
                  className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full text-2xl"
                  style={{ backgroundColor: `${theme.accent}33` }}
                >
                  🛡️
                </div>
                <h3 className="font-black text-base mb-3">{card.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: theme.muted }}>
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Carousel reviews */}
      <section className="py-12 sm:py-16 text-white" style={{ background: theme.primaryDark }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-black text-center mb-10">More Verified Reviews</h2>
          <LpTestimonialCarousel
            testimonials={testimonials}
            accentColor={theme.accent}
            cardBg="#0f172a"
            mutedColor="#94a3b8"
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <h2 className="text-2xl font-black text-center mb-8">Frequently Asked Questions</h2>
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

      {/* Final CTA */}
      <section className="py-14 sm:py-20 text-center text-white" style={{ background: theme.heroBg }}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-2xl sm:text-4xl font-black mb-6">{config.finalCtaHeadline}</h2>
          <LpCountdown variant="light" minutes={47} label="Last chance — pricing expires in:" />
          <div className="mt-8">
            <LpCtaButton
              ctaUrl={config.ctaUrl}
              label={tof.ctaStrip.buttonLabel}
              theme={theme}
              size="xl"
              className="w-full sm:w-auto min-w-[300px]"
            />
          </div>
        </div>
      </section>

      <LpFooter />
      <LpStickyBar config={config} />
    </div>
  );
}
