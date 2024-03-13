import Image from "next/image"

import { useTranslation } from "@/app/i18n"
import { Accordion } from "@/components/ui/accordion"
import { AppContent } from "@/components/ui/app-content"
import { Label } from "@/components/ui/label"

export default async function AboutPage({ params: { lang } }: any) {
  const { t } = await useTranslation(lang, "about-page")

  const principles: any[] =
    t("principles", {
      returnObjects: true,
    }) ?? []

  return (
    <div className="bg-anakiwa-50">
      <div className="bg-second-gradient">
        <AppContent className="flex gap-[56px]">
          <div className="grid w-full grid-cols-1 gap-16 py-10 lg:grid-cols-[1fr_1fr] lg:gap-2 lg:py-20">
            <div className="flex w-full flex-col gap-8 lg:max-w-[650px]">
              <Label.PageTitle label={t("title")} />
              <span className="font-sans text-base font-normal leading-[27px] text-tuatara-950">
                {t("description")}
              </span>
            </div>
            <Image
              width={280}
              height={280}
              className="mx-auto h-[210px] w-[210px] lg:ml-auto lg:h-[320px] lg:w-[320px]"
              src="/logos/pse-logo-bg.svg"
              alt="pse logo"
            />
          </div>
        </AppContent>
      </div>

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
