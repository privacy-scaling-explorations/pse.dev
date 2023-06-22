import NextImage from "next/image"
import NextLink from "next/link"
import ArrowVector from "@/public/arrow-vector.png"
import DiscordLogo from "@/public/discord-white.png"
import EllipseLogo from "@/public/ellipse-white.png"
import GithubLogo from "@/public/github-white.png"
import PSELogo from "@/public/pselogo-footer.png"
import TwitterLogo from "@/public/twitter-white.png"

import { siteConfig } from "@/config/site"

export function SiteFooter() {
  return (
    <footer className="flex flex-col gap-5">
      <div className="flex w-full flex-col gap-5 p-[32px]">
        <NextImage src={PSELogo} alt="logo" width={94} height={41} />
        <h1 className="text-sm">
          Privacy + Scaling Explorations is a multidisciplinary team supported
          by the Ethereum Foundation.
        </h1>
      </div>
      <div className="flex w-full flex-col gap-5 px-[32px] text-base font-[500]">
        <NextLink href={"/"} className="border-b-2 border-[#171C1B] py-5">
          HOME
        </NextLink>
        <NextLink
          href={"/projects"}
          className="border-b-2 border-[#171C1B] py-5"
        >
          PROJECT LIBRARY
        </NextLink>
        <NextLink
          href={siteConfig.links.jobs}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-5 py-5"
        >
          JOBS
          <NextImage src={ArrowVector} alt="logo" width={12} height={12} />
        </NextLink>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-5 bg-[#171C1B] py-[40px] text-sm">
        <div className="flex gap-5">
          <NextLink
            href={siteConfig.links.twitter}
            target="_blank"
            rel="noreferrer"
          >
            <NextImage src={TwitterLogo} alt="logo" width={24} height={24} />
          </NextLink>

          <NextLink
            href={siteConfig.links.discord}
            target="_blank"
            rel="noreferrer"
          >
            <NextImage src={DiscordLogo} alt="logo" width={24} height={24} />
          </NextLink>
          <NextLink
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
          >
            <NextImage src={GithubLogo} alt="logo" width={24} height={24} />
          </NextLink>
          <NextLink
            href={siteConfig.links.articles}
            target="_blank"
            rel="noreferrer"
          >
            <NextImage src={EllipseLogo} alt="logo" width={24} height={24} />
          </NextLink>
        </div>
        <div className="flex gap-5 text-white">
          <h1>Privacy Policy</h1>
          <h1>Terms of use</h1>
        </div>
        <h1 className="text-gray-400">Last updated June 8, 2023</h1>
      </div>
    </footer>
  )
}
