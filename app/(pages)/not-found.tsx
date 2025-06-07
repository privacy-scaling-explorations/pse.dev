"use client"

import "@/globals.css"
import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Metadata } from "next"

import { baseFont, fonts } from "@/lib/fonts"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { LABELS } from "../labels"

export const metadata: Metadata = {
  title: "404: Page Not Found",
}

export default function NotFound() {
  return (
    <html
      lang="en"
      className={`${baseFont.className} ${fonts.map((font) => font.variable).join(" ")}`}
      suppressHydrationWarning
    >
      <head />
      <body className="min-h-screen">
        <div className="relative flex h-screen flex-col bg-anakiwa-50">
          <SiteHeader />
          <div className="container m-auto">
            <div className="-mt-16 flex flex-col gap-7">
              <div className="flex flex-col items-center justify-center gap-3 text-center">
                <div className="flex flex-col gap-2">
                  <Image
                    width={176}
                    height={256}
                    src="/icons/404-search.svg"
                    alt="emotion sad"
                    className="mx-auto h-12 w-12 text-anakiwa-400 md:h-64 md:w-44"
                  />
                </div>
                <div className="flex flex-col gap-5">
                  <span className="font-display text-2xl font-bold text-tuatara-950 md:text-6xl">
                    {LABELS.ERROR["404"].TITLE}
                  </span>
                  <span className="font-sans text-base font-normal md:text-lg">
                    {LABELS.ERROR["404"].DESCRIPTION}
                  </span>
                </div>
              </div>
              <Link href="/" className="mx-auto">
                <Button variant="black">{LABELS.COMMON.GO_TO_HOME}</Button>
              </Link>
            </div>
          </div>
        </div>
        <TailwindIndicator />
      </body>
    </html>
  )
}
