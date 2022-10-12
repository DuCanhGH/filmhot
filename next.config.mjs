import withPWAInit from "next-pwa";
import runtimeCaching from "next-pwa/cache.js";

const withPWA = withPWAInit({
  dest: "public",
  runtimeCaching,
  disable: process.env.NODE_ENV !== "production",
});

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
        ],
      },
    ];
  },
  experimental: {
    newNextLinkBehavior: true,
  },
  images: {
    domains: ["images.weserv.nl"],
  },
};

export default withPWA(nextConfig);
