"use client"

import { Icons } from "../icons"
import { AppContent } from "../ui/app-content"
import { Button } from "../ui/button"
import { LABELS } from "@/app/labels"
import Link from "next/link"

type WhatWeDoContent = {
  title: string
  description: string
  icon: any
  action?: string
  link: string
}

export const WhatWeDo = () => {
  const content: WhatWeDoContent[] = [
    {
      title: LABELS.WHAT_WE_DO_SECTION.BUILD.TITLE,
      description: LABELS.WHAT_WE_DO_SECTION.BUILD.DESCRIPTION,
      action: LABELS.WHAT_WE_DO_SECTION.BUILD.ACTION,
      link: "/projects",
      icon: Icons.privacy,
    },
    {
      title: LABELS.WHAT_WE_DO_SECTION.RESEARCH.TITLE,
      description: LABELS.WHAT_WE_DO_SECTION.RESEARCH.DESCRIPTION,
      action: LABELS.WHAT_WE_DO_SECTION.RESEARCH.ACTION,
      link: "/research",
      icon: Icons.scaling,
    },
  ]

  return (
    <div className="flex flex-col justify-center bg-anakiwa-975 py-16">
      <AppContent className="mx-auto lg:max-w-[845px] w-full">
        <section className="flex flex-col gap-10">
          <h2 className="font-sans text-base font-bold uppercase tracking-[4px] text-primary text-center text-white">
            What we do
          </h2>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 max-auto">
            {content.map((item, index) => (
              <div className="flex flex-col gap-6 w-full lg:max-w-[300px]">
                <article className="flex flex-col gap-2" key={index}>
                  <h3 className="font-sans text-xl font-medium text-white">
                    {item.title}
                  </h3>
                  <p className="font-sans text-base font-normal text-white">
                    {item.description}
                  </p>
                </article>
                {item.action && (
                  <Link href={item.link}>
                    <Button variant="transparent" className="uppercase">
                      {item.action}
                    </Button>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>
      </AppContent>
    </div>
  )
}
