import { LABELS } from "@/app/labels"
import ProjectFiltersBar from "@/components/project/project-filters-bar"
import { ProjectList } from "@/components/project/project-list"
import { ProjectResultBar } from "@/components/project/project-result-bar"
import { AppContent } from "@/components/ui/app-content"
import { Label } from "@/components/ui/label"
import { Metadata } from "next"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Project Library",
  description:
    "PSE supports projects working on theoretical cryptography research, protocol development, open source tooling, experimental applications, and more.",
}

export default async function ProjectsPage() {
  return (
    <div className="flex flex-col">
      <AppContent className="flex flex-col gap-10 py-10 lg:py-16 w-full">
        <div className="flex flex-col gap-5">
          <div className="lg:w-1/2 mx-auto w-full">
            <div className="flex flex-col gap-10">
              <h1 className="dark:text-tuatara-100 text-tuatara-950 text-xl lg:text-3xl font-normal font-sans text-center">
                {LABELS.PROJECTS_PAGE.TITLE}
              </h1>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <Suspense fallback={<div>Loading...</div>}>
              <div className="lg:!w-1/2 mx-auto w-full">
                <ProjectFiltersBar />
              </div>
              <ProjectResultBar />
            </Suspense>
          </div>
        </div>
        <ProjectList />
      </AppContent>
    </div>
  )
}
