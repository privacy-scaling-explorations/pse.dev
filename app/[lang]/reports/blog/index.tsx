"use client"

import { useTranslation } from "@/app/i18n/client"
import { AppContent } from "@/components/ui/app-content"
import Link from "next/link"
import { Icons } from "@/components/icons"

export const ReportsBlogPage = ({ lang }: any) => {
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
                    {t("blog.title")}
                  </h1>

                  <span className="py-2 leading-[150%] text-base text-slate-600">
                    {t("blog.description")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </AppContent>
        <div className="mt-10 hidden h-[1px] w-full bg-anakiwa-300 md:block"></div>
      </div>
      <div className="flex gap-3 mx-auto pt-6"></div>
    </div>
  )
}
