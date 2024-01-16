"use client"

import { LangProps } from "@/types/common"
import { siteConfig } from "@/config/site"
import { MainNav, MainNavProps } from "@/components/main-nav"
import { useTranslation } from "@/app/i18n/client"

import { Icons } from "./icons"
import { SiteHeaderMobile } from "./site-header-mobile"

export function SiteHeader({ lang }: LangProps["params"]) {
  const { t } = useTranslation(lang, "common")

  const MAIN_NAV: MainNavProps["items"] = [
    {
      title: t("menu.home"),
      href: "/",
    },
    {
      title: t("menu.projectLibrary"),
      href: "/projects",
    },
    {
      title: t("menu.about"),
      href: "/about",
    },
    {
      title: t("menu.resources"),
      href: "/resources",
    },
  ]

  return (
    <header className="sticky top-0 z-40 w-full bg-white px-6 shadow-sm xl:px-20">
      <div className="flex h-16  justify-between space-x-4 sm:space-x-0">
        <MainNav items={MAIN_NAV} />
        <SiteHeaderMobile lang={lang} />
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
