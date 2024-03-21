import { siteConfig } from "@/config/site"
import { MainNavProps } from "@/components/main-nav"
import { useTranslation } from "@/app/i18n/client"
import { LocaleTypes, fallbackLng, languageList } from "@/app/i18n/settings"

export function useAppSettings(lang: LocaleTypes) {
  const { t } = useTranslation(lang, "common")

  // get the active language label
  const activeLanguage =
    languageList.find((language) => language.key === lang)?.label ??
    languageList.find((language) => language.key === fallbackLng)?.label

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
    {
      title: t("menu.blog"),
      href: "https://mirror.xyz/privacy-scaling-explorations.eth",
      external: true,
      onlyHeader: true,
    },
  ]

  return {
    MAIN_NAV,
    activeLanguageLabel: activeLanguage,
  }
}
