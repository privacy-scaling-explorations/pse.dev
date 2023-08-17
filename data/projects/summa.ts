import { ProjectInterface } from "@/lib/types"

const description = `
Summa allows centralized exchanges to demonstrate that their assets exceed their liabilities without revealing critical business information such as individual user balances, total number of users, and total liabilities or assets. It uses zero-knowledge proofs to ensure that exchanges can demonstrate they have sufficient assets to cover all user balances. The protocol involves building a Merkle Sum Tree of user balances, generating proofs for each user, and allowing users to verify these proofs.
`

export const summa: ProjectInterface = {
  id: "summa",
  projectStatus: "active",
  image: "",
  name: "Summa",
  tldr: "Protocol enabling centralized exchanges to prove solvency without compromising private information.",
  description,
  links: {
    github: "https://github.com/summa-dev",
  },
  tags: {
    keywords: ["Anonymity/privacy", "Computational Integrity"],
    themes: ["build", "play"],
    type: ["Infrastructure/protocol", "Application"],
    builtWith: ["halo2"],
  },
}
