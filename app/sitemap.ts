import type { MetadataRoute } from "next";
import { getAllBrands } from "./lib/brands";
import { getAllPosts } from "./lib/blog";
import { SITE_URL } from "./lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/about",
    "/blog",
    "/disclaimer",
    "/privacy",
    "/terms",
    "/testosterone",
    "/testosterone/enclomiphene",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "weekly",
    priority: path === "" ? 1 : 0.85,
  }));

  const blogEntries: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const brandEntries: MetadataRoute.Sitemap = getAllBrands().map((brand) => ({
    url: `${SITE_URL}/testosterone/enclomiphene/${brand.slug}`,
    lastModified: new Date(brand.lastReviewed),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticEntries, ...blogEntries, ...brandEntries];
}
