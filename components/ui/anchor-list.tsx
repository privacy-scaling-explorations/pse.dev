import { useTranslation } from "@/app/i18n"

interface AnchorListProps {
  lang: string
}

const AnchorList = ({ lang }: AnchorListProps) => {
  const { t } = useTranslation(lang, "resources-page")

  return <div></div>
}

AnchorList.displayName = "AnchorList"

export { AnchorList }
