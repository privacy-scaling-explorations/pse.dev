"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import PSELogo from "@/public/logos/header-logo.svg"

import { NavItem } from "@/types/nav"
import { cn } from "@/lib/utils"
import { LocaleTypes, fallbackLng } from "@/app/i18n/settings"

export interface MainNavProps {
  items: NavItem[]
  lang?: LocaleTypes
}

export function MainNav({ items, lang = fallbackLng }: MainNavProps) {
  const router = usePathname()

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href={`/${lang}`} className="flex items-center space-x-2">
        <Image src={PSELogo} alt="PSE Logo" width={32} height={32} />
      </Link>
      <nav className="hidden items-center gap-6 md:flex">
        {items.map((item, index) => {
          if (item?.onlyFooter) return null
          if (item?.onlyMobile) return null

          const langKey = `/${lang}`
          const pathParts = item.href
            .replace(langKey, "")
            .split("/")
            .filter(Boolean)

          const isHome = router === "/" && item.href === "/"
          // is home or the first part of the path matches the first part of the href
          const isActive =
            isHome ||
            (router !== null &&
              pathParts[0] === router.replace(langKey, "").split("/")[1])

          return (
            <Link
              key={index}
              href={`/${lang}/${item.href}`}
              target={item.external ? "_blank" : undefined}
              className={cn(
                "flex cursor-pointer items-center border-b-2 uppercase",
                {
                  "cursor-not-allowed": item.disabled,
                  "border-transparent": item.href !== router,
                  "!border-orange": item.href === router || isActive,
                  "text-sm font-medium duration-200 ease-in-out hover:border-orange":
                    true,
                }
              )}
            >
              {item.title}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
