import Image from "next/image";
import type { LandingPageConfig } from "../../lib/landing-pages";
import { ingredientCardImage } from "../../lib/lp-ingredient-images";
import { getLpMedia, withAvatars } from "../../lib/landing-page-media";
import LpCtaButton from "./LpCtaButton";
import LpFooter from "./LpFooter";
import LpOfferStackBlock from "./LpOfferStack";
import LpPricingFunnel from "./LpPricingFunnel";
import LpStars from "./LpStars";
import LpStickyBar from "./LpStickyBar";

export default function LandingPageViewLp2Advertorial({ config }: { config: LandingPageConfig }) {
  const { theme } = config;
  const meta = config.productMeta;
  const media = getLpMedia(config.slug);
  const testimonials = withAvatars(config.testimonials, config.slug);
  const popular = config.packages.find((p) => p.highlight) ?? config.packages[0]!;
  const priceLabel = config.packagePriceLabel ?? "per bottle";
  const masthead = meta?.advertorialMasthead;
  const showPricingList =
    config.pricingFunnel?.layout !== "supplement-funnel" && (!config.offerStack || config.packages.length > 1);

  return (
    <div className="min-h-screen pb-24 sm:pb-0 lp-advertorial" style={{ backgroundColor: theme.heroBg, color: theme.text }}>
      {/* Fake publication masthead */}
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 text-center mb-1">
            {masthead?.category ?? "Men's Wellness Daily · Special Report"}
          </p>
          <h1 className="text-center font-serif text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: theme.primary }}>
            {masthead?.publication ?? "Wellness Insider"}
          </h1>
        </div>
      </header>

      {/* Article body — narrow column */}
      <article className="mx-auto max-w-3xl px-4 sm:px-6 py-8 sm:py-12">
        <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: theme.accent }}>
          {meta?.isDigitalProduct ? "Woodworking · Updated May 2026" : "Men's Health · Updated May 2026"}
        </p>

        <h2 className="font-serif text-3xl sm:text-[2.35rem] font-bold leading-[1.15] mb-5 lp-advertorial-headline">
          {config.heroHeadline}
        </h2>

        <p className="text-lg leading-relaxed mb-6 font-serif italic" style={{ color: theme.muted }}>
          {config.heroSubheadline}
        </p>

        <div className="flex items-center gap-3 pb-6 mb-8 border-b border-stone-200 text-sm">
          <div className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center font-bold text-teal-800 text-xs">
            {meta?.isDigitalProduct ? "WI" : "MW"}
          </div>
          <div>
            <p className="font-semibold">{masthead?.author ?? "By Marcus Webb, Health Editor"}</p>
            <p className="text-xs text-stone-500">12 min read · Independent review</p>
          </div>
        </div>

        {/* Lead image */}
        <figure className="mb-8 -mx-4 sm:mx-0">
          <div className="relative aspect-[16/10] sm:rounded-lg overflow-hidden">
            <Image src={media.heroImage} alt={media.heroImageAlt} fill className="object-cover" sizes="680px" priority />
          </div>
          <figcaption className="text-xs text-stone-500 mt-2 px-4 sm:px-0 italic">
            {meta?.isDigitalProduct
              ? "Shop-tested plans — each project built in Ted McGrath's workshop before publication."
              : "Consistent daily support — not overnight miracles — is what most men report after 90 days."}
          </figcaption>
        </figure>

        {/* Hook paragraphs — editorial flow */}
        <div className="prose-advertorial space-y-5 text-base sm:text-[1.05rem] leading-[1.75] mb-10">
          {config.hookParagraphs.map((p, i) => (
            <p key={p.slice(0, 40)} className={i === 0 ? "lp-advertorial-dropcap" : ""}>
              {p}
            </p>
          ))}
        </div>

        {/* Highlight box */}
        <aside
          className="rounded-lg border-l-4 p-5 sm:p-6 mb-10"
          style={{ borderColor: theme.accent, backgroundColor: theme.sectionBg }}
        >
          <p className="font-bold text-sm uppercase tracking-wide mb-3" style={{ color: theme.primary }}>
            Reader offer still active
          </p>
          <p className="text-sm leading-relaxed mb-4">{config.urgencyHeadline}</p>
          <LpCtaButton
            ctaUrl={config.ctaUrl}
            label={`Check ${config.productName} Availability →`}
            theme={theme}
            size="md"
            className="!rounded-md !normal-case !tracking-normal w-full sm:w-auto"
          />
        </aside>

        <h3 className="font-serif text-2xl font-bold mb-5 mt-12">{config.problemTitle}</h3>
        <ul className="space-y-4 mb-10">
          {config.problemBullets.map((item) => (
            <li key={item} className="flex gap-3 text-base leading-relaxed pl-1">
              <span className="shrink-0 font-serif text-xl leading-none" style={{ color: theme.accent }}>
                —
              </span>
              {item}
            </li>
          ))}
        </ul>

        <figure className="mb-10">
          <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
            <Image src={media.splitImage} alt={media.splitImageAlt} fill className="object-cover" sizes="680px" />
          </div>
        </figure>

        <h3 className="font-serif text-2xl font-bold mb-5">{config.solutionTitle}</h3>
        <div className="space-y-5 text-base leading-[1.75] mb-10">
          {config.solutionParagraphs.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </div>

        {/* Ingredients as editorial list */}
        <h3 className="font-serif text-2xl font-bold mb-6">{config.ingredientsTitle}</h3>
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          {config.ingredients.map((ing) => {
            const ingImage = ingredientCardImage(ing);
            return (
            <div key={ing.name} className="rounded-lg bg-white border border-stone-200 overflow-hidden shadow-sm">
              <div className="relative aspect-[16/10] bg-stone-100">
                <Image src={ingImage} alt={ing.name} fill className="object-cover" sizes="340px" />
              </div>
              <div className="p-4">
                <p className="font-bold mb-1" style={{ color: theme.primary }}>
                  {ing.name}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: theme.muted }}>
                  {ing.benefit}
                </p>
              </div>
            </div>
          );
          })}
        </div>

        {/* Timeline inline */}
        {config.timeline && config.timeline.length > 0 ? (
          <>
            <h3 className="font-serif text-2xl font-bold mb-6">The 90-Day Runway</h3>
            <div className="space-y-6 mb-12 border-l-2 pl-6" style={{ borderColor: theme.accent }}>
              {config.timeline.map((step) => (
                <div key={step.milestone}>
                  <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: theme.accent }}>
                    {step.milestone}
                  </p>
                  <p className="font-bold mb-1">{step.title}</p>
                  <p className="text-sm leading-relaxed" style={{ color: theme.muted }}>
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </>
        ) : null}

        {/* Comment-style testimonials */}
        <h3 className="font-serif text-2xl font-bold mb-6">Reader Comments & Verified Purchases</h3>
        <div className="space-y-6 mb-12">
          {testimonials.map((t) => (
            <blockquote key={t.name} className="bg-white rounded-lg border border-stone-200 p-5 shadow-sm">
              <div className="flex items-start gap-3 mb-3">
                <div className="relative h-11 w-11 rounded-full overflow-hidden shrink-0">
                  <Image src={t.avatarUrl} alt={t.name} fill className="object-cover" sizes="44px" />
                </div>
                <div>
                  <p className="font-bold text-sm">{t.name}</p>
                  <p className="text-xs text-stone-500">{t.location} · Verified Purchase</p>
                  <LpStars />
                </div>
              </div>
              <p className="text-sm leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              <p className="text-[10px] font-bold uppercase mt-2 text-stone-400">{t.packageLabel}</p>
            </blockquote>
          ))}
        </div>

        {/* Guarantee pull quote */}
        <blockquote className="border-y border-stone-300 py-8 my-12 text-center">
          <p className="font-serif text-xl sm:text-2xl font-bold leading-snug mb-4">{config.guaranteeTitle}</p>
          <p className="text-sm leading-relaxed max-w-lg mx-auto" style={{ color: theme.muted }}>
            {config.guaranteeParagraphs[0]}
          </p>
        </blockquote>

        {config.offerStack ? <LpOfferStackBlock stack={config.offerStack} config={config} className="!px-0 !py-8" /> : null}

        {config.pricingFunnel?.layout === "supplement-funnel" ? (
          <div className="-mx-4 sm:mx-0 mb-10">
            <LpPricingFunnel config={config} />
          </div>
        ) : showPricingList ? (
        <>
        <h3 className="font-serif text-2xl font-bold mb-6 text-center">Official Bundle Pricing</h3>
        <div className="space-y-4 mb-10">
          {config.packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-xl border-2 p-5 sm:p-6 bg-white ${pkg.highlight ? "shadow-lg" : "shadow-sm"}`}
              style={{ borderColor: pkg.highlight ? theme.accent : "#e7e5e4" }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  {pkg.badge ? (
                    <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: theme.accent }}>
                      {pkg.badge}
                    </span>
                  ) : null}
                  <h4 className="font-bold text-lg">{pkg.title}</h4>
                  <p className="text-sm text-stone-500">{pkg.subtitle}</p>
                  <p className="text-2xl font-black mt-2">
                    {pkg.pricePerBottle}
                    <span className="text-sm font-normal text-stone-500"> / {priceLabel}</span>
                  </p>
                  {pkg.savings ? <p className="text-sm font-bold text-emerald-700">{pkg.savings}</p> : null}
                </div>
                <LpCtaButton
                  ctaUrl={config.ctaUrl}
                  label={pkg.ctaLabel}
                  theme={theme}
                  size="md"
                  className="shrink-0 !rounded-md !normal-case w-full sm:w-auto"
                  pulse={pkg.highlight}
                />
              </div>
            </div>
          ))}
        </div>
        </>
        ) : null}

        {/* FAQ */}
        <h3 className="font-serif text-xl font-bold mb-4">Common Questions</h3>
        <div className="space-y-4 mb-12">
          {config.faq.map((item) => (
            <div key={item.q} className="border-b border-stone-200 pb-4">
              <p className="font-bold text-sm mb-2">{item.q}</p>
              <p className="text-sm leading-relaxed" style={{ color: theme.muted }}>
                {item.a}
              </p>
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div
          className="rounded-xl p-6 sm:p-8 text-center text-white"
          style={{ background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryDark} 100%)` }}
        >
          <h3 className="font-serif text-2xl font-bold mb-4">{config.finalCtaHeadline}</h3>
          <p className="text-sm opacity-90 mb-6">
            {popular.title}: {popular.total} · {popular.shipping}
          </p>
          <LpCtaButton
            ctaUrl={config.ctaUrl}
            label={config.offerStack?.ctaLabel ?? `Visit Official ${config.brandName} Page →`}
            theme={theme}
            size="lg"
            className="!rounded-md !normal-case w-full sm:w-auto"
          />
        </div>
      </article>

      <LpFooter />
      <LpStickyBar config={config} />
    </div>
  );
}
