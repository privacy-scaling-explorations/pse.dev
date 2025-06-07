import { LABELS } from "@/app/labels"
import { MainNavProps } from "@/components/main-nav"

export const useAppSettings = () => {
  const MAIN_NAV: MainNavProps["items"] = [
    {
      title: LABELS.MENU.HOME as string,
      href: "/",
      onlyMobile: true,
    },
    {
      title: "Devcon 7",
      href: "/devcon-7",
      onlyFooter: true,
    },
    {
      title: LABELS.MENU.PROJECTS as string,
      href: "/projects",
    },
    {
      title: LABELS.MENU.RESEARCH as string,
      href: "/research",
    },
    {
      title: LABELS.MENU.PROGRAMS as string,
      href: "/programs",
      onlyFooter: true,
    },
    {
      title: LABELS.MENU.ABOUT as string,
      href: "/about",
    },
    {
      title: LABELS.MENU.RESOURCES as string,
      href: "/resources",
    },
    {
      title: LABELS.MENU.BLOG as string,
      href: "/blog",
      onlyHeader: true,
    },
  ]

  return {
    MAIN_NAV,
  }
}
