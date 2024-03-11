import { ProjectInterface } from "@/lib/types"

const description = `
NFC activations at SBC and FtC residency
`

export const nfctap: ProjectInterface = {
  id: "nfctap",
  section: "pse",
  projectStatus: "active",
  image: "",
  name: "nfctap.xyz",
  tldr: "This project was built to activate NFCs at SBC and FtC and learn from it for a larger Devconnect experience with 200 cards and 5,000 attendees.",
  description,
  links: {
    github: "https://github.com/jubmoji/nfctap.xyz",
    website: "https://www.nfctap.xyz/",
  },
  tags: {
    keywords: [
      "anonymity/privacy",
      "education",
      "data portability",
      "social",
      "wallets",
      "identity",
      "key management",
      "reputation",
      "toolkits",
    ],
    builtWith: ["snarkjs", "circom", "node"],
    themes: ["build", "play"],
  },
}
