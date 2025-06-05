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
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/**",
      }
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  experimental: {
    mdxRs: true,
    optimizePackageImports: ["@heroicons/react", "lucide-react"],
  },
  swcMinify: true,
}

export default withMDX(nextConfig)
