import { ProjectInterface } from "@/lib/types"

export const PerpetualPowersOfTau: ProjectInterface = {
  id: "perpetual-powers-of-tau",
  section: "pse",
  image: "powers-of-tau.png",
  name: "Perpetual Powers of Tau",
  projectStatus: "active",
  tags: {
    keywords: ["scaling"],
  },
  links: {
    github:
      "https://github.com/privacy-scaling-explorations/perpetualpowersoftau",
    website: "https://perpetualpowersoftau.com/",
  },
  extraLinks: {
    learn: [
      {
        label: "Announcing the Perpetual Powers of Tau Ceremony",
        url: "https://medium.com/coinmonks/announcing-the-perpetual-powers-of-tau-ceremony-to-benefit-all-zk-snark-projects-c3da86af8377",
      },
    ],
  },
}
