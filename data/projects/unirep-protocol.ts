import { ProjectInterface } from "@/lib/types"

const description = `
UniRep is a zero-knowledge protocol that securely manages user data through anonymous identifiers, enabling trustless interactions and enhanced user privacy in applications. It expands the concept of reputation to include various user data aspects, such as preferences, activity, alignments, and ownership. UniRep promotes non-custodial applications that don't hold user data, reducing data breach risks and emphasizing security for both users and developers.
`

export const unirepProtocol: ProjectInterface = {
  id: "unirep-protocol",
  projectStatus: "active",
  image: "unirep.svg",
  name: "UniRep Protocol",
  tldr: "A Zero-Knowledge Protocol for user data & reputation management",
  description,
  links: {
    github: "https://github.com/Unirep",
    website: "https://developer.unirep.io/docs/welcome",
    twitter: "https://twitter.com/UniRep_Protocol",
    discord: "https://discord.gg/VzMMDJmYc5",
  },
  tags: {
    keywords: ["Anonymity/privacy", "Social", "Identity", "Reputation"],
    themes: ["build"],
    types: ["Legos/dev tools, Protocol"],
    builtWith: ["semaphore", "circom"],
  },
}
