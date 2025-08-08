import { ReactNode } from "react"

import { AppContent } from "./ui/app-content"
import { cn } from "@/lib/utils"

type BannerProps = {
  title: ReactNode
  subtitle?: string
  children?: ReactNode
  className?: string
}

const Banner = ({ title, subtitle, children, className }: BannerProps) => {
  return (
    <section
      className={cn(
        "relative bg-cover-gradient dark:bg-anakiwa-975 text-center dark:bg-none",
        className
      )}
    >
      <div className="py-16">
        <AppContent className="flex flex-col gap-8">
          <div className="flex flex-col items-center text-center">
            {typeof title === "string" ? (
              <h6 className="py-4 font-sans text-base font-bold uppercase tracking-[4px] text-tuatara-950 dark:text-anakiwa-400">
                {title}
              </h6>
            ) : (
              title
            )}
            {subtitle && (
              <span className="md:max-w-[600px] font-normal font-sans text-base text-tuatara-950 dark:text-tuatara-100">
                {subtitle}
              </span>
            )}
          </div>
          {children}
        </AppContent>
      </div>
    </section>
  )
}

Banner.displayName = "Banner"

export { Banner }
