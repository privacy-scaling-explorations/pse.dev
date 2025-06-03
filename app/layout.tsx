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
})

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
})

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
})

const fonts = [inter, display, sans]

export async function generateStaticParams() {
  return languages.map((language) => ({ language }))
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  metadataBase: new URL("https://pse.dev"),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
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

interface RootLayoutProps {
  children: React.ReactNode
  params?: any
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <QueryClientProviderLayout>
      <html lang="en" className={fonts.map((font) => font.className).join(" ")}>
        <body>{children}</body>
      </html>
    </QueryClientProviderLayout>
  )
}
