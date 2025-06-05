"use client"

import { useState } from "react"
import NextImage from "next/image"
import NextLink from "next/link"
import Link from "next/link"
import CloseVector from "@/public/icons/close-fill.svg"
import HeaderVector from "@/public/icons/menu-burger.svg"

import { LangProps } from "@/types/common"
import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { useAppSettings } from "@/hooks/useAppSettings"
import {
  Discord,
  Github,
  Mirror,
  Twitter,
} from "@/components/svgs/social-medias"
import { useTranslation } from "@/app/i18n/client"
import { languageList } from "@/app/i18n/settings"

import { Icons } from "./icons"

const LanguageSwitcher = ({ lang }: LangProps["params"]) => {
  const [isOpen, setIsOpen] = useState(false)
  const { activeLanguageLabel } = useAppSettings(lang)

  if (!siteConfig?.showLanguageSwitcher) return null

  return (
    <div className="flex flex-col border-b-2 border-white px-[14px] py-[16px] pt-0">
      <button
        onClick={() => {
          setIsOpen(!isOpen)
        }}
        type="button"
        className="flex items-center gap-2 uppercase"
      >
        <Icons.globe className="text-white" size={22} fill="white" />
        <span className="text-base font-medium uppercase text-white">
          {activeLanguageLabel}
        </span>
        <Icons.arrowDown />
      </button>
      {isOpen && (
        <div className="ml-8 mt-4 flex flex-col gap-1">
          {languageList?.map(({ label, key: languageKey, enabled }, index) => {
            const showLanguage = siteConfig.showOnlyEnabledLanguages && !enabled

            if (showLanguage) return null // skip disabled languages
            const isActive = languageKey === lang
            return (
              <Link
                className={cn(
                  "py-2 uppercase",
                  isActive
                    ? "font-medium text-anakiwa-500"
                    : "font-normal text-white"
                )}
                href={`/${languageKey}`}
                key={index}
              >
                {label}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

export const SiteHeaderMobile = ({ lang }: LangProps["params"]) => {
  const [header, setHeader] = useState(false)
  const { t } = useTranslation(lang, "common")

  const { MAIN_NAV } = useAppSettings(lang)

  return (
    <div className="flex items-center md:hidden">
      <NextImage
        src={HeaderVector}
        alt="logo"
        className="cursor-pointer"
        onClick={() => setHeader(true)}
        width={24}
        height={24}
      />
      {header && (
        <div
          className="z-5 fixed inset-0 flex justify-end bg-black opacity-50"
          onClick={() => setHeader(false)}
        ></div>
      )}
      {header && (
        <div className="fixed inset-y-0 right-0 z-10 flex w-[257px] flex-col bg-black text-white">
          <div className="flex justify-end p-[37px]">
            <NextImage
              src={CloseVector}
              alt="closeVector"
              className="cursor-pointer"
              onClick={() => setHeader(false)}
              width={24}
              height={24}
            />
          </div>
          <div className="flex w-full flex-col px-[16px] text-base font-medium">
            {MAIN_NAV.map((item: NavItem, index) => {
              if (item.onlyFooter) return null

              return (
                <NextLink
                  key={index}
                  href={item?.external ? item.href : `/${lang}${item.href}`}
                  onClick={() => setHeader(false)}
                  className="border-b-2 border-white p-4 uppercase"
                >
                  {item.title}
                </NextLink>
              )
            })}
            <div className="mt-4">
              <LanguageSwitcher lang={lang} />
            </div>
          </div>
          <div className="flex h-full w-full flex-col items-center justify-end gap-5 py-[40px] text-sm">
            <div className="flex gap-5">
              <NextLink
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noreferrer"
              >
                <Twitter color="white" />{" "}
              </NextLink>

              <NextLink
                href={siteConfig.links.discord}
                target="_blank"
                rel="noreferrer"
              >
                <Discord color="white" />{" "}
              </NextLink>
              <NextLink
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
              >
                <Github color="white" />{" "}
              </NextLink>
              <NextLink
                href={siteConfig.links.articles}
                target="_blank"
                rel="noreferrer"
              >
                <Mirror color="white" />{" "}
              </NextLink>
            </div>
            <div className="flex gap-5 text-white">
              <h1>{t("footer.privacyPolicy")}</h1>
              <h1>{t("footer.termsOfUse")}</h1>
            </div>
            <h1 className="text-center text-gray-400">
              {t("lastUpdatedAt", {
                date: "January 16, 2024",
              })}
            </h1>
          </div>
        </div>
      )}
    </div>
  )
}
