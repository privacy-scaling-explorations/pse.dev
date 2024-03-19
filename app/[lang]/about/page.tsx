import React from "react"
import Image from "next/image"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Accordion } from "@/components/ui/accordion"
import { AppContent } from "@/components/ui/app-content"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"
import { PageHeader } from "@/components/page-header"
import { useTranslation } from "@/app/i18n"

const PrincipleImageSizes: Record<string, { width: number; height: number }> = {
  "principle-1": {
    width: 126,
    height: 114,
  },
  "principle-2": {
    width: 176,
    height: 260,
  },
  "principle-3": {
    width: 236,
    height: 260,
  },
  "principle-4": {
    width: 238,
    height: 260,
  },
}

export default async function AboutPage({ params: { lang } }: any) {
  const { t } = await useTranslation(lang, "about-page")
  const { t: common } = await useTranslation(lang, "common")

  const principles: any[] =
    t("principles", {
      returnObjects: true,
    }) ?? []

  return (
    <div className="bg-anakiwa-50">
      <PageHeader
        title={t("title")}
        subtitle={t("description")}
        image={
          <Image
            width={280}
            height={280}
            className="mx-auto h-[210px] w-[210px] lg:ml-auto lg:h-[320px] lg:w-[320px]"
            src="/logos/pse-logo-bg.svg"
            alt="pse logo"
          />
        }
        actions={
          <Link
            href={siteConfig.links.discord}
            target="_blank"
            rel="noreferrer"
            passHref
          >
            <Button>
              <div className="flex items-center gap-2">
                <span className="text-[14px] uppercase">
                  {common("connectWithUsOnPlatform", {
                    platform: "Discord",
                  })}
                </span>
                <Icons.arrowRight fill="white" className="h-5" />
              </div>
            </Button>
          </Link>
        }
      />

      <AppContent className="flex flex-col gap-4 py-16 md:py-24">
        <h6 className="font-display text-4xl">{t("our-principles-title")}</h6>
        <Accordion
          type="multiple"
          items={[
            ...principles?.map((principle: any, index: number) => {
              return {
                label: principle?.title,
                value: index.toString(),
                children: (
                  <span className="flex flex-col gap-4 break-words pb-12 font-sans text-lg font-normal leading-[150%]">
                    {principle.description?.map(
                      (description: string, index: number) => {
                        return <p key={index}>{description}</p>
                      }
                    )}
                  </span>
                ),
              }
            }),
          ]}
        />
      </AppContent>
    </div>
  )
}
