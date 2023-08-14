import { ProjectInterface } from "@/lib/types"

const description = `
AnonKlub is a tool designed for Ethereum developers that allows for anonymous proof of Ethereum address ownership. It doesn't directly address the public observability of Ethereum transactions but provides a workaround for privacy. Users can prepare a list of Ethereum addresses, sign a message from an address they own, and use that signature to generate a zero-knowledge proof. This proof enables users to perform actions anonymously that would typically require ownership of an address from the initial list. Use cases include anonymous NFT minting and Discord verification for DAOs without disclosing the public address.
`

export const anonKlub: ProjectInterface = {
  id: "anon-klub",
  projectStatus: "active",
  image: "anonklub.svg",
  name: "AnonKlub",
  tldr: "A mechanism for anonymous proof of Ethereum address ownership.",
  description,
  links: {
    github: "https://github.com/anonklub",
    website: "https://anonklub.github.io",
  },
  tags: {
    themes: [
      "Transaction privacy",
      "Anonymity/privacy",
      "Social",
      "Identity",
      "Voting/governance",
    ],
    type: ["Infrastructure/protocol", "Prototype", "Proof of concept"],
    builtWith: ["Circom", "snarkjs", "halo2"],
  },
}
