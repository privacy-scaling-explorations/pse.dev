import { ProjectInterface } from "@/lib/types"

export const ZKKit: ProjectInterface = {
  id: "zk-kit",
  section: "pse",
  image: "zk-kit.svg",
  name: "ZK-Kit",
  projectStatus: "active",
  links: {
    website: "https://zkkit.pse.dev",
    github: "https://github.com/privacy-scaling-explorations/zk-kit",
  },
  tags: {
    keywords: ["Education", "Toolkits", "Anonymity/Privacy", "Algorithms"],
    themes: ["build"],
    types: ["Legos/dev tools"],
    builtWith: ["Circom", "JavaScript", "Solidity", "Noir"],
  },
}
