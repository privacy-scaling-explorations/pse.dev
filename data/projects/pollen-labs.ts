import { ProjectInterface, ProjectStatus } from "@/lib/types"

export const pollenLabs: ProjectInterface = {
  id: "pollen-labs",
  section: "collaboration",
  projectStatus: ProjectStatus.INACTIVE,
  image: "pollen-labs.svg",
  name: "Pollen Labs",
  links: {
    website: "https://pollenlabs.org/",
    twitter: "https://twitter.com/PollenLabs_",
    discord: "https://discord.gg/5B3jP2sgWS",
  },
  tags: {
    keywords: ["Anonymity/privacy", "Scaling", "Public good"],
    themes: ["play"],
    types: ["Application"],
    builtWith: [],
  },
}
