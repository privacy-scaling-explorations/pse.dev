import { ProjectInterface } from "@/lib/types"

const description = `
Wallet Account eXperiments (WAX), formerly "BLS Wallet", is a set of smart account components to augment wallets, dApps and SDKs. Transaction verification leverages existing cryptographic primitives, wrapped as modules/plugins, to verify the validity of different signature and proof types.

Samples combining primitives intends to show what is possible, and how to readily take advantage of the primitives.
Eg, using BLS signatures enables aggregation on L2s and thus gas savings on L1. Or webauthN as a supplementary mechanism to authorise large transactions. ZKEmail for social recovery via emails, ...

Whilst implemented within a few 4337 compatible smart accounts (starting with Safe), a supplementary minimal implementation exists to isolate and showcase modular smart account components with action permissions.
The primary use cases for WAX include scaling, key management, and the creation of prototypes for the web3 ecosystem.
`

export const wax: ProjectInterface = {
  id: "wax",
  projectStatus: "active",
  image: "wax.webp",
  name: "Wallet Account eXperiments - WAX",
  tldr: "Streamlines web3 product development with smart account components for enhanced wallets, dApps, and SDKs.",
  description,
  links: {
    github: "https://github.com/getwax",
    website: "https://wax.pse.dev/",
    discord: "https://discord.gg/hGDmAhcRyz",
  },
  tags: {
    builtWith: [
      "foundry",
      "hardhat",
      "node",
      "solidity bls library",
      "sqlite",
      "docker",
      "ethers",
      "deno",
    ],
    keywords: ["Scaling", "Key management", "WAX"],
    themes: ["build"],
    types: ["Prototype", "Proof of concept", "Lego sets/toolkits"],
  },
}
