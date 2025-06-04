import "@/styles/globals.css"
import { Metadata, Viewport } from "next"

import { siteConfig } from "@/config/site"
import { languages } from "./i18n/settings"
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

export async function generateStaticParams() {
  return languages.map((language) => ({ language }))
}

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Radix UI",
  ],
  authors: [
    {
      name: "PSE",
      url: "https://pse.dev",
    },
  ],
  creator: "PSE",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    creator: "@pse",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
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
        <head>
          <link
            rel="preconnect"
            href="https://fonts.googleapis.com"
            crossOrigin="anonymous"
          />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/fallback.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        </head>
        <body className="min-h-screen bg-background antialiased">
          {children}
        </body>
      </html>
    </QueryClientProviderLayout>
  )
}
