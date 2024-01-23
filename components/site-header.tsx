"use client"

import { siteConfig } from "@/config/site"
import { useAppSettings } from "@/hooks/useAppSettings"
import { MainNav } from "@/components/main-nav"
import {
  LanguageMapping,
  LocaleTypes,
  languagesItems,
} from "@/app/i18n/settings"

import { Icons } from "./icons"
import { SiteHeaderMobile } from "./site-header-mobile"
import { Dropdown } from "./ui/dropdown"

type SiteHeaderProps = {
  lang: LocaleTypes
}

export function SiteHeader({ lang }: SiteHeaderProps) {
  const { MAIN_NAV } = useAppSettings(lang)

  return (
    <header className="sticky top-0 z-40 w-full bg-white px-6 shadow-sm xl:px-20">
      <div className="flex h-16 items-center justify-between space-x-4 sm:space-x-0">
        <MainNav items={MAIN_NAV} lang={lang} />
        <SiteHeaderMobile lang={lang} />
        {siteConfig?.showLanguageSwitcher && (
          <div className="hidden outline-none md:block">
            <Dropdown
              label={
                <div className="flex items-center gap-1">
                  <Icons.globe size={22} />
                  <span className="!text-base !font-normal text-tuatara-950">
                    {LanguageMapping[lang] ?? LanguageMapping["en"]}
                  </span>
                </div>
              }
              defaultItem={lang}
              items={languagesItems}
              onChange={(lang) => {
                window?.location?.replace(`/${lang}`)
              }}
            />
          </div>
        )}
      </div>
    </header>
  )
}
