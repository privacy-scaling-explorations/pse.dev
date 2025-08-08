"use client"

import { LABELS } from "@/app/labels"

import { Icons } from "../icons"
import { AppContent } from "../ui/app-content"
import Link from "next/link"

type OurWorkContent = {
  title: string
  description: string
  icon: any
  action?: string
  link: string
}

export const OurWork = () => {
  const content: OurWorkContent[] = [
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
    <div className="flex flex-col justify-center bg-cover-gradient dark:bg-anakiwa-975 dark:bg-none py-16">
      <AppContent className="mx-auto lg:max-w-[845px] w-full">
        <section className="flex flex-col gap-10">
          <h6 className="font-sans text-base font-bold uppercase tracking-[3.36px] text-primary text-center text-tuatara-950 dark:text-anakiwa-400">
            Our Work
          </h6>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 max-auto">
            {content.map((item, index) => (
              <Link
                href={item.link}
                key={index}
                className="flex flex-col gap-6 w-full lg:max-w-[400px] p-10 rounded-[10px] border border-anakiwa-300 dark:border-anakiwa-400 bg-white dark:bg-anakiwa-975 hover:scale-105 duration-200 ease-in-out dark:hover:bg-cover-gradient-dark"
              >
                <article className="flex flex-col gap-2">
                  <h6 className="font-sans text-xl font-medium text-tuatara-950 dark:text-anakiwa-400">
                    {item.title}
                  </h6>
                  <p className="font-sans text-base font-normal text-tuatara-500 dark:text-tuatara-100">
                    {item.description}
                  </p>
                </article>
              </Link>
            ))}
          </div>
        </section>
      </AppContent>
    </div>
  )
}
