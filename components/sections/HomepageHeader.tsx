"use client"

import { useTranslation } from "@/app/i18n/client"
import { Icons } from "../icons"
import { PageHeader } from "../page-header"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import Image from "next/image"
import PSELogo from "@/public/icons/archstar.webp"
import { motion } from "framer-motion"
import Link from "next/link"

export const HomepageHeader = ({ lang }: { lang: any }) => {
  const { t } = useTranslation(lang, "homepage")
  const { t: common } = useTranslation(lang, "common")

  return (
    <PageHeader
      title={
        <motion.h1
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, cubicBezier: "easeOut" }}
        >
          <Label.PageTitle size="large" label={t("headerTitle")} />
        </motion.h1>
      }
      subtitle={t("headerSubtitle")}
      image={
        <div className="m-auto flex h-[320px] w-full max-w-[280px] items-center justify-center md:m-0 md:h-full md:w-full lg:max-w-[380px]">
          <Image src={PSELogo} alt="pselogo" style={{ objectFit: "cover" }} />
        </div>
      }
      actions={
        <div className="flex flex-col lg:flex-row gap-10">
          <Link href={"/research"} className="flex items-center gap-2 group">
            <Button className="w-full sm:w-auto">
              <div className="flex items-center gap-1">
                <span className="text-base font-medium uppercase">
                  {common("research")}
                </span>
                <Icons.arrowRight
                  fill="white"
                  className="h-5 duration-200 ease-in-out group-hover:translate-x-2"
                />
              </div>
            </Button>
          </Link>
          <Link href={"/projects"} className="flex items-center gap-2 group">
            <Button className="w-full sm:w-auto">
              <div className="flex items-center gap-1">
                <span className="text-base font-medium uppercase">
                  {common("developmentProjects")}
                </span>
                <Icons.arrowRight
                  fill="white"
                  className="h-5 duration-200 ease-in-out group-hover:translate-x-2"
                />
              </div>
            </Button>
          </Link>
        </div>
      }
    />
  )
}
