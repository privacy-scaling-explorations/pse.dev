"use client"

import Image from "next/image"
import Link from "next/link"
import PSELogo from "@/public/logos/pse-logo-circle.svg"

import { LangProps } from "@/types/common"
import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { useAppSettings } from "@/hooks/useAppSettings"
import { useTranslation } from "@/app/i18n/client"

import { Icons } from "./icons"
import { AppContent } from "./ui/app-content"

const SocialMedia = ({ label }: { label: string }) => {
  return (
    <span className="mt-[0.9px] font-sans text-sm font-normal uppercase leading-[21px] text-white md:block">
      {label}
    </span>
  )
}

const LinksWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col gap-4">{children}</div>
}

export function SiteFooter({ lang }: LangProps["params"]) {
  const { t } = useTranslation(lang, "common")

  const { MAIN_NAV } = useAppSettings(lang)

  return (
    <footer className="flex flex-col">
      <div className="bg-tuatara-950 py-8 text-left text-[14px] uppercase text-white">
        <AppContent className="grid grid-cols-1 justify-between gap-8 bg-tuatara-950 py-2 text-white md:grid-cols-4 lg:px-40">
          <LinksWrapper>
            {MAIN_NAV.map(
              ({ title, href, external = false }: NavItem, indexKey) => (
                <Link
                  key={indexKey}
                  href={href}
                  target={external ? "_blank" : undefined}
                >
                  {title}
                </Link>
              )
            )}
          </LinksWrapper>
          <LinksWrapper>
            <Link
              href={siteConfig.links.jobs}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2"
            >
              <Icons.jobs fill="white" />
              {t("menu.jobs")}
              <Icons.externalUrl className="w-5" />
            </Link>
            <Link
              href={siteConfig.links.discord}
              className="flex items-start gap-2"
              target="_blank"
              rel="noreferrer"
            >
              <Icons.discord className="w-4" />
              <SocialMedia label="Discord" />
              <Icons.externalUrl className="w-5" />
            </Link>
            <Link
              href={siteConfig.links.github}
              className="flex items-start gap-2"
              target="_blank"
              rel="noreferrer"
            >
              <Icons.gitHub className="w-4" color="white" />
              <SocialMedia label="Github" />
              <Icons.externalUrl className="w-5" />
            </Link>
          </LinksWrapper>
          <LinksWrapper>
            <Link
              href={siteConfig.links.twitter}
              className="flex items-center gap-2"
              target="_blank"
              rel="noreferrer"
            >
              <div className="w-4">
                <Icons.twitter className="w-full" color="white" />
              </div>
              <SocialMedia label="Twitter" />
              <Icons.externalUrl className="w-5" />
            </Link>
            <Link
              href={siteConfig.links.articles}
              className="flex items-center gap-2"
              target="_blank"
              rel="noreferrer"
            >
              <div className="w-4">
                <Icons.mirror className="w-full" color="white" />
              </div>

              <SocialMedia label="Mirror" />
              <Icons.externalUrl className="w-5" />
            </Link>
            <Link
              href={siteConfig.links.youtube}
              className="flex items-center gap-2"
              target="_blank"
              rel="noreferrer"
            >
              <div className="w-4">
                <Icons.youtube className="w-full" color="white" />
              </div>
              <SocialMedia label="Youtube" />
              <Icons.externalUrl className="w-5" />
            </Link>
          </LinksWrapper>
          <LinksWrapper>
            <Link
              href={siteConfig.links.privacyPolicy}
              target="_blank"
              rel="noreferrer"
            >
              <span>{t("footer.privacyPolicy")}</span>
            </Link>
            <Link
              href={siteConfig.links.termOfUse}
              target="_blank"
              rel="noreferrer"
            >
              <span>{t("footer.termsOfUse")}</span>
            </Link>
          </LinksWrapper>
        </AppContent>
      </div>
    </footer>
  )
}
