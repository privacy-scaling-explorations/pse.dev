import {
  ProjectCategory,
  ProjectContent,
  ProjectInterface,
  ProjectStatus,
} from "@/lib/types"

const content: ProjectContent = {
  en: {
    tldr: "an on-chain flexible & composable framework to create, reuse and customize gatekeepers.",
    description: `### Overview
Excubiae is an emerging framework for implementing sophisticated on-chain Attribute-Based Access Control (ABAC) gatekeepers. Currently in pre-alpha, this project aims to revolutionize how developers approach access control on Ethereum by providing a composable, gas-efficient foundation for complex validation policies.
Think of it as a modular building block system for smart contract access control - flexible enough for simple token gates, yet powerful enough for complex multi-step verification flows.

### Features
As we build towards our full vision, Excubiae currently offers three core capabilities:
- **Multi-Phase Validation**: you can design sequential validation flows with pre, main, and post conditions which are perfect for complex scenarios like "register → participate → claim".
- **Flexible Evidence Processing**:  we can support multiple validation types as Zero-Knowledge Proofs, Token holdings, On-chain state checks, Time-based conditions, Multi-signature schemes.
- **Composable Architecture**: Mix and match gatekeepers for custom access patterns, clean separation of concerns and composability / reuse of custom logic.

### Status
We're actively developing on the official [Excubiae repository](https://github.com/privacy-scaling-explorations/excubiae) on the core Solidity framework & initial documentation. Stay tuned for alpha release, make & integrate tutorials, audits, examples and more.
`,
  },
}

export const excubiae: ProjectInterface = {
  id: "excubiae",
  category: ProjectCategory.APPLICATION,
  content,
  projectStatus: ProjectStatus.ACTIVE,
  section: "pse",
  image: "",
  license: "MIT",
  name: "Excubiae",
  links: {
    github: "https://github.com/privacy-scaling-explorations/excubiae",
  },
  tags: {
    keywords: ["Gatekeeper", "Access Control"],
    themes: ["build"],
    types: ["Legos/dev tools", "Lego sets/frameworks"],
    builtWith: ["TypeScript", "Solidity"],
  },
  extraLinks: {},
}
