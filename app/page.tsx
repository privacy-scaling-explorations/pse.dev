import NextImage from "next/image"
import NextLink from "next/link"
import PSELogo from "@/public/icons/archstar.webp"
import ArrowRightVector from "@/public/icons/arrow-right.svg"
import PSEIcon1 from "@/public/icons/pseicon1.svg"
import PSEIcon2 from "@/public/icons/pseicon2.svg"
import PSEIcon3 from "@/public/icons/pseicon3.svg"

import { siteConfig } from "@/config/site"
import WhatWeDo from "@/components/sections/WhatWeDo"
import { ArrowRightUp } from "@/components/svgs/arrows"

export default function IndexPage() {
  return (
    <section className="flex flex-col">
      <div className="flex w-full flex-col justify-between gap-5 bg-[#D0F2FF] px-[32px] py-5 md:flex-row md:px-20">
        <div className="flex w-full flex-col justify-center gap-5 md:w-[660px]">
          <h6 className="font-sans text-lg uppercase tracking-[0.2625rem] text-orange lg:text-xl">
            Privacy + Scaling Explorations
          </h6>
          <h1 className="text-4xl font-[700] lg:text-7xl">
            Programmable cryptography for people like you
          </h1>
          <NextLink href={"/projects"} className="flex items-center gap-2">
            <h1 className="border-b-2 border-orange text-base uppercase">
              Explore The Project Library
            </h1>
            <NextImage
              src={ArrowRightVector}
              alt="arrowvector"
              height={24}
              width={24}
            />
          </NextLink>
        </div>
        <div className="m-auto flex h-[364px] w-full max-w-[280px] items-center justify-center md:m-0 md:h-full md:w-full lg:max-w-[542px]">
          <NextImage
            src={PSELogo}
            alt="pselogo"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex flex-col justify-between gap-5 border-y border-black px-[32px] py-5 md:flex-row md:gap-0 lg:px-20">
          <div className="flex flex-col items-start justify-center gap-2 lg:flex-row lg:items-center">
            <div className="flex w-[280px] items-center justify-start gap-2">
              <NextImage src={PSEIcon1} alt="pseicon1" height={16} width={16} />
              <h1 className="text-base font-[700] uppercase tracking-[5px] text-orange">
                Learn and Share
              </h1>
            </div>
            <h1 className="text-xl font-[500]">
              Diving into Plonk accumulation via aPlonk by Ralph Toledo
            </h1>
          </div>
          <NextLink
            href={"https://www.youtube.com/live/hRXgf6T2yb8?feature=share"}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-start gap-5 md:justify-center"
          >
            <h1 className="border-b-2 border-orange text-base font-[500] uppercase">
              Watch
            </h1>
            <ArrowRightUp color="black" />
          </NextLink>
        </div>
        <div className="flex flex-col justify-between gap-5 border-b border-black px-[32px] py-5  md:flex-row md:gap-0 lg:px-20">
          <div className="flex flex-col items-start justify-center gap-2 lg:flex-row lg:items-center">
            <div className="flex w-[280px] items-center justify-start gap-2">
              <NextImage src={PSEIcon1} alt="pseicon1" height={16} width={16} />
              <h1 className="text-base font-[700] uppercase tracking-[5px] text-orange">
                Learn and Share
              </h1>
            </div>
            <h1 className="text-xl font-[500]">
              Folding Circom Circuit: A ZKML Case Study - Dr. Cathie So
            </h1>
          </div>
          <NextLink
            href={
              "https://www.youtube.com/live/jb6HDEtY4CI?feature=share"
            }
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-start gap-5 md:justify-center"
          >
            <h1 className="border-b-2 border-orange text-base font-[500] uppercase">
              Watch
            </h1>
            <ArrowRightUp color="black" />
          </NextLink>
        </div>
        <div className="flex flex-col justify-between gap-5 border-b border-black px-[32px] py-5 md:flex-row md:gap-0 lg:px-20">
          <div className="flex flex-col items-start justify-center gap-2 lg:flex-row lg:items-center">
            <div className="flex w-[280px] items-center justify-start gap-2">
              <NextImage src={PSEIcon2} alt="pseicon1" height={16} width={16} />
              <h1 className="text-base font-[700] uppercase tracking-[5px] text-orange">
                Event
              </h1>
            </div>
            <h1 className="text-xl font-[500]">PSE @ETH Global Paris</h1>
          </div>
          <NextLink
            href={"https://ethglobal.com/events/paris2023"}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-start gap-5 md:justify-center"
          >
            <h1 className="border-b-2 border-orange text-base font-[500] uppercase">
              Attend
            </h1>
            <ArrowRightUp color="black" />
          </NextLink>
        </div>
        <div className="flex flex-col justify-between gap-5 border-b border-black px-[32px] py-5 md:flex-row md:gap-0 lg:px-20">
          <div className="flex flex-col items-start justify-center gap-2 lg:flex-row lg:items-center">
            <div className="flex w-[280px] items-center justify-start gap-2">
              <NextImage src={PSEIcon3} alt="pseicon1" height={16} width={16} />
              <h1 className="text-base font-[700] uppercase tracking-[5px] text-orange">
                Blog Post
              </h1>
            </div>
            <h1 className="text-xl font-[500]">
              zkEVM Community Edition Part 3: Logic and Structure
            </h1>
          </div>
          <NextLink
            href={
              "https://mirror.xyz/privacy-scaling-explorations.eth/shl8eMBiObd6_AUBikXZrjKD4fibI6xUZd7d9Yv5ezE"
            }
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-start gap-5 md:justify-center"
          >
            <h1 className="border-b-2 border-orange text-base font-[500] uppercase">
              read
            </h1>
            <ArrowRightUp color="black" />
          </NextLink>
        </div>
      </div>

      <div className="bg-radial-gradient flex flex-col gap-32 px-[32px] py-24 lg:px-20">
        <section className="badge-start-trigger relative grid w-full grid-cols-1 gap-10 overflow-hidden lg:grid-cols-3 lg:gap-0">
          <h2 className="flex w-full justify-start text-xl uppercase text-orange lg:justify-center">
            Who we are
          </h2>
          <div className="col-span-0 flex flex-col lg:col-span-1">
            <h1 className="text-3xl font-[700] text-black">
              PSE is a research lab building free tools that expand the world of
              cryptography.
            </h1>
          </div>
        </section>

        <WhatWeDo />

        <section className="badge-start-trigger relative grid w-full grid-cols-1 gap-10 overflow-hidden lg:grid-cols-3 lg:gap-0">
          <h2 className="flex w-full justify-start text-xl uppercase text-orange lg:justify-center">
            How To Plug In
          </h2>
          <div className="flex w-full flex-col gap-10 text-start lg:w-[420px]">
            <h1 className="text-lg text-black">
              PSE is a growing team of developers, researchers, designers,
              communicators, artists, and organizers. There are so many ways to
              get involved- you can try out our apps, build with our tools,
              contribute to projects, or join our team. We’d love to hear from
              you!
            </h1>
            <NextLink
              href={siteConfig.links.discord}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2"
            >
              <h1 className="border-b-2 border-orange text-base font-[500] uppercase">
                Say Hi On Discord
              </h1>
              <ArrowRightUp color="black" />
            </NextLink>
          </div>
        </section>
      </div>
    </section>
  )
}
