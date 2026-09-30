import Link from "next/link";
import {
  getBrandDetailPath,
  getBrandsByCategory,
  getComparePairPath,
  type Brand,
} from "../lib/brands";

type Props = {
  /** Post title + slug, used to find providers the article is about. */
  text: string;
  className?: string;
};

function mentioned(text: string): Brand[] {
  const hay = text.toLowerCase();
  const word = (w: string) => new RegExp(`(^|[^a-z0-9])${w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}([^a-z0-9]|$)`).test(hay);
  return getBrandsByCategory("enclomiphene").filter((b) => {
    const first = b.name.toLowerCase().split(/[\s+]/)[0]!;
    return word(b.slug) || word(b.name.toLowerCase()) || (first.length > 3 && word(first));
  });
}

/** Contextual links from enclomiphene articles into the comparison pages. */
export default function BlogProviderLinks({ text, className = "" }: Props) {
  const brands = mentioned(text).slice(0, 3);
  const links: { href: string; label: string }[] = [];

  if (brands.length >= 2) {
    const [a, b] = brands;
    links.push({
      href: getComparePairPath("enclomiphene", a!.slug, b!.slug),
      label: `${a!.name} vs ${b!.name}: side-by-side comparison`,
    });
  }
  for (const b of brands) {
    links.push({ href: getBrandDetailPath(b), label: `${b.name} enclomiphene: price, labs and terms` });
  }
  links.push(
    { href: "/testosterone/enclomiphene", label: "All enclomiphene providers compared" },
    { href: "/tools/enclomiphene-cost-calculator", label: "12-month enclomiphene cost calculator" },
    { href: "/comparisons", label: "Every head-to-head provider comparison" },
  );

  return (
    <nav aria-label="Compare providers" className={`rounded-xl border border-[#e3e3e3] bg-white p-5 ${className}`}>
      <h2 className="text-base font-semibold text-[#142b3a]">Compare before you choose</h2>
      <ul className="mt-3 space-y-2 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="font-medium text-[#176b87] hover:underline">
              {l.label} →
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
