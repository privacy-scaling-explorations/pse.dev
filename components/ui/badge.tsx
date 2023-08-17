import React, { HtmlHTMLAttributes } from "react"

interface BadgeProps extends HtmlHTMLAttributes<HTMLDivElement> {
  value?: number | string
}

export default function Badge({ value, children }: BadgeProps) {
  if (!value) return <>{children}</>

  return (
    <div className="relative">
      <div className="absolute flex items-center justify-center min-w-4 h-4 m-auto rounded-full bg-anakiwa-950  -top-[5px] -right-[5px] px-[6px]">
        <span className="text-xs text-white">{value}</span>
      </div>
      {children}
    </div>
  )
}
