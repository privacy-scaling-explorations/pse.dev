import { resolve } from "path"

export const nextEslintPlugin = {
  plugins: {
    "@next/next": {
      files: ["app/**/*", "components/**/*", "layouts/**/*"],
      settings: {
        next: {
          rootDir: resolve("./"),
        },
      },
      rules: {
        "@next/next/no-html-link-for-pages": "off",
        "@next/next/no-img-element": "warn",
        "@next/next/no-sync-scripts": "error",
      },
    },
  },
} 