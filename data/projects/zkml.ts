import { ProjectInterface, ProjectStatus } from "@/lib/types"

export const zkml: ProjectInterface = {
  id: "zkml",
  section: "pse",
  projectStatus: ProjectStatus.ACTIVE,
  image: "zkml.png",
  name: "ZKML",
  links: {
    github: "https://github.com/socathie/circomlib-ml",
  },
  tags: {
    keywords: ["Anonymity/privacy", "Scaling"],
    themes: ["research"],
    types: ["Proof of concept", "Infrastructure/protocol"],
    builtWith: ["circom", "halo2", "nova"],
  },
}
