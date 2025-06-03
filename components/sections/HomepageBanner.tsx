"use client"

import { Banner } from "../banner"
import { useTranslation } from "@/app/i18n/client"
import { Icons } from "../icons"
import { siteConfig } from "@/config/site"
import Link from "next/link"
import { Button } from "../ui/button"

export const HomepageBanner = ({ lang }: { lang: any }) => {
  const { t } = useTranslation(lang, "homepage")
  const { t: common } = useTranslation(lang, "common")

  return (
    <Banner
      title={common("connectWithUs")}
      subtitle={common("connectWithUsDescription")}
    >
      <Link
        href={siteConfig.links.discord}
        target="_blank"
        rel="noreferrer"
        passHref
        className="mx-auto"
      >
        <Button>
          <div className="flex items-center gap-2">
            <Icons.discord fill="white" className="h-4" />
            <span className="text-[14px] uppercase">{t("joinOurDiscord")}</span>
            <Icons.externalUrl fill="white" className="h-5" />
          </div>
        </Button>
      </Link>
    </Banner>
  )
}
