import { ProjectInterface } from "@/lib/types"

const description = `
MACI-RPGF is an implementation of EasyRetroPGF with MACI. This project quickly enables any community, organization or ecosystem to run an optimism-style rpgf round. It is highly configurable to enable different gating mechanisms (token based, attestation based, hats-based, etc) and an easy-to-use UI for both: round organizers and voters.
`

export const maciRPGF: ProjectInterface = {
  id: "maci-rpgf",
  section: "pse",
  projectStatus: "active",
  image: "maci-rpgf.png",
  name: "MACI RPGF",
  tldr: "Run your optimism-style rpgf round in your community! Forked from EasyRetroPGF and enhanced with MACI for privacy, anti-bribery and anti-collusion",
  description,
  links: {
    github: "https://github.com/privacy-scaling-explorations/maci-rpgf",
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
