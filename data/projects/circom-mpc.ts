import {
    ProjectCategory,
    ProjectContent,
    ProjectInterface,
    ProjectStatus,
  } from "@/lib/types"

const content: ProjectContent = {
    en: {
        tldr: "Set of projects designed to compile and run arithmetic and boolean MPC circuits written in Circom.",
        description: `
Circom-MPC is a set of projects designed to compile and run arithmetic and boolean MPC circuits written in Circom. The framework includes circom-2-arithc, a fork of Circom tailored for creating MPC-compatible circuits, and circom-mp-spdz, which combines the compiler with MP-SPDZ, enabling the execution of compiled circuits in MPC. Circom-MPC aims to facilitate the development and deployment of privacy-preserving computations.`,
    }
}

export const circomMpc: ProjectInterface = {
    id: "circom-mpc",
    category: ProjectCategory.RESEARCH,
    projectStatus: ProjectStatus.INACTIVE,
    section: "pse",
    content,
    image: "",
    imageAlt: "Circom-MPC",
    name: "Circom-MPC",
    links: {
        github: "https://github.com/namnc/circom-2-arithc",
      },
    tags: {
        keywords: ["mpc", "circom", "mp-spdz"],
        themes: ["research"],
    },
}