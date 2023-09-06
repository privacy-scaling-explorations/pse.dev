import "@/styles/globals.css"
import { Metadata } from "next"
import Script from "next/script"

import { siteConfig } from "@/config/site"
import { fontDisplay, fontSans } from "@/lib/fonts"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"

// import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  metadataBase: new URL("https://appliedzkp.org"),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
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
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html
        lang="en"
        className={`${fontSans.variable} ${fontDisplay.variable}`}
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
        <body className={"min-h-screen bg-background antialiased"}>
          <div className="relative flex flex-col min-h-screen">
            <SiteHeader />
            <div className="flex-1">{children}</div>
            <SiteFooter />
          </div>
          <TailwindIndicator />
        </body>
      </html>
    </>
  )
}
