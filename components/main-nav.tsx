"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import PSELogo from "@/public/logos/header-logo.svg"

import { NavItem } from "@/types/nav"

export interface MainNavProps {
  items: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  const router = usePathname()

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <Image src={PSELogo} alt="PSE Logo" width={32} height={32} />
      </Link>
      <nav className="hidden items-center gap-6 md:flex">
        {items.map((item, index) => {
          return (
            <Link
              key={index}
              href={item.href}
              className={`uppercase ${
                item.disabled && "cursor-not-allowed"
              } flex items-center border-b-2 ${
                item.href !== router ? "border-transparent" : "border-orange"
              } text-sm font-medium duration-200 ease-in-out hover:border-orange`}
            >
              {item.title}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
