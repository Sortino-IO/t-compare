import { ImageResponse } from "next/og";
import { SITE_URL } from "../lib/site";

const siteHost = new URL(SITE_URL).host;

export const alt = "About T-Compare";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#f4f8fa",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px",
          position: "relative",
        }}
      >
        <p
          style={{
            fontSize: "22px",
            color: "#5f757f",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            margin: "0 0 24px 0",
            fontFamily: "sans-serif",
          }}
        >
          About Us
        </p>
        <p
          style={{
            fontSize: "92px",
            fontWeight: "700",
            color: "#142b3a",
            margin: "0 0 18px 0",
            lineHeight: 1.05,
            fontFamily: "sans-serif",
          }}
        >
          T-Compare
        </p>
        <p
          style={{
            fontSize: "34px",
            color: "#53666e",
            margin: 0,
            fontFamily: "sans-serif",
          }}
        >
          How we build independent comparisons
        </p>
        <p
          style={{
            position: "absolute",
            bottom: "44px",
            fontSize: "20px",
            color: "#5f757f",
            margin: 0,
            fontFamily: "sans-serif",
          }}
        >
          {siteHost}
        </p>
      </div>
    ),
    { ...size }
  );
}
