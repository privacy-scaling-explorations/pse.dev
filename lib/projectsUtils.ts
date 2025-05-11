import { projects } from "@/data/projects"

import { ProjectInterface } from "./types"

export const getProjectById = (id: string | number, lang = "en") => {
  const project: ProjectInterface =
    projects.filter((project) => String(project.id?.toLowerCase()) === id)[0] ??
    {}

  const content = project?.content?.[lang]

  return {
    project,
    content,
  }
}
