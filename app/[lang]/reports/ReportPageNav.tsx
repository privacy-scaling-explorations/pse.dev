"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { useAppSettings } from "@/hooks/useAppSettings"
import { Button } from "@/components/ui/button"
import { Divider } from "@/components/divider"
import { PageHeader } from "@/components/page-header"
import { useTranslation } from "@/app/i18n/client"

export const ReportPageNav = ({ lang, activeView }: any) => {
  const { t } = useTranslation(lang, "reports-page")
  const { REPORTS_NAV } = useAppSettings(lang)

  return (
    <div className="flex flex-col gap-10">
      <div className="bg-second-gradient">
        <Divider.Section className="flex flex-col border-b border-b-tuatara-300">
          <PageHeader
            title={t("title")}
            subtitle={t("description")}
            className="max-h-[260px]"
            containerClassName="w-[978px] mx-auto"
            image={null}
          />
        </Divider.Section>
      </div>
      <div className="lg:flex grid grid-cols-1 gap-4 lg:items-center mx-auto">
        {REPORTS_NAV.map((report, index) => {
          const isActive = report.id === activeView
          return (
            <Link href={`${report.href}`} key={report.title}>
              <Button
                key={report.title}
                size="xl"
                variant={isActive ? "default" : "outline"}
              >
                {report.title}
              </Button>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
