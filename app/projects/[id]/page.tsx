"use client"

import NextImage from "next/image"
import NextLink from "next/link"
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

  const githubLink = findProject.links.github
  const twitterLink = findProject.links.twitter
  const websiteLink = findProject.links.website

  return (
    <section className="flex flex-col items-center">
      <div className="relative flex h-auto w-full justify-center overflow-hidden bg-second-gradient md:h-[400px]">
        <div className="z-[11] flex w-full flex-col justify-center gap-5 p-[24px] md:w-[664px] md:p-0">
          <Breadcrumbs path={breadcrumbs} />
          <h1 className="text-2xl font-[700] md:text-3xl">
            {findProject.name}
          </h1>
          <div className="flex flex-wrap items-center justify-start gap-5">
            {githubLink !== "none" && (
              <NextLink
                href={findProject.links.github}
                target="_blank"
                rel="noreferrer"
              >
                <div className="flex items-center gap-2">
                  <NextImage
                    src={GithubVector}
                    alt="bg"
                    width={20}
                    height={20}
                  />
                  <p>Github</p>
                </div>
              </NextLink>
            )}
            {websiteLink !== "none" && (
              <NextLink
                href={findProject.links.website}
                target="_blank"
                rel="noreferrer"
              >
                <div className="flex items-center gap-2">
                  <NextImage
                    src={GlobalVector}
                    alt="bg"
                    width={20}
                    height={20}
                  />
                  <p>Website</p>
                </div>
              </NextLink>
            )}
            {twitterLink !== "none" && (
              <NextLink
                href={findProject.links.twitter}
                target="_blank"
                rel="noreferrer"
              >
                <div className="flex items-center gap-2">
                  <NextImage
                    src={TwitterVector}
                    alt="bg"
                    width={20}
                    height={20}
                  />
                  <p>Twitter</p>
                </div>
              </NextLink>
            )}
          </div>
          <p className="mt-5 w-full text-lg md:w-[612px]">{findProject.tldr}</p>
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-5 bg-anakiwa px-[24px] py-10 md:px-0">
        {findProject.image ? (
          <div className="flex h-auto items-center justify-center">
            <NextImage
              src={require(`@/public/project-banners/${findProject.image}`)}
              alt="bg"
              width={664}
            />
          </div>
        ) : (
          <div />
        )}
        <div className="flex w-full flex-col gap-5 py-10 text-base font-normal md:w-[664px] md:text-lg">
          <p>
            {`RLN is a protocol that allows one user to punish another user who is
            abusing the rate limit in an anonymous system. Users can withdraw
            the offender's stake or reveal their secrets, helping to maintain
            system integrity via deterrence. RLN is built using the Semaphore
            protocol.`}
          </p>
          <p>
            {`This project is aimed at developers looking to stop spam while
            preserving anonymity within a system. If you're working on
            communication systems such as chat apps, client-server
            communications, or peer-to-peer communications, RLN can help you
            maintain privacy and anonymity while preventing abuse in the form of
            spam and denial of service attacks. This ensures a safer and more
            enjoyable user experience for your application's users.`}
          </p>
        </div>
      </div>
    </section>
  )
}
