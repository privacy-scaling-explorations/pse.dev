import "@/globals.css"
import { Metadata, Viewport } from "next"

import { siteConfig } from "@/site-config"
import { QueryClientProviderLayout } from "@/components/layouts/QueryProviderLayout"
import Script from "next/script"

import { TailwindIndicator } from "@/components/tailwind-indicator"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { baseFont, fonts } from "@/lib/fonts"

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
    <html lang="en" suppressHydrationWarning>
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
      <body
        suppressHydrationWarning
        className={`${baseFont.className} ${fonts.map((font) => font.variable).join(" ")} min-h-screen bg-background antialiased`}
      >
        <QueryClientProviderLayout>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <div className="flex-1">{children}</div>
            <SiteFooter />
          </div>
        </QueryClientProviderLayout>

        <TailwindIndicator />
      </body>
    </html>
  )
}
