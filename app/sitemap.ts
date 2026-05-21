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
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const brandEntries: MetadataRoute.Sitemap = [];
  const comparisonEntries: MetadataRoute.Sitemap = [];

  for (const category of ["enclomiphene", "supplement"] as const) {
    const brands = getBrandsByCategory(category);
    for (const brand of brands) {
      brandEntries.push({
        url: `${SITE_URL}/testosterone/${category}/${brand.slug}`,
        lastModified: new Date(brand.lastReviewed),
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }

    for (const { a, b } of getBrandPairs(category)) {
      const slugs = [a.slug, b.slug].sort();
      const lastA = new Date(a.lastReviewed);
      const lastB = new Date(b.lastReviewed);
      const lastModified = lastA > lastB ? lastA : lastB;
      comparisonEntries.push({
        url: `${SITE_URL}/compare/${slugs[0]}-vs-${slugs[1]}`,
        lastModified,
        changeFrequency: "weekly",
        priority: 0.78,
      });
    }
  }

  return [...staticEntries, ...blogEntries, ...brandEntries, ...comparisonEntries];
}
