import { ProjectInterface } from "@/lib/types"

const description = `
Pollen Labs is driven by a mission to make a significant impact on global lives by addressing complex, pressing issues. They work alongside their community to break barriers, preserve privacy, and build a future where every voice is heard, and a free web is accessible to all. Their projects, like Channel 4, a content discovery engine, and Daisy, focusing on information transparency, embody this mission., enabling community members to earn while they engage.
`

export const pollenLabs: ProjectInterface = {
  id: "pollen-labs",
  projectStatus: "active",
  image: "pollen-labs.svg",
  name: "Pollen Labs",
  tldr: "Champions of freedom of speech and expression through decentralized innovation.",
  description,
  links: {
    website: "https://pollenlabs.org/",
    twitter: "https://twitter.com/PollenLabs_",
  },
  tags: {
    keywords: ["Anonymity/privacy", "Scaling"],
    themes: ["play"],
    types: ["Application"],
    builtWith: [],
  },
}
