import { ProjectInterface, ProjectStatus } from "@/lib/types"

export const bandada: ProjectInterface = {
  id: "bandada",
  section: "pse",
  projectStatus: ProjectStatus.ACTIVE,
  image: "bandada.webp",
  name: "Bandada",
  links: {
    github: "https://github.com/privacy-scaling-explorations/bandada",
    website: "https://bandada.pse.dev",
    twitter: "https://twitter.com/BandadaDevs",
  },
  tags: {
    keywords: [
      "Anonymity/privacy",
      "Social",
      "Identity",
      "Transaction privacy",
      "Voting/governance",
      "Reputation",
      "Education",
      "Scaling",
      "Key management",
    ],
    types: [
      "Legos/dev tools",
      "Lego sets/toolkits",
      "Prototype",
      "Proof of concept",
      "Infrastructure/protocol",
      "Plugin",
      "Application",
    ],
    builtWith: ["semaphore", "zk-kit"],
    themes: ["build", "play"],
  },
}
