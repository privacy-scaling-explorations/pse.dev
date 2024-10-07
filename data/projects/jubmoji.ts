import { ProjectInterface, ProjectStatus } from "@/lib/types"

export const jubmoji: ProjectInterface = {
  id: "jubmoji",
  section: "pse",
  projectStatus: ProjectStatus.ACTIVE,
  image: "",
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
