"use client"

import { useState } from "react"
import NextImage from "next/image"
import { useRouter } from "next/navigation"
import GithubVector from "@/public/github-vector.png"
import GlobalVector from "@/public/global-vector.png"
import ProjectsPageImage2 from "@/public/projectspage-image-2.png"
import ProjectsPageImage from "@/public/projectspage-image.png"

import { projects } from "@/config/projects"

export default function ProjectsPage() {
  const router = useRouter()
  const [perPage, setPerPage] = useState(8)
  return (
    <section className="relative flex flex-col items-center bg-[#75D6C7] ">
      <div className="relative m-auto flex h-[450px] w-full items-center justify-center gap-[200px] bg-gradientBg px-20">
        <h1 className="text-5xl font-bold text-black">explore our projects</h1>
        <div className="relative flex">
          <NextImage
            src={ProjectsPageImage2}
            alt="projectspage-image"
            width={444}
            height={235}
            className="absolute top-[-20px] z-[9]"
          />{" "}
          <NextImage
            src={ProjectsPageImage}
            alt="projectspage-image"
            className="z-[10]"
            width={450}
            height={240}
          />
        </div>
      </div>
      <div className="flex w-full flex-col gap-5 rounded-t-[60px] bg-[#F6F7F7]  px-20 py-10">
        <h1 className="text-lg text-black">Showing 1-9 of 32 projects</h1>
        <div className="align-center grid grid-cols-2 gap-5 md:grid-cols-4">
          {projects.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => router.push(`/projects/${item.id}`)}
                className="flex w-full cursor-pointer flex-col gap-5 overflow-auto rounded-lg border border-[#ccc] bg-[#F6FFFD]"
              >
                <div className="h-[123px] w-full bg-gradientBg" />
                <div className="flex flex-col gap-5 px-5 pb-5">
                  <h1 className="text-2xl font-bold text-black">{item.name}</h1>
                  <p className="text-base text-black">{item.description}</p>
                  <div className="flex items-center justify-start gap-5">
                    <NextImage
                      src={GithubVector}
                      alt="githubVector"
                      className="cursor-pointer"
                      width={16}
                      height={16}
                    />
                    <NextImage
                      src={GlobalVector}
                      className="cursor-pointer"
                      alt="globalVector"
                      width={16}
                      height={16}
                    />
                  </div>
                  <p className="text-xs text-black">updated 2 weeks ago</p>
                </div>
              </div>
            )
          })}
        </div>
        <div className="my-10 h-[1px] w-full bg-[#C3CCC9]" />
        <div className="flex items-center justify-between">
          <h1 className="text-lg text-black">Showing 1-9 of 32 projects</h1>
          <div className="flex items-center justify-end gap-10">
            <div className="flex items-center justify-center gap-2">
              <h1 className="text-base text-black">Projects per page</h1>
              <select
                value={perPage}
                className="focus-visible:none rounded-[8px] bg-[#D3F4ED] px-[10px] py-[8px] text-base text-black focus:outline-none"
              >
                <option value={4}>4</option>
              </select>
            </div>
            <div className="flex items-center gap-5 text-black">
              <button className="rounded-[8px] bg-[#D3F4ED] px-[10px] py-[8px] text-base">
                Previous
              </button>
              <div className="flex items-center gap-4">
                <h1>1</h1>
                <h1 className="flex h-[32px] w-[32px] items-center justify-center rounded-[8px] bg-[#1E6761] text-white">
                  2
                </h1>
                <h1>3</h1>
                <h1>...</h1>
                <h1>10</h1>
                <h1>11</h1>
                <h1>12</h1>
              </div>
              <button className="rounded-[8px] bg-[#D3F4ED] px-[10px] py-[8px] text-base">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
