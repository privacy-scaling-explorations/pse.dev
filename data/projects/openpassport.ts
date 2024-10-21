import { ProjectContent, ProjectInterface, ProjectStatus } from "@/lib/types"

const content: ProjectContent = {
  en: {
    tldr: "OpenPassport lets you check a passport is valid in zero-knowledge",
    description: `OpenPassport is developing tools to let users generate proofs of humanity, nationality and age using their government-issued passport. It unlocks uses cases in proof of unique identity, sybil resistance and selective disclosure of private data.`,
  },
}

export const OpenPassport: ProjectInterface = {
  id: "openpassport",
  section: "grant",
  projectStatus: ProjectStatus.ACTIVE,
  content,
  image: "openpassport.jpg",
  name: "OpenPassport",
  links: {
    github: "https://github.com/zk-passport/openpassport",
    website: "https://openpassport.app",
    twitter: "https://x.com/openpassportapp",
    telegram: "https://t.me/openpassport",
  },
  tags: {
    keywords: [
      "Passports",
      "Identity",
      "Anonymity/privacy",
      "Signatures",
      "Social",
    ],
    builtWith: ["circom", "snarkjs"],
  },
}
