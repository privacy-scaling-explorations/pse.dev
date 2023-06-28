"use client"

import NextImage from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import PSELogo from "@/public/pselogo-header.svg"

import { NavItem } from "@/types/nav"

interface MainNavProps {
  items: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  const router = usePathname()

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <NextImage src={PSELogo} alt="logo" width={32} height={32} />
      </Link>
      <nav className="hidden items-center gap-6 md:flex">
        {items.map((item, index) => {
          return (
            <Link
              key={index}
              href={item.href}
              className={`uppercase ${
                item.disabled && "cursor-not-allowed"
              } flex items-center border-b-4 ${
                item.href !== router ? "border-transparent" : "border-orange"
              } text-base font-medium transition-opacity duration-200 ease-in-out hover:opacity-70`}
            >
              {item.title}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
