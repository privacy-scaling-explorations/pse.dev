import { ProjectCategory, ProjectContent, ProjectInterface, ProjectStatus } from "@/lib/types"

const content: ProjectContent = {
  en: {
    tldr: "A distributed reputation system with zero-knowledge features.",
    description: `EigenTrust is a library designed to manage trust within a distributed network, incorporating zero-knowledge features. It serves as a reputation bank for the Ethereum ecosystem, providing an interoperable layer for managing reputation and trust. The protocol creates zero-knowledge proofs of reputation scores based on ratings given by network participants. This allows for the creation of a reputation system for peer-to-peer marketplaces and exchanges, reputation-weighted voting, and community gatekeeping.`,
  },
}

export const eigenTrust: ProjectInterface = {
  id: "eigen-trust",
  projectStatus: ProjectStatus.INACTIVE,
  category: ProjectCategory.RESEARCH,
  content,
  image: "",
  name: "EigenTrust",
  links: {
    github: "https://github.com/eigen-trust/protocol",
  },
  tags: {
    keywords: ["Reputation", "Identity"],
    themes: ["build"],
    types: ["Infrastructure/protocol"],
    builtWith: ["ethereum attestation service", "halo2", "ethers.rs"],
  },
}
