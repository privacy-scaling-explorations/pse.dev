import { ProjectInterface } from "@/lib/types"

const description = `
The Trusted Setups project is dedicated to simplifying the process of trusted setups, which are crucial for privacy or scaling solutions. Trusted setups involve multiple participants contributing to the generation of secrets. As long as one participant forgets their part of the secret, the final solution remains secure. The team recognizes the complexity of developing contribution programs and coordinating the participants' queue in a trusted setup. To address this, they are developing tools, including scripts, WebApps, and APIs, to streamline the contribution and coordination effort. This allows developers to focus on building their circuits and applications, enhancing efficiency and productivity in the development of zero-knowledge applications.
`
export const trustedSetups: ProjectInterface = {
  id: "trusted-setups",
  projectStatus: "active",
  image: "trusted-setups.svg",
  name: "Trusted Setups",
  tldr: "Aiding developers with tools for trusted setups.",
  description,
  links: {
    github: "https://github.com/zkparty",
  },
  tags: {
    themes: ["play"],
    type: ["Legos/dev tools", "Lego sets/toolkits"],
    builtWith: [],
    keywords: ["Scaling", "Education"],
  },
}
