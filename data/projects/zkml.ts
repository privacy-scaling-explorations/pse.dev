import { ProjectInterface } from "@/lib/types"

const description = `
ZKML is a solution that combines the power of zero-knowledge proofs (ZKPs) and machine learning to address the privacy concerns in traditional machine learning. It provides a platform for machine learning developers to convert their TensorFlow Keras models into ZK-compatible versions, ensuring model privacy, data privacy, and transparent verification. ZKML can be used to verify if a specific machine learning model was used to generate a particular piece of content, without revealing the input or the model used. It has potential use cases in on-chain biometric authentication, private data marketplace, proprietary ML model sharing, and AIGC NFTs.
`

export const zkml: ProjectInterface = {
  id: "zkml",
  section: "pse",
  projectStatus: "active",
  image: "zkml.png",
  name: "ZKML",
  tldr: "ZKML (Zero-Knowledge Machine Learning) leverages zero-knowledge proofs for privacy-preserving machine learning, enabling model and data privacy with transparent verification.",
  description,
  links: {
    github: "https://github.com/socathie/circomlib-ml",
  },
  tags: {
    keywords: ["Anonymity/privacy", "Scaling"],
    themes: ["research"],
    types: ["Proof of concept", "Infrastructure/protocol"],
    builtWith: ["circom", "halo2", "nova"],
  },
}
