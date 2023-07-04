"use client"

import Image from "next/image"
import { newsItems } from "@/data/news"
import PSELearnIcon from "@/public/icons/pseicon1.svg"
import PSEEventIcon from "@/public/icons/pseicon2.svg"
import PSEPostIcon from "@/public/icons/pseicon3.svg"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

import { NewsInterface } from "@/lib/types"

const newsTypes = {
  learn: {
    type: "Learn & Share",
    icon: PSELearnIcon,
    defaultActionLabel: "Watch",
  },
  event: {
    type: "Event",
    icon: PSEEventIcon,
    defaultActionLabel: "Attend",
  },
  post: {
    type: "Blog Post",
    icon: PSEPostIcon,
    defaultActionLabel: "Read",
  },
}

type NewsType = typeof newsTypes

const showMove = {
  initial: { opacity: 0, y: 10 },
  hover: { opacity: 1, y: 0, transition: { duration: 0.2 } },
}

const News = () => {
  return (
    <ul className="bg-white">
      <h4 className="bg-slate-500 px-6 py-2 text-lg font-bold uppercase tracking-wide text-slate-50 backdrop-blur-sm lg:px-20">
        what&apos;s happening
      </h4>
      {newsItems.map((item: NewsInterface, index) => {
        const newsType = newsTypes[item.type as keyof NewsType]
        return (
          <motion.a
            href={item.action.url}
            target="_blank"
            rel="noopener noreferrer"
            key={index}
            className="group block h-fit w-full cursor-pointer gap-3 border-b border-t-0 border-slate-950/70 px-6 py-4 transition-all first:border-t xl:px-20"
            whileHover={"hover"}
            initial={"initial"}
            animate={"animate"}
          >
            <li className="h-full w-full items-center justify-between lg:flex">
              <div className="lg:flex lg:gap-12 xl:gap-56">
                <div className="flex w-48 items-center gap-2">
                  <Image
                    src={newsType["icon"]}
                    alt="pseicon1"
                    className="h-4 object-fill"
                  />
                  <p className="text-sm font-semibold uppercase tracking-widest text-orange">
                    {newsType["type"]}
                  </p>
                </div>
                <p className="p-1 lg:hidden"></p>
                <p className="border-b-2 border-b-transparent text-slate-950 group-hover:border-b-orange lg:text-lg">
                  {item.title}
                </p>
              </div>
              <motion.p variants={showMove} className="hidden gap-1 lg:flex">
                <span className="text-sm font-semibold uppercase tracking-wide text-orange">
                  {item.action.label || newsType["defaultActionLabel"]}
                </span>
                <ArrowUpRight size={18} className="opacity-50" />
              </motion.p>
            </li>
          </motion.a>
        )
      })}
    </ul>
  )
}

export default News
