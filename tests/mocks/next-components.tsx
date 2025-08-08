import React from "react"
import { vi } from "vitest"

// Mock Next.js Image component
export const mockNextImage = vi.mock("next/image", () => ({
  default: (props: any) => {
    const { src, alt, width, height, fill, ...rest } = props
    if (fill) {
      return (
        <img
          src={src}
          alt={alt}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          {...rest}
        />
      )
    }
    return <img src={src} alt={alt} width={width} height={height} {...rest} />
  },
}))

// Mock Next.js Link component
export const mockNextLink = vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: any) => {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    )
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
  default: (props: any) => <script {...props} />,
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
