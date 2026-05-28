import Image from "next/image";
import Link from "next/link";
import type { WoodworkingArticle } from "../../lib/woodworking";

export default function WoodworkingArticleCard({ article }: { article: WoodworkingArticle }) {
  return (
    <Link
      href={`/lp/woodworking/${article.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[#e7dcc8] bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[#ede5d8]">
        <Image
          src={article.featuredImage}
          alt={article.featuredImageAlt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 400px"
        />
        <span className="absolute top-3 left-3 rounded-full bg-[#4a3728]/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
          {article.category.replace("-", " ")}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-[#92400e] mb-2">
          {article.readMinutes} min read
        </p>
        <h2 className="font-[family-name:var(--font-playfair)] text-lg font-semibold leading-snug text-[#3d2914] group-hover:text-[#92400e] transition-colors">
          {article.title}
        </h2>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-[#78716c] line-clamp-3">{article.excerpt}</p>
        <span className="mt-4 text-sm font-semibold text-[#92400e]">Read guide →</span>
      </div>
    </Link>
  );
}
