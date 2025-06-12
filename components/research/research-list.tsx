"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import NoResultIcon from "@/public/icons/no-result.svg"
import { useProjectFiltersState } from "@/state/useProjectFiltersState"
import { cva } from "class-variance-authority"

import { ProjectStatus } from "@/lib/types"
import { cn } from "@/lib/utils"
import { LABELS } from "@/app/labels"

import ResearchCard from "./research-card"
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

const ProjectStatusOrderList = ["active", "maintained", "inactive"]

export const ResearchList = () => {
  const [isMounted, setIsMounted] = useState(false)

  const { researchs, searchQuery, queryString } = useProjectFiltersState(
    (state) => state
  )

  const noItems = researchs?.length === 0

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const hasActiveFilters = searchQuery !== "" || queryString !== ""

  if (!isMounted) {
    return (
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-6 overflow-hidden">
          <div
            className={cn(
              "after:left-[100px] lg:after:left-[200px]",
              sectionTitleClass()
            )}
          >
            <div className="h-3 lg:h-4 w-[120px] lg:w-[220px] bg-gray-200 animate-pulse rounded-lg"></div>
          </div>
        </div>
        <div className="grid items-start justify-between w-full grid-cols-1 gap-2 md:grid-cols-3 md:gap-6 ">
          <div className="min-h-[200px] border border-gray-200 bg-gray-200 animate-pulse rounded-lg overflow-hidden"></div>
          <div className="min-h-[200px] border border-gray-200 bg-gray-200 animate-pulse rounded-lg overflow-hidden"></div>
          <div className="min-h-[200px] border border-gray-200 bg-gray-200 animate-pulse rounded-lg overflow-hidden"></div>
          <div className="min-h-[200px] border border-gray-200 bg-gray-200 animate-pulse rounded-lg overflow-hidden"></div>
        </div>
      </div>
    )
  }

  if (noItems) return <NoResults />

  const activeResearchs = researchs.filter(
    (research) => research.projectStatus === ProjectStatus.ACTIVE
  )

  const pastResearchs = researchs.filter(
    (research) => research.projectStatus !== ProjectStatus.ACTIVE
  )

  return (
    <div className="relative grid items-start justify-between grid-cols-1">
      <div
        data-section="active-researchs"
        className="flex flex-col justify-between gap-10"
      >
        <div className={cn("flex w-full flex-col gap-10")}>
          {!hasActiveFilters && (
            <div className="flex flex-col gap-6 overflow-hidden">
              <h3 className={cn(sectionTitleClass())}>
                {LABELS.RESEARCH_PAGE.ACTIVE_RESEARCH}
              </h3>
            </div>
          )}
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
