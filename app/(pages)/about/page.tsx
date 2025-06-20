import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Accordion } from "@/components/ui/accordion"
import { AppContent } from "@/components/ui/app-content"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Banner } from "@/components/banner"
import { Divider } from "@/components/divider"
import { Icons } from "@/components/icons"
import { LABELS } from "@/app/labels"
import { interpolate } from "@/lib/utils"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "About",
  description: "About the Privacy & Scaling Explorations community",
}

export default async function AboutPage() {
  const principles = LABELS.ABOUT_PAGE.PRINCIPLES

  return (
    <div className="flex flex-col">
      <div className="w-full bg-page-header-gradient dark:bg-transparent-gradient">
        <AppContent className="flex flex-col gap-4 py-10 w-full max-w-[978px] mx-auto">
          <Label.PageTitle label={LABELS.ABOUT_PAGE.TITLE} />
          <h6 className="font-sans text-base font-normal text-primary md:text-[18px] md:leading-[27px] md:max-w-[700px]">
            {LABELS.ABOUT_PAGE.DESCRIPTION}
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
                  {interpolate(LABELS.COMMON.CONNECT_WITH_US_ON_PLATFORM, {
                    platform: "Discord",
                  })}
                </span>
                <Icons.arrowRight fill="white" className="h-5" />
              </div>
            </Button>
          </Link>
        </AppContent>
      </div>
      <Divider.Section className="bg-background">
        <div className="flex justify-center">
          <AppContent className="container flex w-full max-w-[978px] flex-col gap-8 py-10 md:py-16">
            <Label.Section
              className="text-center"
              label={LABELS.ABOUT_PAGE.OUR_PRINCIPLES_TITLE}
            />
            <Accordion
              type="multiple"
              items={[
                ...principles.map((principle: any, index: number) => {
                  return {
                    label: principle.TITLE,
                    value: index.toString(),
                    children: (
                      <span className="flex flex-col gap-6 break-words pb-12 font-sans text-lg font-normal leading-[150%]">
                        {principle.DESCRIPTION.map(
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

        <Banner
          title={LABELS.ABOUT_PAGE.BANNER.TITLE}
          subtitle={LABELS.ABOUT_PAGE.BANNER.SUBTITLE}
        >
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
                  {LABELS.COMMON.JOIN_OUR_DISCORD}
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
