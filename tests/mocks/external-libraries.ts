import React, { ReactNode } from "react"
import { vi } from "vitest"

type ComponentProps = {
  children?: ReactNode
  [key: string]: any
}

// Mock Framer Motion
export const mockFramerMotion = vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: ComponentProps): JSX.Element =>
      React.createElement("div", props, children),
    section: ({ children, ...props }: ComponentProps): JSX.Element =>
      React.createElement("section", props, children),
    h1: ({ children, ...props }: ComponentProps): JSX.Element =>
      React.createElement("h1", props, children),
    h2: ({ children, ...props }: ComponentProps): JSX.Element =>
      React.createElement("h2", props, children),
    h3: ({ children, ...props }: ComponentProps): JSX.Element =>
      React.createElement("h3", props, children),
    p: ({ children, ...props }: ComponentProps): JSX.Element =>
      React.createElement("p", props, children),
    span: ({ children, ...props }: ComponentProps): JSX.Element =>
      React.createElement("span", props, children),
    button: ({ children, ...props }: ComponentProps): JSX.Element =>
      React.createElement("button", props, children),
    a: ({ children, ...props }: ComponentProps): JSX.Element =>
      React.createElement("a", props, children),
    img: (props: ComponentProps): JSX.Element =>
      React.createElement("img", props),
  },
  AnimatePresence: ({ children }: any) => children,
  useInView: () => true,
  useAnimation: () => ({
    start: vi.fn(),
    stop: vi.fn(),
    set: vi.fn(),
  }),
  useScroll: () => ({
    scrollY: { current: 0 },
    scrollX: { current: 0 },
  }),
  useTransform: () => 0,
  useSpring: () => 0,
}))

// Mock GSAP
export const mockGsap = vi.mock("gsap", () => ({
  default: {
    to: vi.fn(),
    from: vi.fn(),
    set: vi.fn(),
    timeline: () => ({
      to: vi.fn(),
      from: vi.fn(),
      set: vi.fn(),
    }),
    registerPlugin: vi.fn(),
  },
}))

// Mock React Slick
export const mockReactSlick = vi.mock("react-slick", () => ({
  default: ({ children, ...props }: ComponentProps): JSX.Element =>
    React.createElement("div", { ...props, "data-testid": "slider" }, children),
}))

// Mock Algolia Search
export const mockAlgoliaSearch = vi.mock("algoliasearch", () => ({
  default: () => ({
    initIndex: () => ({
      search: vi.fn().mockResolvedValue({ hits: [] }),
      browse: vi.fn().mockResolvedValue({ hits: [] }),
    }),
  }),
}))

// Mock Fuse.js
export const mockFuseJs = vi.mock("fuse.js", () => ({
  default: class MockFuse {
    constructor() {}
    search() {
      return []
    }
  },
}))

// Mock Prism.js
export const mockPrismJs = vi.mock("prismjs", () => ({
  default: {
    highlight: vi.fn((code: string) => code),
    languages: {
      javascript: {},
      typescript: {},
      jsx: {},
      tsx: {},
      json: {},
      bash: {},
      css: {},
      markdown: {},
      yaml: {},
      python: {},
      rust: {},
      solidity: {},
    },
  },
}))

// Mock React Markdown
export const mockReactMarkdown = vi.mock("react-markdown", () => ({
  default: ({ children }: ComponentProps): JSX.Element =>
    React.createElement("div", { "data-testid": "markdown" }, children),
}))

// Mock Remark plugins
export const mockRemarkGfm = vi.mock("remark-gfm", () => ({
  default: vi.fn(),
}))

// Mock Rehype plugins
export const mockRehypeRaw = vi.mock("rehype-raw", () => ({
  default: vi.fn(),
}))

// Mock KaTeX
export const mockKatex = vi.mock("katex", () => ({
  default: {
    render: vi.fn(),
    renderToString: vi.fn(
      (math: string) => `<span class="katex">${math}</span>`
    ),
  },
}))
