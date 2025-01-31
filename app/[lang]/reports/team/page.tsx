"use client"

import React from "react"

import { AppContent } from "@/components/ui/app-content"

import { ReportPageNav } from "../ReportPageNav"

export default function TeamPage({ params: { lang } }: any) {

  return (
    <div className="flex flex-col pb-10 lg:pb-16">
      <ReportPageNav lang={lang} activeView="team" />
      <AppContent className="flex w-full max-w-[978px]">
        <AppContent className="max-w-[978px] pt-10 grid grid-cols-1 gap-3 mx-auto md:grid-cols-4 lg:grid-cols-4 w-full">
          <div className=" bg-slate-300 rounded-md w-full h-full aspect-square"></div>
          <div className=" bg-slate-300 rounded-md w-full h-full aspect-square"></div>
          <div className=" bg-slate-300 rounded-md w-full h-full aspect-square"></div>
          <div className=" bg-slate-300 rounded-md w-full h-full aspect-square"></div>
        </AppContent>
      </AppContent>
    </div>
  )
}
