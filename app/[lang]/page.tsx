"use client"

import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import PSELogo from "@/public/icons/archstar.webp"
import ArrowRightVector from "@/public/icons/arrow-right.svg"
import { motion } from "framer-motion"

import { siteConfig } from "@/config/site"
import News from "@/components/sections/News"
import WhatWeDo from "@/components/sections/WhatWeDo"
import { ArrowRightUp } from "@/components/svgs/arrows"

import { useTranslation } from "../i18n/client"
import { LocaleTypes } from "../i18n/settings"

export default function IndexPage() {
  const lang = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(lang, "homepage")
  const { t: ct } = useTranslation(lang, "common")

  return (
    <section className="flex flex-col bg-main-gradient">
      <div className="flex w-full flex-col justify-between gap-5 p-7 md:flex-row md:px-20">
        <div className="flex w-full flex-col justify-center gap-6 md:w-[660px]">
          <h6 className="font-sans text-sm uppercase tracking-widest text-orange xl:text-lg">
            {t("header-title")}
          </h6>
          <motion.h1
            className="text-4xl font-bold lg:text-5xl xl:text-7xl"
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, cubicBezier: "easeOut" }}
          >
            {t("header-subtitle")}
          </motion.h1>
          <Link
            href={`/${lang}/projects`}
            className="group flex items-center gap-2"
          >
            <span className="border-b-2 border-orange text-base font-medium uppercase">
              {ct("explore-project-library")}
            </span>
            <Image
              src={ArrowRightVector}
              alt="arrowvector"
              height={20}
              width={20}
              className="duration-200 ease-in-out group-hover:translate-x-2"
            />
          </Link>
        </div>
        <div className="m-auto flex h-[364px] w-full max-w-[280px] items-center justify-center md:m-0 md:h-full md:w-full lg:max-w-[400px]">
          <Image src={PSELogo} alt="pselogo" style={{ objectFit: "cover" }} />
        </div>
      </div>

      <News />

      <div className="bg-radial-gradient flex flex-col gap-32 px-6 py-24 md:px-12">
        <section className="relative grid w-full grid-cols-1 gap-10 overflow-hidden lg:grid-cols-3 lg:gap-0">
          <h6 className="flex w-full justify-start text-xl uppercase text-orange lg:justify-center">
            {t("who-we-are")}
          </h6>
          <div className="col-span-0 flex flex-col lg:col-span-1">
            <h3 className="text-3xl font-bold">
              PSE is a research lab building free tools that expand the world of
              cryptography.
            </h3>
          </div>
        </section>

        <WhatWeDo />

        <section className="relative grid w-full grid-cols-1 gap-10 overflow-hidden lg:grid-cols-3 lg:gap-0">
          <h6 className="flex w-full justify-start text-xl uppercase text-orange lg:justify-center">
            {t("how-to-plug-in")}
          </h6>
          <div className="col-span-0 flex flex-col lg:col-span-1">
            <p className="max-w-2xl xl:text-lg">
              {`PSE is a growing team of developers, researchers, designers,
              communicators, artists, and organizers. There are so many ways to
              get involved- you can try out our apps, build with our tools,
              contribute to projects, or join our team. We'd love to hear from
              you!`}
            </p>
            <div className="p-3"></div>
            <Link
              href={siteConfig.links.discord}
              target="_blank"
              rel="noreferrer"
              passHref
              className="flex items-center gap-2"
            >
              <div className="border-b-2 border-orange text-base font-medium uppercase">
                Say Hi On Discord
              </div>
              <ArrowRightUp color="black" />
            </Link>
          </div>
        </section>
      </div>
    </section>
  )
}
