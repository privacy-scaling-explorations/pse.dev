import { Metadata } from "next"
import { useTranslation } from "@/app/i18n"
import ProjectFiltersBar from "@/components/project/project-filters-bar"
import { ProjectList } from "@/components/project/project-list"
import { ProjectResultBar } from "@/components/project/project-result-bar"
import { AppContent } from "@/components/ui/app-content"
import { Suspense } from "react"
import { Label } from "@/components/ui/label"
import { ResearchList } from "@/components/research/research-list"

export const metadata: Metadata = {
  title: "Research",
  description:
    "PSE supports projects working on theoretical cryptography research, protocol development, open source tooling, experimental applications, and more.",
}

const ResearchPage = async ({ params: { lang } }: any) => {
  const { t } = await useTranslation(lang, "research-page")
  return (
    <div className="flex flex-col gap-10 lg:gap-32 pb-[128px]">
      <div
        className="w-full"
        style={{
          background: "linear-gradient(180deg, #C2E8F5 -17.44%, #FFF 62.5%)",
        }}
      >
        <AppContent className="flex flex-col gap-4 pt-10 w-full lg:px-[200px]">
          <Label.PageTitle label={t("title")} />
          <h6 className="font-sans text-base font-normal text-tuatara-950 md:text-[18px] md:leading-[27px] md:max-w-[700px]">
            {t("subtitle")}
          </h6>
        </AppContent>
      </div>

      <AppContent className="flex flex-col gap-10">
        <ResearchList lang={lang} />
      </AppContent>
    </div>
  )
}

export default ResearchPage
