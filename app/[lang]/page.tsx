"use client"

import Image from "next/image"
import Link from "next/link"
import PSELogo from "@/public/icons/archstar.webp"
import { motion } from "framer-motion"

import { siteConfig } from "@/config/site"
import { AppContent } from "@/components/ui/app-content"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { NewsSection } from "@/components/sections/NewsSection"
import { WhatWeDo } from "@/components/sections/WhatWeDo"

import { useTranslation } from "../i18n/client"

export default function IndexPage({ params: { lang } }: any) {
  const { t } = useTranslation(lang, "homepage")
  const { t: ct } = useTranslation(lang, "common")

  return (
    <section className="flex flex-col bg-main-gradient">
      <AppContent className="flex w-full flex-col justify-between gap-5 p-7 md:flex-row">
        <div className="flex w-full flex-col justify-center gap-8 md:max-w-[700px] lg:gap-14">
          <motion.h1
            className="text-4xl font-bold lg:text-6xl xl:text-7xl"
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, cubicBezier: "easeOut" }}
          >
            {t("headerTitle")}
          </motion.h1>
          <h6 className="font-sans text-base font-normal text-tuatara-950 md:text-[20px]">
            {t("headerSubtitle")}
          </h6>
          <Link href={`/projects`} className="group flex items-center gap-2">
            <Button className="w-full sm:w-auto">
              <div className="flex items-center gap-1">
                <span className="text-base font-medium uppercase">
                  {ct("exploreProjectLibrary")}
                </span>
                <Icons.arrowRight
                  fill="white"
                  className="h-5 duration-200 ease-in-out group-hover:translate-x-2"
                />
              </div>
            </Button>
          </Link>
        </div>
        <div className="m-auto flex h-[320px] w-full max-w-[280px] items-center justify-center md:m-0 md:h-full md:w-full lg:max-w-[380px]">
          <Image src={PSELogo} alt="pselogo" style={{ objectFit: "cover" }} />
        </div>
      </AppContent>

      <NewsSection lang={lang} />

      <div className="bg-radial-gradient flex flex-col">
        <WhatWeDo lang={lang} />

        <section className="relative border-y border-tuatara-600 bg-[#D0F2FF] pb-16 pt-8 text-center">
          <AppContent className="flex flex-col gap-6">
            <div className="flex flex-col items-center text-center">
              <h6 className="py-6 font-sans text-base font-bold uppercase tracking-[4px] text-tuatara-950">
                {t("howToPlugIn")}
              </h6>
              <p className="md:max-w-2xl">{t("howToPlugInDescription")}</p>
            </div>
            <Link
              href={siteConfig.links.discord}
              target="_blank"
              rel="noreferrer"
              passHref
            >
              <Button>
                <div className="flex items-center gap-2">
                  <Icons.discord fill="white" className="h-4" />
                  <span className="text-[14px] uppercase">
                    {t("joinOurDiscord")}
                  </span>
                  <Icons.externalUrl fill="white" className="h-5" />
                </div>
              </Button>
            </Link>
          </AppContent>
        </section>
      </div>
    </section>
  )
}
