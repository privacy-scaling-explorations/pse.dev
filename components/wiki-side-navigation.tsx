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

  if (sections?.length === 0) return null
  return (
    <aside className={cn("flex flex-col gap-4", className)}>
      <h6 className="text-lg font-bold font-display text-tuatara-700">
        {t("contents")}
      </h6>
      <ul className="font-sans text-black text-normal">
        {sections?.map(({ text }: any) => {
          const list = Array.from(document.querySelectorAll("h6"))
            .concat(Array.from(document.querySelectorAll("h5")))
            .concat(Array.from(document.querySelectorAll("h4")))
            .concat(Array.from(document.querySelectorAll("h3")))
            .concat(Array.from(document.querySelectorAll("h2")))
            .concat(Array.from(document.querySelectorAll("h2")))
          return (
            <li
              onClick={(e) => {
                e?.preventDefault()
                const section = list.find((el: any) =>
                  el.textContent.includes(text)
                )

                if (section) {
                  section?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  })
                }
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
