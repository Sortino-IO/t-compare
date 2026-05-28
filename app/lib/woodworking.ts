import type { BlogBlock } from "./blog";
import { WOODWORKING_ARTICLES } from "../data/woodworking-articles";

export type WoodworkingBlock =
  | BlogBlock
  | { type: "woodworkingCta"; title?: string; body?: string };

export type WoodworkingArticle = {
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string;
  featuredImageAlt: string;
  publishedAt: string;
  seoTitle: string;
  seoDescription: string;
  /** Primary keyword cluster (monthly search volume reference). */
  targetKeyword: string;
  readMinutes: number;
  category: "getting-started" | "tools" | "projects" | "plans" | "workshop";
  content: WoodworkingBlock[];
};

export const WOODWORKING_HUB = {
  title: "Woodworking Guide",
  seoTitle: "Woodworking Guide — Projects, Tools & Plans for Beginners",
  seoDescription:
    "Practical woodworking guides for beginners: essential tools, table saw picks, easy projects, workshop setup, and how to find plans that actually work.",
};

export function getAllWoodworkingArticles(): WoodworkingArticle[] {
  return [...WOODWORKING_ARTICLES].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getWoodworkingArticle(slug: string): WoodworkingArticle | undefined {
  return WOODWORKING_ARTICLES.find((a) => a.slug === slug);
}

export function getWoodworkingSlugs(): string[] {
  return WOODWORKING_ARTICLES.map((a) => a.slug);
}

export function getWoodworkingByCategory(category: WoodworkingArticle["category"]): WoodworkingArticle[] {
  return getAllWoodworkingArticles().filter((a) => a.category === category);
}

export const WOODWORKING_NAV = [
  { href: "/lp/woodworking", label: "Home" },
  { href: "/lp/woodworking/how-to-start-woodworking", label: "Getting Started" },
  { href: "/lp/woodworking/essential-woodworking-tools-beginners", label: "Tools" },
  { href: "/lp/woodworking/easy-woodworking-projects-beginners", label: "Projects" },
  { href: "/lp/woodworking/woodworking-plans-guide", label: "Plans" },
] as const;
