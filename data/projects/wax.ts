import { ProjectInterface, ProjectStatus } from "@/lib/types"

export const wax: ProjectInterface = {
  id: "wax",
  section: "pse",
  projectStatus: ProjectStatus.ACTIVE,
  image: "wax.webp",
  name: "Wallet Account eXperiments - WAX",
  links: {
    github: "https://github.com/getwax",
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
