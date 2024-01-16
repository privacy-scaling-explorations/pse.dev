"use client"

import { MainNav, MainNavProps } from "@/components/main-nav"
import { useTranslation } from "@/app/i18n/client"
import { LocaleTypes } from "@/app/i18n/settings"

import { Icons } from "./icons"
import { SiteHeaderMobile } from "./site-header-mobile"

type SiteHeaderProps = {
  lang: LocaleTypes
}

export function SiteHeader({ lang }: SiteHeaderProps) {
  const { t: i18n } = useTranslation(lang, "common")
  const MAIN_NAV: MainNavProps["items"] = [
    {
      title: i18n("menu.home"),
      href: "/",
    },
    {
      title: i18n("menu.projectLibrary"),
      href: "/projects",
    },
    {
      title: i18n("menu.about"),
      href: "/about",
    },
    {
      title: i18n("menu.resources"),
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
              {i18n("menu.languages", {
                locale: lang?.toUpperCase(),
              })}
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}
