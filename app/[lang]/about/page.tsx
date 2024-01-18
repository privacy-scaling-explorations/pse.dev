import React from "react"
import Image from "next/image"

import { Accordion } from "@/components/ui/accordion"
import { AppContent } from "@/components/ui/app-content"
import { useTranslation } from "@/app/i18n"

interface PrincipleContentProps {
  image: string
  children: React.ReactNode
  width?: number
  height?: number
}

const PrincipleContent = ({
  image,
  children,
  width = 300,
  height = 300,
}: PrincipleContentProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 py-4 md:mb-8 md:grid-cols-2 md:items-center md:gap-2 md:py-6">
      <div className="m-auto py-6 md:py-0">
        <Image
          width={width}
          height={height}
          src={image}
          alt="principle image"
        />
      </div>
      <span className="flex flex-col gap-4 break-words font-sans text-lg font-normal leading-[150%]">
        {children}
      </span>
    </div>
  )
}

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

  const principles: any[] =
    t("principles", {
      returnObjects: true,
    }) ?? []

  return (
    <div className="bg-anakiwa-200">
      <div className="bg-second-gradient">
        <AppContent>
          <div className="mx-auto grid grid-cols-1 gap-16 py-10 lg:grid-cols-[1fr_300px] lg:gap-2 lg:py-20">
            <div className="flex flex-col gap-8 lg:w-4/5">
              <h6 className="break-words font-display text-4xl font-bold text-tuatara-950 md:py-4 md:text-5xl">
                {t("title")}
              </h6>
              <span className="font-sans text-base font-normal leading-[27px] text-tuatara-950">
                {t("description")}
              </span>
            </div>
          </div>
        </AppContent>
      </div>

      <AppContent className="flex flex-col gap-4 py-16 md:py-24">
        <div className="mx-auto pb-4">
          <Image
            width={280}
            height={280}
            src="/logos/pse-logo-bg.svg"
            alt="pse logo"
          />
        </div>
        <h6 className="font-display text-4xl">{t("our-principles-title")}</h6>
        <Accordion
          type="multiple"
          items={[
            ...principles?.map((principle: any, index: number) => {
              const imageIndex = index + 1
              const { width, height } =
                PrincipleImageSizes[`principle-${imageIndex}`] ?? {}

              return {
                label: principle?.title,
                value: imageIndex.toString(),
                children: (
                  <PrincipleContent
                    width={width}
                    height={height}
                    image={`/logos/principle-${imageIndex}.svg`}
                  >
                    {principle.description?.map(
                      (description: string, index: number) => {
                        return <p key={index}>{description}</p>
                      }
                    )}
                  </PrincipleContent>
                ),
              }
            }),
          ]}
        />
      </AppContent>
    </div>
  )
}
