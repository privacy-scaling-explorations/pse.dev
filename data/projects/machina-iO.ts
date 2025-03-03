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

MachinaIO aims to create the first *practical* iO system based on popular cryptographic assumptions, transforming any program into a black-box that hides its internals while preserving its functionality. By replacing committees in multi-party computation (MPC) or fully homomorphic encryption (FHE), iO can scale these applications securely and eliminate trust bottlenecks.

### Contributions  

- **Focus on Core Obfuscation**: Only obfuscate FHE decryption and SNARK verification, leveraging recent efficiency gains in FHE and ZK proofs.  
- **Verifiable FHE & Functional Encryption**: Provide short, constant-time proofs of correct FHE evaluation and non-interactive delegation of private computations—both potentially valuable for Ethereum-based applications.  

### Milestones (2025)  

1. **Feb/Mar**: Publish a simplified iO scheme and a proof-of-concept RLWE-based implementation (“Diamond iO”).  
2. **July**: Extend iO to handle unbounded inputs through noise refreshing.  
3. **Sep**: Integrate lattice-based SNARKs inside iO for full program obfuscation.  
4. **Nov (Devconnect)**: Deliver a user-facing iO demo, e.g., privacy-preserving database queries or an on-chain “Pokemon-style” game.  

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
