import { ReactNode } from "react"

import { getReportById } from "@/lib/reports"
import { AppContent } from "@/components/ui/app-content"

export const ReportContent = ({
  slug,
  header,
}: {
  slug: string
  header: ReactNode
}) => {
  const report = getReportById(slug)
  return (
    <div className="bg-project-page-gradient border-b border-tuatara-300 pb-4">
      <AppContent className="flex flex-col items-center justify-center pt-10 w-full gap-5 lg:col-start-2">
        <div className="w-full max-w-[978px]">
          <div className="flex flex-col">
            <div className="flex flex-col gap-6 text-left">
              {header}
              <div className="flex flex-col gap-2">
                <h1 className="py-2 text-3xl font-bold leading-[110%] md:text-5xl">
                  {report?.title}
                </h1>
                <span className="py-2 leading-[150%] text-base text-slate-600">
                  {report?.tldr}
                </span>
              </div>
            </div>
          </div>
        </div>
      </AppContent>
    </div>
  )
}
