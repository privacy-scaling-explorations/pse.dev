import { ProjectInterface, ProjectStatus } from "@/lib/types"

export const dslWorkingGroup: ProjectInterface = {
  id: "dsl-working-group",
  section: "pse",
  projectStatus: ProjectStatus.ACTIVE,
  image: "",
  imageAlt: "DSL Working Group",
  name: "DSL Working Group",
  links: {
    github: "https://github.com/privacy-scaling-explorations/chiquito/",
  },
  tags: {
    types: ["Legos/dev tools", "Proof of concept", "Developer tooling"],
    keywords: [],
    themes: ["research"],
    builtWith: [],
  },
}
