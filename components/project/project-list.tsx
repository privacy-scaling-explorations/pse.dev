"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import NoResultIcon from "@/public/icons/no-result.svg"
import { useProjectFiltersState } from "@/state/useProjectFiltersState"
import { cva } from "class-variance-authority"

import { LangProps } from "@/types/common"
import {
  ProjectInterface,
  ProjectSection,
  ProjectSectionLabelMapping,
  ProjectSections,
  ProjectStatus,
  ProjectStatusDescriptionMapping,
} from "@/lib/types"
import { cn } from "@/lib/utils"
import { useTranslation } from "@/app/i18n/client"

import ProjectCard from "./project-card"

const sectionTitleClass = cva(
  "relative font-sans text-base font-bold uppercase tracking-[3.36px] text-anakiwa-950 after:ml-8 after:absolute after:top-1/2 after:h-[1px] after:w-full after:translate-y-1/2 after:bg-anakiwa-300 after:content-['']"
)

const NoResults = ({ lang }: LangProps["params"]) => {
  const { t } = useTranslation(lang, "common")

  return (
    <div className="flex flex-col gap-2 pt-24 pb-40 text-center">
      <div className="mx-auto">
        <Image className="h-9 w-9" src={NoResultIcon} alt="no result icon" />
      </div>
      <span className="text-2xl font-bold font-display text-tuatara-950">
        {t("noResults")}
      </span>
      <span className="text-lg font-normal text-tuatara-950">
        {t("noResultsDescription")}
      </span>
    </div>
  )
}

const ProjectStatusOrderList = ["active", "maintained", "inactive"]

export const ProjectList = ({ lang }: LangProps["params"]) => {
  const { t } = useTranslation(lang, "resources-page")
  const SCROLL_OFFSET = -400
  const [activeId, setActiveId] = useState("")
  const [isManualScroll, setIsManualScroll] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  const { projects, searchQuery, queryString } = useProjectFiltersState(
    (state) => state
  )

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

  const scrollToId = useCallback((id: string) => {
    if (typeof window !== "undefined") {
      const element = document.getElementById(id)
      const top = element?.offsetTop ?? 0

      if (element) {
        setActiveId(id) // active clicked id
        setIsManualScroll(true) // tell the window event listener to ignore this scrolling
        window?.scrollTo({
          behavior: "smooth",
          top: (top ?? 0) - SCROLL_OFFSET,
        })
      }

      setTimeout(() => setIsManualScroll(false), 800)
    }
  }, [])

  const hasActiveFilters = searchQuery !== "" || queryString !== ""

  // loading state skeleton
  if (!isMounted) {
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

  if (noItems) return <NoResults lang={lang} />

  const projectsGroupByStatus = projects.reduce(
    (acc, project) => {
      acc[project.projectStatus] = [
        ...(acc[project.projectStatus] || []),
        project,
      ]
      return acc
    },
    {} as Record<ProjectStatus, ProjectInterface[]>
  )

  // show all projects without sections if there are active filters
  if (hasActiveFilters) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-x-6 md:gap-y-10 lg:grid-cols-4">
        {projects.map((project) => (
          <ProjectCard
            key={project?.id}
            project={project}
            lang={lang}
            showBanner
            showLinks
            border
          />
        ))}
      </div>
    )
  }

  return (
    <div className="relative grid items-start justify-between grid-cols-1">
      <div className="flex flex-col">
        {ProjectStatusOrderList.map((status, index) => {
          const projects = projectsGroupByStatus[status as ProjectStatus] ?? []
          const description =
            ProjectStatusDescriptionMapping?.[status as ProjectStatus]

          const hasProjects = projects?.length > 0

          if (!hasProjects) return null // no projects for this status, hide the section

          return (
            <div
              key={index}
              data-section={status}
              className="flex justify-between gap-10"
            >
              <div className={cn("flex w-full flex-col gap-10 pt-10")}>
                {!hasActiveFilters && (
                  <div className="flex flex-col gap-6 overflow-hidden">
                    <h3 className={cn(sectionTitleClass())}>{status}</h3>
                    <span className="font-sans text-base italic text-tuatara-950">
                      {description}
                    </span>
                  </div>
                )}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-x-6 md:gap-y-10 lg:grid-cols-4">
                  {projects.map((project) => (
                    <ProjectCard
                      key={project?.id}
                      project={project}
                      lang={lang}
                      showBanner
                      showLinks
                      border
                    />
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div id="sidebar" className="sticky hidden p-8 top-20 bg-white/30">
        <div className="flex flex-col gap-4">
          <h6 className="text-lg font-bold font-display text-tuatara-700">
            {t("onThisPage")}
          </h6>
          <ul className="font-sans text-black text-normal">
            {ProjectSections.map((id: ProjectSection) => {
              const label = ProjectSectionLabelMapping[id]

              if (!label) return null // no label for this section

              const active = id === activeId

              return (
                <li
                  key={id}
                  onClick={() => {
                    scrollToId(id)
                  }}
                  data-id={id}
                  className={cn(
                    "flex h-8 cursor-pointer items-center border-l-2 border-l-anakiwa-200 px-3 duration-200",
                    {
                      "border-l-anakiwa-500 text-anakiwa-500 font-medium":
                        active,
                    }
                  )}
                >
                  {label}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}
