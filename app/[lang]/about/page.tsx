import Link from "next/link"

import { siteConfig } from "@/site-config"
import { Accordion } from "@/components/ui/accordion"
import { AppContent } from "@/components/ui/app-content"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Banner } from "@/components/banner"
import { Divider } from "@/components/divider"
import { Icons } from "@/components/icons"
import { PageHeader } from "@/components/page-header"
import { useTranslation } from "@/app/i18n"

export default async function AboutPage({ params: { lang } }: any) {
  const { t } = await useTranslation(lang, "about-page")
  const { t: common } = await useTranslation(lang, "common")

  const principles: any[] =
    (t("principles", {
      returnObjects: true,
    }) as any[]) ?? []

  return (
    <div className="flex flex-col">
      <div className="w-full bg-page-header-gradient">
        <AppContent className="flex flex-col gap-4 py-10 w-full max-w-[978px] mx-auto">
          <Label.PageTitle label={t("title")} />
          <h6 className="font-sans text-base font-normal text-tuatara-950 md:text-[18px] md:leading-[27px] md:max-w-[700px]">
            {t("description")}
          </h6>
          <Link
            href={siteConfig.links.discord}
            target="_blank"
            rel="noreferrer"
            className="self-start"
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
        </AppContent>
      </div>
      <Divider.Section className="bg-white">
        <div className="flex justify-center">
          <AppContent className="container flex w-full max-w-[978px] flex-col gap-8 py-10 md:py-16">
            <Label.Section
              className="text-center"
              label={t("our-principles-title")}
            />
            <Accordion
              type="multiple"
              items={[
                ...principles.map((principle: any, index: number) => {
                  return {
                    label: principle.title,
                    value: index.toString(),
                    children: (
                      <span className="flex flex-col gap-6 break-words pb-12 font-sans text-lg font-normal leading-[150%]">
                        {principle.description.map(
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

        <Banner title={t("banner.title")} subtitle={t("banner.subtitle")}>
          <Link
            href={siteConfig.links.discord}
            target="_blank"
            rel="noreferrer"
            className="w-fit mx-auto"
            passHref
          >
            <Button>
              <div className="flex items-center gap-2">
                <Icons.discord fill="white" className="h-4" />
                <span className="text-[14px] uppercase">
                  {common("joinOurDiscord")}
                </span>
                <Icons.externalUrl fill="white" className="h-5" />
              </div>
            </Button>
          </Link>
        </Banner>
      </Divider.Section>
    </div>
  )
}
