import { ProjectInterface, ProjectStatus } from "@/lib/types"

export const Coco: ProjectInterface = {
  id: "coco",
  section: "pse",
  image: "coco.svg",
  name: "COCO",
  projectStatus: ProjectStatus.INACTIVE,
  tags: {
    keywords: ["prediction market", "scaling"],
  },
  extraLinks: {
    learn: [
      {
        label: "Meet COCO!",
        url: "https://mirror.xyz/privacy-scaling-explorations.eth/tEf7iYa8l7ECZwN2T57yyiws7h9Uchip30CQvx-JBBQ",
      },
    ],
    buildWith: [
      {
        label: "Smart contracts",
        url: "https://github.com/Janmajayamall/coco-contracts",
      },
      {
        label: "Frontend",
        url: "https://github.com/Janmajayamall/coco-frontend",
      },
      {
        label: "Frontend (General)",
        url: "https://github.com/Janmajayamall/coco-frontend-general",
      },
    ],
  },
}
