import Link from "next/link"

import { getReportById } from "@/lib/reports"
import { AppContent } from "@/components/ui/app-content"
import { ReactNode } from "react"

export const ReportContent = ({
  slug,
  header,
}: {
  slug: string
  header: ReactNode
}) => {
  const report = getReportById(slug)
  return (
    <div className="bg-project-page-gradient">
      <AppContent className="flex flex-col items-center justify-center pt-10 w-full gap-5 lg:col-start-2">
        <div className="w-full ">
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
      <div className="mt-10 hidden h-[1px] w-full bg-anakiwa-300 md:block"></div>
    </div>
  )
}
