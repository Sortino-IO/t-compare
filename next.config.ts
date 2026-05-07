import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "fastly.picsum.photos",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      /** Legacy long-form URLs → canonical pairwise routes (content merged into `/compare/[pair]`). */
      {
        source: "/comparisons/ttime-vs-hims",
        destination: "/compare/hims-vs-ttime",
        permanent: true,
      },
      {
        source: "/comparisons/ttime-vs-maximus",
        destination: "/compare/maximus-tribe-vs-ttime",
        permanent: true,
      },
      {
        source: "/comparisons/maximus-vs-hims",
        destination: "/compare/hims-vs-maximus-tribe",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
