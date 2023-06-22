import NextImage from "next/image"
import NextLink from "next/link"
import ArrowUpVector from "@/public/arrow-vector.png"
import ArrowRightVector from "@/public/arrowright-vector.png"
import PSELogoCircle from "@/public/pse-logo-circle.png"
import PSEIcon1 from "@/public/pseicon-1.png"
import PSEIcon2 from "@/public/pseicon-2.png"
import PSEIcon3 from "@/public/pseicon-3.png"
import PSELogo from "@/public/pselogo-homepage.png"

import { siteConfig } from "@/config/site"

export default function IndexPage() {
  return (
    <section className="flex flex-col">
      <div className="flex w-full flex-col gap-5 bg-[#D0F2FF] px-[32px] py-5 md:flex-row md:px-20">
        <div className="flex w-full flex-col justify-center gap-5">
          <h1 className="text-xl uppercase text-[#E3533A]">
            Privacy + Scaling Explorations
          </h1>
          <h1 className="text-4xl font-[700] md:text-7xl">
            Programmable cryptography for people like you
          </h1>
          <NextLink href={"/projects"} className="flex items-center gap-2">
            <h1 className="border-b-2 border-[#E3533A] text-base uppercase">
              Explore The Project Library
            </h1>
            <NextImage
              src={ArrowRightVector}
              alt="arrowvector"
              height={16}
              width={16}
            />
          </NextLink>
        </div>
        <div className="m-auto flex h-[364px] w-[280px] items-center justify-center md:h-full md:w-full">
          <NextImage
            src={PSELogo}
            alt="pselogo"
            style={{ objectFit: "fill" }}
          />
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex flex-col justify-between gap-5 border border-black px-[32px] py-5 md:flex-row md:gap-0 lg:px-20">
          <div className="flex flex-col items-start justify-center gap-2 lg:flex-row lg:items-center">
            <div className="flex w-[280px] items-center justify-start gap-2">
              <NextImage src={PSEIcon1} alt="pseicon1" height={16} width={16} />
              <h1 className="text-base font-[700] uppercase tracking-[5px] text-[#E3533A]">
                Learn and Share
              </h1>
            </div>
            <h1 className="text-xl font-[500]">
              Sangria: a Folding Scheme for PLONK
            </h1>
          </div>
          <NextLink
            href={"https://www.youtube.com/watch?v=MounVPj6tjg"}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-start gap-5 md:justify-center"
          >
            <h1 className="border-b-2 border-[#E3533A] text-base font-[500] uppercase">
              Watch
            </h1>
            <NextImage
              src={ArrowUpVector}
              alt="arrowup"
              height={12}
              width={12}
            />
          </NextLink>
        </div>
        <div className="flex flex-col justify-between gap-5 border-x border-b border-black px-[32px] py-5  md:flex-row md:gap-0 lg:px-20">
          <div className="flex flex-col items-start justify-center gap-2 lg:flex-row lg:items-center">
            <div className="flex w-[280px] items-center justify-start gap-2">
              <NextImage src={PSEIcon1} alt="pseicon1" height={16} width={16} />
              <h1 className="text-base font-[700] uppercase tracking-[5px] text-[#E3533A]">
                Learn and Share
              </h1>
            </div>
            <h1 className="text-xl font-[500]">
              Folding Circom Circuit: A ZKML Case Study - Dr. Cathie So
            </h1>
          </div>
          <NextLink
            href={
              "https://discord.com/invite/kuUkQNtS?event=1113461922847789176"
            }
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-start gap-5 md:justify-center"
          >
            <h1 className="border-b-2 border-[#E3533A] text-base font-[500] uppercase">
              Atttend
            </h1>
            <NextImage
              src={ArrowUpVector}
              alt="arrowup"
              height={12}
              width={12}
            />
          </NextLink>
        </div>
        <div
          className="flex flex-col justify-between gap-5
border-x border-b border-black px-[32px] py-5 md:flex-row md:gap-0 lg:px-20"
        >
          <div className="flex flex-col items-start justify-center gap-2 lg:flex-row lg:items-center">
            <div className="flex w-[280px] items-center justify-start gap-2">
              <NextImage src={PSEIcon2} alt="pseicon1" height={16} width={10} />
              <h1 className="text-base font-[700] uppercase tracking-[5px] text-[#E3533A]">
                Event
              </h1>
            </div>
            <h1 className="text-xl font-[500]">PSE @ETHCC</h1>
          </div>
          <NextLink
            href={"https://www.ethcc.io/"}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-start gap-5 md:justify-center"
          >
            <h1 className="border-b-2 border-[#E3533A] text-base font-[500] uppercase">
              Attend
            </h1>
            <NextImage
              src={ArrowUpVector}
              alt="arrowup"
              height={12}
              width={12}
            />
          </NextLink>
        </div>
        <div
          className="flex flex-col justify-between gap-5
border-x border-b border-black px-[32px] py-5 md:flex-row md:gap-0 lg:px-20"
        >
          <div className="flex flex-col items-start justify-center gap-2 lg:flex-row lg:items-center">
            <div className="flex w-[280px] items-center justify-start gap-2">
              <NextImage src={PSEIcon3} alt="pseicon1" height={16} width={16} />
              <h1 className="text-base font-[700] uppercase tracking-[5px] text-[#E3533A]">
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
            <h1 className="border-b-2 border-[#E3533A] text-base font-[500] uppercase">
              read
            </h1>
            <NextImage
              src={ArrowUpVector}
              alt="arrowup"
              height={12}
              width={12}
            />
          </NextLink>
        </div>
      </div>

      <div className="flex flex-col gap-40 bg-radial-gradient px-[32px] py-40 lg:px-20">
        <div className="flex flex-col gap-10 text-center lg:flex-row">
          <div className="flex w-full items-start justify-start lg:w-[500px] lg:justify-center">
            <h1 className="text-xl font-[700] uppercase text-[#E3533A]">
              Who We Are
            </h1>
          </div>
          <div className="flex  w-full text-start lg:w-[600px]">
            <h1 className="text-3xl font-[700] text-black">
              PSE is a research lab building free tools that expand the world of
              cryptography.
            </h1>
          </div>
        </div>

        <div className="flex flex-col gap-10 text-center lg:flex-row">
          <div className="flex w-full items-start justify-start lg:w-[500px] lg:justify-center">
            <h1 className="text-xl font-[700] uppercase text-[#E3533A]">
              What We Do
            </h1>
          </div>
          <div className="flex w-full items-start md:hidden lg:hidden">
            <NextImage
              src={PSELogoCircle}
              alt="pselogocircle"
              style={{ objectFit: "contain" }}
              width={252}
              height={252}
            />
          </div>
          <div className="flex w-full flex-row gap-10 lg:w-[420px]">
            <div className="flex flex-col gap-[200px] text-start">
              <div className="flex flex-col">
                <h1 className="text-xl font-[700] text-black">Privacy</h1>
                <p className="text-lg">
                  We believe privacy is a social good that should be accessible
                  to everyone. That’s why we’re creating open source tools that
                  help people choose what, how, when, and where they share.
                </p>
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-[700] text-black">Scaling</h1>
                <p className="text-lg">
                  Our infrastructure helps communities grow by making Ethereum
                  more efficient and accessible. From account abstraction and
                  reducing transaction costs, to rollups and zkEVM, we are
                  building towards an interoperable future.
                </p>
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-[700] text-black">Explorations</h1>
                <p className="text-lg">
                  We are mapping the emerging zero knowledge ecosystem through
                  collective experimentation. We collaborate, share what we
                  learn, and welcome contributions from around the world.
                </p>
              </div>
            </div>
            <div className="hidden w-full items-start md:flex lg:hidden">
              <NextImage
                src={PSELogoCircle}
                alt="pselogocircle"
                style={{ objectFit: "contain" }}
                width={252}
                height={252}
              />
            </div>
          </div>
          <div className="hidden items-start lg:flex">
            <NextImage
              src={PSELogoCircle}
              alt="pselogocircle"
              width={252}
              height={252}
            />
          </div>
        </div>

        <div className="flex flex-col gap-10 text-center lg:flex-row">
          <div className="flex w-full items-start  justify-start lg:w-[500px] lg:justify-center">
            <h1 className="text-xl font-[700] uppercase text-[#E3533A]">
              How To Plug In
            </h1>
          </div>
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
              <h1 className="border-b-2 border-[#E3533A] text-base font-[500] uppercase">
                Say Hi On Discord
              </h1>
              <NextImage
                src={ArrowUpVector}
                alt="arrowvector"
                height={16}
                width={16}
              />
            </NextLink>
          </div>
        </div>
      </div>
    </section>
  )
}
