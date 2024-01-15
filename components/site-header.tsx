"use client"

import { LangProps } from "@/types/common"
import { siteConfig } from "@/config/site"
import { MainNav } from "@/components/main-nav"
import { useTranslation } from "@/app/i18n/client"

import { Icons } from "./icons"
import { SiteHeaderMobile } from "./site-header-mobile"

export function SiteHeader({ lang }: LangProps["params"]) {
  const { t } = useTranslation(lang, "common")

  return (
    <header className="sticky top-0 z-40 w-full bg-white px-6 shadow-sm xl:px-20">
      <div className="flex h-16  justify-between space-x-4 sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <SiteHeaderMobile />
        <div className="hidden flex-1 items-center justify-end space-x-4 md:flex">
          <button type="button" className="flex gap-2">
            <Icons.globe size={22} />
            <span>
              {t("menu.languages", {
                locale: lang?.toUpperCase(),
              })}
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}
