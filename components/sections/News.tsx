"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import PSELearnIcon from "@/public/icons/pseicon1.svg"
import PSEEventIcon from "@/public/icons/pseicon2.svg"
import PSEPostIcon from "@/public/icons/pseicon3.svg"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

import { NewsInterface, AnnounceInterface } from "@/lib/types"

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

const NewsPlaceholder = () => {
  return (
    <div className="bg-white">
      <div
          className="group block h-fit w-full cursor-pointer gap-3 border-b border-t-0 border-slate-950/70 px-6 py-6 transition-all first:border-t xl:px-20"
        >
          <div className="h-full w-full items-center justify-between lg:flex">
            <div className="flex lg:flex lg:gap-12 xl:gap-56">
              <div className="flex w-48 items-center gap-2">
                <div className="bg-slate-200 animate-pulse h-6 w-6"></div>
                <span className="bg-slate-200 animate-pulse h-6 w-40"></span>
              </div>
              <span className="bg-slate-200 animate-pulse h-6 w-96"></span>
            </div>
          </div>
        </div>
    </div>
  )
}

const News = () => {
  const [newsItems, setNewsItems] = useState<NewsInterface[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getAnnounces = async () => {
      setLoading(true)
      await fetch("/api/news")
        .then((res) => res.json())
        .then(({announcements }: { announcements: AnnounceInterface[] }) => {
          setNewsItems(announcements?.map((announce) => {
            return {
              title: announce.description,
              type: announce.type,
              action: {
                label: announce.short,
                url: announce.url,
              },
            }
          }) ?? [])
        })
      setLoading(false)
    }

    getAnnounces()
  }, [])

  if (loading) {
    return (
      <>
        <NewsPlaceholder />
        <NewsPlaceholder />
      </>
    )
  }

  return (
    <ul className="bg-white">
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
                    src={newsType?.["icon"] || PSEPostIcon}
                    alt=""
                    className="h-4 object-fill"
                  />
                  <p className="text-sm font-semibold uppercase tracking-widest text-orange">
                    {newsType?.["type"] ?? 'News'}
                  </p>
                </div>
                <p className="p-1 lg:hidden"></p>
                <p className="border-b-2 border-b-transparent text-slate-950 transition duration-150 ease-out group-hover:border-b-orange lg:text-lg">
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
