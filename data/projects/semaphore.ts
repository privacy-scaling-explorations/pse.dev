import { ProjectInterface, ProjectStatus } from "@/lib/types"

export const semaphore: ProjectInterface = {
  id: "semaphore",
  section: "pse",
  projectStatus: ProjectStatus.ACTIVE,
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
