import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import WoodworkingArticleCard from "../../../components/woodworking/WoodworkingArticleCard";
import WoodworkingContent from "../../../components/woodworking/WoodworkingContent";
import {
  getAllWoodworkingArticles,
  getWoodworkingArticle,
  getWoodworkingSlugs,
} from "../../../lib/woodworking";
import { SITE_URL } from "../../../lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getWoodworkingSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getWoodworkingArticle(slug);
  if (!article) return { title: "Guide not found" };

  return {
    title: { absolute: article.seoTitle },
    description: article.seoDescription,
  };
}

export default async function WoodworkingArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getWoodworkingArticle(slug);
  if (!article) notFound();

  const related = getAllWoodworkingArticles()
    .filter((a) => a.slug !== slug && a.category === article.category)
    .slice(0, 3);

  const pageUrl = `${SITE_URL}/lp/woodworking/${article.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.seoDescription,
    datePublished: article.publishedAt,
    url: pageUrl,
    image: `${SITE_URL}${article.featuredImage}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="pb-16">
        <div className="border-b border-[#e7dcc8] bg-white">
          <div className="relative mx-auto aspect-[21/9] max-h-[min(48vh,480px)] w-full max-w-5xl overflow-hidden">
            <Image
              src={article.featuredImage}
              alt={article.featuredImageAlt}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#3d2914]/80 via-transparent to-transparent" />
          </div>
          <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#92400e] mb-3">
              {article.category.replace("-", " ")} · {article.readMinutes} min read
            </p>
            <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-semibold leading-tight text-[#3d2914] sm:text-4xl lg:text-[2.75rem]">
              {article.title}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[#78716c] sm:text-lg">{article.excerpt}</p>
            <p className="mt-3 text-xs text-[#a8a29e]">
              Published {new Date(article.publishedAt).toLocaleDateString("en-US", { dateStyle: "long" })}
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
          <WoodworkingContent blocks={article.content} />
        </div>

        {related.length > 0 ? (
          <section className="border-t border-[#e7dcc8] bg-[#faf7f2] py-12">
            <div className="mx-auto max-w-5xl px-4 sm:px-6">
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-[#3d2914] mb-8">
                Related guides
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((a) => (
                  <WoodworkingArticleCard key={a.slug} article={a} />
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <div className="mx-auto max-w-3xl px-4 pt-8 text-center sm:px-6">
          <Link
            href="/lp/woodworking"
            className="inline-flex text-sm font-semibold text-[#92400e] hover:text-[#3d2914] transition-colors"
          >
            ← Back to woodworking guide
          </Link>
        </div>
      </article>
    </>
  );
}
