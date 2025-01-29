import {
  ProjectCategory,
  ProjectContent,
  ProjectInterface,
  ProjectStatus,
} from "@/lib/types"

const content: ProjectContent = {
  en: {
    tldr: "Toolkit for Groth16 Phase 2 Trusted Setup ceremonies.",
    description: `
### Overview
p0tion is an agnostic-from-ceremony public good toolkit, with the aim of making Groth16 zk-applications scale and become production-ready in a safe and secure manner by running Phase 2 Trusted Setup ceremonies.

### Status
This project has been sunset and it is entering to a long term support phase (no further development). p0tion toolkit is availabe for developers to use and run their own trusted setups ceremonies. We encourage the community to fork and continue the improvement of this toolkit.

### Resources

- **p0tion**: A tool to help developers create and manage trusted setups - [GitHub](https://github.com/privacy-scaling-explorations/p0tion)
- **DefinitelySetup WebApp**: A WebApp to monitor and contribute to trusted setups - [Website](https://ceremony.pse.dev/) | [GitHub](https://github.com/privacy-scaling-explorations/DefinitelySetup)
    `,
  },
}

export const p0tion: ProjectInterface = {
  id: "p0tion",
  category: ProjectCategory.DEVTOOLS,
  projectStatus: ProjectStatus.INACTIVE,
  section: "archived",
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
