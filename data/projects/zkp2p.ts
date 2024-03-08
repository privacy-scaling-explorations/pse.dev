import { ProjectInterface } from "@/lib/types"

const description = `
ZKP2P is for defi consumers looking to onramp assets on chain quickly without going through a CEX as an intermediary. ZKP2P generates a privacy-preserving proof of payment between two users on existing payment rails like Venmo or Paypal and uses said proof to unlock escrowed digital assets on-chain.
`

export const zkp2p: ProjectInterface = {
  id: "zkp2p",
  section: "grant",
  projectStatus: "active",
  image: "zkp2p.webp",
  name: "ZKP2P",
  tldr: "Instant fiat to crypto onramp connecting traditional peer-to-peer payment services with zero-knowledge proofs.",
  description,
  links: {
    github: "https://github.com/zkp2p",
    website: "https://zkp2p.xyz/",
    twitter: "https://twitter.com/zkp2p",
  },
  tags: {
    keywords: ["Private communications"],
    themes: ["play"],
    types: ["Proof of concept", "Application"],
    builtWith: ["circom", "halo2"],
  },
}
