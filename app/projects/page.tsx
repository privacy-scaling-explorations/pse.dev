import { Metadata } from "next"

import ProjectFiltersBar from "@/components/project/project-filters-bar"
import ProjectList from "@/components/project/project-list"
import { ProjectResultBar } from "@/components/project/project-result-bar"

export const metadata: Metadata = {
  title: "Project Library",
  description:
    "PSE is home to many projects, from cryptography research to developer tools, protocols, and proof-of-concept applications.",
}

export default function ProjectsPage() {
  return (
    <section>
      <div className="bg-anakiwa-200">
        <div className="container mx-auto py-10 lg:py-20">
          <div className="flex flex-col justify-between gap-10">
            <div>
              <h1 className="font-display text-4xl font-bold text-tuatara-950 md:text-5xl">
                Explore the project library
              </h1>
              <p className="p-2"></p>
              <p className="w-full text-lg md:w-[612px] md:text-xl">
                PSE is home to many projects, from cryptography research to
                developer tools, protocols and proof-of-concept applications.
              </p>
            </div>
            <div className=" h-[1px] w-20 bg-anakiwa-500"></div>
            <ProjectFiltersBar />
          </div>
        </div>
      </div>

      <div className="w-full bg-anakiwa-100">
        <div className="container">
          <div className="px-3 py-8">
            <ProjectResultBar />
          </div>
          <ProjectList />
        </div>
      </div>
    </section>
  )
}
