import {
  ProjectCategory,
  ProjectContent,
  ProjectInterface,
  ProjectStatus,
} from "@/lib/types"

const content: ProjectContent = {
  en: {
    tldr: "Toolkit for Groth16 Phase 2 Trusted Setup ceremonies.",
    description: `p0tion is an agnostic-from-ceremony public good toolkit, with the aim of making Groth16 zk-applications scale and become production-ready in a safe and secure manner by running Phase 2 Trusted Setup ceremonies.`,
  },
}

export const p0tion: ProjectInterface = {
  id: "p0tion",
  category: ProjectCategory.DEVTOOLS,
  projectStatus: ProjectStatus.ACTIVE,
  section: "pse",
  content,
  image: "p0tion.png",
  name: "p0tion",
  links: {
    website: "https://ceremony.pse.dev/",
    github: "https://github.com/privacy-scaling-explorations/p0tion",
  },
  tags: {
    keywords: ["Toolkits", "Infrastructure/protocol"],
    themes: ["build"],
    types: ["Legos/dev tools"],
    builtWith: [],
  },
}
