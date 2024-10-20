import { ProjectContent, ProjectInterface, ProjectStatus } from "@/lib/types"

const content: ProjectContent = {
  en: {
    tldr: "A protocol for creating cryptographic proofs of authenticity for any data on the web.",
    description: `TLSNotary is ideal for developers of privacy-focused projects that require **data provenance** from secure web servers. It leverages the widely-used **Transport Layer Security (TLS)** protocol to securely and privately prove that a transcript of communications with a web server took place. The protocol divides TLS session keys between two parties: the Prover and the Verifier, using **Multi-Party Computation (MPC)**.  Neither the User nor Notary are in possession of the full TLS session keys, they only hold a share of those keys. This retains the security assumptions of TLS while allowing the Prover to demonstrate the **authenticity of the communication** to the Verifier. The Verifier remains unaware of which webserver is being queried, and the Verifier never has access to the unencrypted communications, except for the data the Prover explicitly wants to disclose.

**TLSNotary can help your project with secure and privacy-preserving data portability!**`,
  },
}

export const tlsn: ProjectInterface = {
  id: "tlsn",
  section: "pse",
  projectStatus: ProjectStatus.ACTIVE,
  content,
  image: "tlsn.webp",
  name: "TLSNotary",
  links: {
    github: "https://github.com/tlsnotary",
    website: "https://tlsnotary.org/",
    discord: "https://discord.gg/9XwESXtcN7",
    twitter: "https://x.com/tlsnotary",
  },
  tags: {
    themes: ["build", "play"],
    types: [
      "Legos/dev tools",
      "Infrastructure/protocol",
      "Plugin",
      "Application",
    ],
    builtWith: ["rust"],
    keywords: [
      "Anonymity/privacy",
      "Identity",
      "Reputation",
      "Data portability",
    ],
  },
  extraLinks: {
    play: [
      {
        label: "Getting started",
        url: "https://docs.tlsnotary.org/quick_start/index.html",
      },
    ],
    learn: [
      {
        label: "Documentation",
        url: "https://docs.tlsnotary.org",
      },
    ],
  },
}
