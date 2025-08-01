import "@/styles/globals.css"
import Script from "next/script"
import { Metadata, Viewport } from "next"

import { GlobalProviderLayout } from "@/components/layouts/GlobalProviderLayout"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "./components/layouts/ThemeProvider"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: "%s | PSE",
  },
  metadataBase: new URL("https://pse.dev"),
  description: siteConfig.description,
  keywords: [
    "Privacy Stewards of Ethereum",
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
      name: "Privacy Stewards of Ethereum",
      url: "https://pse.dev",
    },
  ],
  creator: "Privacy Stewards of Ethereum",
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
          title: "RSS Feed for Privacy Stewards of Ethereum",
        },
      ],
    },
  },
  icons: {
    icon: "/favicon.svg",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={cn(inter.variable, display.variable, sans.variable)}
      suppressHydrationWarning
    >
      <Script id="matomo-tracking" strategy="afterInteractive">
        {`
          var _paq = window._paq = window._paq || [];
          /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
          _paq.push(['trackPageView']);
          _paq.push(['enableLinkTracking']);
          (function() {
            var u="https://psedev.matomo.cloud/";
            _paq.push(['setTrackerUrl', u+'matomo.php']);
            _paq.push(['setSiteId', '1']);
            var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
            g.async=true; g.src='//cdn.matomo.cloud/psedev.matomo.cloud/matomo.js'; s.parentNode.insertBefore(g,s);
          })();
        `}
      </Script>
      <head />
      <body suppressHydrationWarning>
        <GlobalProviderLayout>
          <ThemeProvider>
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <div className="flex-1">{children}</div>
              <SiteFooter />
            </div>
            <TailwindIndicator />
          </ThemeProvider>
        </GlobalProviderLayout>
      </body>
    </html>
  )
}
