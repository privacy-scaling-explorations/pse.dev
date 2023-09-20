import { Metadata, ResolvingMetadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { projects } from "@/data/projects"
import GithubVector from "@/public/social-medias/github-fill.svg"
import GlobalVector from "@/public/social-medias/global-line.svg"
import TwitterVector from "@/public/social-medias/twitter-fill.svg"
import { filterProjects } from "@/state/useProjectFiltersState"

import { ProjectInterface } from "@/lib/types"
import { shuffleArray } from "@/lib/utils"
import { Markdown } from "@/components/ui/markdown"
import { Icons } from "@/components/icons"
import ProjectCard from "@/components/project/project-card"
import { ProjectTags } from "@/components/project/project-detail-tags"
import ProjectExtraLinks from "@/components/project/project-extra-links"

type PageProps = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

interface ProjectProps {
  project: ProjectInterface
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const currProject = projects.filter(
    (project) => String(project.id) === params.id
  )[0]

  const imageUrl = currProject.image
    ? `/project-banners/${currProject.image}`
    : "/og-image.png"

  return {
    title: currProject.name,
    description: currProject.tldr,
    openGraph: {
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
        },
      ],
    },
  }
}

function DiscoverMoreProjects({ project }: ProjectProps) {
  const getSuggestedProjects = () => {
    const projectList = projects.filter((p) => p.id !== project.id)

    const suggestedProject = filterProjects({
      searchPattern: "",
      activeFilters: project?.tags,
      findAnyMatch: true,
      projects: projectList,
    })

    // No match return random projects
    if (suggestedProject?.length < 2) {
      return shuffleArray(projectList).slice(0, 2)
    }

    return suggestedProject.slice(0, 2)
  }

  const suggestedProject = getSuggestedProjects()

  return (
    <div className="flex w-full flex-col items-center justify-center gap-14 bg-anakiwa-200 px-6 py-32 md:px-0">
      <h2 className="text-center text-3xl font-bold">Discover more</h2>
      <div className="flex flex-col gap-5 md:flex-row">
        {suggestedProject?.map((project: ProjectInterface) => (
          <ProjectCard project={project} />
        ))}
      </div>
      <Link
        className="flex items-center gap-2 text-tuatara-950/80 hover:text-tuatara-950"
        href="/projects"
      >
        <Icons.arrowLeft />
        <span className="font-sans text-base">Back to project library</span>
      </Link>
    </div>
  )
}

export default function ProjectDetailPage({ params }: PageProps) {
  const currProject = projects.filter(
    (project) => String(project.id) === params.id
  )[0]

  const { github, twitter, website } = currProject.links ?? {}

  return (
    <section className="flex flex-col items-center">
      <div className="mx-auto flex h-auto w-full justify-center bg-second-gradient md:h-[272px]">
        <div className="flex flex-col gap-3 p-6 md:w-[700px]">
          <div className="flex gap-2 text-sm">
            <Link
              href="/projects"
              className="font-medium transition duration-100 hover:text-orange"
            >
              Project Library
            </Link>
            <p className="text-slate-500">/</p>
            <p className="text-slate-500">{currProject.name}</p>
          </div>
          <p className="p-2"></p>
          <h1 className="text-3xl font-bold md:text-4xl">{currProject.name}</h1>
          <div className="flex flex-wrap items-center justify-start gap-5">
            {github && (
              <Link href={github} target="_blank" rel="noreferrer">
                <div className="flex items-center gap-2">
                  <Image src={GithubVector} alt="" width={16} height={16} />
                  <p className="text-slate-600">Github</p>
                </div>
              </Link>
            )}
            {website && (
              <Link href={website} target="_blank" rel="noreferrer">
                <div className="flex items-center gap-2">
                  <Image src={GlobalVector} alt="" width={16} height={16} />
                  <p className="text-slate-600">Website</p>
                </div>
              </Link>
            )}
            {twitter && (
              <Link href={twitter} target="_blank" rel="noreferrer">
                <div className="flex items-center gap-2">
                  <Image src={TwitterVector} alt="" width={16} height={16} />
                  <p className="text-slate-600">Twitter</p>
                </div>
              </Link>
            )}
          </div>
          <p className="text-slate-600">{currProject.tldr}</p>
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-5 bg-anakiwa-100 px-6 py-10 md:px-0">
        <div className="w-full md:w-[700px]">
          <div className="relative flex items-center justify-center overflow-hidden rounded-lg">
            <Image
              src={`/project-banners/${
                currProject.image ? currProject.image : "fallback.webp"
              }`}
              alt={`${currProject.name} banner`}
              width={1200}
              height={630}
              className="w-full rounded-t-lg object-cover"
            />
          </div>
          <div className="mt-8">
            <ProjectTags project={currProject} />
          </div>
          <div className="flex w-full flex-col gap-5 pt-10 text-base font-normal leading-relaxed">
            <Markdown>{currProject.description}</Markdown>
          </div>
          <div className="py-16">
            <ProjectExtraLinks project={currProject} />
          </div>
        </div>
      </div>
      <DiscoverMoreProjects project={currProject} />
    </section>
  )
}
