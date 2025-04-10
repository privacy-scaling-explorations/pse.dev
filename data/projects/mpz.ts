import {
  ProjectCategory,
  ProjectContent,
  ProjectInterface,
  ProjectStatus,
} from "@/lib/types"

const content: ProjectContent = {
  en: {
    tldr: "A safe, performant, modular and portable multi-party computation (MPC) library.",
    description: `mpz is a collection of Rust-based libraries for multi-party computation (MPC), designed to be safe, performant, modular, and easy to use. As the name suggests—mpz is pronounced “em-peasy”—the project aims to make MPC as accessible as possible.

Built with portability in mind, mpz runs natively or in the browser via WebAssembly (WASM). It serves as the core MPC implementation behind [TLSNotary](https://pse.dev/en/projects/tlsn), but its architecture is broadly applicable across privacy-preserving and cryptographic use cases.

mpz is part of Privacy & Scaling Explorations’ broader effort to advance practical cryptographic tooling. It is dual-licensed under Apache-2.0 and MIT to encourage open-source collaboration.`,
  },
}

export const mpz: ProjectInterface = {
  id: "mpz",
  projectStatus: ProjectStatus.ACTIVE,
  category: ProjectCategory.DEVTOOLS,
  section: "pse",
  content,
  image: "",
  name: "mpz",
  license: "MIT or Apache-2.0",
  links: {
    github: "https://github.com/privacy-scaling-explorations/mpz",
  },
  tags: {
    themes: ["build", "play"],
    types: [
      "Legos/dev tools",
      "Infrastructure/protocol"
    ],
    builtWith: ["rust"],
    keywords: [
      "Anonymity/privacy",
      "mpc",
    ],
  },
  extraLinks: {
    play: [
      {
        label: "MPZ Play (Exercises to get familiar with mpz)",
        url: "https://github.com/th4s/mpz-play",
      },
    ],
  },
}
