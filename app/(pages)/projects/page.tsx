import { Suspense } from "react"
import { Metadata } from "next"

import { AppContent } from "@/components/ui/app-content"
import { Label } from "@/components/ui/label"
import ProjectFiltersBar from "@/components/project/project-filters-bar"
import { ProjectList } from "@/components/project/project-list"
import { ProjectResultBar } from "@/components/project/project-result-bar"
import { LABELS } from "@/app/labels"

export const metadata: Metadata = {
  title: "Project Library",
  description:
    "PSE supports projects working on theoretical cryptography research, protocol development, open source tooling, experimental applications, and more.",
}

export default async function ProjectsPage() {
  return (
    <div className="flex flex-col">
      <div className="w-full bg-page-header-gradient dark:bg-transparent-gradient">
        <AppContent className="flex flex-col gap-4 py-10 w-full">
          <Label.PageTitle label={LABELS.PROJECTS_PAGE.TITLE} />
          <h6 className="font-sans text-base font-normal text-primary md:text-[18px] md:leading-[27px] md:max-w-[700px]">
            {LABELS.PROJECTS_PAGE.SUBTITLE}
          </h6>
        </AppContent>
      </div>

      <AppContent className="flex flex-col gap-10 py-10">
        <Suspense fallback={<div>Loading...</div>}>
          <div className="flex flex-col gap-4">
            <ProjectFiltersBar />
            <ProjectResultBar />
          </div>
        </Suspense>
        <ProjectList />
      </AppContent>
    </div>
  )
}
