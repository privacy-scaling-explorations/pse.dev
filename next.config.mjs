import nextMdx from "@next/mdx"

const withMDX = nextMdx({
  webpack: (config, { isServer }) => {
    if (!isServer) {
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
    appDir: true,
    mdxRs: true,
  },
}

export default withMDX(nextConfig)
