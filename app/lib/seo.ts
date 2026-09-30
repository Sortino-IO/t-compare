import type { Metadata } from "next";
import { SITE_URL } from "./site";

/** Absolute canonical URL for a site path (leading slash, no trailing slash on origin). */
export function absoluteUrl(path: string): string {
  if (!path || path === "/") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function canonicalAlternates(path: string): Metadata["alternates"] {
  return { canonical: absoluteUrl(path) };
}

export type BreadcrumbItem = { name: string; path: string };

export function breadcrumbListSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function itemListSchema(
  name: string,
  pagePath: string,
  entries: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    url: absoluteUrl(pagePath),
    numberOfItems: entries.length,
    itemListElement: entries.map((e, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: e.name,
      url: absoluteUrl(e.path),
    })),
  };
}

/** Trim to ~155 chars for meta descriptions without mid-word cuts when possible. */
export function metaDescription(text: string, max = 158): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 80 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}
