import { ProjectInterface, ProjectStatus } from "@/lib/types"

export const maciRPGF: ProjectInterface = {
  id: "maci-rpgf",
  section: "pse",
  projectStatus: ProjectStatus.ACTIVE,
  image: "maci-rpgf.png",
  name: "MACI RPGF",
  links: {
    github: "https://github.com/privacy-scaling-explorations/maci-rpgf",
    website: "https://maci.pse.dev",
    twitter: "https://twitter.com/zkmaci",
  },
  tags: {
    keywords: ["Anonymity/privacy", "Voting/governance"],
    themes: ["build"],
    types: ["Lego sets/toolkits", "Infrastructure/protocol", "Public Good"],
    builtWith: ["MACI", "EAS", "EasyRetroPGF"],
  },
}
