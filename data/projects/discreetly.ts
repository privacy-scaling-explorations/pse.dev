import { ProjectCategory, ProjectContent, ProjectInterface, ProjectStatus } from "@/lib/types"

const content: ProjectContent = {
  en: {
    tldr: "An anonymous, federated, chat application using ZK.",
    description: `An anonymous, federated, chat application that uses Rate-Limiting Nullifier for spam prevention.`,
  },
}

export const discreetly: ProjectInterface = {
  id: "discreetly",
  projectStatus: ProjectStatus.ACTIVE,
  category: ProjectCategory.APPLICATION,
  content,
  image: "discreetly.svg",
  name: "Discreetly",
  links: {
    github: "https://github.com/Discreetly",
    website: "https://app.discreetly.chat/",
  },
  tags: {
    keywords: ["Anonymity/privacy", "Social"],
    themes: ["play"],
    types: ["Legos/dev tools", "Proof of concept", "Application"],
    builtWith: ["rln", "semaphore"],
  },
}
