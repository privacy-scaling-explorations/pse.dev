import { ProjectInterface, ProjectStatus } from "@/lib/types"

export const machinaIo: ProjectInterface = {
  id: "machina_io",
  image: "",
  name: "MachinaIO",
  section: "pse",
  projectStatus: ProjectStatus.ACTIVE,
  content: {
    en: {
      tldr: "Building the first practical indistinguishability obfuscation (iO) system for secure and scalable cryptographic applications.",
      description: `
## MachinaIO  
### Towards Practical Indistinguishability Obfuscation (iO)  

MachinaIO aims to create the first *practical* iO system based on formal security proofs, transforming any program into a black-box that hides its internals while preserving its functionality. By replacing committees in multi-party computation (MPC) or multi-key fully homomorphic encryption (FHE), iO can scale these applications securely and eliminate trust bottlenecks.

### Contributions  

- **Focus on Core Obfuscation**: Obfuscation only for FHE decryption and SNARK verification, leveraging recent efficiency gains in FHE and ZK proofs.  
- **SNARK compatible with iO:** An implementation of a SNARK scheme that can be efficiently verified within the obfuscated program, specifically a lattice-based designated-verifier SNARK.  

### Milestones (2025)  

1. **Feb/Mar**: Publish a simplified iO scheme and a proof-of-concept RLWE-based implementation (“Diamond iO”).  
2. **July**: Extend our iO scheme to handle large-sized inputs (around 10 KB) through noise refreshing.  
3. **Sep**: Integrate the SNARK scheme compatible with iO for full program obfuscation.  
4. **Nov (Devconnect)**: Deliver a user-facing iO demo, e.g., privacy-preserving database queries or trustless bitcoin bridge.  

Led by two cryptography researchers (*Sora* and *Enrico*), MachinaIO welcomes additional collaborators to push iO from theory to reality.
      `,
    },
  },
  tags: {
    keywords: ["indistinguishability obfuscation", "iO", "cryptography", "Ethereum", "FHE", "SNARKs"],
    themes: ["cryptography", "privacy", "scalability"],
    types: ["research", "development"],
    builtWith: ["FHE", "SNARKs", "functional encryption", "lattice cryptography"],
  },
}
