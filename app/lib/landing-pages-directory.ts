import { LANDING_PAGES, type LandingPageConfig } from "./landing-pages";
import { getAllWoodworkingArticles, WOODWORKING_HUB } from "./woodworking";

export type LpDirectoryEntry = {
  title: string;
  subtitle: string;
  href: string;
  tags: string[];
};

export type LpDirectoryGroup = {
  id: string;
  label: string;
  description: string;
  entries: LpDirectoryEntry[];
};

function lpVariantLabel(page: LandingPageConfig): string {
  const variant = page.variant ?? (page.slug.endsWith("-lp2") ? "lp2" : "lp1");
  if (page.slug.endsWith("-lp3")) return "LP3";
  if (variant === "lp2" && page.lp2Style) {
    const style =
      page.lp2Style === "dtc"
        ? "DTC"
        : page.lp2Style === "advertorial"
          ? "Advertorial"
          : "Bento";
    return `LP2 · ${style}`;
  }
  return variant === "lp2" ? "LP2" : "LP1";
}

function sortPages(a: LandingPageConfig, b: LandingPageConfig): number {
  const rank = (s: string) => {
    if (s.endsWith("-lp1")) return 1;
    if (s.endsWith("-lp2")) return 2;
    if (s.endsWith("-lp3")) return 3;
    return 4;
  };
  return rank(a.slug) - rank(b.slug) || a.slug.localeCompare(b.slug);
}

function brandGroup(
  id: string,
  label: string,
  description: string,
  pages: LandingPageConfig[],
): LpDirectoryGroup {
  return {
    id,
    label,
    description,
    entries: [...pages].sort(sortPages).map((page) => ({
      title: page.productName,
      subtitle: page.seoTitle,
      href: `/lp/${page.slug}`,
      tags: [lpVariantLabel(page)],
    })),
  };
}

export function getLandingPagesDirectory(): LpDirectoryGroup[] {
  const byBrand = new Map<string, LandingPageConfig[]>();
  for (const page of LANDING_PAGES) {
    const list = byBrand.get(page.brandName) ?? [];
    list.push(page);
    byBrand.set(page.brandName, list);
  }

  const supplementBrands = ["Critical T", "EndoPeak", "ErecPrime"] as const;
  const groups: LpDirectoryGroup[] = [];

  groups.push({
    id: "testosterone",
    label: "Testosterone supplements",
    description: "Critical T, EndoPeak, and ErecPrime — LP1 and LP2 variants.",
    entries: supplementBrands.flatMap((brand) => {
      const pages = byBrand.get(brand) ?? [];
      return [...pages].sort(sortPages).map((page) => ({
        title: `${page.brandName} — ${lpVariantLabel(page)}`,
        subtitle: page.slug,
        href: `/lp/${page.slug}`,
        tags: [lpVariantLabel(page)],
      }));
    }),
  });

  const nitric = byBrand.get("Nitric Boost");
  if (nitric?.length) {
    groups.push(
      brandGroup(
        "nitric",
        "Nitric Boost",
        "Blood-flow / performance supplement funnels.",
        nitric,
      ),
    );
  }

  const teds = byBrand.get("TedsWoodworking");
  if (teds?.length) {
    groups.push(
      brandGroup(
        "teds",
        "Ted's Woodworking",
        "ClickBank offer pages — three layout tests.",
        teds,
      ),
    );
  }

  const articles = getAllWoodworkingArticles();
  groups.push({
    id: "woodworking",
    label: "Woodworking SEO hub",
    description: "Content hub under /lp/woodworking (not ClickBank LPs).",
    entries: [
      {
        title: WOODWORKING_HUB.title,
        subtitle: "Hub index",
        href: "/lp/woodworking",
        tags: ["Hub"],
      },
      ...articles.map((a) => ({
        title: a.title,
        subtitle: a.slug,
        href: `/lp/woodworking/${a.slug}`,
        tags: [a.category.replace("-", " ")],
      })),
    ],
  });

  return groups;
}

export function getLandingPagesDirectoryStats(groups: LpDirectoryGroup[]) {
  const offerPages = LANDING_PAGES.length;
  const woodworkingArticles = getAllWoodworkingArticles().length;
  const totalLinks = groups.reduce((n, g) => n + g.entries.length, 0);
  return { offerPages, woodworkingArticles, totalLinks };
}
