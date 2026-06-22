import { ImageResponse } from "next/og";
import { getAllSlugs, getPostBySlug } from "../../lib/blog";
import { SITE_URL } from "../../lib/site";

const siteHost = new URL(SITE_URL).host;

export const alt = "T-Compare article";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

function titleFontSize(title: string): number {
  if (title.length > 64) return 52;
  if (title.length > 44) return 62;
  return 74;
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const title = post?.title ?? "T-Compare";

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
          position: "relative",
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
          T-Compare · Enclomiphene Guide
        </p>

        <p
          style={{
            fontSize: `${titleFontSize(title)}px`,
            fontWeight: 700,
            color: "#1c1917",
            margin: 0,
            lineHeight: 1.1,
            fontFamily: "serif",
            display: "flex",
          }}
        >
          {title}
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
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
