import { ProjectInterface } from "@/lib/types"

export const maciPlatform: ProjectInterface = {
  id: "maci-platform",
  section: "pse",
  projectStatus: "active",
  image: "maci-rpgf.png",
  name: "MACI Platform",
  links: {
    github: "https://github.com/privacy-scaling-explorations/maci-platform",
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
