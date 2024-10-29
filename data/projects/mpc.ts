import { ProjectContent, ProjectInterface, ProjectStatus } from "@/lib/types"

const content: ProjectContent = {
  en: {
    tldr: "MPC research",
    description: `We are dedicated group of people in PSE to research and explore Secure Multi-Party Computation. Current focus area of us are programmability/accessibility and publicly verifiability research. Our active projects include Circom-MPC, TypeScript-MPC toolings, publicly verifiable garbled circuit research and KZG extractable witness encryption implementation.
    
    Circom-MPC is a set of projects designed to compile and run arithmetic and boolean MPC circuits. The framework includes circom-2-arithc, a fork of Circom tailored for creating MPC-compatible circuits, and circom-mp-spdz, which combines the compiler with MP-SPDZ, enabling the execution of compiled circuits in MPC. Circom-MPC aims to facilitate the development and deployment of privacy-preserving computations.

    TypeScript-MPC toolings is a tools to write MPC program in TypeScript and run them on browsers. (WIP)
    `,
  },
}

export const zkID: ProjectInterface = {
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
