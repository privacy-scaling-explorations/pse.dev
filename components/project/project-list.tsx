"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import NoResultIcon from "@/public/icons/no-result.svg"
import { useProjectFiltersState } from "@/state/useProjectFiltersState"
import { cva } from "class-variance-authority"

import { LangProps } from "@/types/common"
import {
  ProjectSection,
  ProjectSectionLabelMapping,
  ProjectSections,
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
    <div className="flex flex-col gap-2 pb-40 pt-24 text-center">
      <div className="mx-auto">
        <Image className="h-9 w-9" src={NoResultIcon} alt="no result icon" />
      </div>
      <span className="font-display text-2xl font-bold text-tuatara-950">
        {t("noResults")}
      </span>
      <span className="text-lg font-normal text-tuatara-950">
        {t("noResultsDescription")}
      </span>
    </div>
  )
}

export const ProjectList = ({ lang }: LangProps["params"]) => {
  const { t } = useTranslation(lang, "resources-page")
  const SCROLL_OFFSET = -400
  const [activeId, setActiveId] = useState("")
  const [isManualScroll, setIsManualScroll] = useState(false)

  const { projects } = useProjectFiltersState((state) => state)

  const noItems = projects?.length === 0

  const sectionsRef = useRef<NodeListOf<HTMLElement> | null>(null) // sections are constant so useRef might be better here

  useEffect(() => {
    if (sectionsRef.current === null)
      sectionsRef.current = document.querySelectorAll(`div[data-section]`)
    if (!activeId) setActiveId("pse")

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
  }, [SCROLL_OFFSET, activeId, isManualScroll])

  const scrollToId = useCallback((id: string) => {
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
  }, [])

  if (noItems) return <NoResults lang={lang} />

  return (
    <div className="relative grid grid-cols-1 items-start justify-between gap-8 md:grid-cols-[1fr_200px] md:gap-10">
      <div className="flex flex-col gap-10 md:gap-20">
        {ProjectSections.map((section) => {
          const sectionProjects =
            projects.filter(
              (project) =>
                project.section?.toLowerCase() === section?.toLowerCase()
            ) ?? []

          const hasProjectsForSection = sectionProjects.length > 0

          const sectionTitle =
            ProjectSectionLabelMapping[section as ProjectSection]

          if (!hasProjectsForSection) return null

          return (
            <div
              key={section}
              id={section}
              data-section={section}
              className="flex justify-between gap-10"
            >
              <div
                className={cn(
                  "flex w-full flex-col",
                  hasProjectsForSection ? "gap-6 md:gap-10" : "gap-2"
                )}
              >
                <div className="overflow-hidden">
                  <h3 className={cn(sectionTitleClass())}>{sectionTitle}</h3>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 3xl:grid-cols-4">
                  {sectionProjects.map((project) => (
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

      <div
        id="sidebar"
        className="sticky top-20 hidden bg-white/30 p-8 md:block"
      >
        <div className="flex flex-col gap-4">
          <h6 className="font-display text-lg font-bold text-tuatara-700">
            {t("onThisPage")}
          </h6>
          <ul className="text-normal font-sans text-black">
            {ProjectSections.map((id: ProjectSection) => {
              const label = ProjectSectionLabelMapping[id]

              if (!label) return null // no label for this section

              const active = id === activeId

              return (
                <li
                  key={id}
                  onClick={(e) => {
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
