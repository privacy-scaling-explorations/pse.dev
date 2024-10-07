import { ProjectInterface, ProjectStatus } from "@/lib/types"

export const channel4: ProjectInterface = {
  id: "channel-4",
  section: "pse",
  projectStatus: ProjectStatus.INACTIVE,
  image: "channel4.svg",
  name: "Channel 4",
  links: {
    github: "https://github.com/State-Channel-4",
    website: "https://channel4.wtf/",
    discord: "https://discord.gg/76UrYgVyEx",
  },
  tags: {
    keywords: ["Scaling"],
    themes: ["play"],
    types: ["Application"],
    builtWith: ["state channel", "smart contract"],
  },
}
