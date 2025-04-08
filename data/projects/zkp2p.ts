import {
  ProjectCategory,
  ProjectContent,
  ProjectInterface,
  ProjectStatus,
} from "@/lib/types"

const content: ProjectContent = {
  en: {
    tldr: "Instant fiat to crypto onramp connecting traditional peer-to-peer payment services with zero-knowledge proofs.",
    description:
      "ZKP2P is for defi consumers looking to onramp assets on chain quickly without going through a CEX as an intermediary. ZKP2P generates a privacy-preserving proof of payment between two users on existing payment rails like Venmo or Paypal and uses said proof to unlock escrowed digital assets on-chain.",
  },
}

export const zkp2p: ProjectInterface = {
  id: "zkp2p",
  projectStatus: ProjectStatus.ACTIVE,
  category: ProjectCategory.APPLICATION,
  section: "grant",
  content,
  image: "zkp2p.png",
  name: "ZKP2P",
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
