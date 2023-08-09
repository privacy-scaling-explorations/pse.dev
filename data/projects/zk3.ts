import { ProjectInterface } from "@/lib/types"

const description = `
Zk3 is a protocol that leverages Zero Knowledge Proofs (ZKPs) to allow users to prove their membership in a group without revealing their identity. This is particularly useful for social media applications built on Lens or other on-chain platforms. The protocol helps to moderate conversations and reduce bot activity while preserving user privacy. It provides developers with the tools to verify group eligibility, create ZK proofs, and use ZK proofs in Lens. ZK3 consists of a smart contract system for user interactions and network rules, and a GraphQL API for flexible interaction, enabling the development of diverse applications, including web 2.0 integrations.
`

export const zk3: ProjectInterface = {
  id: "zk3",
  image: "zk3.svg",
  name: "zk3",
  tldr: "Utilizing ZK proofs in social networks",
  description,
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
}
