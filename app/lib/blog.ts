import postsData from "../data/posts.json";

export type ParagraphSegment =
  | { type: "text"; text: string }
  | { type: "link"; href: string; label: string };

export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "paragraph"; segments: ParagraphSegment[] }
  | { type: "heading"; text: string; level?: 2 | 3 }
  | { type: "bulletList"; items: string[] }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "disclaimer"; paragraphs: string[] };

export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string;
  featuredImageAlt: string;
  publishedAt: string;
  /** Optional last-updated date; falls back to publishedAt for sitemap + JSON-LD. */
  updatedAt?: string;
  /** Topic slugs used to group posts into browsable hubs (e.g. "critical-t"). */
  topics?: string[];
  seoTitle: string;
  seoDescription: string;
  content: BlogBlock[];
}

export const BLOG_POSTS_PER_PAGE = 15;

/** Always listed first on /blog (chronological sort applies to all other posts). */
const PINNED_FIRST_SLUG = "how-ttime-cut-enclomiphene-costs";

export function getAllPosts(): BlogPost[] {
  const all = [...(postsData as BlogPost[])];
  const pinned = all.find((p) => p.slug === PINNED_FIRST_SLUG);
  const rest = all
    .filter((p) => p.slug !== PINNED_FIRST_SLUG)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  return pinned ? [pinned, ...rest] : rest;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return (postsData as BlogPost[]).find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return (postsData as BlogPost[]).map((p) => p.slug);
}

export function getPostsPage(page: number): {
  posts: BlogPost[];
  totalPages: number;
  total: number;
  currentPage: number;
} {
  const all = getAllPosts();
  const total = all.length;
  const totalPages = Math.max(1, Math.ceil(total / BLOG_POSTS_PER_PAGE));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * BLOG_POSTS_PER_PAGE;
  const posts = all.slice(start, start + BLOG_POSTS_PER_PAGE);
  return { posts, totalPages, total, currentPage };
}

/**
 * Related articles, prioritizing posts that share a topic with the given post,
 * then filling the rest by recency. Pinned ordering does not apply here.
 */
export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const all = postsData as BlogPost[];
  const current = all.find((p) => p.slug === slug);
  const currentTopics = new Set(current?.topics ?? []);

  const byRecency = (a: BlogPost, b: BlogPost) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();

  const candidates = all.filter((p) => p.slug !== slug);
  const sameTopic = candidates
    .filter((p) => (p.topics ?? []).some((t) => currentTopics.has(t)))
    .sort(byRecency);
  const rest = candidates
    .filter((p) => !sameTopic.includes(p))
    .sort(byRecency);

  return [...sameTopic, ...rest].slice(0, Math.max(1, limit));
}

/** All posts tagged with a topic slug, newest first. */
export function getPostsByTopic(topic: string): BlogPost[] {
  return (postsData as BlogPost[])
    .filter((p) => (p.topics ?? []).includes(topic))
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

/** Distinct topic slugs that are actually used by at least one post. */
export function getUsedTopicSlugs(): string[] {
  const set = new Set<string>();
  for (const p of postsData as BlogPost[]) {
    for (const t of p.topics ?? []) set.add(t);
  }
  return [...set];
}
