import { ProjectContent, ProjectInterface, ProjectStatus } from "@/lib/types"

const content: ProjectContent = {
  en: {
    tldr: "Smart contract wallet enabling transactions through familiar flows like touchID, faceID, WebAuth, and Passkeys.",
    description: `P256 is an ERC-4337 smart contract wallet that leverages zk-SNARKs for WebAuthn and P-256 signature verification. It aims to simplify Ethereum transactions by incorporating familiar authentication methods like touchID and faceID. The project addresses the challenges of seed phrase management and leverages the biometric capabilities of billions of cellphones to create a more user-friendly crypto experience. Technically, it is an end-to-end ERC-4337 smart contract wallet that verifies ZK proofs of Passkey signatures using the Halo2 proving system.`,
  },
}

export const p256: ProjectInterface = {
  id: "p256",
  projectStatus: ProjectStatus.ACTIVE,
  content,
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
