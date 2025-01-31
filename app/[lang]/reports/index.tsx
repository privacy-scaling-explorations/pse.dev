"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { accelerationProgramFaq } from "@/data/programs/accelerationProgramFaq"
import { coreProgramFaq } from "@/data/programs/coreProgramFaq"
import { ReactNode } from "react-markdown/lib/ast-to-react"
import { twMerge } from "tailwind-merge"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { useAppSettings } from "@/hooks/useAppSettings"
import { Accordion } from "@/components/ui/accordion"
import { AppContent } from "@/components/ui/app-content"
import { Button } from "@/components/ui/button"
import { Dropdown, DropdownProps } from "@/components/ui/dropdown"
import { Banner } from "@/components/banner"
import { Card } from "@/components/cards/card"
import { Divider } from "@/components/divider"
import { Icons } from "@/components/icons"
import { PageHeader } from "@/components/page-header"
import { useTranslation } from "@/app/i18n/client"

type ProgramDetailProps = {
  region?: string
  title: ReactNode
  deadline?: string
  location?: string
  date: string
}

const SectionTitle = ({ label }: { label: string }) => {
  return (
    <span className="text-center font-display text-[32px] font-bold text-tuatara-950">
      {label}
    </span>
  )
}

const AccordionLabel = ({
  label,
  className,
}: {
  label: string
  className?: string
}) => {
  return (
    <span
      className={twMerge(
        "mx-auto text-center text-base font-bold uppercase tracking-[3.36px] text-tuatara-950",
        className
      )}
    >
      {label}
    </span>
  )
}

const ProgramDetail = ({
  title,
  location,
  date,
  region,
  deadline,
}: ProgramDetailProps) => {
  return (
    <div className="flex flex-col gap-4 text-center">
      <span className="font-display text-lg font-bold leading-none text-black">
        {region} <br />
        {title}
      </span>

      {deadline && (
        <span className="font-sans text-xs font-normal italic text-tuatara-500">
          Application Deadline: {deadline}
        </span>
      )}

      {location && (
        <div className="mx-auto flex items-center gap-2">
          <Icons.location />
          <span className="font-sans text-xs font-normal text-black">
            {location}
          </span>
        </div>
      )}
      <div className="mx-auto flex items-center gap-2">
        <Icons.calendar />
        <span className="font-sans text-xs font-normal text-black">{date}</span>
      </div>
    </div>
  )
}

const ProgramSections = ["coreProgram", "accelerationProgram"] as const

export const ReportsPageContent = ({ lang }: any) => {
  const { t } = useTranslation(lang, "reports-page")
  const { t: common } = useTranslation(lang, "common")
  const [activeId, setActiveId] = useState("")
  const [isManualScroll, setIsManualScroll] = useState(false)
  const SCROLL_OFFSET = -900
  const sectionsRef = useRef<NodeListOf<HTMLElement> | null>(null)
  const { REPORTS_NAV } = useAppSettings(lang)

  const howToApply: any =
    t("howToApply", {
      returnObjects: true,
    }) || []

  return (
    <div className="flex flex-col">
      <div className="bg-second-gradient">
        <PageHeader
          title={t("title")}
          subtitle={t("description")}
          image={null}
        />
      </div>
      <div className="flex gap-3 mx-auto pt-6">
        {REPORTS_NAV.map((report) => (
          <Link href={`${report.href}`} key={report.title}>
            <Button key={report.title} size="xl">
              {report.title}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  )
}
