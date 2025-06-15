"use client"

import { useState } from "react"
import Link from "next/link"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { events } from "@/content/events/devcon-7"

const tableSection = cva("lg:grid lg:grid-cols-[200px_1fr_160px_20px] lg:gap-8")
const tableSectionTitle = cva(
  "text-anakiwa-500 text-base lg:text-xs font-sans leading-5 tracking-[2.5px] uppercase font-bold lg:pb-3"
)

const EventCard = ({ event = {}, speakers = [], location = "" }: any) => {
  const [isOpen, setIsOpen] = useState(false)

  const getYouTubeEmbedURL = (url: string) => {
    const match = url.match(
      /(?:youtube\.com\/(?:watch\?v=|live\/)|youtu\.be\/)([^?&]+)/
    )
    return match ? `https://www.youtube.com/embed/${match[1]}` : null
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        tableSection(),
        "py-4 px-6 lg:p-0 lg:pt-[30px] lg:pb-5 border-b border-b-tuatara-200"
      )}
    >
      <div className="flex flex-col gap-1 order-3 lg:order-1">
        <span className="text-sm text-primary font-bold font-sans leading-5">
          {event?.date}
        </span>
        <div className="grid grid-cols-[1fr_16px] lg:grid-cols-1">
          <div className="flex flex-col">
            <div className="flex items-center gap-[6px]">
              <Icons.time className="text-tuatara-500" />
              <span className="font-sans text-tuatara-500 text-xs lg:text-sm leading-5 font-normal">
                {event?.time}
              </span>
            </div>
            <div className="flex gap-[6px] items-center">
              <Icons.eventLocation className="text-tuatara-500" />
              <span className="font-sans text-tuatara-500 text-xs lg:text-sm leading-5 font-normal">
                {location}
              </span>
            </div>
            <div className="flex flex-wrap lg:flex-col gap-1 pt-1">
              {speakers?.map((speaker: any, index: number) => {
                return (
                  <Link
                    key={index}
                    className="text-sm text-anakiwa-500 underline break-all"
                    href={speaker.url ?? "#"}
                  >
                    {speaker.label}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-start gap-[10px] lg:order-2 order-2">
        <div className="flex items-center justify-between">
          <Link
            href={event?.url ?? "#"}
            target="_blank"
            className="text-[22px] inline-flex leading-[24px] text-primary underline font-display hover:text-anakiwa-500 font-bold duration-200"
          >
            {event?.title}
          </Link>
          <button
            className="lg:hidden flex"
            onClick={() => {
              setIsOpen(!isOpen)
            }}
          >
            {isOpen ? (
              <Icons.minus
                className={cn(
                  "size-5 ml-auto",
                  "transition-transform duration-200"
                )}
              />
            ) : (
              <Icons.plus
                className={cn(
                  "size-5 ml-auto",
                  "transition-transform duration-200"
                )}
              />
            )}
          </button>
        </div>
        <div
          className={cn(
            "lg:max-h-none lg:opacity-100 lg:block",
            "transition-all duration-300 overflow-hidden",
            isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0",
            "lg:transition-none lg:overflow-visible"
          )}
        >
          <span className="text-base leading-6 text-primary font-sans font-normal">
            {event?.description}
          </span>
          <div className="pt-2 flex lg:!hidden">
            {event?.youtubeLink && (
              <iframe
                width="100%"
                height="230"
                src={getYouTubeEmbedURL(event?.youtubeLink) ?? ""}
                allowFullScreen
                style={{ borderRadius: "10px", overflow: "hidden" }}
              />
            )}
          </div>
        </div>
      </div>

      <div className="relative lg:order-3 grid gap-5 pb-3 lg:pb-0 grid-cols-[1fr_32px] lg:grid-cols-1">
        <div className="hidden lg:flex flex-wrap lg:flex-col gap-1">
          {event?.youtubeLink && (
            <iframe
              width="240"
              height="140"
              src={getYouTubeEmbedURL(event?.youtubeLink) ?? ""}
              allowFullScreen
              style={{ borderRadius: "10px", overflow: "hidden" }}
            />
          )}
        </div>
      </div>

      <div className="order-4 lg:flex hidden"></div>
    </div>
  )
}

export const Devcon7Section = () => {
  return (
    <div className="flex flex-col gap-10 relative">
      <div className="flex flex-col gap-3 lg:gap-10 lg:container">
        <div
          className={cn(
            tableSection(),
            "!hidden lg:border-b lg:border-anakiwa-200"
          )}
        >
          <div className={cn(tableSectionTitle(), "lg:flex hidden")}>
            Details
          </div>
          <div className={cn(tableSectionTitle(), "lg:text-left text-center")}>
            Talks
          </div>
          <div className={cn(tableSectionTitle(), "lg:flex hidden")}>
            Speakers
          </div>
          <div className="lg:flex hidden"></div>
        </div>
        <div className="flex flex-col">
          {events?.map(({ event, speakers, location }, index) => {
            return (
              <EventCard
                key={index}
                event={event}
                speakers={speakers}
                location={location}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
