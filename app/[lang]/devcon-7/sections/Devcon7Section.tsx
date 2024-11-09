import Image from "next/image"
import Link from "next/link"
import events from "@/data/events/devcon-7"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { AppContent } from "@/components/ui/app-content"

const tableSection = cva("lg:grid lg:grid-cols-[200px_1fr_80px_20px] lg:gap-8")
const tableSectionTitle = cva(
  "text-anakiwa-500 text-xs font-sans leading-5 tracking-[2.5px] uppercase font-bold pb-3"
)
export const Devcon7Section = () => {
  return (
    <div className="relative pt-8 lg:pt-[60px] lg:pb-[120px] lg:px-[60px]">
      <div className="flex flex-col lg:container">
        <div
          className={cn(tableSection(), "lg:border-b lg:border-anakiwa-200")}
        >
          <div className={tableSectionTitle()}>Details</div>
          <div className={tableSectionTitle()}>Talks</div>
          <div className={tableSectionTitle()}>Speakers</div>
          <div></div>
        </div>
        <div className="flex flex-col">
          {events?.map((event, index) => {
            return (
              <div
                key={index}
                className={cn(
                  "flex flex-col gap-3",
                  tableSection(),
                  "py-4 px-6 lg:p-0 lg:pt-[30px] lg:pb-5 border-b border-b-tuatara-200"
                )}
              >
                <div className="flex flex-col order-2 lg:order-1">
                  <span className="text-sm text-tuatara-950 font-bold leading-5">
                    {event?.date}
                  </span>
                  <span>{event?.time}</span>
                  <span>{event?.location}</span>
                </div>
                <div className="flex flex-col gap-[10px] lg:order-2 order-1">
                  <Link
                    href="#"
                    className="text-[22px] leading-[24px] text-tuatara-950 underline font-display hover:text-anakiwa-500 font-bold duration-200"
                  >
                    {event?.title}
                  </Link>
                  <span className="hidden lg:block lg:text-base lg:leading-6 text-tuatara-950 font-sans font-normal">
                    {event?.description}
                  </span>
                </div>
                <div></div>
                <div></div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
