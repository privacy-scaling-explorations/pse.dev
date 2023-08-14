import { ProjectInterface } from "@/lib/types"

const description = `
An anonymous, federated, chat application that uses Rate-Limiting Nullifier for spam prevention.
`

export const discreetly: ProjectInterface = {
  id: "discreetly",
  projectStatus: "active",
  image: "discreetly.svg",
  name: "Discreetly",
  tldr: "An anonymous, federated, chat application using ZK.",
  description,
  links: {
    github: "https://github.com/Discreetly",
  },
  tags: {
    themes: ["Anonymity/privacy", "Social"],
    types: ["Legos/dev tools", "Proof of concept", "Application"],
    builtWith: ["RLN", "Semaphore", "Waku"],
  },
}
