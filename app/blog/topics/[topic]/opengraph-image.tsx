import { ImageResponse } from "next/og";
import { getUsedTopicSlugs } from "../../../lib/blog";
import { BLOG_TOPICS, getBlogTopic } from "../../../lib/blog-topics";
import { SITE_URL } from "../../../lib/site";

const siteHost = new URL(SITE_URL).host;

export const alt = "T-Compare topic hub";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
  const heading = topic?.heading ?? "T-Compare";

  return new ImageResponse(
    (
      <div
        style={{
          background: "#f5f3ee",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
        }}
      >
        <p
          style={{
            fontSize: "22px",
            color: "#a8a29e",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            margin: 0,
            fontFamily: "serif",
          }}
        >
          T-Compare · Topic Hub
        </p>
        <p
          style={{
            fontSize: heading.length > 40 ? "60px" : "72px",
            fontWeight: 700,
            color: "#1c1917",
            margin: 0,
            lineHeight: 1.1,
            fontFamily: "serif",
            display: "flex",
          }}
        >
          {heading}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ width: "40px", height: "2px", background: "#cfc9bd" }} />
          <p
            style={{
              fontSize: "22px",
              color: "#78716c",
              margin: 0,
              fontFamily: "sans-serif",
            }}
          >
            {siteHost}
          </p>
        </div>
      </div>
    ),
    { ...size },
  );
}
