"use client"

import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { ArrowUpRight } from "lucide-react"
import ResourcesContent from "../content/resources.md"

interface ResourceItemProps {
  label: string
  icon?:
  | "globe"
  | "discord"
  | "twitter"
  | "gitHub"
  | "notion"
  | "figma"
  | "drive"
  description: string
  url: string
}

interface ResourceCardProps {
  id?: string
  title: string
  children?: React.ReactNode
}

const ResourceItem = ({
  label,
  icon = "globe",
  description,
  url,
}: ResourceItemProps) => {
  const Icon = Icons?.[icon as keyof typeof Icons] ?? Icons.globe

  return (
    <Link
      href={url}
      target="_blank"
      rel="noreferrer noopener"
      className="group border-b-2 border-anakiwa-300 pb-3 duration-500 hover:border-orange group-hover:transition"
    >
      <div className="flex justify-between">
        <div className="flex space-x-3">
          <div className="h-6 w-6 text-anakiwa-500 opacity-50 transition group-hover:text-tuatara-950 group-hover:opacity-100">
            <Icon />
          </div>
          <span className="text-lg font-medium">
            {label}
          </span>
        </div>
        <ArrowUpRight size={24} className="text-tuatara-950 opacity-0 transition duration-500 group-hover:opacity-100" />
      </div>
      <div className="p-[2px]"></div>
      <p className="text-sm text-tuatara-500">
        {description}
      </p>
    </Link>
  )
}

const ResourceCard = ({ id, title, children }: ResourceCardProps) => {
  return (
    <div
      id={id}
      data-section={id}
      className="flex flex-col gap-4 rounded-lg p-6 backdrop-blur-md"
      style={{
        background: "rgba(255, 255, 255, 0.33",
      }}
    >
      <h3 className="py-4 font-display text-xl font-bold text-tuatara-700 md:text-2xl">
        {title}
      </h3>
      <div className="mb-4 grid gap-6">{children}</div>
    </div>
  )
}

const ResourceNav = () => {
  const SCROLL_OFFSET = 80
  const [activeId, setActiveId] = useState("")
  const [isManualScroll, setIsManualScroll] = useState(false)
  const ID_LABELS_MAPPING: Record<string, string> = {
    "get-involved": "Get involved",
    learn: "Learn",
    build: "Build",
    design: "Design",
  }
  const sectionsRef = useRef<NodeListOf<HTMLElement> | null>(null) // sections are constant so useRef might be better here

  useEffect(() => {
    if (sectionsRef.current === null) sectionsRef.current = document.querySelectorAll(`div[data-section]`)
    if (!activeId) setActiveId('get-involved')

    const handleScroll = () => {
      if (isManualScroll) return;

      sectionsRef.current?.forEach((section: any) => {
        const sectionTop = section.offsetTop - SCROLL_OFFSET
        if (window.scrollY >= sectionTop && window.scrollY > 0) {
          setActiveId(section.getAttribute("id"))
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [activeId, isManualScroll])

  const scrollToId = useCallback((id: string) => {
    const element = document.getElementById(id)
    const top = element?.offsetTop ?? 0

    if (element) {
      setActiveId(id) // active clicked id
      setIsManualScroll(true) // tell the window event listener to ignore this scrolling
      window?.scrollTo({
        behavior: "smooth",
        top: (top ?? 0) - SCROLL_OFFSET,
      })
    }

    setTimeout(() => setIsManualScroll(false), 800)
  }, [])

  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="flex flex-col gap-4">
        <h6 className="font-display text-lg font-bold text-tuatara-700">
          On this page
        </h6>
        <ul className="text-normal font-sans text-black">
          {Object.entries(ID_LABELS_MAPPING).map(([id, label]) => {
            const active = id === activeId
            return (
              <li
                key={id}
                onClick={(e) => {
                  //e?.preventDefault()
                  scrollToId(id)
                }}
                data-id={id}
                className={cn(
                  "flex h-8 cursor-pointer items-center border-l-2 border-l-anakiwa-200 px-3 duration-200",
                  {
                    "border-l-anakiwa-500 text-anakiwa-500 font-medium": active,
                  }
                )}
              >
                {label}
              </li>
            )
          })}
        </ul>
      </div>
      <Link href={"https://github.com/privacy-scaling-explorations/website-v2/blob/main/app/content/resources.md?plain=1"} target="_blank">
        <Button size="lg" icon={Icons.gitHub}>
          <span className="pl-2 text-left text-sm font-medium">Edit resources</span>
        </Button>
      </Link>
    </div>
  )
}

export default function ResourcePage() {
  return (
    <main className="bg-second-gradient">
      <div className="container grid grid-cols-1 grid-rows-[auto_1fr] gap-6 px-4 py-10 md:grid-cols-[3fr_1fr] md:pb-20 lg:grid-cols-[1fr_3fr_1fr]">
        <section className="hidden lg:block"></section>
        <section className=" flex flex-col gap-8 lg:col-start-2">
          <h1 className="break-words font-display text-4xl font-bold text-tuatara-950 md:text-5xl">
            Resources
          </h1>
          <p className="font-sans text-base font-normal leading-[27px] text-tuatara-950">
            This list was compiled by our community. Submit an issue on our
            Github page to add a resource to this list.
          </p>
        </section>
        <article className="row-start-2 flex flex-col space-y-8 lg:col-start-2">
          <ResourcesContent
            components={{
              ResourceItem: (props: ResourceItemProps) => (
                <ResourceItem {...props} />
              ),
              ResourceCard: (props: ResourceCardProps) => (
                <ResourceCard {...props} />
              ),
            }}
          />
        </article>
        <section className="relative col-start-2 row-start-2 hidden md:block lg:col-start-3">
          <div className="sticky right-0 top-16 ml-auto">
            <ResourceNav />
          </div>
        </section>
      </div>
    </main>
  )
}
