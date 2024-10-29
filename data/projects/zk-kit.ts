import { ProjectContent, ProjectInterface, ProjectStatus } from "@/lib/types"

const content: ProjectContent = {
  en: {
    tldr: "A set of reusable libraries for zero-knowledge technologies.",
    description: `### Overview

    ZK-Kit provides reference implementations of crypto primitives in different languages for reuse in production-level projects to accelerate safe and performant ZK development.`,
  },
}

export const ZKKit: ProjectInterface = {
  id: "zk-kit",
  section: "pse",
  image: "zk-kit.svg",
  name: "ZK-Kit",
  projectStatus: ProjectStatus.ACTIVE,
  content,
  links: {
    website: "https://zkkit.pse.dev",
    github: "https://github.com/privacy-scaling-explorations/zk-kit",
  },
  tags: {
    keywords: ["Education", "Toolkits", "Anonymity/Privacy", "Algorithms"],
    themes: ["build"],
    types: ["Legos/dev tools"],
    builtWith: ["Circom", "JavaScript", "Solidity", "Noir", "Rust"],
  },
  extraLinks: {
    buildWith: [
      {
        label: "ZK-Kit JavaScript",
        url: "https://github.com/privacy-scaling-explorations/zk-kit",
      },
      {
        label: "ZK-Kit Solidity",
        url: "https://github.com/privacy-scaling-explorations/zk-kit.solidity",
      },
      {
        label: "ZK-Kit Circom",
        url: "https://github.com/privacy-scaling-explorations/zk-kit.circom",
      },
      {
        label: "ZK-Kit Rust",
        url: "https://github.com/privacy-scaling-explorations/zk-kit.rust",
      },
      {
        label: "ZK-Kit Noir",
        url: "https://github.com/privacy-scaling-explorations/zk-kit.noir",
      },
    ],
  },
}
