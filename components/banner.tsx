import { ReactNode } from "react"

import { AppContent } from "./ui/app-content"

type BannerProps = {
  title: ReactNode
  subtitle?: string
  children?: ReactNode
}

const Banner = ({ title, subtitle, children }: BannerProps) => {
  return (
    <section className="relative bg-background text-center">
      <div className="py-16">
        <AppContent className="flex flex-col gap-6">
          <div className="flex flex-col items-center text-center">
            {typeof title === "string" ? (
              <h6 className="py-4 font-sans text-base font-bold uppercase tracking-[4px] text-primary dark:text-white">
                {title}
              </h6>
            ) : (
              title
            )}
            {subtitle && (
              <span className="md:max-w-[600px] font-normal font-sans text-xl text-primary dark:text-white">
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
