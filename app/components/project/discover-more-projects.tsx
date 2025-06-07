"use client"

import Link from "next/link"
import { filterProjects } from "@/state/useProjectFiltersState"

import { ProjectInterface } from "@/lib/types"
import { shuffleArray } from "@/lib/utils"
import { useGetProjects } from "@/hooks/useFetchContent"

import { Icons } from "../icons"
import ProjectCard from "./project-card"
import { LABELS } from "@/app/labels"

export default function DiscoverMoreProjects({
  project,
}: {
  project: ProjectInterface
}) {
  const { data: projects = [], isLoading } = useGetProjects()

  const getSuggestedProjects = () => {
    const projectList =
      projects.filter((p: ProjectInterface) => p.id !== project.id) ?? []

    const suggestedProject = filterProjects({
      searchPattern: "",
      activeFilters: (project?.tags as any) ?? [],
      findAnyMatch: true,
      projects: projectList,
    })

    // No match return random projects
    if (suggestedProject?.length < 2) {
      return shuffleArray(projectList).slice(0, 2)
    }

    return suggestedProject.slice(0, 2) ?? []
  }

  if (isLoading) {
    return (
      <div className="w-full bg-cover-gradient">
        <div className="mx-auto flex w-full max-w-[644px] flex-col items-center justify-center gap-14 px-6 py-12 md:px-0 md:py-16">
          <div className="text-lg">Loading suggested projects...</div>
        </div>
      </div>
    )
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
