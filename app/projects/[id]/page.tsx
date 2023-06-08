"use client"

import NextImage from "next/image"
import NextLink from "next/link"
import { usePathname } from "next/navigation"
import GithubVector from "@/public/github-fill-vector.png"
import GlobalVector from "@/public/global-fill-vector.png"
import TwitterVector from "@/public/twitter-fill-vector.png"

import { projects } from "@/config/projects"
import Breadcrumbs from "@/components/breadcrumbs"

export default function ProjectsPage() {
  const router = usePathname()

  const breadcrumbs = router
    .split("/")
    .slice(1)
    .map((part) => {
      // Try to convert part to a number
      const id = Number(part)

      if (!isNaN(id)) {
        // If it is a number, find the project with this ID and return its name
        const project = projects.find((project) => project.id === id)

        return project ? project.name : part
      } else {
        // If it's not a number, return the original part
        return part
      }
    })

  return (
    <section className="relative flex flex-col items-center gap-5">
      <div className="flex w-full flex-col gap-10 px-20 py-10">
        <Breadcrumbs path={breadcrumbs} />
        <div className="flex w-full gap-5">
          <div className="h-[150px] w-[200px] rounded-md bg-gradientBg" />
          <div className="flex flex-col justify-between">
            <h1 className="text-2xl font-bold">Semaphore Project</h1>
            <h1 className="text-lg">
              RLN is a protocol that allows one user to punish another user who
              is abusing the rate limit in an anonymous system.
            </h1>
            <div className="flex w-full gap-5">
              <NextLink
                href={
                  "https://github.com/privacy-scaling-explorations/website-v2"
                }
                target="_blank"
              >
                <div className="flex items-center gap-2 text-base">
                  <NextImage
                    src={GithubVector}
                    className="cursor-pointer"
                    alt="githubVector"
                    width={16}
                    height={16}
                  />
                  <h1>Github</h1>
                </div>
              </NextLink>
              <NextLink
                href={
                  "https://github.com/privacy-scaling-explorations/website-v2"
                }
                target="_blank"
              >
                <div className="flex items-center gap-2 text-base">
                  <NextImage
                    src={TwitterVector}
                    className="cursor-pointer"
                    alt="twitterVector"
                    width={16}
                    height={16}
                  />
                  <h1>Twitter</h1>
                </div>
              </NextLink>
              <NextLink
                href={
                  "https://github.com/privacy-scaling-explorations/website-v2"
                }
                target="_blank"
              >
                <div className="flex items-center gap-2 text-base">
                  <NextImage
                    src={GlobalVector}
                    className="cursor-pointer"
                    alt="globalVector"
                    width={16}
                    height={16}
                  />
                  <h1>Website</h1>
                </div>
              </NextLink>
            </div>
          </div>
          <div className="flex items-center justify-start">
            <div className="flex flex-wrap gap-2">
              <div className="flex w-auto rounded-md border border-black px-2">
                <h1>tags-short-one</h1>
              </div>
              <div className="flex w-auto rounded-md border border-black px-2">
                <h1>tags 2</h1>
              </div>
              <div className="flex w-auto rounded-md border border-black px-2">
                <h1>tag lineon and many text</h1>
              </div>
              <div className="flex w-auto rounded-md border border-black px-2">
                <h1>tags 2</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col border-t border-black p-20">
        <div className="flex w-3/5 flex-col gap-5">
          <h1 className="text-3xl font-bold">What is this?</h1>
          <h1>
            RLN is a protocol that allows one user to punish another user who is
            abusing the rate limit in an anonymous system. Users can withdraw
            the offenders stake or reveal their secrets, helping to maintain
            system integrity via deterrence. RLN is built using the Semaphore
            protocol.
            <br />
            <br />
            This project is aimed at developers looking to stop spam while
            preserving anonymity within a system. If youre working on
            communication systems such as chat apps, client-server
            communications, or peer-to-peer communications, RLN can help you
            maintain privacy and anonymity while preventing abuse in the form of
            spam and denial of service attacks. This ensures a safer and more
            enjoyable user experience for your applications users.
          </h1>
        </div>
      </div>
    </section>
  )
}
