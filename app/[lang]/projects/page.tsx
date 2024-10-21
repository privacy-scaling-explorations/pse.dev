import { Metadata } from "next"

import { Divider } from "@/components/divider"
import { PageHeader } from "@/components/page-header"
import ProjectFiltersBar from "@/components/project/project-filters-bar"
import { ProjectList } from "@/components/project/project-list"
import { ProjectResultBar } from "@/components/project/project-result-bar"
import { useTranslation } from "@/app/i18n"

export const metadata: Metadata = {
  title: "Project Library",
  description:
    "PSE supports projects working on theoretical cryptography research, protocol development, open source tooling, experimental applications, and more.",
}

export default async function ProjectsPage({ params: { lang } }: any) {
  const { t } = await useTranslation(lang, "projects-page")

  return (
    <Divider.Section>
      <PageHeader
        title={t("title")}
        subtitle={t("subtitle")}
        showDivider={false}
      >
        <ProjectFiltersBar lang={lang} />
      </PageHeader>

      <div className="w-full bg-white pb-28">
        <div className="container flex flex-col py-8 gap-14">
          <ProjectResultBar lang={lang} />
          <ProjectList lang={lang} />
        </div>
      </div>
    </Divider.Section>
  )
}
