"use client"

import { Icons } from "../icons"
import { AppContent } from "../ui/app-content"
import { LABELS } from "@/app/labels"

type WhatWeDoContent = { title: string; description: string; icon: any }

export const WhatWeDo = () => {
  const content: WhatWeDoContent[] = [
    {
      title: LABELS.HOMEPAGE.WHAT_WE_DO.TITLE,
      description: LABELS.HOMEPAGE.WHAT_WE_DO.DESCRIPTION,
      icon: Icons.privacy,
    },
    {
      title: LABELS.HOMEPAGE.WHAT_WE_DO.TITLE,
      description: LABELS.HOMEPAGE.WHAT_WE_DO.DESCRIPTION,
      icon: Icons.scaling,
    },
    {
      title: LABELS.HOMEPAGE.WHAT_WE_DO.TITLE,
      description: LABELS.HOMEPAGE.WHAT_WE_DO.DESCRIPTION,
      icon: Icons.explorations,
    },
  ]

  return (
    <div className="bg-cover-gradient">
      <AppContent className="mx-auto lg:max-w-[1200px] w-full">
        <section className="flex flex-col gap-16 py-16 md:pb-24">
          <div className="flex flex-col text-center">
            <h6 className="py-6 font-sans text-base font-bold uppercase tracking-[4px] text-tuatara-950">
              {LABELS.HOMEPAGE.WHAT_WE_DO.TITLE}
            </h6>
            <h3 className="font-display text-[18px] font-bold text-tuatara-950 md:text-3xl">
              {LABELS.HOMEPAGE.WHAT_WE_DO.DESCRIPTION}
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {content.map((item, index) => (
              <article
                className="border-tuatara-300 flex flex-col gap-2 rounded-[6px] border bg-white px-8 py-4"
                key={index}
              >
                <div className="flex items-center gap-2">
                  <div className="w-4">
                    <item.icon />
                  </div>
                  <h6 className="font-sans text-base font-bold uppercase tracking-[4px] text-anakiwa-700">
                    {item.title}
                  </h6>
                </div>
                <p className="font-sans text-base text-tuatara-950">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>
      </AppContent>
    </div>
  )
}
