import { ProjectInterface } from "@/lib/types"

export const p256: ProjectInterface = {
  id: "p256",
  section: "pse",
  projectStatus: "active",
  image: "",
  name: "P256",
  links: {
    website: "https://www.p256wallet.org/",
    github: "https://github.com/privacy-scaling-explorations/p256-circom",
  },
  tags: {
    keywords: [
      "Toolkits",
      "Infrastructure/protocol",
      "User Experience",
      "Key management",
      "Wallets",
      "Account Abstraction",
    ],
    themes: ["build"],
    types: ["Legos/dev tools"],
    builtWith: ["halo2"],
  },
}
