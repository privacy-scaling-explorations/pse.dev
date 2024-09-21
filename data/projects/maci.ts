import { ProjectInterface, ProjectStatus } from "@/lib/types"

export const maci: ProjectInterface = {
  id: "maci",
  section: "pse",
  projectStatus: ProjectStatus.ACTIVE,
  image: "maci.png",
  name: "MACI",
  links: {
    github: "https://github.com/privacy-scaling-explorations/maci",
    website: "https://maci.pse.dev",
    twitter: "https://twitter.com/zkmaci",
  },
  tags: {
    keywords: ["Anonymity/privacy", "Voting/governance"],
    themes: ["build"],
    types: ["Lego sets/toolkits", "Infrastructure/protocol"],
    builtWith: ["p0tion", "JubjubLib"],
  },
}
