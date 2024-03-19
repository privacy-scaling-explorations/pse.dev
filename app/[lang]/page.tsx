"use client"

import Image from "next/image"
import Link from "next/link"
import PSELogo from "@/public/icons/archstar.webp"
import { motion } from "framer-motion"

import { siteConfig } from "@/config/site"
import { AppContent } from "@/components/ui/app-content"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Banner } from "@/components/banner"
import { Icons } from "@/components/icons"
import { PageHeader } from "@/components/page-header"
import { NewsSection } from "@/components/sections/NewsSection"
import { WhatWeDo } from "@/components/sections/WhatWeDo"

import { useTranslation } from "../i18n/client"

export default function IndexPage({ params: { lang } }: any) {
  const { t } = useTranslation(lang, "homepage")
  const { t: common } = useTranslation(lang, "common")

  return (
    <section className="flex flex-col">
      <PageHeader
        title={
          <motion.h1
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, cubicBezier: "easeOut" }}
          >
            <Label.PageTitle label={t("headerTitle")} />
          </motion.h1>
        }
        subtitle={t("headerSubtitle")}
        image={
          <div className="m-auto flex h-[320px] w-full max-w-[280px] items-center justify-center md:m-0 md:h-full md:w-full lg:max-w-[380px]">
            <Image src={PSELogo} alt="pselogo" style={{ objectFit: "cover" }} />
          </div>
        }
        actions={
          <Link href={`/projects`} className="group flex items-center gap-2">
            <Button className="w-full sm:w-auto">
              <div className="flex items-center gap-1">
                <span className="text-base font-medium uppercase">
                  {common("exploreProjectLibrary")}
                </span>
                <Icons.arrowRight
                  fill="white"
                  className="h-5 duration-200 ease-in-out group-hover:translate-x-2"
                />
              </div>
            </Button>
          </Link>
        }
      />

      <NewsSection lang={lang} />

      <div className="flex flex-col">
        <WhatWeDo lang={lang} />

        <Banner
          title={common("connectWithUs")}
          subtitle={common("connectWithUsDescription")}
        >
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
        </Banner>
      </div>
    </section>
  )
}
