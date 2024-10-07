import { ProjectInterface, ProjectStatus } from "@/lib/types"

export const cryptkeeper: ProjectInterface = {
  id: "cryptkeeper",
  section: "pse",
  projectStatus: ProjectStatus.INACTIVE,
  image: "cryptkeeper.webp",
  name: "CryptKeeper",
  links: {
    github: "https://github.com/CryptKeeperZK",
  },
  tags: {
    keywords: ["Anonymity/privacy", "Social", "Identity"],
    themes: ["build"],
    types: ["Application", "Infrastructure/protocol", "Lego sets/toolkits"],
    builtWith: ["semaphore", "rln"],
  },
}
