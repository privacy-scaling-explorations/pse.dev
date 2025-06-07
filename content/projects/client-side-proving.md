---
id: "client-side-proving"
name: "Client-Side Proving"
image: ""
section: "pse"
projectStatus: "active"
category: "research"
tldr: "Developing efficient zero-knowledge proving systems for mobile devices, enabling private digital ID and secure communication with minimal resources."
license: "MIT"
tags:
  keywords: ["Zero Knowledge", "Mobile", "Privacy", "Digital Identity"]
  themes: ["build", "research"]
  types: ["Legos/dev tools", "Benchmarking", "Proof systems"]
team:
  - name: "Alex Kuzmin"
    email: "alex.kuzmin@pse.dev"
  - name: "Guorong Du"
    email: "dgr009@pse.dev"
---

### Project Overview

The Client-Side Proving project aims to develop practical and efficient zero-knowledge (ZK) proving systems tailored specifically for mobile devices. By exploring various proving systems - including Binius, Spartan, Plonky2, Scribe, and WHIR - we provide benchmarks, insights, and optimized implementations that enable performant client-side applications.

### Objective

Our primary objective is to identify and optimize ZK proof systems that require minimal resources, have no trusted setup, and maintain post-quantum security. These efforts are particularly focused on supporting applications in digital identity, secure communications, and privacy-preserving credential management.

### Project Status

- **Stage:** MVP Development
- **Status:** Active
- **Team Lead:** Alex Kuzmin
- **Team Members:** Guorong Du

### Technical Approach

The project rigorously benchmarks mobile-friendly ZK proving systems based on critical criteria including computational complexity, RAM efficiency and proof size. Key innovations and strategies include:

- **Benchmarking Binius, Spartan, Plonky2, and Scribe** for mobile usability.
- **Optimizing RAM usage** through streaming techniques.
- **Evaluation and integration of lookups** to enhance proving efficiency in computationally intensive ZK circuits.

### Milestones

- **April 2025:** Established baseline benchmarks for common mobile hardware.
- **May 2025 (planned):** Comprehensive benchmarking results published for selected ZK proving systems.
- **June 2025 (planned):** Optimization of Spartan using WHIR PCS and/or Scribe's read-write streaming techniques.
- **Q3 2025 (planned):** Collaboration with an Identity initiative, integrating optimized proving systems.

### Applications

Client-Side Proving enables numerous privacy-focused mobile applications, including:

- Mobile Digital ID wallets ensuring user privacy.
- Anonymous online communication and collaboration tools.

### How to get in touch

- Join the [PSE Discord](https://discord.com/invite/sF5CT5rzrR)
- Reach out via email Alex: alex.kuzmin@pse.dev or Guorong Du: dgr009@pse.dev

### Publications

- [Benchmarks for Digital ID Wallet](https://hackmd.io/@clientsideproving/S1wiUc0n1e)
- [Mobile Hardware Survey](https://hackmd.io/@clientsideproving/ByqafXAv1e)
- [Plonky2 Sha256 Benchmarks](https://hackmd.io/@clientsideproving/B1xLCuJL5yg)
- [Proof Systems Survey](https://hackmd.io/@clientsideproving/HyKBkz7jye)

Benchmark findings and technical write-ups will be released regularly, highlighting the project's research outcomes and performance evaluations.
