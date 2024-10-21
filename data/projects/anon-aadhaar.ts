import { ProjectContent, ProjectInterface, ProjectStatus } from "@/lib/types"

const content: ProjectContent = {
  en: {
    tldr: "Tools for building build privacy-preserving applications using government ID cards, specifically Aadhaar cards in India.",
    description: `Anon Aadhaar is a project that allows Aadhaar ID holders to prove their Indian residency, optionally revealing some aspects of their identity while hiding the others. The project provides ZK Circuits, SDK for Javascript and Solidity, a demo application, and integrates with the PCD framework to support a wide range of applications.`,
  },
}

export const anonAadhaar: ProjectInterface = {
  id: "anon-aadhaar",
  section: "pse",
  content,
  projectStatus: ProjectStatus.ACTIVE,
  image: "anon-aadhaar.svg",
  name: "Anon Aadhaar",
  links: {
    website: "https://anon-aadhaar.pse.dev/",
    github: "https://github.com/privacy-scaling-explorations/anon-aadhaar",
  },
  tags: {
    keywords: ["Anonymity/privacy", "Social", "Identity", "Voting/governance"],
    themes: ["build", "play"],
    types: ["Legos/dev tools", "Lego sets/toolkits", "Proof of concept"],
    builtWith: ["circom", "rsa"],
  },
}
