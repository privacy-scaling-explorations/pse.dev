import {
  ProjectCategory,
  ProjectContent,
  ProjectInterface,
  ProjectStatus,
} from "@/lib/types"

const content: ProjectContent = {
  en: {
    tldr: "A safe, performant, modular and portable multi-party computation (MPC) library.",
    description: `mpz (*pronounced as “em-peasy”*) is a collection of Rust-based libraries for multi-party computation (MPC), designed to be safe, performant and modular.

Built with portability in mind, mpz runs natively or in the browser via WebAssembly (WASM). It serves as the core MPC implementation behind [TLSNotary](tlsn), but its architecture is broadly applicable across privacy-preserving and cryptographic use cases.

mpz is part of Privacy & Scaling Explorations’ broader effort to advance practical cryptographic tooling. It is dual-licensed under Apache-2.0 and MIT to encourage open-source collaboration.`,
  },
}

export const mpz: ProjectInterface = {
  id: "mpz",
  projectStatus: ProjectStatus.ACTIVE,
  category: ProjectCategory.DEVTOOLS,
  section: "pse",
  content,
  image: "mpz.png",
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
        label: "mpz-play (Exercises to get familiar with mpz)",
        url: "https://github.com/th4s/mpz-play",
      },
    ],
  },
}
