import "@/styles/globals.css"
import React from "react"
import Image from "next/image"
import Link from "next/link"

import { fontDisplay, fontSans } from "@/lib/fonts"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"

export default function NotFound() {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontDisplay.variable}`}
      suppressHydrationWarning
    >
      <head />
      <body className="min-h-screen">
        <div className="relative flex flex-col h-screen bg-anakiwa-50">
          <SiteHeader />
          <div className="container m-auto">
            <div className="flex flex-col -mt-16 gap-7">
              <div className="flex flex-col items-center justify-center gap-3 text-center">
                <div className="flex flex-col gap-2">
                  <Image
                    width={80}
                    height={80}
                    src="/icons/emotion-sad-line.svg"
                    alt="emotion sad"
                    className="w-12 h-12 mx-auto md:w-20 md:h-20 text-anakiwa-400"
                  />
                  <span className="text-5xl font-bold text-anakiwa-400 md:text-8xl font-display">
                    404
                  </span>
                </div>
                <div className="flex flex-col gap-5">
                  <span className="text-2xl font-bold md:text-6xl text-tuatara-950 font-display">
                    Oops! Page not found
                  </span>
                  <span className="font-sans text-base font-normal md:text-lg">
                    The page you are looking for might have been removed, had
                    its name changed or is temporarily unavailable.
                  </span>
                </div>
              </div>
              <Link href="/" className="mx-auto">
                <Button variant="black">Go to homepage</Button>
              </Link>
            </div>
          </div>
        </div>
        <TailwindIndicator />
      </body>
    </html>
  )
}
