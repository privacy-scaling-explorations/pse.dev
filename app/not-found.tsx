"use client"

import "@/styles/globals.css"
import React from "react"
import Image from "next/image"
import Link from "next/link"

import { LangProps } from "@/types/common"
import { fontDisplay, fontSans } from "@/lib/fonts"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"

import { useTranslation } from "./i18n/client"

export default function NotFound({ lang }: LangProps["params"]) {
  const { t } = useTranslation(lang, "common")

  return (
    <html
      lang={lang}
      className={`${fontSans.variable} ${fontDisplay.variable}`}
      suppressHydrationWarning
    >
      <head />
      <body className="min-h-screen">
        <div className="relative flex h-screen flex-col bg-anakiwa-50">
          <SiteHeader lang={lang} />
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
                    {t("error.404.title")}
                  </span>
                  <span className="font-sans text-base font-normal md:text-lg">
                    {t("error.404.description")}
                  </span>
                </div>
              </div>
              <Link href={`/${lang}`} className="mx-auto">
                <Button variant="black">{t("goToHome")}</Button>
              </Link>
            </div>
          </div>
        </div>
        <TailwindIndicator />
      </body>
    </html>
  )
}
