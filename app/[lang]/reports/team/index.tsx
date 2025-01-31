"use client"

import Link from "next/link"

import { AppContent } from "@/components/ui/app-content"
import { Icons } from "@/components/icons"
import { useTranslation } from "@/app/i18n/client"


export const ReportsTeamPage = ({ lang }: any) => {
  const { t } = useTranslation(lang, "reports-page")

  return (
    <div className="flex flex-col">
      <div className="bg-project-page-gradient">
        <AppContent className="flex flex-col items-center justify-center pt-10 w-full gap-5 lg:col-start-2">
          <div className="w-full ">
            <div className="flex flex-col">
              <div className="flex flex-col gap-6 text-left">
                <Link
                  className="flex items-center gap-2 text-tuatara-950/80 hover:text-tuatara-950"
                  href={`/${lang}/reports`}
                >
                  <Icons.arrowLeft />
                  <span className="font-sans text-base">
                    {t("button.back")}
                  </span>
                </Link>
                <div className="flex flex-col gap-2">
                  <h1 className="py-2 text-3xl font-bold leading-[110%] md:text-5xl">
                    {t("team.title")}
                  </h1>

                  <span className="py-2 leading-[150%] text-base text-slate-600">
                    {t("team.description")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </AppContent>
        <div className="mt-10 hidden h-[1px] w-full bg-anakiwa-300 md:block"></div>
      </div>
      <AppContent className="grid grid-cols-1 gap-3 mx-auto pt-6 md:grid-cols-4 lg:grid-cols-4">
        <div className=" bg-slate-300 rounded-md w-full h-full aspect-square"></div>
        <div className=" bg-slate-300 rounded-md w-full h-full aspect-square"></div>
        <div className=" bg-slate-300 rounded-md w-full h-full aspect-square"></div>
        <div className=" bg-slate-300 rounded-md w-full h-full aspect-square"></div>
      </AppContent>
    </div>
  )
}
