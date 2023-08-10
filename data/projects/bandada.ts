import { ProjectInterface } from "@/lib/types"

const description = `
Bandada is a project designed to simplify the management of privacy-preserving Semaphore groups. It is aimed at developers who want to build privacy-based applications and integrate anonymity sets, as well as non-developers working in DAOs, governments, international institutions, non-profit organizations, and associations that want to create and manage anonymous groups. Bandada offers a plug-and-play infrastructure, reducing the time and complexity required for managing anonymity sets. It enables anonymous signaling, such as voting, messaging, login, or endorsing, in various use cases like private organizations, GitHub repository contributors, and groups of wallets holding a specific NFT.
`

export const bandada: ProjectInterface = {
  id: "bandada",
  image: "bandada.webp",
  name: "Bandada",
  tldr: "An open-source system for managing privacy-preserving groups of anonymous individuals.",
  description,
  links: {
    github: "https://github.com/privacy-scaling-explorations/bandada",
    website: "https://bandada.appliedzkp.org/",
  },
  tags: {
    themes: [
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
    type: [
      "Legos/dev tools",
      "Lego sets/toolkits",
      "Prototype",
      "Proof of concept",
      "Infrastructure/protocol",
      "Plugin",
      "Application",
    ],
    builtWith: ["Semaphore", "ZK-kit"],
  },
}
