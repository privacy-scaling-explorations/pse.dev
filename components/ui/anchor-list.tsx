import { useTranslation } from "@/app/i18n/client"
interface AnchorListProps {
  lang: string
}

const AnchorList = ({ lang }: AnchorListProps) => {
  const { t } = useTranslation(lang, "resources-page")

  return (
    <div className="flex flex-col gap-4">
      <h6 className="font-display text-lg font-bold text-tuatara-700">
        {t("onThisPage")}
      </h6>
    </div>
  )
}

AnchorList.displayName = "AnchorList"

export { AnchorList }
