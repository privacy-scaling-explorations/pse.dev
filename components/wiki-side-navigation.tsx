"use client"

import { t } from "i18next"

import { cn } from "@/lib/utils"
import { useTranslation } from "@/app/i18n/client"

interface WikiSideNavigationProps {
  className?: string
  lang?: string
}

export const WikiSideNavigation = ({
  className,
  lang = "en",
}: WikiSideNavigationProps) => {
  const { t } = useTranslation(lang, "common")
  return (
    <aside className={cn("flex flex-col gap-4", className)}>
      <h6 className="font-display text-lg font-bold text-tuatara-700">
        {t("contents")}
      </h6>
      <ul className="text-normal font-sans text-black">
        <li
          onClick={(e) => {
            e?.preventDefault()
          }}
          data-id=""
          className={cn(
            "flex h-8 cursor-pointer items-center border-l-2 border-l-anakiwa-200 px-3 duration-200",
            {
              "border-l-anakiwa-500 text-anakiwa-500 font-medium": true,
            }
          )}
        >
          Lorem ipsum
        </li>
      </ul>
    </aside>
  )
}
