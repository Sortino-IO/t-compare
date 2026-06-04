import type { Metadata } from "next";
import Link from "next/link";
import WoodworkingArticleCard from "../../components/woodworking/WoodworkingArticleCard";
import WoodworkingCta from "../../components/woodworking/WoodworkingCta";
import { LP_NOINDEX_ROBOTS } from "../../lib/lp-robots";
import { getAllWoodworkingArticles, WOODWORKING_HUB } from "../../lib/woodworking";

export const metadata: Metadata = {
  title: { absolute: WOODWORKING_HUB.seoTitle },
  description: WOODWORKING_HUB.seoDescription,
  robots: LP_NOINDEX_ROBOTS,
};

const CATEGORY_INTRO: Record<string, { title: string; body: string }> = {
  "getting-started": {
    title: "Getting started",
    body: "Safety, lumber basics, joinery, and your first shop — without buying tools you will never use.",
  },
  tools: {
    title: "Tools & gear",
    body: "Table saws, essential hand tools, and what actually matters when searches say \"woodworking tools.\"",
  },
  projects: {
    title: "Projects",
    body: "Easy builds and side-income ideas tied to high-volume searches like woodworking projects and DIY plans.",
  },
  plans: {
    title: "Plans",
    body: "How to pick complete blueprints — the #1 gap between inspiration and a finished piece.",
  },
  workshop: {
    title: "Workshop",
    body: "Garage layouts, storage, and small-shop workflows.",
  },
};

export default function WoodworkingHubPage() {
  const articles = getAllWoodworkingArticles();
  const categories = ["getting-started", "tools", "projects", "plans", "workshop"] as const;

  return (
    <div className="pb-16">
      <section className="border-b border-[#e7dcc8] bg-white">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-semibold leading-tight text-[#3d2914] sm:text-5xl">
            What is woodworking — and where should beginners start?
          </h1>
          <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-[#57534e] sm:text-lg">
            <p>
              Woodworking is building useful or decorative objects from lumber using measured cuts, joinery, and
              finishing. For hobbyists, it usually happens in a garage or basement shop with portable power tools — not
              a industrial facility.
            </p>
            <p>
              The hobby breaks down into three repeating loops: <strong>pick a plan</strong>,{" "}
              <strong>buy the right materials</strong>, and <strong>follow steps in order</strong>. Most frustration
              comes from skipping the first step — starting from a photo instead of a complete blueprint.
            </p>
            <p>
              This guide hub covers the topics beginners search most: getting started, essential tools, table saws, easy
              projects, plan selection, workshop setup, and safety. Every guide links to shop-tested plan libraries when
              you are ready to build.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <WoodworkingCta
          title="16,000 plans built before you download them"
          body="TedsWoodworking is a searchable library — not a zip file dump. Lifetime access for $67 while the offer lasts (standard rate moving to $39/month)."
        />
      </section>

      {categories.map((cat) => {
        const items = articles.filter((a) => a.category === cat);
        if (items.length === 0) return null;
        const intro = CATEGORY_INTRO[cat]!;
        return (
          <section key={cat} className="border-t border-[#e7dcc8] py-12 sm:py-14">
            <div className="mx-auto max-w-5xl px-4 sm:px-6">
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-[#3d2914] sm:text-3xl">
                {intro.title}
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-[#78716c] sm:text-base">{intro.body}</p>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((article) => (
                  <WoodworkingArticleCard key={article.slug} article={article} />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section id="all-guides" className="border-t border-[#e7dcc8] bg-[#f5efe6] py-12 sm:py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-[#3d2914] sm:text-3xl mb-2">
            All woodworking guides
          </h2>
          <p className="text-sm text-[#78716c] mb-8">{articles.length} articles · Updated May 2026</p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {articles.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/lp/woodworking/${a.slug}`}
                  className="block rounded-lg border border-[#e7dcc8] bg-white px-4 py-3 text-sm font-semibold text-[#3d2914] hover:border-[#c17817] hover:text-[#92400e] transition-colors"
                >
                  {a.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
