import "@/styles/globals.css"
import { Metadata, Viewport } from "next"

import { siteConfig } from "@/config/site"
import { QueryClientProviderLayout } from "@/components/layouts/QueryProviderLayout"

import { DM_Sans, Inter, Space_Grotesk } from "next/font/google"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
  adjustFontFallback: true,
})

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
  adjustFontFallback: true,
})

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
  adjustFontFallback: true,
})

const fonts = [inter, display, sans]

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Privacy & Scaling Explorations",
    "Zero Knowledge Proofs",
    "ZK Proofs",
    "Cryptography",
    "Ethereum",
    "Blockchain",
    "Privacy",
    "Scaling",
    "Open Source",
    "Research",
    "Development",
    "zkEVM",
    "Rollups",
    "Account Abstraction",
    "Fully Homomorphic Encryption",
    "Multi-Party Computation",
    "Programmable Cryptography",
    "Ethereum Foundation",
    "Cryptographic Research",
    "Privacy Tools",
    "Scaling Solutions",
    "Cryptographic Primitives",
    "Zero Knowledge",
    "ZK Technology",
    "Cryptographic Infrastructure",
  ],
  authors: [
    {
      name: "Privacy + Scaling Explorations",
      url: "https://pse.dev",
    },
  ],
  creator: "Privacy + Scaling Explorations",
  openGraph: {
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  alternates: {
    types: {
      "application/rss+xml": [
        {
          url: "/api/rss",
          title: "RSS Feed for Privacy & Scaling Explorations",
        },
      ],
    },
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <QueryClientProviderLayout>
      <html lang="en" className={fonts.map((font) => font.className).join(" ")}>
        <body className="min-h-screen bg-background antialiased">
          {children}
        </body>
      </html>
    </QueryClientProviderLayout>
  )
}
