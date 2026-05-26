import type { LandingPageConfig } from "../../lib/landing-pages";
import LpCountdown from "./LpCountdown";
import LpCtaButton from "./LpCtaButton";
import LpStickyBar from "./LpStickyBar";

function Section({
  children,
  bg,
  className = "",
}: {
  children: React.ReactNode;
  bg?: string;
  className?: string;
}) {
  return (
    <section className={`px-4 sm:px-6 py-10 sm:py-14 ${className}`} style={{ background: bg }}>
      <div className="mx-auto max-w-3xl">{children}</div>
    </section>
  );
}

function CheckList({ items, color }: { items: string[]; color: string }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm sm:text-base leading-relaxed">
          <span className="shrink-0 mt-0.5 font-bold" style={{ color }}>
            ✓
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function LandingPageView({ config }: { config: LandingPageConfig }) {
  const { theme } = config;

  return (
    <div className="min-h-screen pb-20 sm:pb-0" style={{ color: theme.text }}>
      {/* Urgency strip */}
      <div
        className="px-4 py-3 text-center text-sm sm:text-base font-bold uppercase tracking-wide text-white"
        style={{ backgroundColor: theme.accent, color: theme.accentText }}
      >
        {config.urgencyHeadline}
      </div>

      {/* Hero */}
      <header
        className="px-4 sm:px-6 pt-10 pb-12 sm:pt-14 sm:pb-16 text-white text-center"
        style={{ background: theme.heroBg }}
      >
        <div className="mx-auto max-w-3xl">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] opacity-80 mb-4">
            Limited offer · Private page
          </p>
          <h1 className="text-2xl sm:text-4xl lg:text-[2.75rem] font-bold leading-tight mb-5">
            {config.heroHeadline}
          </h1>
          <p className="text-base sm:text-lg opacity-90 leading-relaxed max-w-2xl mx-auto mb-8">
            {config.heroSubheadline}
          </p>

          <div className="text-left bg-white/10 backdrop-blur-sm rounded-xl p-5 sm:p-6 mb-8 border border-white/20">
            <CheckList items={config.heroBullets} color={theme.accent} />
          </div>

          <LpCountdown className="mb-8 text-white" minutes={47} />

          <LpCtaButton
            ctaUrl={config.ctaUrl}
            label={`Yes! Get ${config.productName} Now →`}
            theme={theme}
          />

          <p className="mt-4 text-xs sm:text-sm opacity-75">
            Includes money-back guarantee · Secure checkout on official site
          </p>
        </div>
      </header>

      {/* Hook copy */}
      <Section bg={theme.sectionBg}>
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-6" style={{ color: theme.primary }}>
          Your Benefits at a Glance
        </h2>
        <div className="space-y-4 text-sm sm:text-base leading-relaxed" style={{ color: theme.muted }}>
          {config.hookParagraphs.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </div>
        <div className="mt-8 text-center">
          <LpCtaButton
            ctaUrl={config.ctaUrl}
            label={`Try ${config.productName} Risk-Free →`}
            theme={theme}
            size="md"
          />
        </div>
      </Section>

      {/* Problem */}
      <Section bg={theme.cardBg}>
        <h2
          className="text-xl sm:text-2xl font-bold text-center mb-6 leading-snug"
          style={{ color: theme.primary }}
        >
          {config.problemTitle}
        </h2>
        <div
          className="rounded-xl border p-5 sm:p-6"
          style={{ borderColor: theme.border, backgroundColor: theme.sectionBg }}
        >
          <ul className="space-y-3">
            {config.problemBullets.map((item) => (
              <li key={item} className="flex gap-3 text-sm sm:text-base leading-relaxed">
                <span className="shrink-0 font-bold text-red-600">✕</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Solution */}
      <Section bg={theme.sectionBg}>
        <h2
          className="text-xl sm:text-2xl font-bold text-center mb-6 leading-snug"
          style={{ color: theme.primary }}
        >
          {config.solutionTitle}
        </h2>
        <div className="space-y-4 text-sm sm:text-base leading-relaxed" style={{ color: theme.muted }}>
          {config.solutionParagraphs.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </div>
      </Section>

      {/* Ingredients */}
      <Section bg={theme.cardBg}>
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-8" style={{ color: theme.primary }}>
          {config.ingredientsTitle}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {config.ingredients.map((ing) => (
            <div
              key={ing.name}
              className="rounded-xl border p-4 sm:p-5"
              style={{ borderColor: theme.border, backgroundColor: theme.sectionBg }}
            >
              <h3 className="font-bold text-base sm:text-lg mb-1" style={{ color: theme.primary }}>
                {ing.name}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: theme.muted }}>
                {ing.benefit}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Benefits */}
      <Section bg={theme.sectionBg}>
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-6" style={{ color: theme.primary }}>
          {config.benefitsTitle}
        </h2>
        <CheckList items={config.benefits} color={theme.primary} />
      </Section>

      {/* Testimonials */}
      <Section bg={theme.cardBg}>
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-2" style={{ color: theme.primary }}>
          Real {config.productName} Users
        </h2>
        <p className="text-center text-sm mb-8" style={{ color: theme.muted }}>
          Verified purchaser-style feedback · Individual results may vary
        </p>
        <div className="space-y-5">
          {config.testimonials.map((t) => (
            <blockquote
              key={t.name}
              className="rounded-xl border p-5 sm:p-6"
              style={{ borderColor: theme.border, backgroundColor: theme.sectionBg }}
            >
              <div className="flex items-center gap-1 text-amber-500 text-sm mb-3" aria-hidden="true">
                ★★★★★
              </div>
              <p className="text-sm sm:text-base leading-relaxed italic mb-4">&ldquo;{t.quote}&rdquo;</p>
              <footer className="text-sm">
                <strong>{t.name}</strong>
                <span style={{ color: theme.muted }}> · {t.location}</span>
                <div className="text-xs mt-1" style={{ color: theme.muted }}>
                  Purchased {t.packageLabel}
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </Section>

      {/* Pricing */}
      <Section bg={theme.sectionBg} className="!max-w-none">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-2" style={{ color: theme.primary }}>
            Choose Your Package
          </h2>
          <p className="text-center text-sm mb-6" style={{ color: theme.muted }}>
            All orders processed on the official secure checkout
          </p>
          <LpCountdown className="mb-8" minutes={47} />

          <div className="grid gap-5 md:grid-cols-3">
            {config.packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative rounded-2xl border-2 p-5 sm:p-6 flex flex-col ${
                  pkg.highlight ? "shadow-xl scale-[1.02] md:scale-105" : "shadow-md"
                }`}
                style={{
                  borderColor: pkg.highlight ? theme.accent : theme.border,
                  backgroundColor: theme.cardBg,
                }}
              >
                {pkg.badge ? (
                  <span
                    className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wide"
                    style={{ backgroundColor: theme.accent, color: theme.accentText }}
                  >
                    {pkg.badge}
                  </span>
                ) : null}
                {pkg.highlight ? (
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest mb-2 text-center"
                    style={{ color: theme.primary }}
                  >
                    ★ Recommended ★
                  </span>
                ) : null}

                <h3 className="text-lg font-bold text-center" style={{ color: theme.primary }}>
                  {pkg.title}
                </h3>
                <p className="text-xs sm:text-sm text-center mt-1 mb-4" style={{ color: theme.muted }}>
                  {pkg.subtitle}
                </p>

                <div className="text-center mb-4">
                  <div className="text-3xl sm:text-4xl font-bold tabular-nums" style={{ color: theme.primary }}>
                    {pkg.pricePerBottle}
                  </div>
                  <div className="text-xs uppercase tracking-wide mt-1" style={{ color: theme.muted }}>
                    per bottle
                  </div>
                </div>

                {pkg.savings ? (
                  <p className="text-center text-sm font-semibold text-green-700 mb-2">{pkg.savings}</p>
                ) : null}
                {pkg.regularTotal ? (
                  <p className="text-center text-sm mb-1">
                    <span className="line-through opacity-50">{pkg.regularTotal}</span>
                  </p>
                ) : null}
                <p className="text-center text-xl font-bold mb-1">{pkg.total}</p>
                <p className="text-center text-xs mb-5" style={{ color: theme.muted }}>
                  {pkg.shipping}
                </p>

                <div className="mt-auto">
                  <LpCtaButton
                    ctaUrl={config.ctaUrl}
                    label={pkg.ctaLabel}
                    theme={theme}
                    size="md"
                    className="w-full text-sm !px-4"
                  />
                </div>
                <p className="text-[10px] text-center mt-3 opacity-70">60-day guarantee</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Guarantee */}
      <Section bg={theme.cardBg}>
        <div
          className="rounded-2xl border-2 p-6 sm:p-8 text-center"
          style={{ borderColor: theme.accent, backgroundColor: theme.sectionBg }}
        >
          <div className="text-4xl mb-4" aria-hidden="true">
            🛡️
          </div>
          <h2 className="text-xl sm:text-2xl font-bold mb-4" style={{ color: theme.primary }}>
            {config.guaranteeTitle}
          </h2>
          <div className="space-y-3 text-sm sm:text-base leading-relaxed text-left max-w-xl mx-auto" style={{ color: theme.muted }}>
            {config.guaranteeParagraphs.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
          <div className="mt-8">
            <LpCtaButton
              ctaUrl={config.ctaUrl}
              label={`Start My ${config.productName} Trial →`}
              theme={theme}
            />
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section bg={theme.sectionBg}>
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-8" style={{ color: theme.primary }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {config.faq.map((item) => (
            <details
              key={item.q}
              className="rounded-xl border bg-white group open:shadow-md"
              style={{ borderColor: theme.border }}
            >
              <summary className="cursor-pointer list-none px-5 py-4 font-semibold text-sm sm:text-base flex items-center justify-between gap-2">
                {item.q}
                <span className="text-lg opacity-40 group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="px-5 pb-4 text-sm leading-relaxed" style={{ color: theme.muted }}>
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <section
        className="px-4 sm:px-6 py-12 sm:py-16 text-white text-center"
        style={{ background: theme.heroBg }}
      >
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">{config.finalCtaHeadline}</h2>
          <LpCountdown className="mb-8 text-white" minutes={47} label="Inventory hold expires in:" />
          <LpCtaButton
            ctaUrl={config.ctaUrl}
            label={`Claim ${config.productName} Now →`}
            theme={theme}
          />
          <p className="mt-6 text-xs sm:text-sm opacity-75 max-w-lg mx-auto leading-relaxed">
            Secure checkout on the official {config.brandName} order page. Pricing and availability
            subject to change — confirm live totals before you pay.
          </p>
        </div>
      </section>

      {/* Disclaimer footer */}
      <footer className="px-4 sm:px-6 py-8 text-[10px] sm:text-xs leading-relaxed text-center max-w-3xl mx-auto opacity-70">
        <p className="mb-3">
          These statements have not been evaluated by the Food and Drug Administration. This product
          is not intended to diagnose, treat, cure, or prevent any disease. The information on this
          page is for educational and marketing purposes only and is not medical advice.
        </p>
        <p>
          Consult your healthcare provider before starting any supplement, especially if you take
          medication or have a medical condition. Individual results vary. Testimonials reflect
          experiences reported by product users and are not guaranteed outcomes.
        </p>
        <p className="mt-4">
          <a href="/disclaimer" className="underline hover:opacity-100">
            Full disclaimer
          </a>
          {" · "}
          <a href="/privacy" className="underline hover:opacity-100">
            Privacy
          </a>
        </p>
      </footer>

      <LpStickyBar config={config} />
    </div>
  );
}
