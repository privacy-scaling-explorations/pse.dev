import { ProjectInterface, ProjectStatus } from "@/lib/types"

export const discreetly: ProjectInterface = {
  id: "discreetly",
  section: "pse",
  projectStatus: ProjectStatus.ACTIVE,
  image: "discreetly.svg",
  name: "Discreetly",
  links: {
    github: "https://github.com/Discreetly",
    website: "https://app.discreetly.chat/",
  },
  tags: {
    keywords: ["Anonymity/privacy", "Social"],
    themes: ["play"],
    types: ["Legos/dev tools", "Proof of concept", "Application"],
    builtWith: ["rln", "semaphore"],
  },
}
