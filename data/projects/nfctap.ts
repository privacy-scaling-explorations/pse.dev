import { ProjectInterface } from "@/lib/types"

export const nfctap: ProjectInterface = {
  id: "nfctap",
  section: "pse",
  projectStatus: "active",
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
