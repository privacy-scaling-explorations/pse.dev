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
    website: "https://app.discreetly.chat/",
  },
  tags: {
    keywords: ["Anonymity/privacy", "Social"],
    themes: ["play"],
    types: ["Legos/dev tools", "Proof of concept", "Application"],
    builtWith: ["rln", "semaphore"],
  },
}
