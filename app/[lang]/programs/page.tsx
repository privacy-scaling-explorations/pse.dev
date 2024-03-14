"use client"

import { ReactNode } from "react"
import Image from "next/image"
import { accelerationProgramFaq } from "@/data/programs/accelerationProgramFaq"
import { contributionsProgramFaq } from "@/data/programs/contributionsProgramFaq"

import { cn } from "@/lib/utils"
import { Accordion } from "@/components/ui/accordion"
import { AppContent } from "@/components/ui/app-content"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/cards/card"
import { Icons } from "@/components/icons"
import { useTranslation } from "@/app/i18n/client"

type ProgramDetailProps = {
  region?: string
  title: ReactNode
  location?: string
  date: string
  application?: string
  size?: "xs" | "sm"
}

const SectionTitle = ({ label }: { label: string }) => {
  return (
    <span className="text-center font-display text-[32px] font-bold tracking-[3.36px] text-tuatara-950">
      {label}
    </span>
  )
}
const SectionLabel = ({ label }: { label: string }) => {
  return (
    <span className="text-center font-sans text-base font-bold uppercase tracking-[3.36px] text-tuatara-950">
      {label}
    </span>
  )
}

const ProgramDetail = ({
  title,
  location,
  date,
  application,
  region,
  size = "sm",
}: ProgramDetailProps) => {
  return (
    <div
      className={cn("flex flex-col text-center", {
        "gap-10": size === "sm",
        "gap-5": size === "xs",
      })}
    >
      <div className="flex flex-col">
        <span className="font-display text-lg font-bold leading-none text-black">
          {region}
        </span>
        <span className="font-display text-lg font-bold leading-none text-black">
          {title}
        </span>
      </div>
      <div className="flex flex-col gap-6">
        {application && (
          <div className="mx-auto flex items-center gap-2">
            <Icons.checked />
            <span className="font-sans text-xs font-normal text-black">
              {application}
            </span>
          </div>
        )}
        {location && (
          <div className="mx-auto flex items-center gap-2">
            <Icons.location />
            <span className="font-sans text-xs font-normal text-black">
              {location}
            </span>
          </div>
        )}
        <div className="mx-auto flex items-center gap-2">
          <Icons.calendar />
          <span className="font-sans text-xs font-normal text-black">
            {date}
          </span>
        </div>
      </div>
    </div>
  )
}
export default function ProgramsPage({ params: { lang } }: any) {
  const { t } = useTranslation(lang, "programs-page")

  const contributionsProgramDescription: any[] =
    t("contributionsProgram.description", {
      returnObjects: true,
    }) || []
  const accelerationProgramDescription: any[] =
    t("accelerationProgram.description", {
      returnObjects: true,
    }) ?? []

  const curriculum: any[] =
    t("curriculum", {
      returnObjects: true,
    }) ?? []

  return (
    <div className="flex flex-col">
      <div className="bg-second-gradient">
        <AppContent className="flex gap-[56px]">
          <div className="grid w-full grid-cols-1 gap-16 py-10 lg:grid-cols-[1fr_1fr] lg:gap-2 lg:py-20">
            <div className="flex w-full flex-col gap-8 lg:max-w-[650px]">
              <Label.PageTitle label={t("title")} />
              <span className="font-sans text-base font-normal leading-[27px] text-tuatara-950">
                {t("description")}
              </span>
            </div>
            <Image
              width={280}
              height={280}
              className="mx-auto h-[210px] w-[276px] lg:ml-auto lg:h-[350px] lg:w-[460px]"
              src="/images/computer.png"
              alt="computer image"
            />
          </div>
        </AppContent>
      </div>
      <AppContent className="relative mx-auto flex gap-5">
        <div className="flex w-full flex-col">
          <div className="w-full border-b border-tuatara-300 py-10 md:py-16">
            <div className="container mx-auto flex flex-col md:max-w-2xl">
              <div className="flex flex-col gap-8">
                <SectionTitle label={t("contributionsProgram.title")} />
                <div className="flex flex-col">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <Card className="flex flex-col gap-10">
                      <ProgramDetail
                        region="LatAm"
                        title="Contributions Program"
                        location="Buenos Aires - Cuenca - San Jose"
                        date="Jul. 22, 2024 - Sep. 15, 2024"
                      />
                      <Button className="uppercase">
                        <div className="flex items-center gap-3">
                          <span>{t("common.applyNow")}</span>
                          <Icons.arrowRight size={20} />
                        </div>
                      </Button>
                    </Card>
                    <Card className="flex flex-col gap-10">
                      <ProgramDetail
                        region="Asia"
                        title="Contributions Program"
                        location="Seoul - Taipei - Tokyo"
                        date="Jul. 29, 2024 - Sep. 22, 2024"
                      />
                      <Button className="uppercase">
                        <div className="flex items-center gap-3">
                          <span>{t("common.applyNow")}</span>
                          <Icons.arrowRight size={20} />
                        </div>
                      </Button>
                    </Card>
                  </div>
                  <div className="flex flex-col gap-2 py-10 md:py-16">
                    {contributionsProgramDescription?.map(
                      (description, index) => {
                        return (
                          <span
                            key={index}
                            className="font-sans text-base text-black"
                          >
                            {description}
                          </span>
                        )
                      }
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-8">
                  <SectionLabel label={t("common.curriculum")} />
                  <Card
                    className="divide-y divide-tuatara-300"
                    padding="none"
                    variant="transparent"
                  >
                    {curriculum.map(({ title, items }, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-1 divide-tuatara-300 md:grid-cols-[1fr_2.5fr] md:divide-x"
                      >
                        <div className="flex items-center justify-center border-b border-tuatara-300 bg-anakiwa-100 p-2 text-center md:border-none">
                          <span className="text-xs font-bold uppercase tracking-[2.5px] text-tuatara-950">
                            {t("common.week", {
                              week: index,
                            })}
                            <br />
                            {title}
                          </span>
                        </div>
                        <div className="py-2">
                          <ul className="ml-10 list-disc">
                            {items.map((label: string, index: number) => {
                              return <li key={index}>{label}</li>
                            })}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </Card>
                </div>
                <div className="flex flex-col gap-8 pt-6">
                  <SectionLabel label={t("common.faq")} />
                  <Accordion
                    className="!border-anakiwa-300"
                    size="xs"
                    items={contributionsProgramFaq.map(
                      ({ question, answer }, index) => {
                        return {
                          label: (
                            <span className="font-sans text-base font-semibold text-black">
                              {question}
                            </span>
                          ),
                          value: `${index}`,
                          children: answer,
                        }
                      }
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="container mx-auto flex flex-col py-10 md:max-w-2xl md:py-16">
            <div className="flex flex-col gap-5">
              <SectionTitle label={t("accelerationProgram.title")} />
              <Card className="flex flex-col gap-5">
                <ProgramDetail
                  size="xs"
                  title="Acceleration Program Round 2"
                  application="Applications Open"
                  date="Feb. 29, 2024 - May 31, 2024"
                />
                <Button className="uppercase">
                  <div className="flex items-center gap-3">
                    {t("common.learnMoreOnGithub")}
                    <Icons.arrowRight size={20} />
                  </div>
                </Button>
              </Card>
            </div>
            <div className="flex flex-col gap-2 py-10 md:py-16">
              {accelerationProgramDescription?.map((description, index) => {
                return (
                  <span key={index} className="font-sans text-base text-black">
                    {description}
                  </span>
                )
              })}
            </div>
            <div className="flex flex-col gap-8">
              <SectionLabel label={t("common.faq")} />
              <Accordion
                className="!border-anakiwa-300"
                size="xs"
                items={accelerationProgramFaq.map(
                  ({ question, answer }, index) => {
                    return {
                      label: (
                        <span className="font-sans text-base font-semibold text-black">
                          {question}
                        </span>
                      ),
                      value: `${index}`,
                      children: answer,
                    }
                  }
                )}
              />
            </div>
          </div>
        </div>
      </AppContent>
    </div>
  )
}
