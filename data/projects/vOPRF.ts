import { ProjectCategory, ProjectInterface, ProjectStatus } from "@/lib/types"

export const vOPRF: ProjectInterface = {
  id: "vOPRF",
  image: "",
  name: "Web2-ID Nullifiers using vOPRF",
  section: "pse",
  projectStatus: ProjectStatus.ACTIVE,
  category: ProjectCategory.RESEARCH,
  links: {
    github: "https://github.com/privacy-scaling-explorations/vOPRF-ID/",
  },
  content: {
    en: {
      tldr: "Enabling pseudonymous systems for Web2 identities using verifiable Oblivious PseudoRandom Functions (vOPRFs).",
      description: `
### Overview  

The Web2-ID Nullifiers project enables **pseudonymous systems for Web2 identities** using verifiable Oblivious PseudoRandom Functions (vOPRFs). It addresses the lack of **nullifiers** in Web2 IDs, which are essential for anonymous protocols. The project aims to build an infrastructure, like Semaphore, for Web2-ID registration and reuse across applications.

### Features and Capabilities  

- **Implements a vOPRF protocol** for private, deterministic randomness generation.  
- Uses a **multi-party computation (MPC) network** to enhance security.  
- Employs **ZK proofs** to verify Web2 identity without revealing it.  
- Aims to create a **global registry** for Web2 identities.  
- Generates **nullifiers for Web2 IDs**, crucial for pseudonymous protocols.  
- Integrates with **Web2-Web3 bridges** like ZK Email and TLS Notary.  

### Developer Capabilities  

- Build **pseudonymous systems** for applications like anonymous voting and forums.  
- Create **privacy-preserving applications** for anonymous interaction with Web2 services.  
- Integrate the vOPRF protocol with existing infrastructure.  

### Applications  

- **Anonymous Voting** with Web2 identities.  
- **Anonymous Airdrops** to users based on Web2 identities (e.g., GitHub).  
- **Pseudonymous Forums** with limited accounts and spam prevention.  

### Key Concepts  

- **Nullifiers:** Prevent double-spending or multiple voting.  
- **vOPRF:** Allows private, deterministic randomness generation.  
- **MPC:** Enhances security via multi-party computation.  
- **ZK Proofs:** Verifies statements without revealing information.  

### Links  

- [Discussion on EthResearch](https://ethresear.ch/t/web2-nullifiers-using-voprf/21762)  
- [Blog post by Rasul](https://curryrasul.com/blog/web2-nullifiers/)  
      `,
    },
  },
  tags: {
    keywords: ["vOPRF", "nullifiers", "Web2", "privacy", "ZK proofs", "MPC"],
    themes: ["privacy", "identity", "zero-knowledge proofs"],
    types: ["research", "development"],
    builtWith: ["vOPRF", "MPC", "ZK proofs"],
  },
}
