import Image from "next/image"
import Link from "next/link"

import { useTranslation } from "@/app/i18n/client"
import { LocaleTypes } from "@/app/i18n/settings"

import { Card } from "../cards/card"
import { Icons } from "../icons"
import { AppContent } from "../ui/app-content"
import { Button } from "../ui/button"

interface ConnectWithUsProps {
  lang: LocaleTypes
}

const ConnectWithUs = ({ lang }: ConnectWithUsProps) => {
  const { t } = useTranslation(lang, "homepage")
  const { t: common } = useTranslation(lang, "common")

  return (
    <div className="bg-white py-14 md:pb-32 md:pt-16">
      <div className="flex flex-col gap-10">
        <h3 className="text-center font-sans text-base font-bold uppercase tracking-[3.36px]">
          {common("ourYearProgram", {
            year: new Date().getFullYear(),
          })}
        </h3>
        <AppContent className="mx-auto max-w-[978px]">
          <Card className="!px-10 !py-16">
            <div className="bg-radial-gradient grid grid-cols-1 gap-8 md:grid-cols-[2fr_1fr] md:gap-4">
              <div className="flex flex-col gap-8 text-center md:text-left">
                <h3 className="text-4xl md:text-5xl">
                  {t("connectWithUs.title")}
                </h3>
                <span> {t("connectWithUs.description")}</span>
                <div>
                  <Link href="/programs">
                    <Button className="w-full md:w-auto">
                      <div className="flex items-center gap-2">
                        <span className="uppercase">{common("learnMore")}</span>
                        <Icons.arrowRight size={20} />
                      </div>
                    </Button>
                  </Link>
                </div>
              </div>
              <Image
                width={280}
                height={280}
                className="mx-auto h-[153px] w-[174px] lg:ml-auto lg:h-[256px] lg:w-[290px]"
                src="/images/programs.png"
                alt="computer image"
              />
            </div>
          </Card>
        </AppContent>
      </div>
    </div>
  )
}

ConnectWithUs.displayName = "ConnectWithUs"

export { ConnectWithUs }
