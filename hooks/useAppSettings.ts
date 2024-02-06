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
    },
    {
      title: t("menu.activity"),
      href: "https://pse-team.notion.site/50dcf22c5191485e93406a902ae9e93b?v=453023f8227646dd949abc34a7a4a138&pvs=4",
      external: true,
      onlyFooter: true,
    },
    {
      title: t("menu.report"),
      href: "https://reports.pse.dev/",
      external: true,
      onlyFooter: true,
    },
    {
      title: t("menu.firstGoodIssue"),
      href: "https://pse-gfis.vercel.app",
      external: true,
      onlyFooter: true,
    },
  ]

  return {
    MAIN_NAV,
    activeLanguageLabel: activeLanguage,
  }
}
