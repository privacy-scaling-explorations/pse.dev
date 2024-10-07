import { ProjectInterface, ProjectStatus } from "@/lib/types"

export const OpenPassport: ProjectInterface = {
  id: "openpassport",
  section: "grant",
  projectStatus: ProjectStatus.ACTIVE,
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
      "Anonymity/privacy,",
      "Signatures",
      "Social",
    ],
    builtWith: ["circom", "snarkjs"],
  },
}
