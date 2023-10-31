import { ProjectInterface } from "@/lib/types"

const description = `
p0tion is an agnostic-from-ceremony public good toolkit, with the aim of making Groth16 zk-applications scale and become production-ready in a safe and secure manner by running Phase 2 Trusted Setup ceremonies.
`

export const p0tion: ProjectInterface = {
  id: "p0tion",
  projectStatus: "active",
  image: "",
  name: "p0tion",
  tldr: "Toolkit for Groth16 Phase 2 Trusted Setup ceremonies.",
  description,
  links: {
    website: "https://ceremony.pse.dev/",
    github: "https://github.com/privacy-scaling-explorations/p0tion",
  },
  tags: {
    keywords: [
      "Toolkits",
      "Infrastructure/protocol"
    ],
    themes: ["build"],
    types: ["Legos/dev tools"],
    builtWith: [],
  },
}
