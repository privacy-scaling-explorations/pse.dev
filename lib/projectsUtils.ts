import { projects } from "@/data/projects"

import { ProjectInterface } from "./types"

export const getProjectById = (id: string | number) => {
  const project: ProjectInterface =
    projects.filter(
      (project) =>
        String(project.id?.toLowerCase()) === id.toString().toLowerCase()
    )[0] ?? {}

  const content = project?.content?.["en"] // TODO: To remove after all projects are updated

  return {
    project,
    content,
  }
}
