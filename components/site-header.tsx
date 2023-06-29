import Link from "next/link"

import { siteConfig } from "@/config/site"
import { MainNav } from "@/components/main-nav"
import {
  Discord,
  Github,
  Mirror,
  Twitter,
} from "@/components/svgs/social-medias"

import { SiteHeaderMobile } from "./site-header-mobile"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white px-[32px]">
      <div className="flex h-16  justify-between space-x-4 sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <SiteHeaderMobile />
        <div className="hidden flex-1 items-center justify-end space-x-4 md:flex">
          <nav className="flex items-center gap-5 space-x-1">
            <Link
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
            >
              <Twitter color="black" />
            </Link>
            <Link
              href={siteConfig.links.discord}
              target="_blank"
              rel="noreferrer"
            >
              <Discord color="black" />
            </Link>
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <Github color="black" />
            </Link>
            <Link
              href={siteConfig.links.articles}
              target="_blank"
              rel="noreferrer"
            >
              <Mirror color="black" />
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
