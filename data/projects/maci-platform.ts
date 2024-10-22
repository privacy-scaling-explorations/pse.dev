import { ProjectContent, ProjectInterface, ProjectStatus } from "@/lib/types"

const content: ProjectContent = {
  en: {
    tldr: "Run a voting round in your community! Forked from EasyRetroPGF and enhanced with MACI for privacy, anti-bribery and anti-collusion",
    description: `MACI Platform is an implementation of EasyRetroPGF with MACI. This project enables any community, organization or ecosystem to run a voting round. It is highly configurable to enable different voting mechanisms (quadratic voting, quadratic funding, ranked choice, etc), gating mechanisms (token based, attestation based, hats-based, etc) and an easy-to-use UI for both round organizers and voters.`,
  },
}

export const maciPlatform: ProjectInterface = {
  id: "maci-platform",
  section: "pse",
  projectStatus: ProjectStatus.ACTIVE,
  content,
  image: "maci-platform.png",
  name: "MACI Platform",
  links: {
    github: "https://github.com/privacy-scaling-explorations/maci-platform",
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
