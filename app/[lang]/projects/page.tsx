import { Metadata } from "next"
import Image from "next/image"

import { PageHeader } from "@/components/page-header"
import ProjectFiltersBar from "@/components/project/project-filters-bar"
import { ProjectList } from "@/components/project/project-list"
import { ProjectResultBar } from "@/components/project/project-result-bar"
import { useTranslation } from "@/app/i18n"

export const metadata: Metadata = {
  title: "Project Library",
  description:
    "PSE is home to many projects, from cryptography research to developer tools, protocols, and proof-of-concept applications.",
}

export default async function ProjectsPage({ params: { lang } }: any) {
  const { t } = await useTranslation(lang, "projects-page")

  return (
    <>
      <PageHeader title={t("title")} subtitle={t("subtitle")}>
        <ProjectFiltersBar lang={lang} />
      </PageHeader>

      <div className="w-full bg-white pb-28">
        <div className="container flex flex-col gap-14 py-8">
          <div>
            <ProjectResultBar lang={lang} />
          </div>
          <ProjectList lang={lang} />
        </div>
      </div>
    </>
  )
}
