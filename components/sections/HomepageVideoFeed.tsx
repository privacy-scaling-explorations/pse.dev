"use client"

import { useTranslation } from "@/app/i18n/client"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import { AppContent } from "../ui/app-content"
import { Icons } from "../icons"
import { useYoutube } from "@/hooks/useYoutube"

interface Video {
  id: string
  title: string
  description: string
  thumbnailUrl: string
  publishedAt: string
  channelTitle: string
  url?: string
}

const VideoCard = ({ video }: { video: Video }) => {
  return (
    <Link
      href={video.url || `https://www.youtube.com/watch?v=${video.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-4"
    >
      <div className="relative overflow-hidden aspect-video rounded-sm">
        <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-60 transition-opacity duration-300 z-10"></div>
        <Image
          src={video.thumbnailUrl || ""}
          alt={video.title}
          fill
          style={{ objectFit: "cover" }}
          className="transition-transform duration-300 scale-105 group-hover:scale-110"
        />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <Icons.play />
        </div>
      </div>
      <h3 className="font-sans text-sm font-normal line-clamp-3 text-white group-hover:text-tuatara-400 transition-colors">
        {video.title}
      </h3>
    </Link>
  )
}

const VideoCardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
      <div className="flex flex-col gap-1">
        <div className="bg-slate-200 aspect-video w-full animate-pulse"></div>
        <div className="bg-slate-200 h-3 w-full animate-pulse"></div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="bg-slate-200 aspect-video w-full animate-pulse"></div>
        <div className="bg-slate-200 h-3 w-full animate-pulse"></div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="bg-slate-200 aspect-video w-full animate-pulse"></div>
        <div className="bg-slate-200 h-3 w-full animate-pulse"></div>
      </div>
    </div>
  )
}
export const HomepageVideoFeed = ({ lang }: { lang: string }) => {
  const { t } = useTranslation(lang, "homepage")

  const { data: videos = [], isLoading, isError } = useYoutube()

  return (
    <section className="mx-auto px-6 lg:px-8 py-10 lg:py-16 bg-tuatara-950">
      <AppContent className="flex flex-col gap-8 lg:max-w-[1200px] w-full">
        <div className="col-span-1 lg:col-span-4">
          <h2 className="text-base text-center font-sans font-bold text-white">
            {t("videos") || "VIDEOS"}
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-8 lg:divide-x divide-[#626262]">
          <div className="lg:col-span-3">
            {isLoading ? (
              <VideoCardSkeleton />
            ) : isError ? (
              <div className="flex flex-col gap-4 items-center w-full">
                <VideoCardSkeleton />
                <p className="text-center text-destructive">
                  {t("errorLoadingVideos") || "Error loading videos"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {videos.slice(0, 3).map((video: Video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            )}
          </div>
          <div className="lg:col-span-1">
            <div className="lg:p-6 flex flex-col gap-8">
              <span className="text-base text-white">
                {t("checkOutOurYoutube") ||
                  "Check out our YouTube to learn the latest in advanced cryptography."}
              </span>
              <Link
                href="https://www.youtube.com/@privacyscalingexplorations-1"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex"
              >
                <Button className="w-full" variant="orange">
                  <div className="flex items-center gap-1">
                    <span className="text-base font-medium uppercase">
                      {t("visitOurChannel") || "VISIT OUR CHANNEL"}
                    </span>
                    <ArrowRight className="h-5 w-5 duration-200 ease-in-out group-hover:translate-x-2" />
                  </div>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </AppContent>
    </section>
  )
}
