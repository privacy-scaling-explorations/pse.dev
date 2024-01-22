"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import i18next from "i18next"
import { Trans } from "react-i18next/TransWithoutContext"

import { cn } from "@/lib/utils"
import { MainNav, MainNavProps } from "@/components/main-nav"
import { useTranslation } from "@/app/i18n/client"
import { LanguageMapping, LocaleTypes } from "@/app/i18n/settings"

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
      href: `/${lang}`,
    },
    {
      title: i18n("menu.projectLibrary"),
      href: `/${lang}/projects`,
    },
    {
      title: i18n("menu.about"),
      href: `/${lang}/about`,
    },
    {
      title: i18n("menu.resources"),
      href: `/${lang}/resources`,
    },
  ]

  return (
    <header className="sticky top-0 z-40 w-full bg-white px-6 shadow-sm xl:px-20">
      <div className="flex h-16 items-center justify-between space-x-4 sm:space-x-0">
        <MainNav items={MAIN_NAV} lang={lang} />
        <SiteHeaderMobile lang={lang} />
        <DropdownMenu.Root>
          <DropdownMenu.Trigger className="hidden outline-none md:block">
            <Trans i18nKey="languageSwitcher" t={i18n}>
              <div className="hidden h-14 flex-1 items-center justify-end space-x-4 md:flex">
                <button type="button" className="flex gap-1">
                  <Icons.globe size={22} />
                  <span>{LanguageMapping[lang] ?? LanguageMapping["en"]}</span>
                  <Icons.arrowDown fill="black" />
                </button>
              </div>
            </Trans>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content className="-mt-2 h-36 !w-32 overflow-scroll rounded-[6px] border border-tuatara-200 bg-white py-3">
            {Object.entries(LanguageMapping).map(
              ([language, languageLabel]) => {
                const isActive = lang === language
                return (
                  <Link href={`/${language}`}>
                    <span className="min-w-36" key={language}>
                      <DropdownMenu.Item
                        className={cn(
                          "cursor-pointer px-5 py-2 font-sans text-sm font-normal leading-[150%] outline-none duration-200 hover:font-medium",
                          isActive ? "text-anakiwa-500" : "text-tuatara-950"
                        )}
                      >
                        {languageLabel}
                      </DropdownMenu.Item>
                    </span>
                  </Link>
                )
              }
            )}
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
    </header>
  )
}
