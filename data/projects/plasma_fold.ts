import { ProjectCategory, ProjectInterface, ProjectStatus } from "@/lib/types"

export const plasmaFold: ProjectInterface = {
  id: "plasma-fold",
  image: "",
  name: "Plasma Fold",
  section: "pse",
  projectStatus: ProjectStatus.ACTIVE,
  category: ProjectCategory.RESEARCH,
  content: {
    en: {
      tldr: "Integrating folding schemes into plasma-based L2 solutions for efficient and scalable Ethereum transactions.",
      description: `
### Leveraging Folding Schemes for Efficient L2 Solutions  

Our project builds on the external [intmax](https://www.intmax.io/) design by integrating folding schemes into their plasma-based L2 approach. While intmax uses client-side validation with minimal on-chain data and validity proofs to achieve high throughput, its reliance on resource-intensive proving can strain low-end devices. Folding schemes—with low recursive overhead and minimal memory usage—offer a powerful solution to streamline this process.

### Overview & Key Contributions  

By combining plasma's efficient data availability with folding schemes, our approach significantly reduces the resource demands on client devices. This integration:  

- **Optimizes Client-Side Proving:** Folding schemes accelerate proof generation while cutting down memory requirements, making the system more accessible.  
- **Maintains a Low On-Chain Footprint:** Leveraging plasma's lightweight data posting for deposits, withdrawals, and checkpoints ensures fast, secure transaction processing.  
- **Boosts Throughput:** The synergy between folding schemes and plasma validity proofs could dramatically enhance transaction-per-second rates.

### Objectives & Impact  

Our goal is to design and benchmark a client-friendly zk/plasma scaling solution for Ethereum. By reducing the computational load, we aim to make scalable L2 solutions practical for a wide range of devices.

### Additional Resources  

- [intmax: Plasma-based L2 scaling](https://www.intmax.io/)  
- [Deep dive into intmax](https://www.pierredm.xyz/posts/intmax)  
      `,
    },
  },
  tags: {
    keywords: [
      "plasma",
      "folding schemes",
      "Ethereum",
      "scalability",
      "L2",
      "zero-knowledge proofs",
    ],
    themes: ["scalability", "L2 solutions", "zk proofs"],
    types: ["research", "development"],
    builtWith: ["plasma", "zk proofs", "folding schemes"],
  },
}
