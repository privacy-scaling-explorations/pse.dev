import { useTranslation } from "@/app/i18n/client"
import { LocaleTypes, fallbackLng, languageList } from "@/app/i18n/settings"
import { MainNavProps } from "@/components/main-nav"
import { siteConfig } from "@/config/site"

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
      order: 1,
    },
    {
      title: t("menu.projectLibrary"),
      href: "/projects",
      order: 1,
    },
    {
      title: t("menu.programs"),
      href: "/programs",
      order: 1,
    },
    {
      title: t("menu.about"),
      href: "/about",
      order: 1,
    },
    {
      title: t("menu.resources"),
      href: "/resources",
      order: 1,
    },
    {
      title: t("menu.jobs"),
      href: siteConfig.links.jobs,
      external: true,
      order: 2,
    },
    {
      title: t("menu.blog"),
      href: "https://mirror.xyz/privacy-scaling-explorations.eth",
      external: true,
      order: 2,
    },
    {
      title: t("menu.activity"),
      href: "https://pse-team.notion.site/50dcf22c5191485e93406a902ae9e93b?v=453023f8227646dd949abc34a7a4a138&pvs=4",
      external: true,
      onlyFooter: true,
      order: 2,
    },
    {
      title: t("menu.report"),
      href: "https://reports.pse.dev/",
      external: true,
      onlyFooter: true,
      order: 2,
    },
    {
      title: t("menu.openIssues"),
      href: "https://pse-gfis.vercel.app",
      external: true,
      onlyFooter: true,
      order: 2,
    },
  ]

  return {
    MAIN_NAV,
    activeLanguageLabel: activeLanguage,
  }
}
