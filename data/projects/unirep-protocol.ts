import { ProjectInterface } from "@/lib/types"

export const unirepProtocol: ProjectInterface = {
  id: "unirep-protocol",
  section: "pse",
  projectStatus: "inactive",
  image: "unirep.svg",
  license: "MIT",
  previousBrandImage: "unirep-previousBrand.png",
  name: "UniRep Protocol",
  links: {
    github: "https://github.com/Unirep",
    website: "https://developer.unirep.io/docs/welcome",
    twitter: "https://twitter.com/UniRep_Protocol",
    discord: "https://discord.gg/VzMMDJmYc5",
  },
  tags: {
    keywords: ["Anonymity/privacy", "Social", "Identity", "Reputation"],
    themes: ["build", "play"],
    types: ["Legos/dev tools, Protocol"],
    builtWith: ["semaphore", "circom"],
  },
  extraLinks: {
    buildWith: [
      {
        label: "Getting Started with create-unirep-app",
        url: "https://developer.unirep.io/docs/next/getting-started/create-unirep-app",
      },
    ],
    play: [
      {
        label: "Try it out: UniRep.social (Staging)",
        url: "https://social-staging.unirep.workers.dev",
      },
      {
        label: "Try it out: Trustlist (coming soon) ",
        url: "https://trustlist.pse.dev",
      },
    ],
  },
}
