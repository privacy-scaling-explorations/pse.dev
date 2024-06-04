import { ProjectInterface } from "@/lib/types"

const description = `
ZK Email is a library that allows for anonymous verification of email signatures while masking specific data. It enables verification of emails to/from specific domains or subsets of domains, as well as verification based on specific text in the email body. This technology can be used for web2 interoperability, decentralized anonymous KYC, or to create interesting on-chain anonymity sets.
`

export const zkemail: ProjectInterface = {
  id: "zk-email",
  section: "grant",
  projectStatus: "active",
  image: "zk-email.jpeg",
  name: "zk-email",
  tldr: "ZK Email is a library that allows for anonymous verification of email signatures while masking specific data.",
  description,
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
