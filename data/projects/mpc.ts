import { ProjectContent, ProjectInterface, ProjectStatus } from "@/lib/types"

const content: ProjectContent = {
  en: {
    tldr: "Collection of MPC research projects",
    description: `
## Overview
We are dedicated group in PSE to research and explore Secure Multi-Party Computation. Current focus area of us are programmability/accessibility, publicly verifiability research and KZG extractable witness encryption implementation. Our active projects include Circom-MPC, TypeScript-MPC tooling, publicly verifiable garbled circuit research and KZG extractable witness encryption implementation.
### Programmability/Accessibility
We are exploring easier programmability and accessibility develop and run MPC program.
[Circom-MPC](https://github.com/namnc/circom-2-arithc) is a set of projects designed to compile and run arithmetic and boolean MPC circuits. The framework includes circom-2-arithc, a fork of Circom tailored for creating MPC-compatible circuits, and circom-mp-spdz, which combines the compiler with MP-SPDZ, enabling the execution of compiled circuits in MPC. Circom-MPC aims to facilitate the development and deployment of privacy-preserving computations.
TypeScript-MPC tooling is a tools to write MPC program in TypeScript and run them on browsers. [Summon](https://github.com/voltrevo/summon) is a compiler to compile TypeScript program to arithmetic/boolean circuit to run on multi party setting. You can run the compiled circuit using mpz backend on browser.
### Publicly verifiable garbled circuit research
We are actively researching on publicly verifiable garbled circuit. This will lead to constant round publicly verifiable 2 party computation. Currently we're exploring two ways to achieve this. The first approach is based on authenticated garbling and vector OLE and the second approach is based on commited OT and zkp.
### Extractable witness encryption for KZG commitments implementation
KZG extractable witness encryption is a protocol to build extractable witness encryption using KZG polynomial commitment scheme. The opening proofs of KZG polynomial commitment work as decryption key of witness encryption.
You can find the detail of the protocol [here](https://eprint.iacr.org/2024/264). With this protocol, we can achieve single round non-designated chooser oblivious transfer protocol called Laconic OT. [Keaki](https://github.com/brech1/keaki) is an implementation of this protocol.
`,
  },
}

export const mpc: ProjectInterface = {
  id: "MPC",
  section: "pse",
  projectStatus: ProjectStatus.ACTIVE,
  content,
  image: "",
  imageAlt: "MPC",
  name: "MPC",
  tags: {
    keywords: ["MPC", "tools", "Circom", "TypeScript"],
    themes: ["research"],
  },
}
