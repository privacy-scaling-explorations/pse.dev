import { ProjectInterface } from "@/lib/types"

const description = `
Zkitter is a decentralized social network that emphasizes privacy by default. It allows users to share thoughts and communicate in various modes: as known identities, as a member of a group, or entirely anonymously. Built with Semaphore and RLN, Zkitter offers familiar social media features such as posting, chatting, following, and liking, but with a strong focus on user privacy and anonymity. It serves as an experiment to explore new ways of engaging in conversations without the fear of damaging one’s personal reputation and is an example of a user-facing application using zero-knowledge primitives such as Semaphore, CryptKeeper, ZK-Chat, and Interep. Users can sign up using an Ethereum address or ENS name, or create an anonymous account, with options for anonymous chat and posting.
`

export const zkitter: ProjectInterface = {
  id: "zkitter",
  projectStatus: "active",
  image: "zkitter.webp",
  name: "Zkitter",
  tldr: "A decentralized social network prioritizing privacy and anonymity",
  description,
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
}
