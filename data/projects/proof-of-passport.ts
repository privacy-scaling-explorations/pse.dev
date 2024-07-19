import { ProjectInterface } from "@/lib/types"

const description = `
Proof of passport is developing tools to let users generate proofs of humanity, nationality and age using their government-issued passport. It unlocks uses cases in proof of unique identity, sybil resistance and selective disclosure of private data.
`

export const proofOfPassport: ProjectInterface = {
  id: "proof-of-passport",
  section: "grant",
  projectStatus: "active",
  image: "proof-of-passport.jpg",
  name: "Proof of Passport",
  tldr: "Proof of passport lets you check a passport is valid in zero-knowledge",
  description,
  links: {
    github: "https://github.com/zk-passport/proof-of-passport",
    website: "https://proofofpassport.com",
    twitter: "https://x.com/proofofpassport",
    telegram: "https://t.me/proofofpassport",
  },
  tags: {
    keywords: [
      "Passports",
      "Identity",
      "Anonymity/privacy,",
      "Signatures",
      "Social",
    ],
    builtWith: ["circom", "snarkjs"],
  },
}
