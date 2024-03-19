import { ReactNode } from "react"
import { t } from "i18next"

import { cn } from "@/lib/utils"

import { AppContent } from "./ui/app-content"
import { Label } from "./ui/label"

type PageHeaderProps = {
  title: ReactNode
  subtitle?: string
  actions?: ReactNode
  children?: ReactNode
  image?: ReactNode
  contentWidth?: number
}

const PageHeader = ({
  title,
  subtitle,
  actions,
  children,
  image,
  contentWidth = 600,
}: PageHeaderProps) => {
  return (
    <div className="bg-second-gradient">
      <AppContent className="flex w-full flex-col gap-14 md:py-20">
        <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:gap-28">
          <div className="flex w-full flex-col justify-center gap-8 md:max-w-[700px] lg:gap-14">
            <div className="flex flex-col gap-8">
              <Label.PageTitle label={title} />
              {subtitle && (
                <h6 className="font-sans text-base font-normal text-tuatara-950 md:text-[18px] md:leading-[27px]">
                  {subtitle}
                </h6>
              )}
            </div>
            {actions}
          </div>
          {image}
        </div>
        {children && (
          <div className="flex flex-col gap-10">
            <div className="h-[1px] w-20 bg-anakiwa-500"></div>
            {children}
          </div>
        )}
      </AppContent>
    </div>
  )
}

PageHeader.displayName = "PageHeader"

export { PageHeader }
