import { MainNavProps } from "@/components/main-nav"
import { LABELS } from "@/app/labels"

export function useAppSettings() {
  const MAIN_NAV: MainNavProps["items"] = [
    {
      title: LABELS.COMMON.MENU.ABOUT,
      href: "/about",
    },
    {
      title: LABELS.COMMON.MENU.PROJECTS,
      href: "/projects",
    },
    {
      title: LABELS.COMMON.MENU.RESEARCH,
      href: "/research",
    },
    {
      title: LABELS.COMMON.MENU.BLOG,
      href: "/blog",
    },
    /*
    {
      title: LABELS.COMMON.MENU.HOME,
      href: "/",
      onlyMobile: true,
    },
   
    {
      title: "Devcon 7",
      href: "/devcon-7",
      onlyFooter: true,
    },
    */
    /*
    {
      title: LABELS.COMMON.MENU.PROGRAMS,
      href: "/programs",
      onlyFooter: true,
    },
    */

    /*
    {
      title: LABELS.COMMON.MENU.RESOURCES,
      href: "/resources",
    },
    */
  ]

  return {
    MAIN_NAV,
  }
}
