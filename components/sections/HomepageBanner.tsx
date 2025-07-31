"use client"

import { Banner } from "../banner"
import { LABELS } from "@/app/labels"
import { Icons } from "../icons"
import { siteConfig } from "@/config/site"
import { Button } from "../ui/button"
import { AppLink } from "../app-link"

export const HomepageBanner = () => {
  return (
    <Banner
      title={LABELS.COMMON.CONNECT_WITH_US}
      subtitle={LABELS.COMMON.CONNECT_WITH_US_DESCRIPTION}
    >
      <AppLink
        href={siteConfig.links.discord}
        external
        variant="button"
        passHref
        className="mx-auto"
      >
        <Button>
          <div className="flex items-center gap-2">
            <Icons.discord fill="white" className="h-4" />
            <span className="uppercase">
              {LABELS.HOMEPAGE.JOIN_OUR_DISCORD}
            </span>
            <Icons.externalUrl fill="white" className="h-5" />
          </div>
        </Button>
      </AppLink>
    </Banner>
  )
}
