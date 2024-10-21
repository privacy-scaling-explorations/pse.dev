"use client"

import Link from "next/link"
import { projects } from "@/data/projects"
import { filterProjects } from "@/state/useProjectFiltersState"

import { ProjectInterface } from "@/lib/types"
import { shuffleArray } from "@/lib/utils"
import { ProjectProps } from "@/app/[lang]/projects/[id]/page"
import { useTranslation } from "@/app/i18n/client"

import { Icons } from "../icons"
import ProjectCard from "./project-card"

export default function DiscoverMoreProjects({ project, lang }: ProjectProps) {
  const { t } = useTranslation(lang, "common")

  const getSuggestedProjects = () => {
    const projectList = projects.filter((p) => p.id !== project.id)

    const suggestedProject = filterProjects({
      searchPattern: "",
      activeFilters: project?.tags,
      findAnyMatch: true,
      projects: projectList,
    })

    // No match return random projects
    if (suggestedProject?.length < 2) {
      return shuffleArray(projectList).slice(0, 2)
    }

    return suggestedProject.slice(0, 2)
  }

  const suggestedProject = getSuggestedProjects()

  return (
    <div className="w-full bg-cover-gradient">
      <div className="mx-auto flex w-full max-w-[644px] flex-col items-center justify-center gap-14 px-6 py-12 md:px-0 md:py-16">
        <h2 className="text-3xl font-bold text-center">{t("discoverMore")}</h2>
        <div className="grid flex-col grid-cols-1 gap-5 md:grid-cols-2 md:flex-row">
          {suggestedProject?.map((project: ProjectInterface, index: number) => (
            <ProjectCard key={index} border project={project} lang={lang} />
          ))}
        </div>
        <Link
          className="flex items-center gap-2 text-tuatara-950/80 hover:text-tuatara-950"
          href={`/${lang}/projects`}
        >
          <Icons.arrowLeft />
          <span className="font-sans text-base">
            {t("backToProjectLibrary")}
          </span>
        </Link>
      </div>
    </div>
  )
}
