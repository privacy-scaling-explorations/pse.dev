export const projects = [
  {
    id: "rln",
    image: "rln.webp",
    name: "Rate-Limiting Nullifier",
    tldr: "A protocol for deterring spam and maintaining anonymity in communication systems.",
    description:
      "Rate-Limiting Nullifier (RLN) is a protocol designed to combat spam and denial of service attacks in privacy-preserving environments. It allows users in an anonymous system to penalize those who exceed the rate limit, either by withdrawing the offender's stake or revealing their secrets. This mechanism helps maintain system integrity and deters abuse. RLN is built on the Semaphore protocol and uses zero-knowledge proofs and the Shamir’s Secret Sharing scheme to reveal the spammer's private key. It's particularly useful for developers working on communication systems that require privacy and anonymity, such as chat apps, client-server communications, and peer-to-peer communications. It's already being used in projects like Zerokit and Waku, and is also being developed for use with the KZG polynomial commitment scheme.",
    links: {
      github: "https://github.com/Rate-Limiting-Nullifier/circom-rln",
      website: "https://rate-limiting-nullifier.github.io/rln-docs/",
    },
    tags: {
      themes: ["Anonymity/privacy"],
      types: ["Infrastructure/protocol"],
      builtWith: ["Circom", "Solidity", "Semaphore"],
    },
  },
  {
    id: "zkitter",
    image: "zkitter.webp",
    name: "Zkitter",
    tldr: "A decentralized social network prioritizing privacy and anonymity",
    description:
      "Zkitter is a decentralized social network that emphasizes privacy by default. It allows users to share thoughts and communicate in various modes: as known identities, as a member of a group, or entirely anonymously. Built with Semaphore and RLN, Zkitter offers familiar social media features such as posting, chatting, following, and liking, but with a strong focus on user privacy and anonymity. It serves as an experiment to explore new ways of engaging in conversations without the fear of damaging one’s personal reputation and is an example of a user-facing application using zero-knowledge primitives such as Semaphore, CryptKeeper, ZK-Chat, and Interep. Users can sign up using an Ethereum address or ENS name, or create an anonymous account, with options for anonymous chat and posting.",
    links: {
      github: "https://github.com/zkitter",
      website: "https://www.zkitter.com/explore/",
      discord: "https://discord.gg/Em4Z9yE8eW",
    },

    tags: {
      themes: ["Anonymity/privacy", "Social", "Identity"],
      types: ["Application", "Infrastructure/protocol"],
      builtWith: ["Semaphore", "RLN", "Interep", "zkchat"],
    },
  },
  {
    id: "maci",
    image: "maci.webp",
    name: "MACI",
    tldr: "A secure e-voting solution minimizing the risk of collusion and bribery",
    description:
      "Minimal Anti-Collusion Infrastructure (MACI) is a protocol designed to provide a highly secure e-voting solution. It enables organizations to conduct on-chain voting processes with a significantly reduced risk of cheating, such as bribery or collusion. MACI uses zero-knowledge proofs to implement a receipt-free voting scheme, making it impossible for anyone other than the vote coordinator to verify how a specific user voted. This ensures the correct execution of votes and allows anyone to verify the results. It's particularly beneficial for governance and funding events, where its anti-collusion mechanisms help ensure fair and transparent outcomes.",
    links: {
      github: "https://github.com/privacy-scaling-explorations/maci",
    },
    tags: {
      themes: ["Anonymity/privacy", "Voting/governance"],
      types: ["Lego sets/toolkits", "Infrastructure/protocol"],
      builtWith: ["P0tion", "JubjubLib"],
    },
  },
  {
    id: "wax",
    image: "wax.webp",
    name: "Wallet Account eXperiments (WAX)",
    tldr: "Streamlines web3 product development with smart account components for enhanced wallets, dApps, and SDKs.",
    description:
      "Wallet Account eXperiments (WAX), formerly known as BLS Wallet, is a suite of production-ready smart account components that provide advanced features for wallets, SDKs, and dApps. It's designed to lower gas costs on EVM rollups through aggregated BLS signatures, simplifying the integration of contract wallets and reducing the cost of layer 2 transactions. This makes WAX particularly beneficial for web3 projects targeting developing economies. WAX components incorporate advanced cryptographic primitives in a secure and intuitive way, using Safe contracts for a familiar and battle-tested foundation. Each additional module can be audited and added or removed at the account holder's discretion. WAX offers features like cheaper L2 transactions, modular smart contract components, ERC 4337 compatibility, zk email verification, passkeys verification, multi-action transactions, gasless transactions, and wallet upgradability. The primary use cases for WAX include scaling, key management, and the creation of prototypes for the web3 ecosystem.",
    links: {
      github: "https://github.com/getwax",
      website: "https://getwax.org/",
      discord: "https://discord.gg/hGDmAhcRyz",
    },
    tags: {
      builtWith: [
        "Hardhat",
        "Node",
        "Solidity BLS library",
        "sqlite",
        "docker",
        "ethers",
        "deno",
      ],

      themes: ["Scaling", "Key management"],
      types: ["Prototype", "Proof of concept", "Lego sets/toolkits"],
    },
  },
  {
    id: "discreetly",
    image: "discreetly.svg",
    name: "Discreetly",
    tldr: "An anonymous, federated, chat application using ZK.",
    description:
      "An anonymous, federated, chat application that uses Rate-Limiting Nullifier for spam prevention.",
    links: {
      github: "https://github.com/Discreetly",
    },
    tags: {
      themes: ["Anonymity/privacy", "Social"],
      types: ["Legos/dev tools", "Proof of concept", "Application"],
      builtWith: ["RLN", "Semaphore", "Waku"],
    },
  },
  {
    id: "cryptkeeper",
    image: "cryptkeeper.webp",
    name: "CryptKeeper",
    tldr: "A browser extension for secure, portable anonymous identity management across applications.",
    description:
      "CryptKeeper is a browser extension that generates Semaphore and RLN proofs for websites, providing a secure and portable solution for managing anonymous identity secrets across different applications. It simplifies the integration of zero-knowledge (ZK) identities and proofs into applications, allowing developers to focus on building the front-end and logic of their applications. By handling complex aspects of cryptography, circuits, caching, and storage, CryptKeeper enables users to interact with decentralized applications (dapps) without revealing their private identity secrets. It is aimed at building secure community standards for the growing ZK ecosystem.",
    links: {
      github: "https://github.com/CryptKeeperZK",
    },
    tags: {
      themes: ["Anonymity/privacy", "Social", "Identity"],
      types: ["Application", "Infrastructure/protocol", "Lego sets/toolkits"],

      builtWith: ["Semaphore", "RLN"],
    },
  },
  {
    id: "semaphore",
    image: "semaphore.webp",
    name: "Semaphore",
    tldr: "A zero-knowledge protocol enabling anonymous group membership proof and signaling.",
    description:
      "Semaphore is a protocol that allows users to prove their membership in a group and transmit anonymous data, such as votes or feedback, without revealing their identities. It is designed for developers aiming to build privacy-preserving applications. Semaphore enables the creation of identities and their corresponding public values, which can be added to Merkle trees. This facilitates the authentication of anonymous user messages through zero-knowledge proofs, where membership is proven using Merkle proofs within the circuit. Key use cases include anonymous voting applications, receiving anonymous feedback from event attendees, and anonymous text messages. It is currently in production and is being used in a wide variety of projects.",
    links: {
      github: "https://github.com/semaphore-protocol",
      website: "https://semaphore.appliedzkp.org/",
      discord: "https://semaphore.appliedzkp.org/discord",
    },
    tags: {
      themes: [
        "Anonymity/privacy",
        "Social",
        "Identity",
        "Transaction privacy",
        "Voting/governance",
        "Reputation",
        "Education",
        "Scaling",
        "Key management",
        "Other (group membership)",
      ],

      types: [
        "Legos/dev tools",
        "Lego sets/toolkits",
        "Infrastructure/protocol",
      ],
      builtWith: ["ZK-kit", "circom", "snarkjs"],
    },
  },
  {
    id: "pse-security",
    image: "",
    name: "PSE Security",
    tldr: "Proactively securing Ethereum's L2 and ZK ecosystems.",
    description:
      "PSE Security is a division of the Privacy & Scaling Explorations team at the Ethereum Foundation. Its primary goal is to identify and rectify bugs, thereby enhancing the security of the Ethereum Layer 2 and Zero-Knowledge ecosystems. Recognizing the potential for critical bugs to cause significant setbacks, PSE Security is committed to preemptively addressing these issues. The team offers open-source projects like the ZK Bug Tracker and Bridge Bug Tracker, which track real bugs and exploits in production code, and encourages community contributions. PSE Security also conducts manual audits and plans to help teach the community more about security and ways they can prevent bugs themselves.",
    links: {
      github: "https://github.com/privacy-scaling-explorations/security",
    },
    tags: {
      themes: [
        "Anonymity/privacy",
        "Education",
        "Key management",
        "Scaling",
        "Security",
      ],
      types: ["Legos/dev tools"],
      builtWith: ["Slither", "Ecne", "Circomspect", "Echidna"],
    },
  },

  {
    id: "zkevm-community",
    image: "",
    name: "zkEVM Community Edition",
    tldr: "A zero-knowledge proof mechanism for Ethereum block verification.",
    description:
      "zkEVM Community Edition is a project aimed at validating Ethereum blocks using zero-knowledge proofs. It is designed to be fully compatible with Ethereum's EVM and serves two primary goals. First, it enables the creation of a layer 2 network (zkRollup) compatible with the Ethereum ecosystem, which uses zero-knowledge proofs to validate blocks, thus enhancing scalability. Second, it allows the generation of zero-knowledge proofs for blocks from the existing layer 1 Ethereum network, enabling light clients to quickly synchronize many blocks with low resource consumption while ensuring block correctness without needing trust in external parties.",
    links: {
      github: "https://github.com/privacy-scaling-explorations/zkevm-circuits",
    },
    tags: {
      themes: ["Scaling"],
      types: ["Infrastructure/protocol", "Lego sets/toolkits"],
      builtWith: ["halo2 from zcash", "Rust", "geth"],
    },
  },

  {
    id: "bandada",
    image: "bandada.webp",
    name: "Bandada",
    tldr: "An open-source system for managing privacy-preserving groups of anonymous individuals.",
    description:
      "Bandada is a project designed to simplify the management of privacy-preserving Semaphore groups. It is aimed at developers who want to build privacy-based applications and integrate anonymity sets, as well as non-developers working in DAOs, governments, international institutions, non-profit organizations, and associations that want to create and manage anonymous groups. Bandada offers a plug-and-play infrastructure, reducing the time and complexity required for managing anonymity sets. It enables anonymous signaling, such as voting, messaging, login, or endorsing, in various use cases like private organizations, GitHub repository contributors, and groups of wallets holding a specific NFT.",
    links: {
      github: "https://github.com/privacy-scaling-explorations/bandada",
      website: "https://bandada.appliedzkp.org/",
    },
    tags: {
      themes: [
        "Anonymity/privacy",
        "Social",
        "Identity",
        "Transaction privacy",
        "Voting/governance",
        "Reputation",
        "Education",
        "Scaling",
        "Key management",
      ],
      type: [
        "Legos/dev tools",
        "Lego sets/toolkits",
        "Prototype",
        "Proof of concept",
        "Infrastructure/protocol",
        "Plugin",
        "Application",
      ],
      builtWith: ["Semaphore", "ZK-kit"],
    },
  },

  {
    id: "dsl-working-group",
    image: "",
    name: "DSL Working Group",
    tldr: "Exploration of languages for writing zk circuits",
    description:
      "The DSL Working Group is focused on the exploration and improvement of languages used to write zero-knowledge circuits. The group's primary goal is to enhance the state of zk circuit languages, making them easier to write and review by offering the right abstractions. They also aim to make it harder to write unsound circuits by implementing static analysis and enforcing safer patterns. Additionally, they are working to support next-generation (Incrementally Verifiable Computation or IVC) proving systems. The group is currently working on Chiquito, a high-level Domain-Specific Language (DSL) for Halo2 circuits that lowers the entry barrier to write zk circuits with a state-machine abstraction API.",
    links: {
      github: "https://github.com/privacy-scaling-explorations/chiquito/",
    },
    tags: {
      type: ["Legos/dev tools", "Proof of concept", "Developer tooling"],
      themes: [],
      builtWith: [],
    },
  },

  {
    id: "zkml",
    image: "",
    name: "ZKML",
    tldr: "ZKML (Zero-Knowledge Machine Learning) leverages zero-knowledge proofs for privacy-preserving machine learning, enabling model and data privacy with transparent verification.",
    description:
      "ZKML is a solution that combines the power of zero-knowledge proofs (ZKPs) and machine learning to address the privacy concerns in traditional machine learning. It provides a platform for machine learning developers to convert their TensorFlow Keras models into ZK-compatible versions, ensuring model privacy, data privacy, and transparent verification. ZKML can be used to verify if a specific machine learning model was used to generate a particular piece of content, without revealing the input or the model used. It has potential use cases in on-chain biometric authentication, private data marketplace, proprietary ML model sharing, and AIGC NFTs.",
    links: {
      github: "https://github.com/socathie/circomlib-ml",
    },
    tags: {
      themes: ["Anonymity/privacy", "Scaling"],
      type: ["Proof of concept", "Infrastructure/protocol"],
      builtWith: ["circom", "halo2", "nova"],
    },
  },

  {
    id: "trusted-setups",
    image: "trusted-setups.svg",
    name: "Trusted Setups",
    tldr: "Aiding developers with tools for trusted setups.",
    description:
      "The Trusted Setups project is dedicated to simplifying the process of trusted setups, which are crucial for privacy or scaling solutions. Trusted setups involve multiple participants contributing to the generation of secrets. As long as one participant forgets their part of the secret, the final solution remains secure. The team recognizes the complexity of developing contribution programs and coordinating the participants' queue in a trusted setup. To address this, they are developing tools, including scripts, WebApps, and APIs, to streamline the contribution and coordination effort. This allows developers to focus on building their circuits and applications, enhancing efficiency and productivity in the development of zero-knowledge applications.",
    links: {
      github: "https://github.com/zkparty",
    },
    tags: {
      themes: ["Scaling", "Education"],
      type: ["Legos/dev tools", "Lego sets/toolkits"],
      builtWith: [],
    },
  },

  {
    id: "zk3",
    image: "zk3.svg",
    name: "zk3",
    tldr: "Utilizing ZK proofs in social networks",
    description:
      "Zk3 is a protocol that leverages Zero Knowledge Proofs (ZKPs) to allow users to prove their membership in a group without revealing their identity. This is particularly useful for social media applications built on Lens or other on-chain platforms. The protocol helps to moderate conversations and reduce bot activity while preserving user privacy. It provides developers with the tools to verify group eligibility, create ZK proofs, and use ZK proofs in Lens. ZK3 consists of a smart contract system for user interactions and network rules, and a GraphQL API for flexible interaction, enabling the development of diverse applications, including web 2.0 integrations.",
    links: {
      github: "http://github.com/monemetrics/semaphore-zk3",
      website: "http://zk3.io/",
      twitter: "http://twitter.com/zk3org",
    },
    tags: {
      themes: ["Anonymity/privacy", "Social", "Identity", "Reputation"],
      type: [
        "Legos/dev tools",
        "Lego sets/toolkits",
        "Infrastructure/protocol",
        "Plugin",
      ],
      builtWith: ["Semaphore", "Lens protocol"],
    },
  },

  {
    id: "tlsn",
    image: "tlsn.webp",
    name: "TLSNotary",
    tldr: "A protocol for creating cryptographic proofs of authenticity for any data on the web.",
    description:
      "TLSNotary is useful for developers of privacy focused projects that need data provenance from secure web servers. It leverages the widely-used Transport Layer Security (TLS) protocol to securely and privately prove a transcript of communications took place with a webserver. The protocol involves splitting TLS session keys between two parties: the User and the Notary. Neither the User nor Notary are in possession of the full TLS session keys, they only hold a share of those keys. This ensures the security assumptions of TLS while enabling the User to prove the authenticity of the communication to the Notary. The Notary remains unaware of which webserver is being queried, and the Notary never has access to the unencrypted communications. All of this is achieved while maintaining full privacy.",
    links: {
      github: "https://github.com/tlsnotary/tlsn",
      website: "https://tlsnotary.org/",
      discord: "https://discord.gg/9XwESXtcN7",
    },
    tags: {
      themes: [],
      type: [],
      builtWith: [],
    },
  },

  {
    id: "eigen-trust",
    image: "",
    name: "EigenTrust",
    tldr: "A distributed reputation system with zero-knowledge features.",
    description:
      "EigenTrust is a library designed to manage trust within a distributed network, incorporating zero-knowledge features. It serves as a reputation bank for the Ethereum ecosystem, providing an interoperable layer for managing reputation and trust. The protocol creates zero-knowledge proofs of reputation scores based on ratings given by network participants. This allows for the creation of a reputation system for peer-to-peer marketplaces and exchanges, reputation-weighted voting, and community gatekeeping.",
    links: {
      github: "https://github.com/eigen-trust/protocol",
    },
    tags: {
      themes: ["Reputation", "Identity"],
      type: ["Infrastructure/protocol"],
      builtWith: ["Ethereum Attestation Service", "Halo2", "ethers.rs"],
    },
  },

  {
    id: "anon-klub",
    image: "anonklub.svg",
    name: "AnonKlub",
    tldr: "A mechanism for anonymous proof of Ethereum address ownership.",
    description:
      "AnonKlub is a tool designed for Ethereum developers that allows for anonymous proof of Ethereum address ownership. It doesn't directly address the public observability of Ethereum transactions but provides a workaround for privacy. Users can prepare a list of Ethereum addresses, sign a message from an address they own, and use that signature to generate a zero-knowledge proof. This proof enables users to perform actions anonymously that would typically require ownership of an address from the initial list. Use cases include anonymous NFT minting and Discord verification for DAOs without disclosing the public address.",
    links: {
      github: "https://github.com/anonklub",
      website: "https://anonklub.github.io",
    },
    tags: {
      themes: [
        "Transaction privacy",
        "Anonymity/privacy",
        "Social",
        "Identity",
        "Voting/governance",
      ],
      type: ["Infrastructure/protocol", "Prototype", "Proof of concept"],
      builtWith: ["Circom", "snarkjs", "halo2"],
    },
  },

  {
    id: "summa",
    image: "",
    name: "Summa",
    tldr: "Protocol enabling centralized exchanges to prove solvency without compromising private information.",
    description:
      "Summa allows centralized exchanges to demonstrate that their assets exceed their liabilities without revealing critical business information such as individual user balances, total number of users, and total liabilities or assets. It uses zero-knowledge proofs to ensure that exchanges can demonstrate they have sufficient assets to cover all user balances. The protocol involves building a Merkle Sum Tree of user balances, generating proofs for each user, and allowing users to verify these proofs.",
    links: {
      github: "https://github.com/summa-dev",
    },
    tags: {
      themes: ["Anonymity/privacy", "Computational Integrity"],
      type: ["Infrastructure/protocol", "Application"],
      builtWith: ["Halo2 PSE"],
    },
  },
  {
    id: "anon-aadhaar",
    image: "",
    name: "Anon Aadhaar",
    tldr: "Tools for building build privacy-preserving applications using government ID cards, specifically Aadhaar cards in India.",
    description:
      "Anon Aadhaar is a project that allows individuals to prove their citizenship anonymously. The project provides circuits, an SDK, and demo applications that generate and verify proofs of valid Aadhaar cards, integrating with the PCD framework to support a wide range of applications.",
    links: {
      github: "https://github.com/privacy-scaling-explorations/anon-aadhaar",
    },
    tags: {
      themes: ["Anonymity/privacy", "Social", "Identity", "Voting/governance"],
      type: ["Legos/dev tools", "Lego sets/toolkits", "Proof of concept"],
      builtWith: ["Circom, RSA"],
    },
  },
  {
    id: "channel-4",
    image: "channel4.svg",
    name: "Channel 4",
    tldr: "Content discovery through community contributions, using state channels to reward users for popular posts.",
    description:
      "Channel 4 is a community-driven platform where users can submit and discover content. It uses state channels to incentivize user engagement. When a user likes the content you've submitted, a state channel closes and rewards are dropped into their wallet. This approach combines entertainment with the power of state channels, enabling community members to earn while they engage.",
    links: {
      github: "https://github.com/State-Channel-4",
      website: "https://channel4.wtf/",
      discord: "https://discord.gg/76UrYgVyEx",
    },
    tags: {
      themes: ["Scaling"],
      type: ["Application"],
      builtWith: ["State channel", "Smart contract"],
    },
  },
  {
    id: "pollen-labs",
    image: "pollen-labs.svg",
    name: "Pollen Labs",
    tldr: "Champions of freedom of speech and expression through decentralized innovation.",
    description:
      "Pollen Labs is driven by a mission to make a significant impact on global lives by addressing complex, pressing issues. They work alongside their community to break barriers, preserve privacy, and build a future where every voice is heard, and a free web is accessible to all. Their projects, like Channel 4, a content discovery engine, and Daisy, focusing on information transparency, embody this mission., enabling community members to earn while they engage.",
    links: {
      website: "https://pollenlabs.org/",
      twitter: "https://twitter.com/PollenLabs_",
    },
    tags: {
      themes: ["Anonymity/privacy", "Scaling"],
      type: ["Application"],
      builtWith: [""],
    },
  },
  {
    id: "unirep-protocol",
    image: "unirep.svg",
    name: "UniRep Protocol",
    tldr: "A Zero-Knowledge Protocol for user data & reputation management",
    description:
      "UniRep is a zero-knowledge protocol that securely manages user data through anonymous identifiers, enabling trustless interactions and enhanced user privacy in applications. It expands the concept of reputation to include various user data aspects, such as preferences, activity, alignments, and ownership. UniRep promotes non-custodial applications that don't hold user data, reducing data breach risks and emphasizing security for both users and developers.",
    links: {
      github: "https://github.com/Unirep",
      website: "https://developer.unirep.io/docs/welcome",
      twitter: "https://twitter.com/UniRep_Protocol",
      discord: "https://discord.gg/VzMMDJmYc5",
    },
    tags: {
      themes: ["Anonymity/privacy", "Social", "Identity", "Reputation"],
      type: ["Legos/dev tools, Protocol"],
      builtWith: ["Semaphore", "Circom"],
    },
  },
  {
    id: "zkp2p",
    image: "zkp2p.webp",
    name: "ZKP2P",
    tldr: "Instant fiat to crypto onramp connecting traditional peer-to-peer payment services with zero-knowledge proofs.",
    description:
      "ZKP2P is for defi consumers looking to onramp assets on chain quickly without going through a CEX as an intermediary. ZKP2P generates a privacy-preserving proof of payment between two users on existing payment rails like Venmo or Paypal and uses said proof to unlock escrowed digital assets on-chain.",
    links: {
      github: "https://github.com/zkp2p",
      website: "https://zkp2p.xyz/",
      twitter: "https://twitter.com/zkp2p",
    },
    tags: {
      themes: [
        "Anonymity/privacy",
        "Payments",
        "On-ramping",
      ],
      type: [
        "Proof of concept",
        "Application",
      ],
      builtWith: ["Circom", "Halo2"],
    },
  },
]
