import React from "react"
import { Metadata } from "next"

import { AppContent } from "@/components/ui/app-content"

import { ReportsBlogPage } from "."
import { BlogList } from "./BlogList"
import { ReportPageNav } from "../ReportPageNav"

export const metadata: Metadata = {
  title: "Blog",
  description: "Blog",
}

export default function BlogPage({ params: { lang } }: any) {
  return (
    <div className="flex flex-col gap-10 pb-10">
      <ReportPageNav lang={lang} activeView="tech-blog" />
      <AppContent className="flex w-full max-w-[978px]">
        <BlogList lang={lang} />
      </AppContent>
    </div>
  )
}
