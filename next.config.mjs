import nextMdx from "@next/mdx";
import path from "path";
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const withMDX = nextMdx({
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.resolve.alias['zlib-sync'] = path.resolve(__dirname, 'lib/dummy-zlib-sync.js');
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
    appDir: true,
    mdxRs: true,
  },
}

export default withMDX(nextConfig)
