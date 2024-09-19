import { ProjectInterface } from "@/lib/types"

export const tlsn: ProjectInterface = {
  id: "tlsn",
  section: "pse",
  projectStatus: "active",
  image: "tlsn.webp",
  name: "TLSNotary",
  links: {
    github: "https://github.com/tlsnotary",
    website: "https://tlsnotary.org/",
    discord: "https://discord.gg/9XwESXtcN7",
    twitter: "https://x.com/tlsnotary",
  },
  tags: {
    themes: ["build", "play"],
    types: [
      "Legos/dev tools",
      "Infrastructure/protocol",
      "Plugin",
      "Application",
    ],
    builtWith: ["rust"],
    keywords: [
      "Anonymity/privacy",
      "Identity",
      "Reputation",
      "Data portability",
    ],
  },
  extraLinks: {
    play: [
      {
        label: "Getting started",
        url: "https://docs.tlsnotary.org/quick_start/index.html",
      },
    ],
    learn: [
      {
        label: "Documentation",
        url: "https://docs.tlsnotary.org",
      },
    ],
  },
}
