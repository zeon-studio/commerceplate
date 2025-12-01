import config from "./src/config/config.json" with { type: "json" };

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: config.base_path !== "/" ? config.base_path : "",
  trailingSlash: config.site.trailing_slash,
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.shopify.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
