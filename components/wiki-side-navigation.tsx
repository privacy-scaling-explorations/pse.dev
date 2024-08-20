"use client"

import { useEffect, useState } from "react"
import { t } from "i18next"

import { cn } from "@/lib/utils"
import { useTranslation } from "@/app/i18n/client"

interface WikiSideNavigationProps {
  className?: string
  lang?: string
  content?: string
}

export const WikiSideNavigation = ({
  className,
  lang = "en",
  content = "",
}: WikiSideNavigationProps) => {
  const { t } = useTranslation(lang, "common")
  const [sections, setSections] = useState<any>([])

  // get content section with regex from the content
  useEffect(() => {
    if (!content) return
    let match
    const sectionsRegex = /^(#{1}|#{2}|#{3})\s(.+)/gm

    while ((match = sectionsRegex.exec(content)) !== null) {
      const hasTitle = sections
        ?.map((item: any) => item?.text)
        .includes(match[2])
      if (hasTitle) return
      sections.push({ level: match[1].length, text: match[2] })
    }
    setSections(sections)
  }, [content])

  console.log("sectionTitles ", sections)

  return (
    <aside className={cn("flex flex-col gap-4", className)}>
      <h6 className="font-display text-lg font-bold text-tuatara-700">
        {t("contents")}
      </h6>
      <ul className="text-normal font-sans text-black">
        {sections?.map(({ text }: any) => {
          return (
            <li
              onClick={(e) => {
                e?.preventDefault()
              }}
              data-id=""
              className={cn(
                "flex h-8 cursor-pointer items-center border-l-2 border-l-anakiwa-200 px-3 duration-200",
                {
                  "border-l-anakiwa-500 text-anakiwa-500 font-medium": false,
                }
              )}
            >
              {text}
            </li>
          )
        })}
      </ul>
    </aside>
  )
}
