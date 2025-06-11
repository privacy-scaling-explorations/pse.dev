"use client"

import React, { useEffect, useRef, useState } from "react"
import Image from "next/image"
import NoResultIcon from "@/public/icons/no-result.svg"
import { cva } from "class-variance-authority"

import { ProjectStatus } from "@/lib/types"
import { cn } from "@/lib/utils"
import { LABELS } from "@/app/labels"
import { ResearchCard } from "./research-card"
import { useGetProjects } from "@/hooks/useFetchContent"
import Link from "next/link"

const sectionTitleClass = cva(
  "relative font-sans text-base font-bold uppercase tracking-[3.36px] text-anakiwa-950 after:ml-8 after:absolute after:top-1/2 after:h-[1px] after:w-full after:translate-y-1/2 after:bg-anakiwa-300 after:content-['']"
)

const NoResults = () => {
  return (
    <div className="flex flex-col gap-2 pt-24 pb-40 text-center">
      <div className="mx-auto">
        <Image className="h-9 w-9" src={NoResultIcon} alt="no result icon" />
      </div>
      <span className="text-2xl font-bold font-display text-tuatara-950">
        {LABELS.COMMON.NO_RESULTS}
      </span>
      <span className="text-lg font-normal text-tuatara-950">
        {LABELS.COMMON.NO_RESULTS_DESCRIPTION}
      </span>
    </div>
  )
}

export const ResearchList = () => {
  const SCROLL_OFFSET = -400
  const [activeId, setActiveId] = useState("")
  const [isManualScroll, setIsManualScroll] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  const { data: projects = [], isLoading: isLoadingProjects } = useGetProjects({
    category: "research" as any,
  })

  const noItems = projects?.length === 0

  const sectionsRef = useRef<NodeListOf<HTMLElement> | null>(null) // sections are constant so useRef might be better here

  useEffect(() => {
    setIsMounted(true)
    if (typeof window !== "undefined") {
      sectionsRef.current = document.querySelectorAll("div[data-section]")

      const handleScroll = () => {
        if (isManualScroll) return

        sectionsRef.current?.forEach((section: any) => {
          const sectionTop = section.offsetTop - SCROLL_OFFSET
          if (window.scrollY >= sectionTop && window.scrollY > 0) {
            setActiveId(section.getAttribute("id"))
          }
        })
      }

      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [SCROLL_OFFSET, isManualScroll])

  if (!isMounted || isLoadingProjects) {
    return (
      <div className="grid items-start justify-between w-full grid-cols-1 gap-2 md:grid-cols-4 md:gap-6">
        <div className="min-h-[380px] border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-300 animate-pulse h-[180px] w-full"></div>
        </div>
        <div className="min-h-[380px] border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-300 animate-pulse h-[180px] w-full"></div>
        </div>
        <div className="min-h-[380px] border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-300 animate-pulse h-[180px] w-full"></div>
        </div>
        <div className="min-h-[380px] border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-300 animate-pulse h-[180px] w-full"></div>
        </div>
      </div>
    )
  }

  if (noItems) return <NoResults />

  const activeResearchs = projects.filter(
    (research) => research.projectStatus === ProjectStatus.ACTIVE
  )

  const pastResearchs = projects.filter(
    (research) => research.projectStatus !== ProjectStatus.ACTIVE
  )

  return (
    <div className="relative grid items-start justify-between grid-cols-1">
      <div
        data-section="active-researchs"
        className="flex flex-col justify-between gap-10"
      >
        <div className={cn("flex w-full flex-col gap-10")}>
          <div className="flex flex-col gap-6 overflow-hidden">
            <h3 className={cn(sectionTitleClass())}>
              {LABELS.RESEARCH_PAGE.ACTIVE_RESEARCH}
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-4 md:gap-x-6 md:gap-y-10 lg:grid-cols-3">
            {activeResearchs.map((project) => {
              return (
                <ResearchCard
                  key={project?.id}
                  project={project}
                  className="h-[180px]"
                  showBanner={false}
                  showLinks={false}
                  showCardTags={false}
                  showStatus={false}
                  border
                />
              )
            })}
          </div>
        </div>
        <div className={cn("flex w-full flex-col gap-10 pt-10")}>
          <div className="flex flex-col gap-6 overflow-hidden">
            <h3 className={cn(sectionTitleClass())}>
              {LABELS.RESEARCH_PAGE.PAST_RESEARCH}
            </h3>
          </div>
          <div className="flex flex-col gap-5">
            {pastResearchs.map((project) => {
              return (
                <Link
                  href={`/projects/${project?.id}`}
                  key={project?.id}
                  className="text-neutral-950 border-b-[2px] border-b-anakiwa-500 text-sm font-medium w-fit hover:text-anakiwa-500 duration-200"
                >
                  {project.name}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
