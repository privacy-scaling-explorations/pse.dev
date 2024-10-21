import { ProjectContent, ProjectInterface, ProjectStatus } from "@/lib/types"

const content: ProjectContent = {
  en: {
    tldr: "A set of reusable libraries for zero-knowledge technologies.",
    description: `ZK-kit is a set of libraries (algorithms or utility functions) that can be reused in different projects and zero-knowledge protocols, making it easier for developers to access user-friendly, tested, and documented libraries.`,
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
    builtWith: ["Circom", "JavaScript", "Solidity", "Noir"],
  },
}
