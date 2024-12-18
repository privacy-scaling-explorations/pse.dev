import {
  ProjectCategory,
  ProjectContent,
  ProjectInterface,
  ProjectStatus,
} from "@/lib/types"

const content: ProjectContent = {
  en: {
    tldr: "Users of Jubmoji.quest tap NFC cards to collect signatures. By collecting these signatures, they complete quests.",
    description: `
Jubmoji.quest is a place to keep personal, provable digital mementos from people you meet and places you visit IRL. Each time you tap a card, you collect a Jubmoji, a unique cryptographic signature that you can store privately and share as you wish!

The learnings from this experiment influenced the creation of [Cursive](https://pse.dev/en/projects/cursive) which continues to explore applications of cryptography for human connection.
`,
  },
}

export const jubmoji: ProjectInterface = {
  id: "jubmoji",
  projectStatus: ProjectStatus.INACTIVE,
  category: ProjectCategory.APPLICATION,
  section: "archived",
  content,
  image: "jubmoji.webp",
  name: "jubmoji.quest",
  links: {
    github: "https://github.com/jubmoji/jubmoji.quest",
    website: "https://www.jubmoji.quest/",
  },
  tags: {
    keywords: [
      "anonymity/privacy",
      "education",
      "data portability",
      "social",
      "wallets",
      "identity",
      "key management",
      "reputation",
      "toolkits",
    ],
    builtWith: ["snarkjs", "circom", "node"],
    themes: ["build", "play"],
  },
}
