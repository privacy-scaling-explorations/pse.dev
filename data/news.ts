import { NewsInterface } from "@/lib/types"

export const newsItems: NewsInterface[] = [
  {
    type: "learn",
    title: "Diving into Plonk accumulation via aPlonk by Ralph Toledo",
    action: {
      label: "Watch",
      url: "https://www.youtube.com/live/hRXgf6T2yb8",
    },
  },
  {
    type: "learn",
    title: "Folding Circom Circuit: A ZKML Case Study by Dr. Cathie So",
    action: {
      label: "Watch",
      url: "https://www.youtube.com/live/jb6HDEtY4CI",
    },
  },
  {
    type: "event",
    title: "PSE@ETHGlobal Paris",
    action: {
      label: "Attend",
      url: "https://ethglobal.com/events/paris2023",
    },
  },
  {
    type: "post",
    title: " zkEVM Community Edition Part 3: Logic and Structure",
    action: {
      label: "Read",
      url: "https://mirror.xyz/privacy-scaling-explorations.eth/shl8eMBiObd6_AUBikXZrjKD4fibI6xUZd7d9Yv5ezE",
    },
  },
]
