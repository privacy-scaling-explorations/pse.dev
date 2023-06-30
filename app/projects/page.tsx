"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import GithubIcon from "@/public/social-medias/github-fill.svg"
import GlobeIcon from "@/public/social-medias/global-line.svg"

import { projects } from "@/config/projects"

export default function ProjectsPage() {
  const router = useRouter()

  return (
    <section>
      <div className="bg-second-gradient">
        <div className="container mx-auto py-12 lg:py-24">
          <h1 className="text-5xl font-bold">Explore the project library</h1>
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
              return (
                <div
                  key={index}
                  onClick={() => router.push(`/projects/${project.id}`)}
                  className="flex h-[419px] w-[310px] cursor-pointer flex-col overflow-hidden rounded-lg border border-slate-900/20 transition ease-in-out hover:scale-105"
                >
                  {project.image.length > 0 ? (
                    <Image
                      src={require(`@/public/project-banners/${project.image}`)}
                      alt={project.name}
                      className="h-[163px] w-full rounded-t-lg object-cover"
                    />
                  ) : (
                    <Image
                      src={require(`@/public/project-banners/fallback.webp`)}
                      alt={project.name}
                      className="h-[163px] w-full rounded-t-lg object-cover"
                    />
                  )}
                  <div className="flex h-full flex-col justify-between gap-5 rounded-b-lg bg-white p-5">
                    <div className="flex flex-col justify-start gap-2">
                      <h1 className="text-xl font-bold text-black">
                        {project.name}
                      </h1>
                      <p className="text-slate-900/80">{project.tldr}</p>
                    </div>
                    <div
                      className="mr-auto flex items-center justify-start gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Link
                        href={`${project.links.github}`}
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
                      {project.links.website !== null && (
                        <Link
                          href={`${project.links.website}`}
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
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
