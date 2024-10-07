import { ProjectInterface, ProjectStatus } from "@/lib/types"

export const chiquito: ProjectInterface = {
  id: "chiquito",
  section: "pse",
  projectStatus: ProjectStatus.ACTIVE,
  image: "",
  name: "chiquito",
  links: {
    github: "https://github.com/privacy-scaling-explorations/chiquito",
    website: "https://docs.pecadorplonkish.xyz/",
    twitter: "",
  },
  tags: {
    themes: ["build"],
    types: [
      "Legos/dev tools",
      "Lego sets/toolkits",
      "Proof of concept",
      "language",
      "dsl",
    ],
    keywords: ["DSL", "language", "rust", "python", "halo2"],
    builtWith: ["halo2", "rust"],
  },
}
