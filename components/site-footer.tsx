"use client"

import Image from "next/image"
import Link from "next/link"

import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { useAppSettings } from "@/hooks/useAppSettings"
import { LABELS } from "@/app/labels"

import { Icons } from "./icons"
import { AppContent } from "./ui/app-content"

const ItemLabel = ({
  label,
  external = false,
  icon,
}: {
  label: string
  external?: boolean
  icon?: React.ReactNode
}) => {
  return (
    <div className="group flex items-center gap-2">
      {external && (
        <Icons.externalUrl className="w-5 duration-200 group-hover:text-orange" />
      )}
      {icon && <div className="group-hover:text-orange">{icon}</div>}
      <span className="mt-[0.9px] font-sans text-sm font-normal uppercase leading-[21px] text-white duration-200 group-hover:text-orange md:block">
        {label}
      </span>
    </div>
  )
}

const LinksWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return <div className={cn("flex flex-col gap-4", className)}>{children}</div>
}

export function SiteFooter() {
  const { MAIN_NAV } = useAppSettings()

  return (
    <footer className="flex flex-col">
      <div className="bg-tuatara-950 text-white py-8 text-left text-[14px] dark:bg-black dark:border-t dark:border-anakiwa-800">
        <AppContent className="grid grid-cols-1 justify-between gap-10 py-2 lg:grid-cols-[400px_1fr] lg:gap-24">
          <div className="order-1 flex flex-col items-center gap-4 md:flex-row md:gap-8">
            <Image
              width={140}
              height={140}
              src="/logos/pse-badge-blue.svg"
              alt="logo PSE"
              className="h-36 w-36"
            />
            <span className="text-center font-sans text-sm leading-[21px] md:text-left">
              {LABELS.COMMON.FOOTER.DESCRIPTION}
            </span>
          </div>
          <div className="order-2 grid grid-cols-1 justify-between gap-10 uppercase lg:grid-cols-5 lg:gap-0">
            <div>{/* spacer */}</div>
            <LinksWrapper>
              {MAIN_NAV.map(
                (
                  { title, href, external = false, onlyHeader }: NavItem,
                  indexKey
                ) =>
                  !onlyHeader && (
                    <Link
                      key={indexKey}
                      href={href}
                      target={external ? "_blank" : undefined}
                    >
                      <ItemLabel label={title} />
                    </Link>
                  )
              )}
            </LinksWrapper>
            <LinksWrapper>
              <Link
                href={siteConfig.links.discord}
                className="flex items-start gap-2"
                target="_blank"
                rel="noreferrer"
              >
                <ItemLabel
                  label="Discord"
                  icon={<Icons.discord className="w-4" />}
                />
              </Link>
              <Link
                href={siteConfig.links.github}
                className="flex items-start gap-2"
                target="_blank"
                rel="noreferrer"
              >
                <ItemLabel
                  label="Github"
                  icon={<Icons.gitHub className="w-4" />}
                />
              </Link>
              <Link
                href={siteConfig.links.twitter}
                className="flex items-center gap-2"
                target="_blank"
                rel="noreferrer"
              >
                <ItemLabel
                  label="Twitter"
                  icon={
                    <div className="w-4">
                      <Icons.twitter className="w-full" />
                    </div>
                  }
                />
              </Link>
              <Link
                href={siteConfig.links.youtube}
                className="flex items-center gap-2"
                target="_blank"
                rel="noreferrer"
              >
                <ItemLabel
                  label="Youtube"
                  icon={
                    <div className="w-4">
                      <Icons.youtube className="w-full" />
                    </div>
                  }
                />
              </Link>
              <Link
                href="/api/rss"
                className="flex items-center gap-2"
                target="_blank"
                rel="noreferrer"
              >
                <ItemLabel
                  label="RSS"
                  icon={
                    <div className="w-4">
                      <Icons.rss className="w-full" />
                    </div>
                  }
                />
              </Link>
            </LinksWrapper>
            <LinksWrapper>
              <Link
                href={siteConfig.links.discord}
                target="_blank"
                rel="noreferrer"
              >
                <ItemLabel label="Feedback" />
              </Link>
              <Link
                href={siteConfig.links.privacyPolicy}
                target="_blank"
                rel="noreferrer"
              >
                <ItemLabel label={LABELS.COMMON.FOOTER.PRIVACY_POLICY} />
              </Link>
              <Link
                href={siteConfig.links.termOfUse}
                target="_blank"
                rel="noreferrer"
              >
                <ItemLabel label={LABELS.COMMON.FOOTER.TERMS_OF_USE} />
              </Link>
              <Link
                href={siteConfig.links.jobs}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2"
              >
                <ItemLabel label="Jobs" external />
              </Link>
            </LinksWrapper>
          </div>
        </AppContent>
      </div>
    </footer>
  )
}
