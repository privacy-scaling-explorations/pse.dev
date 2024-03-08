"use client"

import React from "react"
import Image from "next/image"
import NoResultIcon from "@/public/icons/no-result.svg"
import { useProjectFiltersState } from "@/state/useProjectFiltersState"
import { cva } from "class-variance-authority"

import { LangProps } from "@/types/common"
import { ProjectSection, ProjectSections } from "@/lib/types"
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

const ProjectSectionLabelMapping: Record<ProjectSection, string> = {
  pse: "PSE projects",
  grant: "Grants",
  collaboration: "Collaborations",
}

export const ProjectList = ({ lang }: LangProps["params"]) => {
  const { t } = useTranslation(lang, "common")
  const { t: tResource } = useTranslation(lang, "resources-page")
  const { projects } = useProjectFiltersState((state) => state)

  const noItems = projects?.length === 0

  if (noItems) return <NoResults lang={lang} />

  return (
    <div className="relative grid grid-cols-[1fr_200px] justify-between gap-10">
      <div className="flex flex-col gap-14 md:gap-20">
        {ProjectSections.map((section) => {
          const sectionProjects =
            projects.filter(
              (project) =>
                project.section?.toLowerCase() === section?.toLowerCase()
            ) ?? []

          const hasProjectsForSection = sectionProjects.length > 0

          const sectionTitle =
            ProjectSectionLabelMapping[section as ProjectSection]

          return (
            <div className="flex justify-between gap-10">
              <div
                className={cn(
                  "flex w-full flex-col",
                  hasProjectsForSection ? "gap-10" : "gap-2"
                )}
              >
                <div className="overflow-hidden">
                  <h3 className={cn(sectionTitleClass())}>{sectionTitle}</h3>
                </div>
                <div className="flex flex-wrap gap-6">
                  {hasProjectsForSection ? (
                    sectionProjects.map((project) => (
                      <ProjectCard
                        key={project?.id}
                        project={project}
                        lang={lang}
                        showBanner
                        showLinks
                        border
                      />
                    ))
                  ) : (
                    <span> {t("noResults")}</span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="sticky top-16">
        <div className="flex flex-col gap-4">
          <h6 className="font-display text-lg font-bold text-tuatara-700">
            {tResource("onThisPage")}
          </h6>
        </div>
      </div>
    </div>
  )
}
