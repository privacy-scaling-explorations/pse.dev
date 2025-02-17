import {
  ProjectCategory,
  ProjectContent,
  ProjectInterface,
  ProjectStatus,
} from "@/lib/types"

const content: ProjectContent = {
  en: {
    tldr: "The ZK Security Framework is a comprehensive repository that provides in-depth knowledge on zero-knowledge proof (ZKP) vulnerabilities, classifications, and defense strategies. It focuses on identifying and addressing security risks in ZKP protocols, offering resources for auditing and improving ZKP implementations.",
    description: `
### Overview

The ZK Security Framework is a detailed repository designed to educate and guide developers in securely implementing zero-knowledge proof (ZKP) protocols. It draws from the [ZK Bug Tracker](https://github.com/0xPARC/zk-bug-tracker) and the research in ["Zero-Knowledge Proof Vulnerability Analysis and Security Auditing"](https://eprint.iacr.org/2024/514), offering insights into the common security issues and vulnerabilities in ZKP systems. This framework not only classifies over 43 different ZKP vulnerabilities but also provides actionable defense strategies and auditing checklists to prevent exploits.

### Features

The ZK Security Framework provides a meticulous classification of vulnerabilities and emphasizes both practical defense techniques and educational content. Key highlights include:

- **Vulnerability Classification**: With 43 categories of ZKP vulnerabilities, it spans critical issues such as completeness and soundness flaws, information leakage, arithmetic errors, and issues with trusted setups.
- **Comprehensive Vulnerability Analysis**: Provides detailed explanations of vulnerabilities like non-deterministic circuits, bad randomness, and the infamous "Frozen Heart" bug, helping developers understand not just the risks but also the best practices for avoiding them.
- **ZKP Risk Classification**: Vulnerabilities are categorized based on their severity (e.g., High, Medium, Low, Informational).
- **Educational Focus**: Beyond just security, the framework serves as an educational resource for developers, offering stage-by-stage learning materials on the mathematical and computational foundations of ZKPs.

### Audit Database

The framework’s vulnerability classification includes detailed descriptions of risk levels and provides specific mitigation strategies for each type. It helps developers systematically approach the task of securing ZKP implementations, ranging from simple audit checks to more advanced defenses.
`,
  },
}

export const ZKSecurityFramework: ProjectInterface = {
  id: "zk-security-framework",
  category: ProjectCategory.RESEARCH,
  section: "pse",
  content,
  projectStatus: ProjectStatus.ACTIVE,
  image: "zk-security-framework.png",
  license: "MIT",
  name: "ZK Security Framework",
  links: {
    website: "https://zerobase.pro/",
    github: "https://github.com/Salusec/zksecurity-framework",
    twitter: "https://x.com/zerobasezk",
  },
  tags: {
    keywords: ["Anonymity/privacy", "Security", "Audit", "Education"],
    themes: ["play"],
    types: ["Legos/dev tools"],
    builtWith: ["circom", "gnark", "halo2", "rust"],
  },
  extraLinks: {
    play: [
      {
        label: "ZK Security Framework",
        url: "https://github.com/Salusec/zksecurity-framework",
      },
    ],
  },
}
