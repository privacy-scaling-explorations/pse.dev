"use client"

import { useProjectFiltersState } from "@/state/useProjectFiltersState"
import ProjectCard from "../project/project-card"

interface BlogArticleRelatedProjectsProps {
  projectsIds: string[]
}

export const BlogArticleRelatedProjects = ({
  projectsIds,
}: BlogArticleRelatedProjectsProps) => {
  const { projects: allProjects } = useProjectFiltersState((state) => state)

  const projects = allProjects.filter((project) =>
    projectsIds.includes(project.id)
  )

  if (projects.length === 0) return null

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
