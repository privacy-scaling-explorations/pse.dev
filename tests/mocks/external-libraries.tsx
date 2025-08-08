import React from "react"
import { vi } from "vitest"

// Mock Framer Motion
export const mockFramerMotion = vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => (
      <section {...props}>{children}</section>
    ),
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    h3: ({ children, ...props }: any) => <h3 {...props}>{children}</h3>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
    button: ({ children, ...props }: any) => (
      <button {...props}>{children}</button>
    ),
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
    img: (props: any) => <img {...props} />,
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
  default: ({ children, ...props }: any) => (
    <div data-testid="slider" {...props}>
      {children}
    </div>
  ),
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
  default: ({ children }: any) => <div data-testid="markdown">{children}</div>,
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
