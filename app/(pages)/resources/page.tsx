"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"

import { siteConfig } from "@/site-config"
import { cn, interpolate } from "@/lib/utils"
import { AppContent } from "@/components/ui/app-content"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Banner } from "@/components/banner"
import { Divider } from "@/components/divider"
import { Icons } from "@/components/icons"

// Temporarily commented out problematic import
// import ResourcesContent from "../content/resources.md"
import { LABELS } from "@/app/labels"

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
      className="group pb-3 duration-500 group-hover:transition self-start"
    >
      <div className="flex items-center gap-1">
        <div className="flex space-x-3">
          <div className="h-6 w-6 text-anakiwa-500 opacity-50 transition group-hover:text-tuatara-950 group-hover:opacity-100">
            <Icon />
          </div>
          <span className="text-lg font-medium duration-200 group-hover:text-orange">
            {label}
          </span>
        </div>
        <Icons.externalUrl className="text-tuatara-950 transition duration-200 group-hover:text-orange" />
      </div>
      <div className="p-[2px]"></div>
      <p className="text-sm text-tuatara-500 ">{description}</p>
    </Link>
  )
}

const ResourceCard = ({ id, title, children }: ResourceCardProps) => {
  return (
    <div
      id={id}
      data-section={id}
      className="mx-auto flex max-w-[644px] flex-col rounded-lg"
    >
      <Label.Section label={title} className="pb-8 text-center" />
      <div className="mb-4 grid gap-6 rounded-lg border border-tuatara-300 bg-anakiwa-100 px-10 py-8">
        {children}
      </div>
    </div>
  )
}

const ResourceNav = () => {
  const SCROLL_OFFSET = 80
  const [activeId, setActiveId] = useState("")
  const [isManualScroll, setIsManualScroll] = useState(false)
  const ID_LABELS_MAPPING: Record<string, string> = {
    "get-involved": LABELS.RESOURCES_PAGE.NAV.GET_INVOLVED,
    learn: LABELS.RESOURCES_PAGE.NAV.LEARN,
    build: LABELS.RESOURCES_PAGE.NAV.BUILD,
    design: LABELS.RESOURCES_PAGE.NAV.DESIGN,
  }
  const sectionsRef = useRef<NodeListOf<HTMLElement> | null>(null) // sections are constant so useRef might be better here

  useEffect(() => {
    if (sectionsRef.current === null)
      sectionsRef.current = document.querySelectorAll("div[data-section]")
    if (!activeId) setActiveId("get-involved")

    const handleScroll = () => {
      if (isManualScroll) return

      sectionsRef.current?.forEach((section: any) => {
        const sectionTop = section.offsetTop - SCROLL_OFFSET
        if (window.scrollY >= sectionTop && window.scrollY > 0) {
          setActiveId(section.getAttribute("id"))
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
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
          {LABELS.COMMON.ON_THIS_PAGE}
        </h6>
        <ul className="text-normal font-sans text-black">
          {Object.entries(ID_LABELS_MAPPING).map(([id, label]) => {
            const active = id === activeId
            return (
              <li
                key={id}
                onClick={() => {
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
    </div>
  )
}

export default function ResourcePage() {
  return (
    <div className="flex flex-col">
      <div className="w-full bg-page-header-gradient">
        <AppContent className="flex flex-col gap-4 py-10 w-full">
          <Label.PageTitle label={LABELS.RESOURCES_PAGE.TITLE} />
          <h6 className="font-sans text-base font-normal text-tuatara-950 md:text-[18px] md:leading-[27px] md:max-w-[700px]">
            {LABELS.RESOURCES_PAGE.SUBTITLE}
          </h6>
          <Link
            href={siteConfig.addGithubResource}
            target="_blank"
            rel="noreferrer"
            passHref
          >
            <Button className="w-full md:w-auto" size="lg">
              <div className="flex items-center gap-1">
                <Icons.discord size={18} />
                <span className="pl-2 text-left text-sm font-medium uppercase">
                  {LABELS.COMMON.ADD_RESOURCE}
                </span>
                <Icons.externalUrl size={22} />
              </div>
            </Button>
          </Link>
        </AppContent>
      </div>
      <Divider.Section className="bg-white">
        <div className="flex justify-center">
          <AppContent className="grid grid-cols-1 gap-6 py-10 md:grid-cols-[3fr_1fr] md:pb-20 lg:grid-cols-[4fr_1fr]">
            <div className="flex flex-col gap-6">
              <article className="flex flex-col space-y-8 ">
                <ResourceCard id="get-involved" title="Get involved">
                  <ResourceItem
                    label="PSE Discord"
                    description="PSE Discord Interact with the PSE team and learn more about PSE projects."
                    url="https://discord.com/invite/sF5CT5rzrR"
                    icon="discord"
                  />
                  <ResourceItem
                    label="0xPARC"
                    description="Organization supporting the next generation of cryptography-enabled applications."
                    url="https://0xparc.org/"
                  />
                  <ResourceItem
                    label="Zero Knowledge"
                    description="Place to explore zk, decentralized privacy, and other advanced cryptography concepts."
                    url="https://zeroknowledge.fm/"
                  />
                  <ResourceItem
                    label="ZK Hack Discord"
                    description="Place to explore zk, decentralized privacy, and other advanced cryptography concepts."
                    url="https://discord.com/invite/Z4YT3jtzSk"
                    icon="discord"
                  />
                  <ResourceItem
                    label="Uncloak Discord"
                    description="A community-maintained knowledge wiki experiment, aiming to increase the accessibility of cryptography for developers, researchers, and everyone else."
                    url="https://discord.gg/TYwr4pMS2h"
                    icon="discord"
                  />
                </ResourceCard>

                <ResourceCard id="learn" title="Learn">
                  <ResourceItem
                    label="Zero Knowledge Podcast"
                    description="Weekly interviews with top technical minds building new systems and tech on emerging networks."
                    url="https://zeroknowledge.fm/"
                  />
                  <ResourceItem
                    label="MIT ZK course materials"
                    description="Lecture and course materials about recent advancements in zero-knowledge cryptography over the last ten years, with a strong emphasis on their practical and user-facing applications."
                    url="https://zkiap.com/"
                  />
                  <ResourceItem
                    label="Zk-learning.org"
                    description="Lecture and course materials about recent advancements in zero-knowledge cryptography over the last ten years, with a strong emphasis on their practical and user-facing applications."
                    url="https://zk-learning.org/"
                  />
                  <ResourceItem
                    label="Elliptic Curve Cryptography from scratch"
                    description="A full course of lectures by Matan that covers everything from basic naive set theory to pairings."
                    url="https://www.youtube.com/playlist?list=PLV91V4b0yVqQ_inAjuIB5SwBNyYmA9S6M"
                  />
                  <ResourceItem
                    label="Learn by 0xPARC"
                    description="Born out of their first Applied ZK Learning Group. Supported by volunteers from their community."
                    url="https://learn.0xparc.org/"
                  />
                  <ResourceItem
                    label="ZK Whiteboard Sessions"
                    description="A weekly educational series on all things zero knowledge. Produced by ZK Hack and powered by Polygon."
                    url="https://zkhack.dev/whiteboard/"
                  />
                  <ResourceItem
                    label="ZKP Knowledge Base"
                    description="Maintained by Delendum including state of the art research on ZKP, open questions, ideas, applications, and future development directions. Platform to share knowledge, expertise and best engineering practices."
                    url="https://kb.delendum.xyz/zk-knowledge"
                  />
                  <ResourceItem
                    label="Zero Knowledge Canon"
                    description="Set of resources for those seeking to understand, go deeper, and build with all things zero knowledge."
                    url="https://a16zcrypto.com/posts/article/zero-knowledge-canon/"
                  />
                  <ResourceItem
                    label="Awesome ZKP"
                    description="Matter Lab's curated list of awesome things related to learning zero knowledge proofs."
                    url="https://github.com/matter-labs/awesome-zero-knowledge-proofs"
                    icon="gitHub"
                  />
                  <ResourceItem
                    label="The Moon Math Manual"
                    description="Understanding and unlocking the potential of zk-SNARKs, from beginners to experts."
                    url="https://leastauthority.com/community-matters/moonmath-manual/"
                  />
                  <ResourceItem
                    label="PSE — Good First Issues"
                    description="Learn by doing & contributing. Explore all the good first issues in PSE's project catalog"
                    url="https://gfi.pse.dev/"
                  />
                </ResourceCard>

                <ResourceCard id="build" title="Build">
                  <ResourceItem
                    label="PSE project library"
                    description="OSS built for you! Fork, add, use PSE projects as part of your journey."
                    url="https://pse.dev/"
                  />
                  <ResourceItem
                    label="ZK dapp: From zero to production"
                    description="Step-by-step guide on how to build a Zero Knowledge (zk) Decentralized Application (DApp) from zero to production."
                    url="https://vivianblog.hashnode.dev/how-to-create-a-zero-knowledge-dapp-from-zero-to-production"
                  />
                  <ResourceItem
                    label="Ingopedia Applications ZK"
                    description="A compilation of materials that showcase various applications of zk technology."
                    url="https://www.ingonyama.com/ingopedia/applicationszk"
                  />
                  <ResourceItem
                    label="Zero Knowledge University"
                    description="Course and study groups to learn how to build market-ready products using ZK. The goal is to launch a ZK-product on mainnet within a couple of months."
                    url="https://zku.gnomio.com/"
                  />
                </ResourceCard>

                <ResourceCard id="design" title="Design">
                  <ResourceItem
                    label="PSE Logos"
                    description="Simple database to download PNGs and SVGs of the PSE logo."
                    url="https://pse-team.notion.site/a4b4807a1af442bc925dcb55ef44cfc5?v=a12723a1157a49688e58e099371b4aef"
                    icon="notion"
                  />
                  <ResourceItem
                    label="PSE identity kit"
                    description="Complete with logos, illustrations, text and color styles - open directly in Figma and start designing."
                    url="https://www.figma.com/community/file/1290636153494301914/privacy-scaling-explorations-identity-kit"
                    icon="figma"
                  />
                  <ResourceItem
                    label="Open source illustrations"
                    description="Free illustrations related to privacy and ZK!"
                    url="https://pse-team.notion.site/0801391ff71d4ed1a114abf46d8d0d51?v=a66616ad91694a7ba35b2a5f0a292294"
                    icon="notion"
                  />
                  <ResourceItem
                    label="Our logo story"
                    description="Read the history behind the PSE logo."
                    url="https://drive.google.com/file/d/19pE_OkqV1vwmcSWlFn1WaokGMa1ugefY/view?pli=1"
                    icon="drive"
                  />
                </ResourceCard>
              </article>
            </div>
            <section className="relative hidden md:block ">
              <div className="sticky right-0 top-16 ml-auto">
                <ResourceNav />
              </div>
            </section>
          </AppContent>
        </div>
        <Banner
          title={
            <h3 className="py-2 font-display text-[18px] font-bold text-tuatara-950 md:text-3xl">
              {LABELS.RESOURCES_PAGE.ADD_RESOURCE_QUESTION}
            </h3>
          }
        >
          <div className="pb-6"></div>
          <Link
            href={siteConfig.links.discord}
            className="w-fit mx-auto"
            target="_blank"
            rel="noreferrer"
            passHref
          >
            <Button>
              <div className="flex items-center gap-1">
                <Icons.discord size={18} />
                <span className="text-[14px] uppercase">
                  {interpolate(LABELS.COMMON.CONNECT_WITH_US_ON_PLATFORM, {
                    platform: "Discord",
                  })}
                </span>
                <Icons.externalUrl size={20} />
              </div>
            </Button>
          </Link>
        </Banner>
      </Divider.Section>
    </div>
  )
}
