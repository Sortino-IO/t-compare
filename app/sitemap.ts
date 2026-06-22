import type { MetadataRoute } from "next";
import { getBrandPairs, getBrandsByCategory } from "./lib/brands";
import { getAllPosts } from "./lib/blog";
import { discoverStaticAppRoutes } from "./lib/sitemap-routes";
import { SITE_URL } from "./lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = discoverStaticAppRoutes().map(
    ({ pathname, lastModified }) => ({
      url: `${SITE_URL}${pathname}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: pathname === "" ? 1 : 0.85,
    }),
  );

  const blogEntries: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const brandEntries: MetadataRoute.Sitemap = [];
  const comparisonEntries: MetadataRoute.Sitemap = [];

  for (const brand of getBrandsByCategory("enclomiphene")) {
    brandEntries.push({
      url: `${SITE_URL}/testosterone/enclomiphene/${brand.slug}`,
      lastModified: new Date(brand.lastReviewed),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  for (const { a, b } of getBrandPairs("enclomiphene")) {
    const slugs = [a.slug, b.slug].sort();
    const lastModified =
      new Date(a.lastReviewed) > new Date(b.lastReviewed)
        ? new Date(a.lastReviewed)
        : new Date(b.lastReviewed);
    comparisonEntries.push({
      url: `${SITE_URL}/compare/${slugs[0]}-vs-${slugs[1]}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.78,
    });
  }

  for (const brand of getBrandsByCategory("supplement")) {
    brandEntries.push({
      url: `${SITE_URL}/t-supplements/${brand.slug}`,
      lastModified: new Date(brand.lastReviewed),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  for (const { a, b } of getBrandPairs("supplement")) {
    const slugs = [a.slug, b.slug].sort();
    const lastModified =
      new Date(a.lastReviewed) > new Date(b.lastReviewed)
        ? new Date(a.lastReviewed)
        : new Date(b.lastReviewed);
    comparisonEntries.push({
      url: `${SITE_URL}/t-supplements/compare/${slugs[0]}-vs-${slugs[1]}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.78,
    });
  }

  return [
    ...staticEntries,
    ...blogEntries,
    ...brandEntries,
    ...comparisonEntries,
  ];
}
