import nextMdx from "@next/mdx";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const withMDX = nextMdx({
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
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.resolve.alias["zlib-sync"] = path.resolve(__dirname, "lib/dummy-zlib-sync.js");
      config.externals.push("erlpack");
    } else {
      config.externals.push("discord.js", "@discordjs/rest");
    }
    return config;
  },
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
    minimumCacheTTL: 31536000, // 1 year cache for images
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Static asset caching headers
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on"
          }
        ]
      },
      {
        source: "/favicon.(ico|svg|png)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable"
          }
        ]
      },
      {
        source: "/:path*\\.(css|js|woff|woff2|ttf|otf)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable"
          }
        ]
      },
      {
        source: "/:path*\\.(jpg|jpeg|png|gif|webp|svg|avif)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable"
          }
        ]
      },
      {
        source: "/articles/:path*",
        headers: [
          {
            key: "Cache-Control", 
            value: "public, max-age=31536000, immutable"
          }
        ]
      }
    ]
  },
  compiler: {
    // Remove React DevTools in production
    // eslint-disable-next-line no-undef
    removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: {
    mdxRs: true,
    optimizePackageImports: ["@heroicons/react", "lucide-react"],
    // Use modern compilation target
    esmExternals: true,
  },
  swcMinify: true,
}

export default withMDX(nextConfig)
