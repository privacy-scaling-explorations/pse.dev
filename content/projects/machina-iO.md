---
id: "machina-iO"
name: "MachinaIO"
image: ""
section: "pse"
projectStatus: "active"
category: "research"
tldr: "Building the first practical indistinguishability obfuscation (iO) system for secure and scalable cryptographic applications."
tags:
  keywords:
    [
      "indistinguishability obfuscation",
      "iO",
      "cryptography",
      "Ethereum",
      "FHE",
      "SNARKs",
    ]
  themes: ["cryptography", "privacy", "scalability"]
  types: ["research", "development"]
links:
  twitter: "https://x.com/machina__io"
  github: "https://github.com/MachinaIO/"
  website: "https://hackmd.io/@MachinaIO/H1w5iwmDke"
team:
  - name: "Enrico Bottazzi"
    email: "enrico@pse.dev"
  - name: "Sora Suegami"
    email: "sorasuegami@pse.dev"
  - name: "Pia"
    email: "pia@pse.dev"
---

### Project Overview

The MachinaIO project aims to develop the first practical implementation of Indistinguishability Obfuscation (iO). By converting programs into black-box representations, MachinaIO enables users to execute obfuscated programs locally without revealing their internal workings and hardcoded secrets, thus significantly enhancing security and scalability for blockchain applications and beyond. This removes the reliance on threshold-based committees from existing privacy-preserving applications based on MPC and (multi-key) FHE

### Objective

The primary goal of MachinaIO is to build a secure, and practical implementation of iO, eliminating the need for trusted committees in applications relying on Multi-party Computation (MPC) and Fully Homomorphic Encryption (FHE). Achieving practical iO would provide these applications with unlimited scalability and robust security.

### Project Status

- **Stage:** MVP Development
- **Status:** Active
- **Team Lead:** Sora Suegami
- **Team Members:** Enrico Bottazzi, Pia

### Technical Approach

MachinaIO aims to create the first _practical_ iO system based on formal security proofs, transforming any program into a black-box that hides its internals while preserving its functionality. By replacing committees in multi-party computation (MPC) or multi-key fully homomorphic encryption (FHE), iO can scale these applications securely and eliminate trust bottlenecks.

### Contributions

- Focus on Core Obfuscation: Obfuscation only for FHE decryption and SNARK verification, leveraging recent efficiency gains in FHE and ZK proofs.
- SNARK compatible with iO: An implementation of a SNARK scheme that can be efficiently verified within the obfuscated program, specifically a lattice-based designated-verifier SNARK.

### Milestones

- **February 2025:** Published foundational paper on MachinaIO [here](https://eprint.iacr.org/2025/236)
- **March 2025:** Released initial implementation publicly on [GitHub](https://github.com/MachinaIO/diamond-io)
- **July 2025 (planned):** Develop an input-scalable iO scheme with noise refreshing
- **September 2025 (planned):** Obfuscated program supporting ZKP verification and FHE decryption
- **November 2025 (planned, Devconnect):** Demonstration of practical iO-based applications

### Applications

MachinaIO can transform blockchain and cryptographic applications, such as trustless bitcoin bridges.

### Publications

- **MachinaIO Paper:** [Diamond iO: A Straightforward Construction of Indistinguishability Obfuscation from Lattices](https://eprint.iacr.org/2025/236)
- Hello world: The first sign of practical iO ([blogpost](https://pse.dev/en/blog/hello-world-the-first-signs-of-practical-io))

### Resources

- **GitHub Repository:** [Machina iO](https://github.com/MachinaIO/)
- **Project Plan:** [HackMD Plan](https://hackmd.io/@MachinaIO/H1w5iwmDke)
