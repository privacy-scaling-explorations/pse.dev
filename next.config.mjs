import nextMdx from "@next/mdx";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const withMDX = nextMdx({
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.resolve.alias["zlib-sync"] = path.resolve(__dirname, "lib/dummy-zlib-sync.js");
      config.externals.push("erlpack");
    } else {
      config.externals.push("discord.js", "@discordjs/rest");
    }
    return config;
  },
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})
/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx", "md"],
  reactStrictMode: true,
  experimental: {
    mdxRs: true,
  },
  async redirects() {
    return [
      {
        source: "/blog",
        destination: "/en/blog",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/_next/data/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=60, s-maxage=60, stale-while-revalidate=3600",
          },
        ],
      },
    ];
  },
}

export default withMDX(nextConfig)
