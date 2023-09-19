"use client"

import React, { useEffect } from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

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
  // @ts-ignore
  const Icon = Icons?.[icon as keyof Icons] ?? Icons.globe

  return (
    <div className="flex flex-col gap-2">
      <Link
        href={url}
        target="_blank"
        rel="noreferrer noopener"
        className="flex items-center gap-1 cursor-pointer group"
      >
        <div className="flex items-center gap-2">
          <span className="w-6 text-anakiwa-400">
            <Icon />
          </span>
          <span className="text-lg font-normal border-b-2 border-b-transparent text-tuatara-950 hover:border-b-orange">
            {label}
          </span>
          <Icons.externalUrl />
        </div>
      </Link>
      <span className="font-sans text-base italic font-normal text-tuatara-500">
        {description}
      </span>
    </div>
  )
}

const ResourceCard = ({ id, title, children }: ResourceCardProps) => {
  return (
    <div
      id={id}
      data-section={id}
      className="flex flex-col gap-4 p-4"
      style={{
        background: "rgba(255, 255, 255, 0.30",
      }}
    >
      <h3 className="py-4 text-xl font-bold md:text-2xl font-display text-tuatara-700">
        {title}
      </h3>
      <div className="grid gap-6 mb-4">{children}</div>
    </div>
  )
}

const ResourceNav = () => {
  const SCROLL_OFFSET = 80
  const [activeId, setActiveId] = React.useState("")
  const ID_LABELS_MAPPING: Record<string, string> = {
    "get-involved": "Get involved",
    learn: "Learn",
    build: "Build",
    design: "Design",
  }

  useEffect(() => {
    const sections: any = document.querySelectorAll(`div[data-section]`)

    window.onscroll = () => {
      sections.forEach((section: any) => {
        const sectionTop = section.offsetTop - SCROLL_OFFSET
        if (window.scrollY >= sectionTop && window.scrollY > 0) {
          setActiveId(section.getAttribute("id"))
        }
      })
    }
  }, [])

  const scrollToId = (id: string) => {
    const element = document.getElementById(id)
    const top = element?.offsetTop ?? 0

    if (element) {
      window?.scrollTo({
        behavior: "smooth",
        top: (top ?? 0) - SCROLL_OFFSET,
      })
      setActiveId(id) // active clicked id
    }
  }

  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="flex flex-col gap-4">
        <span className="text-lg font-bold text-tuatara-700 font-display">
          On this page
        </span>
        <ul className="font-sans text-black text-normal">
          {Object.entries(ID_LABELS_MAPPING).map(([id, label]) => {
            const active = id === activeId
            return (
              <li
                onClick={(e) => {
                  //e?.preventDefault()
                  scrollToId(id)
                }}
                data-id={id}
                className={cn(
                  "flex items-center h-8 px-3 border-l-2 cursor-pointer duration-200",
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
      {/* TODO: add lint to github for edit this page*/}
      <Link href={"/"}>
        <Button size="lg">
          <span className="text-sm font-medium text-left">Add resource</span>
        </Button>
      </Link>
    </div>
  )
}

export default function ResourcePage() {
  return (
    <div className="bg-second-gradient">
      <div className="container grid grid-cols-1 px-4 grid-cols-1 md:grid-cols-[3fr_1fr] lg:grid-cols-[1fr_3fr_1fr] gap-6 py-10 md:pb-20">
        <div className="md:hidden lg:block"></div>
        <div>
          <div className="grid grid-cols-1 gap-16">
            <div className="flex flex-col gap-8">
              <h6 className="text-4xl font-bold break-words md:text-5xl text-tuatara-950 font-display">
                Resources
              </h6>
              <span className="font-sans text-base font-normal text-tuatara-950 leading-[27px]">
                This list was compiled by our community. Submit an issue on our
                Github page to add a resource to this list.
              </span>
            </div>
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
          </div>
        </div>
        <div className="relative right-0 z-0 hidden md:block top-32">
          <div className="sticky right-0 ml-auto top-14">
            <ResourceNav />
          </div>
        </div>
      </div>
    </div>
  )
}
