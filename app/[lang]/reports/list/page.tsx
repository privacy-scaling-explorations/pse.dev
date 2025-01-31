import React from "react"
import { Metadata } from "next"

import { AppContent } from "@/components/ui/app-content"

import { ReportsListPageContent } from "."
import { ReportsList } from "./ReportsList"

export const metadata: Metadata = {
  title: "Reports",
  description: "Reports",
}

export default function ReportsListPage({ params: { lang } }: any) {
  return (
    <div className="flex flex-col gap-10 pb-10">
      <ReportsListPageContent lang={lang} />
      <AppContent>
        <ReportsList lang={lang} />
      </AppContent>
    </div>
  )
}
