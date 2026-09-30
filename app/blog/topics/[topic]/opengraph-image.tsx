import { getUsedTopicSlugs } from "../../../lib/blog";
import { BLOG_TOPICS, getBlogTopic } from "../../../lib/blog-topics";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "../../../lib/og-card";

export const alt = "T-Compare topic hub";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  const used = new Set(getUsedTopicSlugs());
  return Object.keys(BLOG_TOPICS)
    .filter((slug) => used.has(slug))
    .map((topic) => ({ topic }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic: slug } = await params;
  const topic = getBlogTopic(slug);
  return renderOgCard({
    eyebrow: "Topic hub",
    title: topic?.heading ?? "T-Compare",
  });
}
