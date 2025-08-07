import React, { ReactNode } from "react"
import { vi } from "vitest"

type ComponentProps = {
  children?: ReactNode
  [key: string]: any
}

// Mock Next.js Image component
export const mockNextImage = vi.mock("next/image", () => ({
  default: (props: ComponentProps): JSX.Element => {
    const { src, alt, width, height, fill, ...rest } = props
    if (fill) {
      return React.createElement("img", {
        src,
        alt,
        style: {
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        },
        ...rest,
      })
    }
    return React.createElement("img", {
      src,
      alt,
      width,
      height,
      ...rest,
    })
  },
}))

// Mock Next.js Link component
export const mockNextLink = vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: ComponentProps): JSX.Element => {
    return React.createElement("a", { href, ...props }, children)
  },
}))

// Mock Next.js Router
export const mockNextRouter = vi.mock("next/navigation", () => {
  const mockPush = vi.fn()
  const mockReplace = vi.fn()
  const mockBack = vi.fn()
  const mockForward = vi.fn()
  const mockRefresh = vi.fn()
  const mockPrefetch = vi.fn()

  return {
    useRouter: () => ({
      push: mockPush,
      replace: mockReplace,
      back: mockBack,
      forward: mockForward,
      refresh: mockRefresh,
      prefetch: mockPrefetch,
    }),
    useSearchParams: () => {
      const params = new URLSearchParams()
      return {
        get: (key: string) => params.get(key),
        getAll: (key: string) => params.getAll(key),
        has: (key: string) => params.has(key),
        keys: () => params.keys(),
        values: () => params.values(),
        entries: () => params.entries(),
        forEach: (callback: any) => params.forEach(callback),
        toString: () => params.toString(),
      }
    },
    usePathname: () => "/",
    useParams: () => ({}),
    notFound: vi.fn(),
    redirect: vi.fn(),
  }
})

// Mock Next.js Script component
export const mockNextScript = vi.mock("next/script", () => ({
  default: (props: ComponentProps): JSX.Element =>
    React.createElement("script", props),
}))

// Mock Next.js fonts
export const mockNextFonts = vi.mock("next/font/google", () => ({
  Inter: () => ({
    style: { fontFamily: "Inter" },
    variable: "--font-inter",
    className: "font-inter",
  }),
  Space_Grotesk: () => ({
    style: { fontFamily: "Space Grotesk" },
    variable: "--font-display",
    className: "font-display",
  }),
  DM_Sans: () => ({
    style: { fontFamily: "DM Sans" },
    variable: "--font-sans",
    className: "font-sans",
  }),
}))
