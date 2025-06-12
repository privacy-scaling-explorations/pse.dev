"use client"

import { useQuery } from "@tanstack/react-query"
import ProjectCard from "../project/project-card"
import { ProjectInterface } from "@/lib/types"

interface BlogArticleRelatedProjectsProps {
  projectsIds: string[]
}

export const BlogArticleRelatedProjects = ({
  projectsIds = [],
}: BlogArticleRelatedProjectsProps) => {
  const { data: projects = [], error } = useQuery({
    queryKey: ["projects", { ids: projectsIds }],
    queryFn: async (): Promise<ProjectInterface[]> => {
      try {
        const params = new URLSearchParams()
        if (projectsIds.length > 0) {
          params.append("ids", projectsIds.join(","))
        }

        const response = await fetch(`/api/projects?${params.toString()}`)
        if (!response.ok) {
          throw new Error(`Failed to fetch projects: ${response.status}`)
        }

        const data = await response.json()
        return data.projects || []
      } catch (error) {
        console.error("Error fetching projects:", error)
        return []
      }
    },
    enabled: projectsIds.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  if (error || projects.length === 0) return null

  return (
    <div className="flex flex-col gap-8">
      <h3 className="text-tuatara-950 text-lg font-semibold leading-6">
        Related projects
      </h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-x-6 md:gap-y-10 lg:grid-cols-3">
        {projects?.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            showBanner
            border
            showLinks={false}
          />
        ))}
      </div>
    </div>
  )
}
