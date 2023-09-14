import { ProjectInterface } from "@/lib/types"

const description = `
TLSNotary is useful for developers of privacy focused projects that need data provenance from secure web servers. It leverages the widely-used Transport Layer Security (TLS) protocol to securely and privately prove a transcript of communications took place with a webserver. The protocol involves splitting TLS session keys between two parties: the User and the Notary. Neither the User nor Notary are in possession of the full TLS session keys, they only hold a share of those keys. This ensures the security assumptions of TLS while enabling the User to prove the authenticity of the communication to the Notary. The Notary remains unaware of which webserver is being queried, and the Notary never has access to the unencrypted communications. All of this is achieved while maintaining full privacy.
`

export const tlsn: ProjectInterface = {
  id: "tlsn",
  projectStatus: "active",
  image: "tlsn.webp",
  name: "TLSNotary",
  tldr: "A protocol for creating cryptographic proofs of authenticity for any data on the web.",
  description,
  links: {
    github: "https://github.com/tlsnotary/tlsn",
    website: "https://tlsnotary.org/",
    discord: "https://discord.gg/9XwESXtcN7",
  },
  tags: {
    themes: ["build"],
    types: [],
    builtWith: [],
    keywords: [],
  },
}
