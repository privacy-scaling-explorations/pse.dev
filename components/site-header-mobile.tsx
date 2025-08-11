"use client"

import { AppLink } from "./app-link"
import { Icons } from "./icons"
import { LABELS } from "@/app/labels"
import { useGlobalProvider } from "@/app/providers/GlobalProvider"
import {
  Discord,
  Github,
  Mirror,
  Twitter,
} from "@/components/svgs/social-medias"
import { siteConfig } from "@/config/site"
import { useAppSettings } from "@/hooks/useAppSettings"
import { interpolate } from "@/lib/utils"
import CloseVector from "@/public/icons/close-fill.svg"
import { NavItem } from "@/types/nav"
import { SunMedium as SunIcon, Moon as MoonIcon } from "lucide-react"
import NextImage from "next/image"
import { useState } from "react"

export const SiteHeaderMobile = () => {
  const [header, setHeader] = useState(false)
  const { isDarkMode, setIsDarkMode } = useGlobalProvider()

  const { MAIN_NAV } = useAppSettings()

  return (
    <div className="flex items-center md:hidden">
      <button type="button" onClick={() => setHeader(true)}>
        <Icons.Burgher
          size={24}
          className="text-[#171C1B] dark:text-anakiwa-400"
        />
      </button>
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
              width={24}
              height={24}
            />
          </div>
          <div className="flex w-full flex-col px-[16px] text-base font-medium">
            {MAIN_NAV.map((item: NavItem, index) => {
              if (item.onlyFooter) return null

              return (
                <AppLink
                  key={index}
                  href={item.href}
                  onClick={() => setHeader(false)}
                  target={item?.external ? "_blank" : undefined}
                  className="border-b-2 border-white p-4 uppercase"
                  variant="nav"
                >
                  {item.title}
                </AppLink>
              )
            })}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className=" ml-auto mt-10"
            >
              {isDarkMode ? (
                <SunIcon
                  className="text-white dark:text-anakiwa-400"
                  size={20}
                />
              ) : (
                <MoonIcon
                  className="text-white dark:text-anakiwa-400"
                  size={20}
                />
              )}
            </button>
          </div>

          <div className="flex h-full w-full flex-col items-center justify-end gap-5 py-[40px] text-sm">
            <div className="flex gap-5">
              <AppLink href={siteConfig.links.twitter} external>
                <Twitter color="white" />{" "}
              </AppLink>

              <AppLink href={siteConfig.links.discord} external>
                <Discord color="white" />{" "}
              </AppLink>
              <AppLink href={siteConfig.links.github} external>
                <Github color="white" />{" "}
              </AppLink>
              <AppLink href={siteConfig.links.articles} external>
                <Mirror color="white" />{" "}
              </AppLink>
            </div>

            <div className="flex gap-5 text-white">
              <h1>{LABELS.COMMON.FOOTER.PRIVACY_POLICY}</h1>
              <h1>{LABELS.COMMON.FOOTER.TERMS_OF_USE}</h1>
            </div>
            <h1 className="text-center text-gray-400">
              {interpolate(LABELS.COMMON.LAST_UPDATED_AT, {
                date: "January 16, 2024",
              })}
            </h1>
          </div>
        </div>
      )}
    </div>
  )
}
