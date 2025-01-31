import React from "react"
import { Metadata } from "next"

import { ReportsTeamPage } from "."

export const metadata: Metadata = {
  title: "Audit",
  description: "Audit",
}

export default function DevconPage({ params: { lang } }: any) {
  return (
    <div className="flex flex-col">
      <ReportsTeamPage lang={lang} />
    </div>
  )
}
