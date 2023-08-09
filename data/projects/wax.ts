import { ProjectInterface } from "@/lib/types"

const description = `
Wallet Account eXperiments (WAX), formerly known as BLS Wallet, is a suite of production-ready smart account components that provide advanced features for wallets, SDKs, and dApps. It's designed to lower gas costs on EVM rollups through aggregated BLS signatures, simplifying the integration of contract wallets and reducing the cost of layer 2 transactions. This makes WAX particularly beneficial for web3 projects targeting developing economies. WAX components incorporate advanced cryptographic primitives in a secure and intuitive way, using Safe contracts for a familiar and battle-tested foundation. Each additional module can be audited and added or removed at the account holder's discretion. WAX offers features like cheaper L2 transactions, modular smart contract components, ERC 4337 compatibility, zk email verification, passkeys verification, multi-action transactions, gasless transactions, and wallet upgradability. The primary use cases for WAX include scaling, key management, and the creation of prototypes for the web3 ecosystem.
`

export const wax: ProjectInterface = {
  id: "wax",
  image: "wax.webp",
  name: "Wallet Account eXperiments (WAX)",
  tldr: "Streamlines web3 product development with smart account components for enhanced wallets, dApps, and SDKs.",
  description,
  links: {
    github: "https://github.com/getwax",
    website: "https://getwax.org/",
    discord: "https://discord.gg/hGDmAhcRyz",
  },
  tags: {
    builtWith: [
      "Hardhat",
      "Node",
      "Solidity BLS library",
      "sqlite",
      "docker",
      "ethers",
      "deno",
    ],

    themes: ["Scaling", "Key management"],
    types: ["Prototype", "Proof of concept", "Lego sets/toolkits"],
  },
}
