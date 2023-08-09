import { ProjectInterface } from "@/lib/types"

const description = `
EigenTrust is a library designed to manage trust within a distributed network, incorporating zero-knowledge features. It serves as a reputation bank for the Ethereum ecosystem, providing an interoperable layer for managing reputation and trust. The protocol creates zero-knowledge proofs of reputation scores based on ratings given by network participants. This allows for the creation of a reputation system for peer-to-peer marketplaces and exchanges, reputation-weighted voting, and community gatekeeping.
`

export const eigenTrust: ProjectInterface = {
  id: "eigen-trust",
  image: "",
  name: "EigenTrust",
  tldr: "A distributed reputation system with zero-knowledge features.",
  description,
  links: {
    github: "https://github.com/eigen-trust/protocol",
  },
  tags: {
    themes: ["Reputation", "Identity"],
    type: ["Infrastructure/protocol"],
    builtWith: ["Ethereum Attestation Service", "Halo2", "ethers.rs"],
  },
}
