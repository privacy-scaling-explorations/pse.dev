import { ProjectInterface } from "@/lib/types"

const description = `
Pollen Labs is driven by a mission to make a significant impact on global lives by addressing complex, pressing issues. We work alongside the community to break barriers, preserve privacy, and build a future where every voice is heard, and a free web is accessible to all. Our projects, like Channel 4, a content discovery engine, and Daisy, focusing on information transparency, embody this mission., enabling community members to earn while they engage.

We are a small team with a diverse skillset including design, engineering, community growth, and operations. We serve as a product accelerator, facilitating solutions to real-world problems with advanced blockchain technology. Our core value as follow:

`

export const pollenLabs: ProjectInterface = {
  id: "pollen-labs",
  section: "collaboration",
  projectStatus: "inactive",
  image: "pollen-labs.svg",
  name: "Pollen Labs",
  tldr: "Building a better world through open-source & blockchain technology.",
  description,
  links: {
    website: "https://pollenlabs.org/",
    twitter: "https://twitter.com/PollenLabs_",
    discord: "https://discord.gg/5B3jP2sgWS" ,
  },
  tags: {
    keywords: ["Anonymity/privacy", "Scaling", "Public good"],
    themes: ["play"],
    types: ["Application"],
    builtWith: [],
  },
}
