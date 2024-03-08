import { ProjectInterface } from "@/lib/types"

const description = `
UniRep is a zero-knowledge protocol that securely manages user data through anonymous identifiers, enabling trustless interactions and enhanced user privacy in applications. UniRep expands the notion of reputation to include various user data aspects, such as preferences, activity, alignments, and ownership.

Using anonymous identifiers (epoch keys), the protocol allows for trustless engagement with applications while preserving user privacy. This approach promotes non-custodial applications that don't hold user data, reducing data breach risks and emphasizing security for both users and developers.
`

export const unirepProtocol: ProjectInterface = {
  id: "unirep-protocol",
  section: "pse",
  projectStatus: "active",
  image: "unirep.svg",
  name: "UniRep Protocol",
  tldr: "A Zero-Knowledge Protocol built to handle anonymous user data.",
  description,
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
        url: 'https://developer.unirep.io/docs/next/getting-started/create-unirep-app',
      },
    ],
    play: [
      {
        label: "Try it out: UniRep.social (Staging)",
        url: 'https://social-staging.unirep.workers.dev',
      },
      {
        label: "Try it out: Trustlist (coming soon) ",
        url: 'https://trustlist.pse.dev',
      }
    ],
  },
}
