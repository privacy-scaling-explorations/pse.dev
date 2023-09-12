import React from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

interface ResourceItemProps {
  label: string
  icon?:
    | "globe"
    | "discord"
    | "twitter"
    | "github"
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

interface ResourceNavItemProps {
  id: string
  children: React.ReactNode
  active?: boolean
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

const ResourceNavItem = ({
  children,
  active = false,
}: ResourceNavItemProps) => {
  return (
    <li className="flex items-center h-8 px-3 border-l-2 cursor-pointer">
      {children}
    </li>
  )
}

const ResourceNav = () => {
  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="flex flex-col gap-4">
        <span className="text-lg font-bold text-tuatara-700 font-display">
          On this page
        </span>
        <ul className="font-sans text-black border-l-2 text-normal">
          <ResourceNavItem id="get-involved">Get involved</ResourceNavItem>
          <ResourceNavItem id="learn">Learn</ResourceNavItem>
          <ResourceNavItem id="build">Build</ResourceNavItem>
          <ResourceNavItem id="design">Design</ResourceNavItem>
        </ul>
      </div>
      <Button size="lg">
        <span className="text-sm font-medium">Add resource</span>
      </Button>
    </div>
  )
}

export default function ResourcePage() {
  return (
    <div className="bg-second-gradient">
      <div className="container grid grid-cols-1 px-4 md:grid-cols-[1fr_3fr_1fr] gap-8 py-10 lg:gap-16 md:pb-20">
        <div className="hidden md:block"></div>
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
            <ResourceCard id="get-involved" title="Get involved">
              <ResourceItem
                label="PSE Discord"
                description="PSE Discord Interact with the PSE team and learn more about PSE projects."
                url="https://discord.com/invite/sF5CT5rzrR"
                icon="discord"
              />
              <ResourceItem
                label="OxParc"
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
                url="https://discord.com/invite/Z4YT3jtzSk"
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
                label="Learn by Oxparc"
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
                icon="github"
              />
              <ResourceItem
                label="The Moon Math Manual"
                description="Understanding and unlocking the potential of zk-SNARKs, from beginners to experts."
                url="https://leastauthority.com/community-matters/moonmath-manual/"
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
                url="https://www.figma.com/file/e8wDmS2ZKkGlvs1yhMkqXX/Privacy-%26-Scaling-Explorations-Identity-Kit-(Community)?type=design&node-id=4339-317&mode=design&t=Jjzsaow2zqLSvnWp-0"
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
          </div>
        </div>
        <div className="fixed hidden right-10 md:block top-32">
          <ResourceNav />
        </div>
      </div>
    </div>
  )
}
