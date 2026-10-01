import Link from "next/link";
import { getBrandDetailPath, getComparePairPath, type Brand } from "../lib/brands";
import { formatReviewedDate } from "../lib/brand-display";
import { hasPublishedPrice, publishedAnnualCost } from "../lib/provider-facts";
import { mentionedProviders } from "./BlogProviderLinks";

function line(b: Brand): string {
  if (!hasPublishedPrice(b)) return `${b.name}: price not published`;
  const annual = b.facts ? publishedAnnualCost(b.facts) : null;
  return `${b.name}: ${b.priceLabel.replace(/^From\s+/i, "from ")}${annual ? ` (~$${annual.toLocaleString("en-US")} for 12 months with labs)` : ""}`;
}

/** Current prices for the providers an article is about, linking to the page that compares them. */
export default function BlogPriceCheck({ text, className = "" }: { text: string; className?: string }) {
  const brands = mentionedProviders(text).slice(0, 2);
  if (brands.length === 0) return null;
  const [a, b] = brands;
  const href = b ? getComparePairPath("enclomiphene", a!.slug, b.slug) : getBrandDetailPath(a!);
  const cta = b ? `See ${a!.name} vs ${b.name} side by side` : `See ${a!.name}'s price, labs and terms`;
  const checked = brands
    .map((x) => x.facts?.checkedOn)
    .filter(Boolean)
    .sort()
    .at(-1);

  return (
    <aside className={`rounded-xl border border-[#cfe3d9] bg-[#f1f8f4] p-4 sm:p-5 ${className}`}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1f7a5a]">
        Price check{checked ? `, updated ${formatReviewedDate(checked)}` : ""}
      </p>
      <ul className="mt-1.5 space-y-1 text-[15px] text-[#3c535e]">
        {brands.map((x) => (
          <li key={x.slug}>✓ {line(x)}</li>
        ))}
      </ul>
      <Link href={href} className="mt-2.5 inline-block text-sm font-semibold text-[#176b87] hover:underline">
        {cta} →
      </Link>
    </aside>
  );
}
