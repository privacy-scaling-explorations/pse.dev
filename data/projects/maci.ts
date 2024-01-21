import { ProjectInterface } from "@/lib/types"

const description = `
Minimal Anti-Collusion Infrastructure (MACI) is a protocol designed to provide a highly secure e-voting solution. It enables organizations to conduct on-chain voting processes with a significantly reduced risk of cheating, such as bribery or collusion. MACI uses zero-knowledge proofs to implement a receipt-free voting scheme, making it impossible for anyone other than the vote coordinator to verify how a specific user voted. This ensures the correct execution of votes and allows anyone to verify the results. It's particularly beneficial for governance and funding events, where its anti-collusion mechanisms help ensure fair and transparent outcomes.
`

export const maci: ProjectInterface = {
  id: "maci",
  projectStatus: "active",
  image: "maci.png",
  name: "MACI",
  tldr: "An on-chain voting solution that protects privacy and minimizes the risk of collusion and bribery",
  description,
  links: {
    github: "https://github.com/privacy-scaling-explorations/maci",
    website: "https://maci.pse.dev",
    twitter: "https://twitter.com/zkmaci",
  },
  tags: {
    keywords: ["Anonymity/privacy", "Voting/governance"],
    themes: ["build"],
    types: ["Lego sets/toolkits", "Infrastructure/protocol"],
    builtWith: ["p0tion", "JubjubLib"],
  },
}
