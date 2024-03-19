import { cn } from "@/lib/utils"

interface LabelProps {
  label: React.ReactNode
  className?: string
}

const SectionTitle = ({ label, className = "" }: LabelProps) => {
  return (
    <h3
      className={cn(
        "font-sans text-base font-bold uppercase leading-[24px] tracking-[3.36px] text-tuatara-950",
        className
      )}
    >
      {label}
    </h3>
  )
}

const MainPageTitle = ({ label }: LabelProps) => {
  return (
    <h6 className="break-words font-display text-4xl font-bold text-tuatara-950 lg:text-6xl xl:text-7xl">
      {label}
    </h6>
  )
}

const Label = {
  displayName: "Label",
  PageTitle: MainPageTitle,
  Section: SectionTitle,
}

export { Label }
