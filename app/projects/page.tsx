import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ProjectLinkIconMap, projects } from "@/data/projects"

import { ProjectLinkWebsite } from "@/lib/types"
import { ProjectLink } from "@/components/project-link"

export const metadata: Metadata = {
  title: "Project Library",
  description:
    "PSE is home to many projects, from cryptography research to developer tools, protocols and proof-of-concept applications.",
}

// TODO: MAKE IT RANDOM - This would prob need to be state and so metadata would get cut
// const randomizeProjects = (projects: any[]) => {
//   // efficient fisher-yates shuffle
//   const array = [...projects]
//   let currentIndex = array.length,
//     randomIndex
//   while (currentIndex !== 0) {
//     randomIndex = Math.floor(Math.random() * currentIndex)
//     currentIndex--
//     ;[array[currentIndex], array[randomIndex]] = [
//       array[randomIndex],
//       array[currentIndex],
//     ]
//   }
//   return array
// }

export default function ProjectsPage() {
  return (
    <section>
      <div className="bg-second-gradient">
        <div className="container py-12 mx-auto lg:py-24">
          <h1 className="text-4xl font-bold md:text-5xl">
            Explore the project library
          </h1>
          <p className="p-2"></p>
          <p className="w-full text-lg md:w-[612px] md:text-xl">
            PSE is home to many projects, from cryptography research to
            developer tools, protocols and proof-of-concept applications.
          </p>
        </div>
      </div>
      <div className="w-full bg-anakiwa">
        <div className="container">
          <p className="p-3"></p>
          <p className="text-base text-slate-900/70 md:text-lg">{`Showing ${projects.length} projects`}</p>
          <div className="flex flex-wrap justify-center gap-6 py-6">
            {projects.map((project, index) => {
              const { id, image, links, name, tldr } = project
              return (
                <div key={index}>
                  <Link href={`/projects/${id}`}>
                    <div className="flex h-[419px] w-[310px] cursor-pointer flex-col overflow-hidden rounded-lg border border-slate-900/20 transition duration-150 ease-in hover:scale-105">
                      <Image
                        src={`/project-banners/${
                          image ? image : "fallback.webp"
                        }`}
                        alt={`${name} banner`}
                        width={1200}
                        height={630}
                        className="object-cover w-full rounded-t-lg"
                      />
                      <div className="flex flex-col justify-between h-full gap-5 p-5 bg-white rounded-b-lg">
                        <div className="flex flex-col justify-start gap-2">
                          <h1 className="text-xl font-bold text-black">
                            {name}
                          </h1>
                          <p className="text-slate-900/80">{tldr}</p>
                        </div>
                        <div className="flex items-center justify-start gap-2 mr-auto">
                          {Object.entries(links ?? {})?.map(
                            ([website, url], index) => {
                              const image =
                                ProjectLinkIconMap?.[
                                  website as ProjectLinkWebsite
                                ]

                              if (!image) return null // no icon mapping for this website
                              return (
                                <ProjectLink
                                  key={index}
                                  url={url}
                                  image={image}
                                  website={website as ProjectLinkWebsite}
                                />
                              )
                            }
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
