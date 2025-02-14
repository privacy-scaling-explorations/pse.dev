import { ReactNode } from 'react'

import { AppContent } from './ui/app-content'

type BannerProps = {
  title: ReactNode
  subtitle?: string
  children?: ReactNode
}

const Banner = ({ title, subtitle, children }: BannerProps) => {
  return (
    <section className="relative bg-white text-center">
      <div className="py-16">
        <AppContent className="flex flex-col gap-6">
          <div className="flex flex-col items-center text-center">
            {typeof title === 'string' ? (
              <h6 className="py-4 font-sans text-base font-bold uppercase tracking-[4px] text-tuatara-950">
                {title}
              </h6>
            ) : (
              title
            )}
            {subtitle && <p className="md:max-w-[600px]">{subtitle}</p>}
          </div>
          {children}
        </AppContent>
      </div>
    </section>
  )
}

Banner.displayName = 'Banner'

export { Banner }
