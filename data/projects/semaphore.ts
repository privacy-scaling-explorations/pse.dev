import { ProjectContent, ProjectInterface, ProjectStatus } from "@/lib/types"

const content: ProjectContent = {
  en: {
    tldr: "A zero-knowledge protocol for anonymous interactions.",
    description: `### Overview

[Semaphore](https://github.com/semaphore-protocol/semaphore/tree/main) is a [zero-knowledge](https://z.cash/learn/what-are-zk-snarks/) protocol that allows you to cast a message (for example, a vote or endorsement) as a provable group member without revealing your identity. Additionally, it provides a simple mechanism to prevent double-signaling. Use cases include private voting, whistleblowing, anonymous DAOs and mixers.

Semaphore is designed to be a simple and generic privacy layer for decentralized applications (dApps) on Ethereum. It encourages modular application design, allowing dApp developers to choose and customize the on-chain and off-chain components they need.

The core of the protocol is the circuit logic. In addition to circuits, Semaphore provides [Solidity contracts](https://github.com/semaphore-protocol/semaphore/tree/main/packages/contracts) and [JavaScript libraries](https://github.com/semaphore-protocol/semaphore/tree/main#-packages) that allow developers to generate zero-knowledge proofs and verify them with minimal effort.

### Features

With Semaphore, you can allow your users to do the following:

1. [Create a Semaphore identity](https://docs.semaphore.pse.dev/guides/identities)
2. [Add their Semaphore identity to a group (i.e. Merkle tree)](https://docs.semaphore.pse.dev/guides/groups)
3. [Send a verifiable, anonymous message (e.g., a vote or endorsement)](https://docs.semaphore.pse.dev/guides/proofs)

When a user broadcasts a message, Semaphore zero-knowledge proofs can ensure that the user has joined the group and hasn't already cast a message with their nullifier.
Semaphore uses on-chain Solidity contracts and off-chain JavaScript libraries that work in tandem.

* Off chain, JavaScript libraries can be used to create identities, manage groups, and generate proofs.
* On chain, Solidity contracts can be used to manage groups and verify proofs.`,
  },
}

export const semaphore: ProjectInterface = {
  id: "semaphore",
  section: "pse",
  projectStatus: ProjectStatus.ACTIVE,
  content,
  image: "semaphore.webp",
  previousBrandImage: "semaphorePrevious.jpg",
  license: "MIT",
  name: "Semaphore",
  links: {
    github: "https://github.com/semaphore-protocol",
    website: "https://semaphore.pse.dev/",
    telegram: "https://semaphore.pse.dev/telegram",
    twitter: "https://twitter.com/SemaphoreDevs",
  },
  tags: {
    keywords: [
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
    themes: ["build"],
    types: ["Legos/dev tools", "Lego sets/toolkits", "Infrastructure/protocol"],
    builtWith: ["zk-kit", "circom", "snarkjs"],
  },
}
