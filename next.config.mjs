import nextMdx from "@next/mdx"

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
  experimental: {
    mdxRs: true,
  },
}

export default withMDX(nextConfig)
