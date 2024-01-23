"use client"

import Image from "next/image"
import Link from "next/link"
import PSELogo from "@/public/logos/pse-logo-circle.svg"

import { LangProps } from "@/types/common"
import { siteConfig } from "@/config/site"
import {
  Discord,
  Github,
  Mirror,
  Twitter,
} from "@/components/svgs/social-medias"
import { useTranslation } from "@/app/i18n/client"

import { ArrowRightUp } from "./svgs/arrows"

const SocialMedia = ({ label }: { label: string }) => {
  return (
    <span className="mt-[0.9px] hidden font-sans text-sm font-normal uppercase leading-[21px] text-white md:block">
      {label}
    </span>
  )
}

export function SiteFooter({ lang }: LangProps["params"]) {
  const { t } = useTranslation(lang, "common")

  return (
    <footer className="flex flex-col">
      <div className="flex flex-col divide-y divide-tuatara-200 px-8">
        <div className="flex w-full flex-col items-center gap-5 py-8">
          <Image src={PSELogo} alt="logo" width={133} height={133} />
          <h1 className="py-2 text-center font-sans text-sm font-normal text-tuatara-950">
            {t("footer.description")}
          </h1>
        </div>
        <div className="flex w-full flex-col items-center gap-5 py-8 text-base font-medium md:flex-row md:justify-center">
          <Link href={`/${lang}`} className="link px-[10px] uppercase">
            {t("menu.home")}
          </Link>
          <Link href={`/${lang}/projects`} className="link px-[10px] uppercase">
            {t("menu.projectLibrary")}
          </Link>
          <Link href={`/${lang}/about`} className="link px-[10px] uppercase">
            {t("menu.about")}
          </Link>
          <Link
            href={`/${lang}/resources`}
            className="link px-[10px] uppercase"
          >
            {t("menu.resources")}
          </Link>
          <Link
            href={siteConfig.links.jobs}
            target="_blank"
            rel="noreferrer"
            className="link flex items-center gap-5 px-[10px] uppercase"
          >
            {t("menu.jobs")}
            <ArrowRightUp color="black" />
          </Link>
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-2 bg-[#171C1B] py-[40px] text-sm">
        <div className="flex gap-5">
          <Link
            href={siteConfig.links.twitter}
            className=" flex h-[21px] items-start gap-2"
            target="_blank"
            rel="noreferrer"
          >
            <Twitter color="white" />
            <SocialMedia label="Twitter" />
          </Link>

          <Link
            href={siteConfig.links.discord}
            className="flex h-[21px] items-start gap-2"
            target="_blank"
            rel="noreferrer"
          >
            <Discord color="white" />
            <SocialMedia label="Discord" />
          </Link>
          <Link
            href={siteConfig.links.github}
            className="flex h-[21px] items-start gap-2"
            target="_blank"
            rel="noreferrer"
          >
            <Github color="white" />
            <SocialMedia label="Github" />
          </Link>
          <Link
            href={siteConfig.links.articles}
            className="flex h-[21px] items-start gap-2"
            target="_blank"
            rel="noreferrer"
          >
            <Mirror color="white" />
            <SocialMedia label="Mirror" />
          </Link>
        </div>
        <div className="flex gap-5 py-2 text-white">
          <Link
            href={siteConfig.links.privacyPolicy}
            target="_blank"
            rel="noreferrer"
          >
            <span className="font-sans font-normal leading-[21px]">
              {t("footer.privacyPolicy")}
            </span>
          </Link>
          <Link
            href={siteConfig.links.termOfUse}
            target="_blank"
            rel="noreferrer"
          >
            <span className="font-sans font-normal leading-[21px]">
              {t("footer.termsOfUse")}
            </span>
          </Link>
        </div>
        <span className="py-2 font-sans font-normal text-white opacity-50 ">
          {t("lastUpdatedAt", {
            date: "January 16, 2024",
          })}
        </span>
      </div>
    </footer>
  )
}
