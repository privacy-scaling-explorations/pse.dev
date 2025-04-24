import { ProjectCategory, ProjectInterface, ProjectStatus } from "@/lib/types"

export const scalingSemaphore: ProjectInterface = {
  id: "scaling-semaphore-pir",
  image: "",                    // add cover image or leave blank
  name: "Scaling Semaphore – PIR Merkle-Path Retrieval",
  section: "pse",
  projectStatus: ProjectStatus.ACTIVE,
  category: ProjectCategory.RESEARCH,
  content: {
    en: {
      tldr:
        "Private Information Retrieval lets Semaphore users fetch their Merkle path from a server without revealing which identity they own, enabling truly private proofs for groups with millions of members.",
      description: `
### Scaling Semaphore – Private Merkle-Path Retrieval with PIR  

#### Project Overview  
The project tackles the privacy bottleneck that appears when Semaphore groups grow to millions of members. In large groups, a user must obtain their Merkle-path (all sibling hashes from leaf to root) from a remote database before they can create a zero-knowledge membership proof. Asking for that path naïvely reveals **which identity** they own.  

This project solves the problem by letting users **query the server with Private Information Retrieval (PIR)**. PIR lets a client fetch database records without the server learning which records were requested, preserving full anonymity at Internet scale.

#### Why PIR matters  
Traditional PIR protocols were too heavy for on-chain use. Recent schemes—e.g. **Respire** and Frodo-PIR—support 2²⁰ elements (≈ 1 million) with sub-second online latency and no trusted setup. By storing Merkle leaves/hashes in PIR-friendly chunks (32 B records) we can keep group trees on a server while users privately retrieve only the ~64 kB they need for a proof.

#### Technical Approach  

| Component | Role |
|-----------|------|
| **Lean Incremental Merkle Tree (LeanIMT)** | Append-only tree used by Semaphore; gives deterministic indices so the client knows exactly which nodes to fetch. |
| **PIR Layer (Respire)** | Batched, lattice-based PIR with no offline phase; ideal for many small records. |
| **\`lean-imt\` integration** | Rust implementation and benchmarks with Respire |

**Data flow**  
1. Client computes the indices of its Merkle path.  
2. Client sends a PIR query for those indices to the server.  
3. Server responds with encrypted buckets; client decrypts to obtain hashes/leaves.  
4. Client generates the standard Semaphore ZK proof locally; nothing is leaked to the server.

#### Current Status (Apr 2025)  
- ✅ ZK-Kit LeanIMT Rust implementation  
- 🔄 PIR proof-of-concept fetching 32-byte records from a 2²⁰-element DB  
- 🔜 Benchmarks  
- 🔜 Post & L&S session (CLI tool TBD)

#### Use-cases Enabled  
- **World-scale anonymous voting** without delegating proofs to a company server.  
- **On-chain reputation** where users prove historical actions privately.  
- **Privacy-preserving NFT drops** that gate by membership but hide identities.

#### Resources  
- **Project Plan:** <https://hackmd.io/@brech1/scale-semaphore-proposal>  
- **Semaphore v4 (Rust):** <https://github.com/semaphore-protocol/semaphore-rs>  
- **Respire PIR paper:** <https://eprint.iacr.org/2024/1165>  
- **Customizable LeanIMT implementation:** <https://github.com/privacy-scaling-explorations/zk-kit.rust/pull/62>

#### Contact  
- **Brechy:** <mailto:brechy@pse.dev>  
- **Discord:** <https://discord.com/invite/sF5CT5rzrR>
      `,
    },
  },
  tags: {
    keywords: [
      "Semaphore",
      "PIR",
      "LeanIMT",
      "zero-knowledge proofs",
      "privacy",
      "Merkle tree",
    ],
    themes: ["privacy", "scalability", "identity"],
    types: ["research", "development"],
  },
}
