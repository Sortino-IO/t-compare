import Image from "next/image";
import type { LandingPageConfig, LpOfferStack } from "../../lib/landing-pages";
import LpCtaButton from "./LpCtaButton";

function renderBoldText(text: string) {
  const parts = text.split(/\*\*(.*?)\*\*/);
  if (parts.length === 1) return text;
  return parts.map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part));
}

function StackLine({ text, value, variant }: { text: string; value?: string; variant: "check" | "plus" }) {
  const icon =
    variant === "plus" ? (
      <span className="shrink-0 mt-0.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-emerald-600 text-emerald-700 text-sm font-bold">
        +
      </span>
    ) : (
      <span className="shrink-0 mt-0.5 flex h-6 w-6 items-center justify-center rounded-sm bg-emerald-600 text-white text-xs font-bold">
        ✓
      </span>
    );

  return (
    <li className="flex gap-3 text-sm sm:text-[1.05rem] leading-relaxed text-stone-800">
      {icon}
      <span>
        {renderBoldText(text)}
        {value ? <span className="font-bold text-red-600"> {value}</span> : null}
      </span>
    </li>
  );
}

type Props = {
  stack: LpOfferStack;
  config: LandingPageConfig;
  className?: string;
};

export default function LpOfferStackBlock({ stack, config, className = "" }: Props) {
  const { theme, ctaUrl } = config;
  const ctaLabel = stack.ctaLabel ?? "Add To Cart";

  return (
    <section className={`px-4 sm:px-6 py-12 sm:py-16 bg-white ${className}`}>
      <div className="mx-auto max-w-2xl">
        {stack.preHeadline ? (
          <>
            <p className="text-center text-base sm:text-lg font-semibold mb-4 text-stone-800">
              {renderBoldText(stack.preHeadline)}
            </p>
            <div className="mx-auto mb-8 h-px w-24 bg-[#d4a574]" />
          </>
        ) : null}

        {stack.bundleImage ? (
          <div className="relative mx-auto mb-10 max-w-xl aspect-[4/3] sm:aspect-[16/11]">
            <Image
              src={stack.bundleImage}
              alt={stack.bundleImageAlt ?? "Product bundle"}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 640px"
            />
          </div>
        ) : null}

        <ul className="space-y-4 mb-8">
          {stack.items.map((item) => (
            <StackLine key={item.text.slice(0, 48)} text={item.text} value={item.value} variant="check" />
          ))}
        </ul>

        {stack.extras?.map((item) => (
          <p key={item.text} className="flex gap-3 text-sm sm:text-base font-bold mb-6 text-stone-800">
            <span className="shrink-0 flex h-6 w-6 items-center justify-center rounded-sm bg-emerald-600 text-white text-xs">
              ✓
            </span>
            {renderBoldText(item.text)}
          </p>
        ))}

        {stack.bonuses.length > 0 ? (
          <>
            <p className="text-center italic text-base sm:text-lg font-semibold mb-5 text-stone-700">
              {stack.bonusTitle ?? "Plus These Amazing Bonuses:"}
            </p>
            <ul className="space-y-3 mb-8 pl-2">
              {stack.bonuses.map((item) => (
                <StackLine key={item.text} text={item.text} value={item.value} variant="plus" />
              ))}
            </ul>
          </>
        ) : null}

        <div className="text-center border-t border-stone-200 pt-8">
          <p className="text-lg sm:text-xl font-bold text-red-600 underline decoration-2 underline-offset-4 mb-2">
            Total Value: {stack.totalValue}
          </p>
          {stack.priceLabel ? (
            <p className="text-sm sm:text-base font-semibold text-stone-600 mb-2">{stack.priceLabel}</p>
          ) : null}
          <p className="text-5xl sm:text-6xl font-black text-emerald-600 underline decoration-4 underline-offset-8 mb-8 tabular-nums">
            {stack.offerPrice}
          </p>

          <LpCtaButton
            ctaUrl={ctaUrl}
            label={ctaLabel}
            theme={{
              ...theme,
              accent: "#f97316",
              accentHover: "#ea580c",
              accentText: "#ffffff",
            }}
            size="xl"
            className="w-full sm:w-auto min-w-[280px] !rounded-md !text-lg sm:!text-xl !border-[#c2410c]"
            pulse
          />

          {stack.secondaryLinkLabel ? (
            <p className="mt-5">
              <a
                href={ctaUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="text-blue-600 underline font-semibold text-sm sm:text-base hover:text-blue-800"
              >
                {stack.secondaryLinkLabel}
              </a>
            </p>
          ) : null}

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 opacity-80">
            {["Visa", "Mastercard", "Amex", "PayPal", "ClickBank"].map((pay) => (
              <span
                key={pay}
                className="rounded border border-stone-300 bg-stone-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-stone-600"
              >
                {pay}
              </span>
            ))}
          </div>
          <p className="mt-4 text-xs font-semibold text-stone-500">Secure ClickBank checkout · 60-day guarantee</p>
        </div>
      </div>
    </section>
  );
}
