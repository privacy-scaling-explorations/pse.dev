import { ProjectInterface } from "@/lib/types"

export const zkp2p: ProjectInterface = {
  id: "zkp2p",
  section: "grant",
  projectStatus: "active",
  image: "zkp2p.webp",
  name: "ZKP2P",
  links: {
    github: "https://github.com/zkp2p",
    website: "https://zkp2p.xyz/",
    twitter: "https://twitter.com/zkp2p",
  },
  tags: {
    keywords: ["Private communications"],
    themes: ["play"],
    types: ["Proof of concept", "Application"],
    builtWith: ["circom", "halo2"],
  },
}
