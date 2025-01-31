"use client"

import { siteConfig } from "@/config/site"
import { useAppSettings } from "@/hooks/useAppSettings"
import { MainNav } from "@/components/main-nav"
import { LocaleTypes, enabledLanguagesItems } from "@/app/i18n/settings"

import { Icons } from "./icons"
import { SiteHeaderMobile } from "./site-header-mobile"
import { AppContent } from "./ui/app-content"
import { Dropdown } from "./ui/dropdown"
import { usePathname } from "next/navigation"

type SiteHeaderProps = {
  lang: LocaleTypes
}

export function SiteHeader({ lang }: SiteHeaderProps) {
  const { MAIN_NAV, activeLanguageLabel } = useAppSettings(lang)

  const isReportPage = usePathname().includes("/reports")
  
  return (
    <header className="sticky top-0 z-40 w-full border-b border-tuatara-300 bg-white shadow-sm">
      <AppContent>
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
                      {activeLanguageLabel}
                    </span>
                  </div>
                }
                defaultItem={lang}
                items={enabledLanguagesItems}
                onChange={(lang) => {
                  window?.location?.replace(`/${lang}`)
                }}
              />
            </div>
          )}
        </div>
      </AppContent>
    </header>
  )
}
