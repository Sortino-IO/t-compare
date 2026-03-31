import postsData from "../data/posts.json";

export type ParagraphSegment =
  | { type: "text"; text: string }
  | { type: "link"; href: string; label: string };

export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "paragraph"; segments: ParagraphSegment[] }
  | { type: "heading"; text: string; level?: 2 | 3 }
  | { type: "bulletList"; items: string[] }
  | { type: "image"; src: string; alt: string; caption?: string };

export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string;
  featuredImageAlt: string;
  publishedAt: string;
  seoTitle: string;
  seoDescription: string;
  content: BlogBlock[];
}

export const BLOG_POSTS_PER_PAGE = 4;

export function getAllPosts(): BlogPost[] {
  return [...(postsData as BlogPost[])].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
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
