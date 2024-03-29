import { HTMLAttributes } from "react"

import { cn } from "@/lib/utils"

const Section = ({ children, className }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("divide-y divide-tuatara-300", className)}>
      {children}
    </div>
  )
}

const Divider = {
  displayName: "Divider",
  Section,
}

export { Divider }
