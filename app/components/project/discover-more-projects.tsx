"use client"

import React, { useMemo } from "react"
import Link from "next/link"
import { ProjectInterface } from "@/lib/types"
import { LABELS } from "@/app/labels"
import { useGetProjects } from "@/hooks/useFetchContent"

import { Icons } from "../icons"
import ProjectCard from "./project-card"

interface Props {
  project: ProjectInterface
  limit?: number
}

export const DiscoverMoreProjects = ({ project, limit = 2 }: Props) => {
  // Get projects with similar tags or themes
  const keywords = useMemo(
    () => project.tags?.keywords?.slice(0, 3) || [],
    [project.tags?.keywords]
  )
  const themes = useMemo(
    () => project.tags?.themes?.slice(0, 2) || [],
    [project.tags?.themes]
  )

  const { data: projects = [], isLoading } = useGetProjects({
    keywords,
    themes,
    limit: limit + 1,
    findAnyMatch: true,
  })

  const relatedProjects = useMemo(() => {
    return projects
      .filter(
        (p: ProjectInterface) =>
          p.id?.toLowerCase() !== project.id?.toLowerCase()
      ) // Exclude current project
      .slice(0, limit)
  }, [projects, project.id, limit])

  if (isLoading) {
    return (
      <div className="flex flex-col gap-8">
        <h3 className="text-xl font-bold text-tuatara-950">
          {LABELS.COMMON.DISCOVER_MORE}
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {Array.from({ length: limit }).map((_, index) => (
            <div
              key={index}
              className="min-h-[380px] border border-gray-200 rounded-lg overflow-hidden"
            >
              <div className="bg-gray-300 animate-pulse h-[180px] w-full"></div>
              <div className="p-4 space-y-2">
                <div className="bg-gray-300 animate-pulse h-4 w-3/4"></div>
                <div className="bg-gray-300 animate-pulse h-3 w-full"></div>
                <div className="bg-gray-300 animate-pulse h-3 w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (relatedProjects.length === 0) {
    return null // Don't show the section if no related projects
  }

  return (
    <div className="w-full bg-cover-gradient">
      <div className="mx-auto flex w-full max-w-[644px] flex-col items-center justify-center gap-14 px-6 py-12 md:px-0 md:py-16">
        <h2 className="text-3xl font-bold text-center">
          {LABELS.COMMON.DISCOVER_MORE}
        </h2>
        <div className="grid flex-col grid-cols-1 gap-5 md:grid-cols-2 md:flex-row">
          {relatedProjects.map(
            (relatedProject: ProjectInterface, index: number) => {
              return <ProjectCard key={index} border project={relatedProject} />
            }
          )}
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
