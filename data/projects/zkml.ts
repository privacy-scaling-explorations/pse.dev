import { ProjectInterface } from "@/lib/types"

export const zkml: ProjectInterface = {
  id: "zkml",
  section: "pse",
  projectStatus: "active",
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
