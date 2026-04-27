import type { MetadataRoute } from "next";
import { getAllBrands } from "./lib/brands";
import { getAllPosts } from "./lib/blog";
import { discoverStaticAppRoutes } from "./lib/sitemap-routes";
import { SITE_URL } from "./lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const brands = getAllBrands();

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

  const brandEntries: MetadataRoute.Sitemap = brands.map((brand) => ({
    url: `${SITE_URL}/testosterone/enclomiphene/${brand.slug}`,
    lastModified: new Date(brand.lastReviewed),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const comparisonEntries: MetadataRoute.Sitemap = [];
  for (let i = 0; i < brands.length; i++) {
    for (let j = i + 1; j < brands.length; j++) {
      const a = brands[i]!;
      const b = brands[j]!;
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
