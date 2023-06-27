import NextImage from "next/image"
import Link from "next/link"
import DiscordLogo from "@/public/discord.png"
import EllipseLogo from "@/public/ellipse.png"
import GithubLogo from "@/public/github.png"
import TwitterLogo from "@/public/twitter.png"

import { siteConfig } from "@/config/site"
import { MainNav } from "@/components/main-nav"

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
              <NextImage src={TwitterLogo} alt="logo" width={24} height={24} />
            </Link>
            <Link
              href={siteConfig.links.discord}
              target="_blank"
              rel="noreferrer"
            >
              <NextImage src={DiscordLogo} alt="logo" width={24} height={24} />
            </Link>
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <NextImage src={GithubLogo} alt="logo" width={24} height={24} />
            </Link>
            <Link
              href={siteConfig.links.articles}
              target="_blank"
              rel="noreferrer"
            >
              <NextImage src={EllipseLogo} alt="logo" width={24} height={24} />
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
