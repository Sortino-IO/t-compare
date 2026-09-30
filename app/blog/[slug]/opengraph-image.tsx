import { getAllSlugs, getPostBySlug } from "../../lib/blog";
import { resolvePrimaryTopic } from "../../lib/blog-topics";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "../../lib/og-card";

export const alt = "T-Compare article";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const topic = resolvePrimaryTopic(post?.topics);
  return renderOgCard({
    eyebrow: topic ? `${topic.label} guide` : "T-Compare guide",
    title: post?.title ?? "T-Compare",
  });
}
