import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { projects } from "@/data/projects"
import GithubIcon from "@/public/social-medias/github-fill.svg"
import GlobeIcon from "@/public/social-medias/global-line.svg"

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
        <div className="container mx-auto py-12 lg:py-24">
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
              const { github, website } = links
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
                        className="w-full rounded-t-lg object-cover"
                      />
                      <div className="flex h-full flex-col justify-between gap-5 rounded-b-lg bg-white p-5">
                        <div className="flex flex-col justify-start gap-2">
                          <h1 className="text-xl font-bold text-black">
                            {name}
                          </h1>
                          <p className="text-slate-900/80">{tldr}</p>
                        </div>
                        <div className="mr-auto flex items-center justify-start gap-2">
                          {github && (
                            <Link
                              href={`${github}`}
                              target="_blank"
                              rel="noreferrer"
                              className="hover:opacity-60"
                            >
                              <Image
                                src={GithubIcon}
                                alt="githubVector"
                                className="cursor-pointer"
                                width={18}
                                height={18}
                              />
                            </Link>
                          )}
                          {website && (
                            <Link
                              href={`${website}`}
                              target="_blank"
                              rel="noreferrer"
                              className="hover:opacity-60"
                            >
                              <Image
                                src={GlobeIcon}
                                className="cursor-pointer"
                                alt="globalVector"
                                width={18}
                                height={18}
                              />
                            </Link>
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
