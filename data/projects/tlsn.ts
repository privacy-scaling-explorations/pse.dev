import { ProjectInterface } from "@/lib/types"

export const tlsn: ProjectInterface = {
  id: "tlsn",
  section: "pse",
  projectStatus: "active",
  image: "tlsn.webp",
  name: "TLSNotary",
  links: {
    github: "https://github.com/tlsnotary/tlsn",
    website: "https://tlsnotary.org/",
    discord: "https://discord.gg/9XwESXtcN7",
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
}
