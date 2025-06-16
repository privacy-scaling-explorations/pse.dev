import Image from "next/image"
import Link from "next/link"

import { AppContent } from "@/components/ui/app-content"
import { Icons } from "@/components/icons"
import { booths } from "@/content/events/devcon-7"

export const Devcon7Booths = () => {
  return (
    <AppContent>
      <div className="flex flex-col gap-10 lg:gap-14">
        <h2 className="lg:max-w-[700px] mx-auto font-bold text-black text-lg lg:text-[32px] leading-[110%] font-display text-center px-6">
          {`We're excited to connect and collaborate on building meaningful tools
        with cryptography.`}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">
          {booths?.map((booth, index) => {
            return (
              <div
                key={index}
                className="flex flex-col bg-anakiwa-50 rounded-lg overflow-hidden border border-[rgba(8, 27, 26, 0.15)]"
              >
                <div className="h-[160px] lg:h-[240px] bg-slate-50 relative bg-[lightgray 50% / cover no-repeat]">
                  <Image
                    src={booth.image}
                    alt={`booth image ${index + 1}`}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="flex flex-col gap-3 p-4 lg:p-6">
                  <span className="text-anakiwa-500 text-xs font-sans leading-5 tracking-[2.5px] uppercase font-bold">
                    BOOTH
                  </span>
                  <span className="text-[22px] leading-[24px] text-primary font-display font-bold">
                    {booth?.title}
                  </span>
                  <span className="text-xs text-primary font-sans font-normal">
                    {booth?.description}
                    {booth?.learMore && (
                      <Link
                        href={booth?.learMore?.url ?? "#"}
                        target="_blank"
                        className="block pt-2"
                      >
                        {`${booth.learMore.description}: `}{" "}
                        <span className="underline">
                          {booth?.learMore?.label}
                        </span>
                      </Link>
                    )}
                  </span>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-[6px]">
                      <Icons.time className="text-tuatara-500" />
                      <span className="font-sans text-tuatara-500 text-[10px] font-normal">
                        {booth?.date}
                      </span>
                    </div>
                    <div className="flex  gap-[6px] items-center">
                      <Icons.eventLocation className="text-tuatara-500" />
                      <span className="font-sans text-tuatara-500 text-[10px] font-normal">
                        {booth?.location}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </AppContent>
  )
}
