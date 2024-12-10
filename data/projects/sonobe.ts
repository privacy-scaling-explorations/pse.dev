import {
    ProjectCategory,
    ProjectContent,
    ProjectInterface,
    ProjectStatus,
  } from "@/lib/types"
  
  const content: ProjectContent = {
    en: {
      tldr: "Modular library supporting multiple folding schemes and decider backends",
      description: `[Sonobe](https://github.com/privacy-scaling-explorations/sonobe) is a modular library to fold arithmetic circuit instances in an Incremental Verifiable computation (IVC) style. It supports multiple frontends, multiple folding schemes, and multiple decider backends, allowing users to plug-and-play different components. The project is a collaboration between PSE and [0xPARC](https://0xparc.org). 
      
      **Frontends:** Arkworks, Circom, Noir and Noname.

      **Folding schemes:** [Nova](https://eprint.iacr.org/2021/370), [CycleFold](https://eprint.iacr.org/2023/1192), [HyperNova](https://eprint.iacr.org/2023/573), and [ProtoGalaxy](https://eprint.iacr.org/2023/1106)

      **Decider backends:** Groth16 and KZG commitment [proofs](https://privacy-scaling-explorations.github.io/sonobe-docs/usage/decider-prove.html) which are [verifiable on-chain](https://privacy-scaling-explorations.github.io/sonobe-docs/usage/solidity-verifier.html).

      **Other features:** [ZK Layer](https://privacy-scaling-explorations.github.io/sonobe-docs/usage/nova-zk.html) and in-browser [WASM usage](https://privacy-scaling-explorations.github.io/sonobe-docs/usage/wasm.html).`,
    },
  }
  
  export const sonobe: ProjectInterface = {
    id: "sonobe",
    projectStatus: ProjectStatus.ACTIVE,
    category: ProjectCategory.DEVTOOLS,
    section: "pse",
    content,
    image: "sonobe.png",
    name: "Sonobe Folding Library",
    links: {
      github: "https://github.com/privacy-scaling-explorations/sonobe",
      website: "https://privacy-scaling-explorations.github.io/sonobe-docs"
    },
    tags: {
      keywords: ["Folding", "IVC"],
      themes: ["build"],
      types: ["Infrastructure/protocol", "Lego sets/toolkits"],
      builtWith: ["rust"],
    },
  }
  
