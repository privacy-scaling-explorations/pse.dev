import { ProjectInterface } from "@/lib/types"

export const zkemail: ProjectInterface = {
  id: "zk-email",
  section: "collaboration",
  projectStatus: "active",
  image: "zk-email.jpeg",
  name: "zk-email",
  links: {
    github: "https://github.com/zkemail",
    twitter: "https://twitter.com/zkemail",
    website: "https://www.prove.email",
  },
  tags: {
    themes: [],
    types: [],
    keywords: ["email", "identity", "anonymity/privacy", "DKIM", "signatures"],
    builtWith: ["circom", "snarkjs", "halo2"],
  },
}
