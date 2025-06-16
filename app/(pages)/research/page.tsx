import { Metadata } from "next"
import { LABELS } from "@/app/labels"
import { AppContent } from "@/components/ui/app-content"
import { Label } from "@/components/ui/label"
import { ResearchList } from "@/components/research/research-list"

export const metadata: Metadata = {
  title: "Research",
  description:
    "PSE supports projects working on theoretical cryptography research, protocol development, open source tooling, experimental applications, and more.",
}

const ResearchPage = async () => {
  return (
    <div className="flex flex-col gap-10 lg:gap-32 pb-[128px] ">
      <div className="w-full bg-page-header-gradient dark:bg-transparent-gradient">
        <AppContent className="flex flex-col gap-4 py-10 w-full">
          <Label.PageTitle label={LABELS.RESEARCH_PAGE.TITLE} />
          <h6 className="font-sans text-base font-normal text-primary md:text-[18px] md:leading-[27px] md:max-w-[700px]">
            {LABELS.RESEARCH_PAGE.SUBTITLE}
          </h6>
        </AppContent>
      </div>

      <AppContent className="flex flex-col gap-10">
        <ResearchList />
      </AppContent>
    </div>
  )
}

export default ResearchPage
