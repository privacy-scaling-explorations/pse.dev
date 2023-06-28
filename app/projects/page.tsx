"use client"

import NextImage from "next/image"
import NextLink from "next/link"
import { useRouter } from "next/navigation"
import GithubVector from "@/public/github-vector.svg"
import GlobalVector from "@/public/globe-vector.svg"
import SkyNoMoonBg from "@/public/skynomoon.png"

import { projects } from "@/config/projects"

export default function ProjectsPage() {
  const router = useRouter()

  return (
    <section className="flex flex-col items-center">
      <div className="relative flex h-[350px] w-full overflow-hidden md:h-[300px]">
        <div className="absolute inset-0 z-[10] flex">
          <div className="aspect-w-2 aspect-h-1">
            <NextImage
              src={SkyNoMoonBg}
              alt="bg"
              style={{ objectFit: "cover" }}
              fill={true}
            />
          </div>
        </div>
        <div className="z-[11] flex w-full flex-col justify-end gap-5 p-[24px] md:p-[32px] lg:p-[64px]">
          <h1 className="text-4xl font-[700] md:text-5xl md:font-[400]">
            Explore the project library
          </h1>
          <p className="w-full text-lg md:w-[612px] md:text-xl">
            PSE is home to many projects, from cryptography research to
            developer tools, protocols and proof-of-concept applications.
          </p>
        </div>
      </div>
      <div className="flex w-full flex-col gap-5 bg-anakiwa p-[24px] md:p-[32px] lg:p-[64px]">
        <h1>Showing 24 projects</h1>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {projects.map((item, index) => {
            const githubLink = item.links.find((links) => links?.github)?.github
            const websiteLink = item.links.find(
              (links) => links?.website
            )?.website
            return (
              <div
                key={index}
                onClick={() => router.push(`/projects/${item.id}`)}
                className="flex h-[420px] w-full cursor-pointer flex-col"
              >
                <div className="h-[163px] w-full rounded-t-lg bg-[#A3DFF0]" />
                <div className="flex h-full flex-col justify-between gap-5 rounded-b-lg border-x border-b border-[#ccc] p-5">
                  <h1 className="text-2xl font-bold text-black">{item.name}</h1>
                  <p className="text-base text-black">{item.tldr}</p>
                  <div
                    className="mr-auto flex items-center justify-start gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <NextLink
                      href={`${githubLink ? githubLink : ""}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <NextImage
                        src={GithubVector}
                        alt="githubVector"
                        className="cursor-pointer"
                        width={16}
                        height={16}
                      />
                    </NextLink>
                    <NextLink
                      href={`${websiteLink ? websiteLink : ""}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <NextImage
                        src={GlobalVector}
                        className="cursor-pointer"
                        alt="globalVector"
                        width={16}
                        height={16}
                      />
                    </NextLink>
                  </div>
                  <p className="text-xs text-black">updated 2 weeks ago</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
