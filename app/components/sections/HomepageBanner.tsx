"use client"

import { Banner } from "../banner"
import { Icons } from "../icons"
import { siteConfig } from "@/site-config"
import Link from "next/link"
import { Button } from "../ui/button"
import { LABELS } from "@/app/labels"

export const HomepageBanner = () => {
  return (
    <Banner
      title={LABELS.COMMON.CONNECT_WITH_US}
      subtitle={LABELS.COMMON.CONNECT_WITH_US_DESCRIPTION}
    >
      <Link
        href={siteConfig.links.discord}
        target="_blank"
        rel="noreferrer"
        passHref
        className="mx-auto"
      >
        <Button>
          <div className="flex items-center gap-2">
            <Icons.discord fill="white" className="h-4" />
            <span className="text-[14px] uppercase">
              {LABELS.COMMON.JOIN_OUR_DISCORD}
            </span>
            <Icons.externalUrl fill="white" className="h-5" />
          </div>
        </Button>
      </Link>
    </Banner>
  )
}
