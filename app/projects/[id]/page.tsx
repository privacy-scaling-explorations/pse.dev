"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import GithubVector from "@/public/social-medias/github-fill.svg"
import GlobalVector from "@/public/social-medias/global-line.svg"
import TwitterVector from "@/public/social-medias/twitter-fill.svg"

import { projects } from "@/config/projects"
import Breadcrumbs from "@/components/breadcrumbs"

export default function ProjectDetailPage() {
  const router = usePathname()

  const breadcrumbs = router
    .split("/")
    .slice(1)
    .map((part) => {
      const id = Number(part)

      if (!isNaN(id)) {
        const project = projects.find((project) => project.id === id)

        return project ? project.name : part
      } else {
        return part
      }
    })

  const findProject = projects.filter(
    (project) => String(project.id) === router.split("/").slice(1)[1]
  )[0]

  const { github, discord, twitter, website } = findProject.links

  return (
    <section className="flex flex-col items-center">
      <div className="relative flex h-auto w-full justify-center overflow-hidden bg-second-gradient md:h-[400px]">
        <div className="z-[11] flex w-full flex-col justify-center gap-5 p-[24px] md:w-[664px] md:p-0">
          <Breadcrumbs path={breadcrumbs} />
          <h1 className="text-2xl font-[700] md:text-3xl">
            {findProject.name}
          </h1>
          <div className="flex flex-wrap items-center justify-start gap-5">
            {github && (
              <Link
                href={findProject.links.github}
                target="_blank"
                rel="noreferrer"
              >
                <div className="flex items-center gap-2">
                  <Image src={GithubVector} alt="bg" width={20} height={20} />
                  <p>Github</p>
                </div>
              </Link>
            )}
            {website && (
              <Link
                href={findProject.links.website}
                target="_blank"
                rel="noreferrer"
              >
                <div className="flex items-center gap-2">
                  <Image src={GlobalVector} alt="bg" width={20} height={20} />
                  <p>Website</p>
                </div>
              </Link>
            )}
            {twitter && (
              <Link
                href={findProject.links.twitter}
                target="_blank"
                rel="noreferrer"
              >
                <div className="flex items-center gap-2">
                  <Image src={TwitterVector} alt="bg" width={20} height={20} />
                  <p>Twitter</p>
                </div>
              </Link>
            )}
          </div>
          <p className="mt-5 w-full text-lg md:w-[612px]">{findProject.tldr}</p>
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-5 bg-anakiwa px-[24px] py-10 md:px-0">
        {findProject.image ? (
          <div className="flex h-auto items-center justify-center">
            <Image
              src={require(`@/public/project-banners/${findProject.image}`)}
              alt="bg"
              width={664}
            />
          </div>
        ) : (
          <div />
        )}
        <div className="flex w-full flex-col gap-5 py-10 text-base font-normal md:w-[664px] md:text-lg">
          <p>{findProject.description}</p>
        </div>
      </div>
    </section>
  )
}
