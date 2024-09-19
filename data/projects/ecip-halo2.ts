import { ProjectInterface } from "@/lib/types"

export const ECIPHalo2: ProjectInterface = {
  id: "ecip-halo2",
  section: "pse",
  image: "",
  imageAlt: "ECIP + Halo 2",
  name: "ECIP (Elliptic Curve Inner Products) Halo 2 Implementation",
  projectStatus: "active",
  links: {
    github: "https://github.com/levs57/sage-circuits/",
    website: "https://perpetualpowersoftau.com/",
  },
  extraLinks: {
    learn: [
      {
        label: "Designing a plonk circuit for Liam Eagen's protocol",
        url: "https://hackmd.io/@levs57/r1n77YvP3",
      },
      {
        label:
          "ZKPs of Elliptic Curve Inner Products from Principal Divisors and Weil Reciprocity",
        url: "https://eprint.iacr.org/2022/596",
      },
    ],
  },
}
