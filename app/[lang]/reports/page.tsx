import React from "react"
import { Metadata } from "next"

import { ReportsPageContent } from "."

export const metadata: Metadata = {
  title: "Audit",
  description: "Audit",
}

export default function DevconPage({ params: { lang } }: any) {
  return (
    <div className="flex flex-col">
      <ReportsPageContent lang={lang} />
    </div>
  )
}
