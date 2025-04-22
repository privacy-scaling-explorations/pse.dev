import {
  ProjectCategory,
  ProjectContent,
  ProjectInterface,
  ProjectStatus,
} from "@/lib/types"

const content: ProjectContent = {
  en: {
    tldr: "zkID advances privacy-preserving digital identity by drafting standards, open-source infrastructure, and prototypes using ZKPs.",
    description: `zkID is a strategic initiative of the Ethereum Foundation, in collaboration with Privacy and Scaling Explorations (PSE), focused on advancing the use of Zero Knowledge Proofs (ZKPs) in digital identity systems. We contribute to PSE by leading research, coordination, education, and development efforts that enable privacy-preserving, interoperable, and standards-aligned identity infrastructure.

Our team works and distributes grants across the identity ecosystem to draft technical standards, maintain open-source resources, and prototype infrastructure that aligns with evolving regulatory frameworks. By stewarding collaboration between researchers, developers, governments, and institutions, zkID bridges foundational cryptographic research with real-world deployment and impact.`,
  },
}

export const zkID: ProjectInterface = {
  id: "zk-id",
  projectStatus: ProjectStatus.ACTIVE,
  category: ProjectCategory.DEVTOOLS,
  section: "pse",
  content,
  image: "",
  imageAlt: "ZK Identity",
  name: "zkID",
  links: {
    github: "https://github.com/zkspecs/zkspecs",
  },
  tags: {
    keywords: [
      "Identity",
      "Credentials",
      "Standards",
      "SSI",
      "Verifiable Credentials",
    ],
    themes: ["research"],
    types: ["Legos/dev tools", "Lego sets/toolkits"],
  },
}
