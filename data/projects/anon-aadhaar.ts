import { ProjectInterface } from "@/lib/types"

const description = `
Anon Aadhaar is a project that allows individuals to prove their citizenship anonymously. The project provides circuits, an SDK, and demo applications that generate and verify proofs of valid Aadhaar cards, integrating with the PCD framework to support a wide range of applications.
`

export const anonAadhaar: ProjectInterface = {
  id: "anon-aadhaar",
  projectStatus: "active",
  image: "anon-aadhaar.svg",
  name: "Anon Aadhaar",
  tldr: "Tools for building build privacy-preserving applications using government ID cards, specifically Aadhaar cards in India.",
  description,
  links: {
    github: "https://github.com/privacy-scaling-explorations/anon-aadhaar",
  },
  tags: {
    keywords: ["Anonymity/privacy", "Social", "Identity", "Voting/governance"],
    themes: ["build", "play"],
    type: ["Legos/dev tools", "Lego sets/toolkits", "Proof of concept"],
    builtWith: ["circom", "rsa"],
  },
}
