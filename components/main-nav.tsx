"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import PSELogo from "@/public/logos/header-logo.svg"

import { NavItem } from "@/types/nav"
import { cn } from "@/lib/utils"
import { SearchButton } from "@/components/search/search-button"
import { SearchModal } from "@/components/search/search-modal"

export interface MainNavProps {
  items: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  const router = usePathname()
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)

  return (
    <div className="flex flex-1 items-center justify-between gap-6 md:gap-10">
      <div className="flex items-center gap-6 md:gap-10">
        <Link href="/" className="flex items-center space-x-2">
          <Image src={PSELogo} alt="PSE Logo" width={32} height={32} />
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {items.map((item, index) => {
            if (item?.onlyFooter) return null
            if (item?.onlyMobile) return null

            const pathParts = item.href
              .replace("/", "")
              .split("/")
              .filter(Boolean)

            const isHome = router === "/" && item.href === "/"
            const isActive =
              isHome ||
              (router !== null &&
                pathParts[0] === router.replace("/", "").split("/")[1])

            return (
              <Link
                key={index}
                href={item.href}
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

      <div className="flex items-center mr-5">
        <div className="w-60">
          <SearchButton onClick={() => setIsSearchModalOpen(true)} />
        </div>
      </div>

      <SearchModal open={isSearchModalOpen} setOpen={setIsSearchModalOpen} />
    </div>
  )
}
