import { ProjectInterface } from "@/lib/types"

export const summa: ProjectInterface = {
  id: "summa",
  section: "pse",
  projectStatus: "active",
  image: "summa.svg",
  name: "Summa",
  links: {
    github: "https://github.com/summa-dev",
  },
  tags: {
    keywords: ["Anonymity/privacy", "Computational Integrity"],
    themes: ["build", "play"],
    types: ["Infrastructure/protocol", "Application"],
    builtWith: ["halo2"],
  },
  extraLinks: {
    learn: [
      {
        label: "Documentation",
        url: "https://summa.gitbook.io/summa",
      },
    ],
  },
}
