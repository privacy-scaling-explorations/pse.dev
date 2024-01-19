import { MainNavProps } from "@/components/main-nav"
import { useTranslation } from "@/app/i18n/client"
import { LocaleTypes } from "@/app/i18n/settings"

export function useAppSettings(lang: LocaleTypes) {
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

  return {
    MAIN_NAV,
  }
}
