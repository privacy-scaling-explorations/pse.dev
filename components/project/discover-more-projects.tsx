"use client"

import Link from "next/link"
import { projects } from "@/data/projects"
import { filterProjects } from "@/state/useProjectFiltersState"

import { ProjectInterface } from "@/lib/types"
import { shuffleArray } from "@/lib/utils"
import { LABELS } from "@/app/labels"

import { Icons } from "../icons"
import ProjectCard from "./project-card"
import { ProjectProps } from "@/app/(pages)/projects/[id]/page"

export default function DiscoverMoreProjects({ project }: ProjectProps) {
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
        <h2 className="text-3xl font-bold text-center">
          {LABELS.COMMON.DISCOVER_MORE}
        </h2>
        <div className="grid flex-col grid-cols-1 gap-5 md:grid-cols-2 md:flex-row">
          {suggestedProject?.map((project: ProjectInterface, index: number) => (
            <ProjectCard key={index} border project={project} />
          ))}
        </div>
        <Link
          className="flex items-center gap-2 text-tuatara-950/80 hover:text-tuatara-950"
          href="/projects"
        >
          <Icons.arrowLeft />
          <span className="font-sans text-base">
            {LABELS.COMMON.BACK_TO_PROJECT_LIBRARY}
          </span>
        </Link>
      </div>
    </div>
  )
}
