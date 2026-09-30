import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "../lib/blog";

export default function BlogCard({
  post,
  priority = false,
}: {
  post: BlogPost;
  priority?: boolean;
}) {
  return (
    <article>
      <Link
        href={`/blog/${post.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#e3e3e3] bg-white transition-colors hover:border-[#a9cbd8]"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-[#ededed]">
          <Image
            src={post.featuredImage}
            alt={post.featuredImageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            priority={priority}
            fetchPriority={priority ? "high" : "auto"}
          />
        </div>
        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <h2 className="tc-display line-clamp-2 text-base font-bold leading-snug transition-colors group-hover:text-[#176b87] sm:text-lg">
            {post.title}
          </h2>
          <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-[#53666e]">
            {post.excerpt}
          </p>
          <span className="mt-4 inline-flex items-center text-sm font-semibold text-[#176b87]">
            Read article
            <span className="ml-1 transition-transform group-hover:translate-x-0.5" aria-hidden>
              →
            </span>
          </span>
        </div>
      </Link>
    </article>
  );
}
