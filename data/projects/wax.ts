import {
  ProjectCategory,
  ProjectContent,
  ProjectInterface,
  ProjectStatus,
} from "@/lib/types"

const content: ProjectContent = {
  en: {
    tldr: "",
    description: `

`,
  },
}

export const wax: ProjectInterface = {
  id: "wax",
  projectStatus: ProjectStatus.ACTIVE,
  category: ProjectCategory.DEVTOOLS,
  section: "pse",
  content,
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
      "ethers.js",
      "deno",
    ],
    keywords: ["Scaling", "Key management", "WAX"],
    themes: ["build"],
    types: ["Prototype", "Proof of concept", "Lego sets/toolkits"],
  },
}
