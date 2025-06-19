"use client"

import { LABELS } from "@/app/labels"
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
        <div className="bg-skeleton aspect-video w-full animate-pulse"></div>
        <div className="bg-skeleton h-3 w-full animate-pulse"></div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="bg-skeleton aspect-video w-full animate-pulse"></div>
        <div className="bg-skeleton h-3 w-full animate-pulse"></div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="bg-skeleton aspect-video w-full animate-pulse"></div>
        <div className="bg-skeleton h-3 w-full animate-pulse"></div>
      </div>
    </div>
  )
}

export const HomepageVideoFeed = () => {
  const { data: videos = [], isLoading, isError } = useYoutube()

  return (
    <section className="mx-auto px-6 lg:px-8 py-10 lg:py-16 bg-tuatara-950 dark:bg-black">
      <AppContent className="flex flex-col gap-8 lg:max-w-[1200px] w-full">
        <div className="col-span-1 lg:col-span-4">
          <h2 className="font-sans text-base font-bold uppercase tracking-[4px] text-white text-center">
            {LABELS.HOMEPAGE.VIDEOS}
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr_280px] gap-10 lg:gap-8 lg:divide-x divide-[#626262]">
          <div className="lg:col-span-3">
            {isLoading ? (
              <VideoCardSkeleton />
            ) : isError ? (
              <div className="flex flex-col gap-4 items-center w-full">
                <VideoCardSkeleton />
                <p className="text-center text-destructive">
                  {LABELS.HOMEPAGE.ERROR_LOADING_VIDEOS}
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
                {LABELS.HOMEPAGE.CHECK_OUT_OUR_YOUTUBE}
              </span>
              <Link
                href="https://www.youtube.com/@privacyscalingexplorations-1"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex"
              >
                <Button className="w-full" variant="orange">
                  <div className="flex items-center gap-1">
                    <span className="font-medium uppercase">
                      {LABELS.HOMEPAGE.VISIT_OUR_CHANNEL}
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
