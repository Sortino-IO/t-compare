import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "../lib/blog";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article>
      <Link
        href={`/blog/${post.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#e3dfd6] bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#2a6e47]/25 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2a6e47]"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-[#edeae2]">
          <Image
            src={post.featuredImage}
            alt={post.featuredImageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </div>
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <h2 className="font-[family-name:var(--font-playfair)] text-xl font-semibold leading-snug text-[#1c1917] transition-colors line-clamp-2 group-hover:text-[#2a6e47]">
            {post.title}
          </h2>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-[#78716c] line-clamp-3">
            {post.excerpt}
          </p>
          <span className="mt-5 inline-flex items-center text-sm font-semibold text-[#2a6e47]">
            Read more
            <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
              →
            </span>
          </span>
        </div>
      </Link>
    </article>
  );
}
