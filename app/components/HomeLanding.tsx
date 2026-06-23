import Link from "next/link";
import BrandCard from "./BrandCard";
import BlogCard from "./BlogCard";
import ComparisonPairsGrid from "./ComparisonPairsGrid";
import { getBrandsByCategory } from "../lib/brands";
import { getPostBySlug } from "../lib/blog";
import {
  ENCLO_COMPARISONS,
  SUPP_COMPARISONS,
  KEY_BLOG_POSTS,
} from "../lib/nav-data";

const FEATURED_PROVIDER_COUNT = 4;
const FEATURED_SUPPLEMENT_COUNT = 4;

/** Turn a "A vs B" nav label into a short SEO description. */
function pairDescription(label: string, kind: "provider" | "supplement"): string {
  if (kind === "provider") {
    return `${label} compared on monthly price, labs, onboarding, and plan terms.`;
  }
  return `${label} compared on entry price, bulk bundles, guarantee length, and formula.`;
}

function SectionHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-[11px] font-semibold tracking-[0.2em] text-[#a8a29e] uppercase mb-2.5">
        {eyebrow}
      </p>
      <h2 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-3xl font-semibold text-[#1c1917] leading-tight">
        {title}
      </h2>
      <p className="mt-3 text-sm sm:text-base text-[#78716c] leading-relaxed">
        {intro}
      </p>
    </div>
  );
}

function SectionCta({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <div className="mt-7 flex justify-center sm:justify-start">
      <Link
        href={href}
        className="inline-flex items-center gap-2 rounded-xl border border-[#cfcabf] bg-white px-6 py-3 text-sm font-semibold text-[#1c1917] shadow-sm transition-colors hover:border-[#2a6e47] hover:text-[#2a6e47]"
      >
        {children}
        <span aria-hidden>→</span>
      </Link>
    </div>
  );
}

export default function HomeLanding() {
  const providers = getBrandsByCategory("enclomiphene");
  const supplements = getBrandsByCategory("supplement");
  const featuredProviders = providers.slice(0, FEATURED_PROVIDER_COUNT);
  const featuredSupplements = supplements.slice(0, FEATURED_SUPPLEMENT_COUNT);

  const encloPairs = ENCLO_COMPARISONS.slice(0, 4).map((c) => ({
    title: c.label,
    href: c.href,
    description: pairDescription(c.label, "provider"),
  }));

  const suppPairs = SUPP_COMPARISONS.slice(0, 4).map((c) => ({
    title: c.label,
    href: c.href,
    description: pairDescription(c.label, "supplement"),
  }));

  const blogPosts = KEY_BLOG_POSTS.map((p) => getPostBySlug(p.href.replace("/blog/", "")))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-5xl px-6 py-10 sm:py-16">
      {/* ── Hero ── */}
      <section className="text-center max-w-3xl mx-auto">
        <p className="text-[11px] font-semibold tracking-[0.2em] text-[#a8a29e] uppercase mb-3 sm:mb-4">
          Independent Informational Comparisons
        </p>
        <h1 className="font-[family-name:var(--font-playfair)] text-[2rem] sm:text-5xl lg:text-6xl font-semibold text-[#1c1917] leading-[1.08] tracking-tight mb-4 sm:mb-5">
          Compare Testosterone Providers &amp; Supplements
        </h1>
        <p className="text-sm sm:text-lg text-[#78716c] leading-relaxed max-w-2xl mx-auto">
          Enclomiphene telehealth programs and over-the-counter testosterone
          supplements, side by side. Review pricing, labs, onboarding, guarantees,
          and formulas in one place — then verify directly with each brand before you decide.
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/testosterone/enclomiphene"
            className="inline-flex items-center gap-2 rounded-xl bg-[#2a6e47] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#22593a]"
          >
            Enclomiphene providers <span aria-hidden>→</span>
          </Link>
          <Link
            href="/t-supplements"
            className="inline-flex items-center gap-2 rounded-xl border border-[#cfcabf] bg-white px-6 py-3 text-sm font-semibold text-[#1c1917] shadow-sm transition-colors hover:border-[#2a6e47] hover:text-[#2a6e47]"
          >
            Testosterone supplements <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      {/* ── Enclomiphene providers ── */}
      <section className="mt-16 sm:mt-24 pt-12 sm:pt-16 border-t border-[#e3dfd6]">
        <SectionHeader
          eyebrow="Telehealth programs"
          title="Enclomiphene providers"
          intro="Enclomiphene is a prescription option some men use to support their body's own testosterone production. Compare the leading telehealth providers by monthly price, lab requirements, and how fast you can start."
        />

        <div className="mt-8 flex flex-col gap-3">
          {featuredProviders.map((brand, i) => (
            <BrandCard key={brand.slug} brand={brand} highlight={i === 0} />
          ))}
        </div>

        <SectionCta href="/testosterone/enclomiphene">
          View all {providers.length} enclomiphene providers
        </SectionCta>
      </section>

      {/* ── Enclomiphene comparisons ── */}
      <section className="mt-16 sm:mt-24 pt-12 sm:pt-16 border-t border-[#e3dfd6]">
        <SectionHeader
          eyebrow="Head-to-head"
          title="Enclomiphene comparisons"
          intro="Not sure which program fits? These side-by-side breakdowns line up two providers on price, labs, onboarding, and plan terms so the trade-offs are easy to see."
        />

        <ComparisonPairsGrid pairs={encloPairs} />

        <SectionCta href="/comparisons">See all enclomiphene comparisons</SectionCta>
      </section>

      {/* ── Testosterone supplements ── */}
      <section className="mt-16 sm:mt-24 pt-12 sm:pt-16 border-t border-[#e3dfd6]">
        <SectionHeader
          eyebrow="Over-the-counter"
          title="Testosterone supplements"
          intro="OTC testosterone boosters use ingredients like Tongkat Ali, fenugreek, and DAA. Compare the most-searched supplements on entry price, bulk-bundle math, money-back guarantees, and formula focus."
        />

        <div className="mt-8 flex flex-col gap-3">
          {featuredSupplements.map((brand, i) => (
            <BrandCard key={brand.slug} brand={brand} highlight={i === 0} />
          ))}
        </div>

        <SectionCta href="/t-supplements">
          View all {supplements.length} testosterone supplements
        </SectionCta>
      </section>

      {/* ── Supplement comparisons ── */}
      <section className="mt-16 sm:mt-24 pt-12 sm:pt-16 border-t border-[#e3dfd6]">
        <SectionHeader
          eyebrow="Head-to-head"
          title="Testosterone Supplement comparisons"
          intro="Testosterone Supplement funnels often hide the real cost behind multi-bottle bundles. These comparisons normalize price, guarantee length, and ingredients so you can pick the better value before checkout."
        />

        <ComparisonPairsGrid pairs={suppPairs} />

        <SectionCta href="/t-supplements/comparisons">
          See all supplement comparisons
        </SectionCta>
      </section>

      {/* ── From the blog ── */}
      {blogPosts.length > 0 && (
        <section className="mt-16 sm:mt-24 pt-12 sm:pt-16 border-t border-[#e3dfd6]">
          <SectionHeader
            eyebrow="Guides & research"
            title="From the blog"
            intro="In-depth, independent guides on testosterone therapy, enclomiphene, and supplement ingredients — written to answer the questions men actually search for."
          />

          <div className="mt-8 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
            {blogPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>

          <SectionCta href="/blog">Read all articles</SectionCta>
        </section>
      )}

      {/* ── Trust / closing ── */}
      <section className="mt-16 sm:mt-24 pt-12 sm:pt-16 border-t border-[#e3dfd6] text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl sm:text-4xl lg:text-5xl font-bold text-[#1c1917] leading-[1.1] tracking-tight mb-5 sm:mb-7">
            Built to make comparison easier.
          </h2>
          <p className="text-base sm:text-xl text-[#78716c] leading-relaxed max-w-2xl mx-auto">
            T-Compare gathers publicly available information about testosterone-related
            providers and supplements into one place, so you can review pricing, onboarding
            style, and formula differences more clearly before verifying directly with each brand.
          </p>
          <p className="mt-6 text-xs text-[#b5b0a8] leading-relaxed max-w-2xl mx-auto">
            This site is for informational purposes only and does not constitute medical
            advice. Pricing is indicative and subject to change — always confirm details with
            the provider. Supplements are not FDA-approved to treat low testosterone.
          </p>
        </div>
      </section>
    </div>
  );
}
