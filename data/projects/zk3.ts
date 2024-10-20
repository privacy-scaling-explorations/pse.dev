import { ProjectContent, ProjectInterface, ProjectStatus } from "@/lib/types"

const content: ProjectContent = {
  en: {
    tldr: "",
    description: `

`,
  },
}

export const zk3: ProjectInterface = {
  id: "zk3",
  section: "grant",
  projectStatus: ProjectStatus.ACTIVE,
  content,
  image: "zk3.svg",
  name: "zk3",
  links: {
    github: "http://github.com/monemetrics/semaphore-zk3",
    website: "http://zk3.io/",
    twitter: "http://twitter.com/zk3org",
  },
  tags: {
    themes: ["play"],
    types: [
      "Legos/dev tools",
      "Lego sets/toolkits",
      "Infrastructure/protocol",
      "Plugin",
    ],
    keywords: ["Anonymity/privacy", "Social", "Identity", "Reputation"],
    builtWith: ["semaphore", "lens protocol"],
  },
}
