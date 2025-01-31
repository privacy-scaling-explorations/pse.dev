import React from "react"
import { Metadata } from "next"

import { AppContent } from "@/components/ui/app-content"
import { ReportsList } from "./list/ReportsList"
import { ReportPageNav } from "./ReportPageNav"

export const metadata: Metadata = {
  title: "Audit",
  description: "Audit",
}

export default function ReportsPage({ params: { lang } }: any) {
  return (
    <div className="flex flex-col pb-10 lg:pb-16">
      <ReportPageNav lang={lang} activeView="reports" />
      <AppContent className="flex w-full max-w-[978px] pt-10">
        <ReportsList lang={lang} />
      </AppContent>
    </div>
  )
}
