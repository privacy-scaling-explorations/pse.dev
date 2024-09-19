import { ProjectInterface } from "@/lib/types"

export const rln: ProjectInterface = {
  id: "rln",
  section: "pse",
  projectStatus: "active",
  image: "rln.svg",
  name: "Rate-Limiting Nullifier",
  links: {
    github: "https://github.com/Rate-Limiting-Nullifier/circom-rln",
    website: "https://rate-limiting-nullifier.github.io/rln-docs/",
  },
  tags: {
    keywords: ["Anonymity/privacy"],
    themes: ["build"],
    types: ["Infrastructure/protocol"],
    builtWith: ["circom", "solidity", "semaphore"],
  },
}
