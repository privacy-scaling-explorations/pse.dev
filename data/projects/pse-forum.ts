import { ProjectInterface, ProjectStatus } from "@/lib/types"

export const pseForum: ProjectInterface = {
  id: "pseForum",
  image: "",
  name: "PSE Forum",
  section: "pse",
  projectStatus: ProjectStatus.ACTIVE,
  content: {
    en: {
      tldr: "Short description",
      description: `
## Heading

Sample project description goes here. You can also use **Markdown** for formatting.
        `,
    },
  },
  tags: {
    keywords: [],
    themes: [],
    types: [],
    builtWith: [],
  },
}