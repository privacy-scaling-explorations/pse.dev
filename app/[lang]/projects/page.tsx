import { Suspense } from "react"
import { Metadata } from "next"

import { AppContent } from "@/components/ui/app-content"
import { Label } from "@/components/ui/label"
import { Divider } from "@/components/divider"
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
    <div className="flex flex-col">
      <div className="w-full bg-page-header-gradient">
        <AppContent className="flex flex-col gap-4 py-10 w-full">
          <Label.PageTitle label={t("title")} />
          <h6 className="font-sans text-base font-normal text-tuatara-950 md:text-[18px] md:leading-[27px] md:max-w-[700px]">
            {t("subtitle")}
          </h6>
        </AppContent>
      </div>

      <AppContent className="flex flex-col gap-10 py-10">
        <Suspense fallback={<div>Loading...</div>}>
          <div className="flex flex-col gap-4">
            <ProjectFiltersBar lang={lang} />
            <ProjectResultBar lang={lang} />
          </div>
        </Suspense>
        <ProjectList lang={lang} />
      </AppContent>
    </div>
  )
}
