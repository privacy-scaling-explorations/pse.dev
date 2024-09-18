import { Metadata, ResolvingMetadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { projects } from "@/data/projects"
import GithubVector from "@/public/social-medias/github-fill.svg"
import GlobalVector from "@/public/social-medias/global-line.svg"
import TwitterVector from "@/public/social-medias/twitter-fill.svg"

import { siteConfig } from "@/config/site"
import { ProjectInterface } from "@/lib/types"
import { AppContent } from "@/components/ui/app-content"
import { Markdown, createMarkdownElement } from "@/components/ui/markdown"
import { WikiCard } from "@/components/cards/wiki-card"
import { Divider } from "@/components/divider"
import { Icons } from "@/components/icons"
import DiscoverMoreProjects from "@/components/project/discover-more-projects"
import { ProjectTags } from "@/components/project/project-detail-tags"
import ProjectExtraLinks from "@/components/project/project-extra-links"
import { ThemesStatusMapping } from "@/components/project/project-filters-bar"
import { WikiSideNavigation } from "@/components/wiki-side-navigation"
import { useTranslation } from "@/app/i18n"
import { LocaleTypes } from "@/app/i18n/settings"

type PageProps = {
  params: { id: string; lang: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export interface ProjectProps {
  project: ProjectInterface
  lang: LocaleTypes
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

export default async function ProjectDetailPage({ params }: PageProps) {
  const currProject: ProjectInterface = projects.filter(
    (project) => String(project.id) === params.id
  )[0]
  const lang = params?.lang as LocaleTypes
  const { t } = await useTranslation(lang, "common")
  const { t: projectTranslation } = await useTranslation(
    lang,
    "projects/" + currProject.id
  )

  const { github, twitter, website } = currProject.links ?? {}
  const hasSocialLinks = Object.keys(currProject?.links ?? {}).length > 0

  const editPageURL = siteConfig?.editProjectPage(currProject.id, lang)

  return (
    <section className="bg-project-page-gradient">
      <Divider.Section className="flex flex-col items-center">
        <AppContent className="flex flex-col gap-12 py-16">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[140px_1fr_290px] lg:items-start lg:gap-12">
            <div className="sticky top-20">
              <WikiSideNavigation
                className="hidden md:block"
                content={projectTranslation("description")}
              />
            </div>

            <div className="flex flex-col items-center justify-center w-full gap-5 ">
              <div className="w-full ">
                <div className="flex flex-col">
                  <div className="flex flex-col gap-6 text-left">
                    <Link
                      className="flex items-center gap-2 text-tuatara-950/80 hover:text-tuatara-950"
                      href={`/${lang}/projects`}
                    >
                      <Icons.arrowLeft />
                      <span className="font-sans text-base">
                        {t("projectLibrary")}
                      </span>
                    </Link>
                    <div className="flex flex-col gap-2">
                      <h1 className="py-2 text-3xl font-bold leading-[110%] md:text-5xl">
                        {currProject.name}
                      </h1>
                      <p className="py-2 leading-[150%] text-slate-600">
                        {projectTranslation("tldr")}
                      </p>
                    </div>
                  </div>
                  {hasSocialLinks && (
                    <div className="flex flex-wrap items-center justify-start gap-6 pt-4">
                      {github && (
                        <Link href={github} target="_blank" rel="noreferrer">
                          <div className="flex items-center gap-2">
                            <Image
                              src={GithubVector}
                              alt=""
                              width={16}
                              height={16}
                            />
                            <p className="text-slate-600">Github</p>
                          </div>
                        </Link>
                      )}
                      {website && (
                        <Link href={website} target="_blank" rel="noreferrer">
                          <div className="flex items-center gap-2">
                            <Image
                              src={GlobalVector}
                              alt=""
                              width={16}
                              height={16}
                            />
                            <p className="text-slate-600">Website</p>
                          </div>
                        </Link>
                      )}
                      {twitter && (
                        <Link href={twitter} target="_blank" rel="noreferrer">
                          <div className="flex items-center gap-2">
                            <Image
                              src={TwitterVector}
                              alt=""
                              width={16}
                              height={16}
                            />
                            <p className="text-slate-600">Twitter</p>
                          </div>
                        </Link>
                      )}
                    </div>
                  )}
                  <div className="mt-10 hidden h-[1px] w-full bg-anakiwa-300 md:block"></div>
                </div>

                <div className="flex flex-col w-full gap-6 mt-6 md:mt-10">
                  <div className="flex flex-col w-full gap-4 text-base font-normal leading-relaxed">
                    {typeof currProject?.description === "string" && (
                      <Markdown
                        components={{
                          p: ({ node, ...props }) =>
                            createMarkdownElement("p", {
                              className:
                                "text-tuatara-700 font-sans text-lg font-normal",
                              ...props,
                            }),
                        }}
                      >
                        {projectTranslation("description")}
                      </Markdown>
                    )}
                    <ProjectTags project={currProject} lang={lang} />
                  </div>
                  <ProjectExtraLinks project={currProject} lang={lang} />
                </div>
              </div>
            </div>
            <WikiCard
              className="lg:sticky lg:top-20"
              project={currProject}
              lang={lang}
            />
            <div className="lg:col-start-2">
              <Link
                href={editPageURL}
                target="_blank"
                rel="noreferrer"
                passHref
                className="inline-flex items-center self-start gap-2 px-4 py-2 duration-200 bg-white border-2 rounded-md group border-tuatara-950 hover:bg-tuatara-950 hover:text-white"
              >
                <Icons.edit />
                <span className="text-sm duration-200 text-tuatara-950 group-hover:text-white">
                  {t("editThisPage")}
                </span>
              </Link>
            </div>
          </div>
        </AppContent>

        <DiscoverMoreProjects project={currProject} lang={lang} />
      </Divider.Section>
    </section>
  )
}
