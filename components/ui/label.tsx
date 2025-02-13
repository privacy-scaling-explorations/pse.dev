import { cn } from '@/lib/utils'

interface LabelProps {
  label: React.ReactNode
  className?: string
}

const SectionTitle = ({ label, className = '' }: LabelProps) => {
  return (
    <span
      className={cn(
        'font-sans text-base font-bold uppercase leading-[24px] tracking-[3.36px] text-tuatara-950',
        className
      )}
    >
      {label}
    </span>
  )
}

const MainPageTitle = ({ label, className = '' }: LabelProps) => {
  return (
    <span
      className={cn(
        'text-4xl font-bold break-words font-display text-tuatara-950 lg:text-6xl xl:text-7xl',
        className
      )}
    >
      {label}
    </span>
  )
}

const Label = {
  displayName: 'Label',
  PageTitle: MainPageTitle,
  Section: SectionTitle,
}

export { Label }
