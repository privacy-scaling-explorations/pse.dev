"use client"

import { useState } from "react"
import NextImage from "next/image"
import NextLink from "next/link"
import ArrowVector from "@/public/icons/arrowupwhite.webp"
import CloseVector from "@/public/icons/closewhite.webp"
import HeaderVector from "@/public/icons/menuburger.webp"
import DiscordLogo from "@/public/socialmedias/discordwhite.webp"
import GithubLogo from "@/public/socialmedias/githubwhite.webp"
import EllipseLogo from "@/public/socialmedias/mirrorwhite.webp"
import TwitterLogo from "@/public/socialmedias/twitterwhite.webp"

import { siteConfig } from "@/config/site"

export function SiteHeaderMobile() {
  const [header, setHeader] = useState(false)

  return (
    <div className="flex items-center md:hidden">
      <NextImage
        src={HeaderVector}
        alt="logo"
        className="cursor-pointer"
        onClick={() => setHeader(true)}
        width={24}
        height={24}
      />
      {header && (
        <div
          className="z-5 fixed inset-0 flex justify-end bg-black opacity-50"
          onClick={() => setHeader(false)}
        ></div>
      )}
      {header && (
        <div className="fixed inset-y-0 right-0 z-10 flex w-[257px] flex-col bg-black text-white">
          <div className="flex justify-end p-[37px]">
            <NextImage
              src={CloseVector}
              alt="closeVector"
              className="cursor-pointer"
              onClick={() => setHeader(false)}
              width={15}
              height={15}
            />
          </div>
          <div className="flex w-full flex-col gap-5 px-[16px] text-base font-[500]">
            <NextLink
              href={"/"}
              onClick={() => setHeader(false)}
              className="border-y-2 border-white p-[16px]"
            >
              HOME
            </NextLink>
            <NextLink
              onClick={() => setHeader(false)}
              href={"/projects"}
              className="border-b-2 border-white p-[16px] pt-0"
            >
              PROJECT LIBRARY
            </NextLink>
            <NextLink
              href={siteConfig.links.jobs}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-5 border-b-2 border-white p-[16px] pt-0"
            >
              JOBS
              <NextImage src={ArrowVector} alt="logo" width={12} height={12} />
            </NextLink>
          </div>
          <div className="flex h-full w-full flex-col items-center justify-end gap-5 py-[40px] text-sm">
            <div className="flex gap-5">
              <NextLink
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noreferrer"
              >
                <NextImage
                  src={TwitterLogo}
                  alt="logo"
                  width={24}
                  height={24}
                />
              </NextLink>

              <NextLink
                href={siteConfig.links.discord}
                target="_blank"
                rel="noreferrer"
              >
                <NextImage
                  src={DiscordLogo}
                  alt="logo"
                  width={24}
                  height={24}
                />
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
                <NextImage
                  src={EllipseLogo}
                  alt="logo"
                  width={24}
                  height={24}
                />
              </NextLink>
            </div>
            <div className="flex gap-5 text-white">
              <h1>Privacy Policy</h1>
              <h1>Terms of use</h1>
            </div>
            <h1 className="text-gray-400">Last updated June 8, 2023</h1>
          </div>
        </div>
      )}
    </div>
  )
}
