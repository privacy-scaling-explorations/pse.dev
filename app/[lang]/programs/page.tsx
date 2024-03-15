"use client"

import { ReactNode, useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { accelerationProgramFaq } from "@/data/programs/accelerationProgramFaq"
import { contributionsProgramFaq } from "@/data/programs/contributionsProgramFaq"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Accordion } from "@/components/ui/accordion"
import { AppContent } from "@/components/ui/app-content"
import { Button } from "@/components/ui/button"
import { Dropdown, DropdownProps } from "@/components/ui/dropdown"
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

const AccordionLabel = ({ label }: { label: string }) => {
  return (
    <span className="mx-auto text-center text-base font-bold uppercase tracking-[3.36px] text-tuatara-950">
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

const ProgramSections = ["contributionsProgram", "accelerationProgram"] as const

const ChooseProgramItems: { label: string; value: string; href?: string }[] = [
  {
    label: "Contributions Program Asia",
    value: "contributionsProgramAsia",
    href: siteConfig.links.applyContributionProgram,
  },
  {
    label: "Contributions Program LatAm",
    value: "contributionsProgramaLatAm",
    href: siteConfig.links.applyContributionProgram,
  },
  {
    label: "Acceleration Program",
    value: "accelerationProgram",
    href: siteConfig.links.applyContributionProgram,
  },
]
export default function ProgramsPage({ params: { lang } }: any) {
  const { t } = useTranslation(lang, "programs-page")
  const { t: common } = useTranslation(lang, "common")
  const [activeId, setActiveId] = useState("")
  const [isManualScroll, setIsManualScroll] = useState(false)
  const [selectedProgram, setSelectedProgram] = useState("")
  const SCROLL_OFFSET = -400
  const sectionsRef = useRef<NodeListOf<HTMLElement> | null>(null)

  const howToApply: any =
    t("howToApply", {
      returnObjects: true,
    }) || []

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

  useEffect(() => {
    if (sectionsRef.current === null)
      sectionsRef.current = document.querySelectorAll(`div[data-section]`)
    if (!activeId) setActiveId(ProgramSections?.[0] ?? "")

    const handleScroll = () => {
      if (isManualScroll) return

      sectionsRef.current?.forEach((section: any) => {
        const sectionTop = section.offsetTop - SCROLL_OFFSET
        if (window.scrollY >= sectionTop && window.scrollY > 0) {
          setActiveId(section.getAttribute("id"))
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [SCROLL_OFFSET, activeId, isManualScroll])

  const scrollToId = useCallback((id: string) => {
    const element = document.getElementById(id)
    const top = element?.offsetTop ?? 0

    if (element) {
      setActiveId(id) // active clicked id
      setIsManualScroll(true) // tell the window event listener to ignore this scrolling
      window?.scrollTo({
        behavior: "smooth",
        top: (top ?? 0) - SCROLL_OFFSET,
      })
    }

    setTimeout(() => setIsManualScroll(false), 800)
  }, [])

  const selectedProgramKey: string =
    ChooseProgramItems?.find((item) => item.value === selectedProgram)?.label ??
    ""
  const selectedProgramLabel = t(selectedProgramKey)

  const ApplyButton = () => {
    return (
      <Button className="w-full uppercase" disabled={!selectedProgram}>
        <div className="flex items-center gap-3">
          <span>{t("common.applyNow")}</span>
          <Icons.arrowRight size={20} />
        </div>
      </Button>
    )
  }

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
            <div className="flex flex-col gap-6 md:max-w-xs">
              <div className="flex flex-col gap-1">
                <span className="text-xs">{common("chooseProgram")}*</span>
                <Dropdown
                  className="border border-tuatara-300 bg-white py-2 pl-6 pr-4"
                  label={
                    !selectedProgram
                      ? `${common("chooseProgram")}`
                      : selectedProgramLabel
                  }
                  items={ChooseProgramItems as DropdownProps["items"]}
                  width={320}
                  onChange={(value: any) => setSelectedProgram(value)}
                  defaultItem="contributionsProgram"
                />
              </div>
              {!selectedProgram ? (
                <ApplyButton />
              ) : (
                <Link
                  target="_blank"
                  href={siteConfig.links.applyContributionProgram}
                >
                  <ApplyButton />
                </Link>
              )}
            </div>
          </div>
        </AppContent>
      </div>
      <AppContent className="relative mx-auto flex w-full items-start">
        <div className="flex w-full flex-col">
          <div
            id="contributionsProgram"
            data-section="contributionsProgram"
            className="w-full border-b border-tuatara-300 py-10 md:py-16"
          >
            <div className="mx-auto flex flex-col md:max-w-2xl">
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
                      <Link
                        href={siteConfig.links.latAmContributionProgram}
                        target="_blank"
                      >
                        <Button className="w-full uppercase">
                          <div className="flex items-center gap-3">
                            <span>{t("common.applyNow")}</span>
                            <Icons.arrowRight size={20} />
                          </div>
                        </Button>
                      </Link>
                    </Card>
                    <Card className="flex flex-col gap-10">
                      <ProgramDetail
                        region="Asia"
                        title="Contributions Program"
                        location="Seoul - Taipei - Tokyo"
                        date="Jul. 29, 2024 - Sep. 22, 2024"
                      />
                      <Link
                        href={siteConfig.links.asiaContributionProgram}
                        target="_blank"
                      >
                        <Button className="w-full uppercase">
                          <div className="flex items-center gap-3">
                            <span>{t("common.applyNow")}</span>
                            <Icons.arrowRight size={20} />
                          </div>
                        </Button>
                      </Link>
                    </Card>
                  </div>
                  <div className="flex flex-col gap-2 pt-8">
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
                <div className="flex flex-col gap-10">
                  <Accordion
                    size="xs"
                    className="!border-none"
                    iconOnHover={false}
                    items={[
                      {
                        label: (
                          <AccordionLabel label={t("common.curriculum")} />
                        ),
                        value: "curriculum",
                        children: (
                          <Card
                            className="mt-10 divide-y divide-tuatara-300"
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
                                    {items.map(
                                      (label: string, index: number) => {
                                        return <li key={index}>{label}</li>
                                      }
                                    )}
                                  </ul>
                                </div>
                              </div>
                            ))}
                          </Card>
                        ),
                      },
                    ]}
                  />
                  <Accordion
                    size="xs"
                    className="!border-none"
                    iconOnHover={false}
                    items={[
                      {
                        label: <AccordionLabel label={t("common.faq")} />,
                        value: "faq",
                        children: (
                          <div className="pt-10">
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
                                    value: index.toString(),
                                    children: answer,
                                  }
                                }
                              )}
                            />
                          </div>
                        ),
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            id="accelerationProgram"
            data-section="accelerationProgram"
            className="mx-auto flex flex-col py-10 md:max-w-2xl md:py-16"
          >
            <div className="flex flex-col gap-5">
              <SectionTitle label={t("accelerationProgram.title")} />
              <Card className="flex flex-col gap-5">
                <ProgramDetail
                  size="xs"
                  title="Acceleration Program Round 2"
                  application="Applications Open"
                  date="Feb. 29, 2024 - May 31, 2024"
                />
                <div className="mx-auto">
                  <Link
                    href={siteConfig.links.accelerationGithub}
                    target="_blank"
                  >
                    <Button className="uppercase">
                      <div className="flex items-center gap-3">
                        {t("common.learnMoreOnGithub")}
                        <Icons.arrowRight size={20} />
                      </div>
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
            <div className="flex flex-col gap-2 pt-8">
              {accelerationProgramDescription?.map((description, index) => {
                return (
                  <span key={index} className="font-sans text-base text-black">
                    {description}
                  </span>
                )
              })}
            </div>
            <div className="flex flex-col gap-10 pt-14">
              <Accordion
                size="xs"
                className="!border-none"
                iconOnHover={false}
                items={[
                  {
                    label: <AccordionLabel label={t("common.howToApply")} />,
                    value: "howToApply",
                    children: (
                      <div className="mt-10">
                        <div className="flex flex-col gap-8 pb-10 md:pb-16">
                          <div id="howToApply" className="flex flex-col gap-8">
                            <div>
                              <strong>{t("howToApply.openTasks.title")}</strong>
                              <ul className="list-decimal">
                                {howToApply?.openTasks?.description?.map(
                                  (task: string, index: number) => {
                                    return (
                                      <li
                                        key={index}
                                        className="ml-8 list-item items-center"
                                      >
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html: task,
                                          }}
                                        ></div>
                                      </li>
                                    )
                                  }
                                )}
                              </ul>
                            </div>
                            <div>
                              <strong>
                                {t("howToApply.submitIdea.title")}
                              </strong>
                              <ul className="list-decimal">
                                {howToApply?.submitIdea?.description?.map(
                                  (task: string, index: number) => {
                                    return (
                                      <li
                                        key={index}
                                        className="ml-8 list-item items-center"
                                      >
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html: task,
                                          }}
                                        ></div>
                                      </li>
                                    )
                                  }
                                )}
                              </ul>
                            </div>
                            <span>{t("howToApply.description")}</span>
                          </div>
                        </div>
                      </div>
                    ),
                  },
                ]}
              />

              <Accordion
                size="xs"
                className="!border-none"
                iconOnHover={false}
                items={[
                  {
                    label: <AccordionLabel label={t("common.faq")} />,
                    value: "faq",
                    children: (
                      <div className="mt-10 flex flex-col gap-8">
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
                                value: index.toString(),
                                children: answer,
                              }
                            }
                          )}
                        />
                      </div>
                    ),
                  },
                ]}
              />
            </div>
          </div>
        </div>
        <div
          id="sidebar"
          className="sticky right-0 top-20 hidden w-[320px] bg-white/30 p-8 lg:block"
        >
          <div className="flex flex-col gap-4">
            <h6 className="font-display text-lg font-bold text-tuatara-700">
              {common("onThisPage")}
            </h6>
            <ul className="text-normal font-sans text-black">
              {ProgramSections.map((id: string) => {
                const label = t(`${id}.title`)

                if (!label) return null // no label for this section

                const active = id === activeId

                return (
                  <li
                    key={id}
                    onClick={(e) => {
                      scrollToId(id)
                    }}
                    data-id={id}
                    className={cn(
                      "flex h-8 cursor-pointer items-center border-l-2 border-l-anakiwa-200 px-3 duration-200",
                      {
                        "border-l-anakiwa-500 text-anakiwa-500 font-medium":
                          active,
                      }
                    )}
                  >
                    {label}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </AppContent>
    </div>
  )
}
