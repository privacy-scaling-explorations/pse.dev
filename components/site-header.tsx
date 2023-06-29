import NextImage from "next/image"
import Link from "next/link"
import DiscordLogo from "@/public/socialmedias/discordblack.webp"
import GithubLogo from "@/public/socialmedias/githubblack.webp"
import MirrorLogo from "@/public/socialmedias/mirrorblack.webp"
import TwitterLogo from "@/public/socialmedias/twitterblack.webp"

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
              <NextImage
                src={TwitterLogo}
                alt="twitter"
                width={24}
                height={24}
              />
            </Link>
            <Link
              href={siteConfig.links.discord}
              target="_blank"
              rel="noreferrer"
            >
              <NextImage
                src={DiscordLogo}
                alt="discord"
                width={24}
                height={24}
              />
            </Link>
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <NextImage src={GithubLogo} alt="github" width={24} height={24} />
            </Link>
            <Link
              href={siteConfig.links.articles}
              target="_blank"
              rel="noreferrer"
            >
              <NextImage src={MirrorLogo} alt="mirror" width={24} height={24} />
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
