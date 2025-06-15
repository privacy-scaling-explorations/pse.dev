"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { AnnounceInterface } from "@/lib/types"
import { convertDirtyStringToHtml } from "@/lib/utils"
import { LABELS } from "@/app/labels"
import { Icons } from "../icons"
import { AppContent } from "../ui/app-content"
import { Parser as HtmlToReactParser } from "html-to-react"

const ContentPlaceholder = () => (
  <div className="flex flex-col gap-2">
    <div className="bg-skeleton h-5 w-full"></div>
    <div className="bg-skeleton h-5 w-1/3"></div>
    <div className="bg-skeleton h-5 w-2/3"></div>
    <div className="bg-skeleton h-5 w-2/3"></div>
    <div className="bg-skeleton h-5 w-full"></div>
    <div className="bg-skeleton h-5 w-1/3"></div>
  </div>
)

export const NewsSection = () => {
  const [newsItems, setNewsItems] = useState<AnnounceInterface[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getDiscordAnnouncements = async () => {
      setLoading(true)
      await fetch("/api/news")
        .then((res) => res.json())
        .then(({ announcements }: { announcements: AnnounceInterface[] }) => {
          setNewsItems(announcements ?? [])
        })
        .finally(() => setLoading(false))
    }

    getDiscordAnnouncements()
  }, [])

  const [news] = newsItems ?? []

  // @ts-expect-error - HtmlToReactParser is not typed
  const htmlToReactParser = new HtmlToReactParser()
  const announcementContent = htmlToReactParser.parse(
    convertDirtyStringToHtml(
      news?.content || news?.message_snapshots?.[0]?.message?.content || ""
    )
  )

  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    news?.content
  )}&url=${encodeURIComponent(siteConfig?.links?.discordAnnouncementChannel)}`

  return (
    <div className="bg-white py-16">
      <div className="flex flex-col gap-10 ">
        <h3 className="text-base font-bold font-sans text-center uppercase tracking-[3.36px]">
          {LABELS.NEWS_SECTION.RECENT_UPDATES}
        </h3>
        <AppContent className="mx-auto flex max-w-[978px] flex-col gap-4">
          <div className="flex gap-6 flex-col border border-tuatara-950 bg-anakiwa-100 p-6 rounded-[8px] ">
            <div className="flex items-center pb-6 border-b border-b-anakiwa-400 justify-between">
              {!loading ? (
                news?.timestamp && (
                  <span className="text-anakiwa-600 text-lg font-bold font-display">
                    {new Intl.DateTimeFormat("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    }).format(new Date(news?.timestamp))}
                  </span>
                )
              ) : (
                <div className="bg-skeleton h-5 w-1/3"></div>
              )}
              <Link
                type="button"
                className="flex items-center gap-1 outline-none disabled:opacity-50"
                href={twitterShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                passHref
              >
                <Icons.twitter size={24} className="text-anakiwa-500" />
                <span className="flex text-anakiwa-900 underline font-medium leading-[24px]">
                  {LABELS.NEWS_SECTION.REPOST_ON_SOCIAL.replace(
                    "{{socialName}}",
                    "Twitter"
                  )}
                </span>
              </Link>
            </div>
            <span className="break-words text-base md:text-xl text-primary font-sans font-normal leading-[30px] [&>a]:text-anakiwa-600 [&>a]:font-medium">
              {!loading ? announcementContent : <ContentPlaceholder />}
            </span>
          </div>
          <Link
            href={siteConfig?.links?.discordAnnouncementChannel}
            className="mx-auto flex items-center gap-1"
            target="_blank"
            rel="noopener noreferrer"
            passHref
          >
            <Icons.discord className="text-anakiwa-400" />
            <span>{LABELS.NEWS_SECTION.SEE_ALL_UPDATES}</span>
            <Icons.externalUrl className="text-primary" />
          </Link>
        </AppContent>
      </div>
    </div>
  )
}

NewsSection.displayName = "NewsSection"
