import { ProjectInterface } from "@/lib/types"

const description = `
Semaphore is a protocol that allows users to prove their membership in a group and transmit anonymous data, such as votes or feedback, without revealing their identities. It is designed for developers aiming to build privacy-preserving applications. Semaphore enables the creation of identities and their corresponding public value, which can be added to Merkle trees. This facilitates the authentication of anonymous user messages through zero-knowledge proofs, where membership is proven using Merkle proofs within the circuit. Key use cases include anonymous voting applications, receiving anonymous feedback from event attendees, and anonymous text messages. It is currently in production and is being used in a wide variety of projects.
`

export const semaphore: ProjectInterface = {
  id: "semaphore",
  section: "pse",
  projectStatus: "active",
  image: "semaphore.webp",
  name: "Semaphore",
  tldr: "A zero-knowledge protocol for anonymous interactions.",
  description,
  links: {
    github: "https://github.com/semaphore-protocol",
    website: "https://semaphore.pse.dev/",
    discord: "https://semaphore.pse.dev/discord",
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
