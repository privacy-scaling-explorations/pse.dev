import { ProjectContent, ProjectInterface, ProjectStatus } from "@/lib/types"

const content: ProjectContent = {
  en: {
    tldr: "This project was built to activate NFCs at SBC and FtC and learn from it for a larger Devconnect experience with 200 cards and 5,000 attendees.",
    description: `
NFC activations at SBC and FtC residency
`,
  },
}

export const nfctap: ProjectInterface = {
  id: "nfctap",
  projectStatus: ProjectStatus.ACTIVE,
  content,
  image: "",
  name: "nfctap.xyz",
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
