interface LabelProps {
  label: React.ReactNode
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
}

export { Label }
