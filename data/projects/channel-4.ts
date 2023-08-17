import { ProjectInterface } from "@/lib/types"

const description = `
Channel 4 is a community-driven platform where users can submit and discover content. It uses state channels to incentivize user engagement. When a user likes the content you've submitted, a state channel closes and rewards are dropped into their wallet. This approach combines entertainment with the power of state channels, enabling community members to earn while they engage.
`

export const channel4: ProjectInterface = {
  id: "channel-4",
  projectStatus: "active",
  image: "channel4.svg",
  name: "Channel 4",
  tldr: "Content discovery through community contributions, using state channels to reward users for popular posts.",
  description,
  links: {
    github: "https://github.com/State-Channel-4",
    website: "https://channel4.wtf/",
    discord: "https://discord.gg/76UrYgVyEx",
  },
  tags: {
    keywords: ["Scaling"],
    themes: ["play"],
    type: ["Application"],
    builtWith: ["state channel", "smart contract"],
  },
}
