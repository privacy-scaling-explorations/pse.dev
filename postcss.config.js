/** @type {import('postcss-load-config').Config} */
/* eslint-disable no-undef */

module.exports = {
  plugins: {
    "postcss-import": {},
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === "production" && {
      "@fullhuman/postcss-purgecss": {
        content: [
          "./app/**/*.{js,jsx,ts,tsx}",
          "./components/**/*.{js,jsx,ts,tsx}",
          "./lib/**/*.{js,jsx,ts,tsx}",
          "./content/**/*.{md,mdx}",
        ],
        defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
        safelist: {
          standard: [
            "html",
            "body",
            "dark",
            /^slick-/,
            /^katex/,
            /^hljs/,
            /^bg-gradient-/,
            /^text-gradient-/,
            "math-only",
            "accordion",
            "hover-icon",
            "writing-mode-vertical-rl",
            // Responsive utilities
            "hidden",
            "flex",
            "block",
            "inline-block",
            /^sm:/,
            /^md:/,
            /^lg:/,
            /^xl:/,
            /^2xl:/,
          ],
          deep: [
            /^slick/,
            /^katex/,
            /^hljs/,
            /accordion/,
            /math/,
            /^(sm|md|lg|xl|2xl):/,
          ],
        },
      },
    }),
    "postcss-preset-env": {
      stage: 1,
      features: {
        "nesting-rules": true,
        "custom-properties": true,
      },
    },
  },
}
