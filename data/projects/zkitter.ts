import { ProjectInterface, ProjectStatus } from "@/lib/types"

export const zkitter: ProjectInterface = {
  id: "zkitter",
  section: "pse",
  projectStatus: ProjectStatus.INACTIVE,
  image: "zkitter.webp",
  name: "Zkitter",
  links: {
    github: "https://github.com/zkitter",
    website: "https://www.zkitter.com/explore/",
    discord: "https://discord.gg/Em4Z9yE8eW",
  },

  tags: {
    keywords: ["Anonymity/privacy", "Social", "Identity"],
    themes: ["build"],
    types: ["Application", "Infrastructure/protocol"],
    builtWith: ["semaphore", "rln", "interep", "zkchat"],
  },
}
