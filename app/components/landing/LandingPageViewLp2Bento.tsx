import Image from "next/image";
import type { LandingPageConfig } from "../../lib/landing-pages";
import { ingredientImageForName } from "../../lib/lp-ingredient-images";
import { getLpMedia, withAvatars } from "../../lib/landing-page-media";
import LpCtaButton from "./LpCtaButton";
import LpFooter from "./LpFooter";
import LpPricingFunnel from "./LpPricingFunnel";
import LpStars from "./LpStars";
import LpStickyBar from "./LpStickyBar";

export default function LandingPageViewLp2Bento({ config }: { config: LandingPageConfig }) {
  const { theme } = config;
  const media = getLpMedia(config.slug);
  const testimonials = withAvatars(config.testimonials, config.slug);
  const benefits = config.benefits.slice(0, 4);
  const gallery = media.gallery;

  return (
    <div className="min-h-screen pb-24 sm:pb-0 bg-[#0a0a0a] text-white">
      {/* Dark hero — oversized type */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-center">
        <div className="absolute inset-0">
          <Image src={media.heroImage} alt={media.heroImageAlt} fill className="object-cover opacity-40" sizes="100vw" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-[#0a0a0a]" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-20 w-full">
          <p
            className="inline-block rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] mb-6 lp-bento-glow"
            style={{ borderColor: theme.accent, color: theme.accent }}
          >
            {config.urgencyHeadline}
          </p>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tighter max-w-4xl mb-6">
            {config.heroHeadline.split(". ").map((line, i) => (
              <span key={i} className="block">
                {line}
                {i < config.heroHeadline.split(". ").length - 1 ? "." : ""}
              </span>
            ))}
          </h1>
          <p className="text-lg sm:text-xl max-w-xl mb-10" style={{ color: theme.muted }}>
            {config.heroSubheadline}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <LpCtaButton
              ctaUrl={config.ctaUrl}
              label={`Get ${config.productName} →`}
              theme={theme}
              size="xl"
              className="!rounded-full !normal-case !tracking-normal"
            />
            <div className="flex items-center gap-2 px-4">
              <LpStars />
              <span className="text-sm font-semibold" style={{ color: theme.muted }}>
                4.9 · 10,000+ men
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-y border-zinc-800 py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { n: "8", l: "Premium actives" },
            { n: "60", l: "Day guarantee" },
            { n: "$49", l: "Bulk per bottle" },
            { n: "1", l: "Capsule daily" },
          ].map((s) => (
            <div key={s.l}>
              <p className="text-3xl sm:text-4xl font-black tabular-nums" style={{ color: theme.accent }}>
                {s.n}
              </p>
              <p className="text-xs uppercase tracking-widest mt-1 text-zinc-500">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bento grid benefits */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-12 max-w-lg">{config.benefitsTitle}</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 auto-rows-[180px] sm:auto-rows-[220px]">
            {benefits.map((b, i) => (
              <div
                key={b}
                className={`relative rounded-2xl overflow-hidden border border-zinc-800 p-5 flex flex-col justify-end lp-bento-card ${
                  i === 0 ? "col-span-2 row-span-2" : i === 3 ? "col-span-2" : ""
                }`}
                style={{ backgroundColor: theme.cardBg }}
              >
                {gallery[i] ? (
                  <>
                    <Image src={gallery[i]!.src} alt={gallery[i]!.alt} fill className="object-cover opacity-30" sizes="400px" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                  </>
                ) : null}
                <p className="relative font-bold text-sm sm:text-base leading-snug">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stages timeline — horizontal dark cards */}
      {config.timeline && config.timeline.length > 0 ? (
        <section className="py-16 border-t border-zinc-800" style={{ backgroundColor: theme.sectionBg }}>
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-black mb-10">The 3-Stage Protocol</h2>
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
              {config.timeline.map((step) => (
                <div
                  key={step.milestone}
                  className="snap-start shrink-0 w-[280px] sm:w-[320px] rounded-2xl border border-zinc-700 p-6"
                  style={{ backgroundColor: theme.cardBg }}
                >
                  <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: theme.accent }}>
                    {step.milestone}
                  </p>
                  <h3 className="font-black text-xl mb-2">{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: theme.muted }}>
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Ingredients — image cards */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-black mb-8">{config.ingredientsTitle}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {config.ingredients.map((ing) => {
              const ingImage = ingredientImageForName(ing.name);
              return (
              <div
                key={ing.name}
                className="rounded-2xl border border-zinc-700 overflow-hidden"
                style={{ backgroundColor: theme.cardBg }}
              >
                <div className="relative aspect-[4/3]">
                  <Image src={ingImage} alt={ing.name} fill className="object-cover opacity-80" sizes="280px" />
                </div>
                <div className="p-3 sm:p-4">
                  <p className="font-bold text-sm mb-1" style={{ color: theme.accent }}>
                    {ing.name}
                  </p>
                  <p className="text-xs leading-relaxed text-zinc-400">{ing.benefit}</p>
                </div>
              </div>
            );
            })}
          </div>
          <p className="mt-6 text-sm max-w-2xl leading-relaxed" style={{ color: theme.muted }}>
            {config.solutionParagraphs[0]}
          </p>
        </div>
      </section>

      {/* Testimonials — horizontal scroll cards */}
      <section className="py-16 border-t border-zinc-800">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 mb-8">
          <h2 className="text-2xl sm:text-3xl font-black">Real Men. Real Results.</h2>
          <p className="text-xs mt-2 text-zinc-500">* Individual results vary</p>
        </div>
        <div className="flex gap-4 overflow-x-auto px-4 sm:px-6 pb-4 snap-x">
          {testimonials.map((t) => (
            <blockquote
              key={t.name}
              className="snap-start shrink-0 w-[300px] sm:w-[340px] rounded-2xl border border-zinc-800 p-6"
              style={{ backgroundColor: theme.cardBg }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="relative h-12 w-12 rounded-full overflow-hidden ring-2 ring-[#ff4757]">
                  <Image src={t.avatarUrl} alt={t.name} fill className="object-cover" sizes="48px" />
                </div>
                <div>
                  <p className="font-bold text-sm">{t.name}</p>
                  <p className="text-xs text-zinc-500">{t.location}</p>
                </div>
              </div>
              <LpStars />
              <p className="mt-3 text-sm leading-relaxed text-zinc-300">&ldquo;{t.quote}&rdquo;</p>
            </blockquote>
          ))}
        </div>
      </section>

      {config.pricingFunnel?.layout === "supplement-funnel" ? (
        <LpPricingFunnel config={config} />
      ) : (
        <section className="py-16 sm:py-24" style={{ backgroundColor: theme.sectionBg }}>
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-3xl sm:text-4xl font-black text-center mb-12">Pick Your Stack</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {config.packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`rounded-3xl border p-6 flex flex-col backdrop-blur-sm ${
                    pkg.highlight ? "border-2 scale-105 shadow-2xl lp-bento-glow" : "border-zinc-700"
                  }`}
                  style={{
                    backgroundColor: pkg.highlight ? "rgba(255,71,87,0.08)" : theme.cardBg,
                    borderColor: pkg.highlight ? theme.accent : undefined,
                  }}
                >
                  {pkg.badge ? (
                    <span className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: theme.accent }}>
                      {pkg.badge}
                    </span>
                  ) : null}
                  <h3 className="font-black text-2xl">{pkg.title}</h3>
                  <p className="text-xs text-zinc-500 mb-6">{pkg.subtitle}</p>
                  <p className="text-5xl font-black tabular-nums">{pkg.pricePerBottle}</p>
                  <p className="text-xs text-zinc-500 mb-1">per bottle</p>
                  <p className="text-lg font-bold mb-1">{pkg.total}</p>
                  {pkg.savings ? <p className="text-sm font-bold mb-6" style={{ color: theme.accent }}>{pkg.savings}</p> : <div className="mb-6" />}
                  <LpCtaButton
                    ctaUrl={config.ctaUrl}
                    label={pkg.ctaLabel}
                    theme={theme}
                    size="md"
                    className="w-full mt-auto !rounded-full !normal-case"
                    pulse={pkg.highlight}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Guarantee */}
      <section className="py-16 border-t border-zinc-800 text-center px-4">
        <p className="text-5xl mb-4">🛡️</p>
        <h2 className="text-2xl sm:text-3xl font-black mb-4">{config.guaranteeTitle}</h2>
        <p className="text-sm max-w-lg mx-auto leading-relaxed text-zinc-400 mb-8">{config.guaranteeParagraphs[0]}</p>
        <LpCtaButton
          ctaUrl={config.ctaUrl}
          label={config.finalCtaHeadline}
          theme={theme}
          size="lg"
          className="!rounded-full !normal-case max-w-md mx-auto w-full sm:w-auto"
        />
      </section>

      <LpFooter dark />
      <LpStickyBar config={config} />
    </div>
  );
}
