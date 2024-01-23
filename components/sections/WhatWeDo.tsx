"use client"

import Image from "next/image"
import PSELogoCircle from "@/public/logos/pse-logo-circle.svg"

import { LangProps } from "@/types/common"
import { cn } from "@/lib/utils"
import { useTranslation } from "@/app/i18n/client"

type WhatWeDoContent = {
  title: string
  description: string
  className?: string
}

export const WhatWeDo = ({ lang }: LangProps["params"]) => {
  const { t } = useTranslation(lang, "what-we-do-section")

  const content: WhatWeDoContent[] = [
    {
      title: t("privacy.title"),
      description: t("privacy.description"),
      className: "privacyDesc",
    },
    {
      title: t("scaling.title"),
      description: t("scaling.description"),
      className: "scalingDesc",
    },
    {
      title: t("explorations.title"),
      description: t("explorations.description"),
      className: "explorationsDesc",
    },
  ]

  return (
    <section className="badge-start-trigger relative grid w-full grid-cols-1 gap-10 overflow-hidden md:grid-cols-2 lg:grid-cols-3 lg:gap-0">
      <h6 className="hidden w-full justify-start text-xl uppercase text-orange lg:flex lg:justify-center">
        {t("whatWeDo")}
      </h6>
      <div className="flex flex-col gap-10">
        <h6 className="flex w-full justify-start text-xl uppercase text-orange lg:hidden lg:justify-center">
          {t("whatWeDo")}
        </h6>

        <div className="flex flex-col gap-6">
          <div className="mb-10 flex w-full items-start justify-center md:hidden lg:hidden">
            <Image
              src={PSELogoCircle}
              alt="pselogocircle"
              style={{ objectFit: "contain" }}
              width={208}
              height={208}
            />
          </div>
          {content.map((item, index) => (
            <article
              className={cn("pb-12 last-of-type:pb-8 lg:pb-24", item.className)}
              key={index}
            >
              <h3 className="text-3xl">{item.title}</h3>
              <div className="p-2"></div>
              <p className="text-lg">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
      <div className="lg-order-none relative order-2 hidden md:flex self-start lg:mx-auto">
        <Image
          src="/logos/pse-logo-circle.svg"
          height={213}
          width={213}
          alt="pse logo circle"
        />
      </div>
    </section>
  )
}
