'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { accelerationProgramFaq } from '@/data/programs/accelerationProgramFaq'
import { coreProgramFaq } from '@/data/programs/coreProgramFaq'
import { ReactNode } from 'react-markdown/lib/ast-to-react'
import { twMerge } from 'tailwind-merge'

import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import { Accordion } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Banner } from '@/components/banner'
import { Card } from '@/components/cards/card'
import { Divider } from '@/components/divider'
import { Icons } from '@/components/icons'
import { PageHeader } from '@/components/page-header'
import { useTranslation } from '@/app/i18n/client'

type ProgramDetailProps = {
  region?: string
  title: ReactNode
  deadline?: string
  location?: string
  date: string
}

const SectionTitle = ({ label }: { label: string }) => {
  return (
    <span className="text-center font-display text-[32px] font-bold text-tuatara-950">
      {label}
    </span>
  )
}

const AccordionLabel = ({
  label,
  className,
}: {
  label: string
  className?: string
}) => {
  return (
    <span
      className={twMerge(
        'mx-auto text-center text-base font-bold uppercase tracking-[3.36px] text-tuatara-950',
        className
      )}
    >
      {label}
    </span>
  )
}

const ProgramDetail = ({
  title,
  location,
  date,
  region,
  deadline,
}: ProgramDetailProps) => {
  return (
    <div className="flex flex-col gap-4 text-center">
      <span className="font-display text-lg font-bold leading-none text-black">
        {region} <br />
        {title}
      </span>

      {deadline && (
        <span className="font-sans text-xs font-normal italic text-tuatara-500">
          Application Deadline: {deadline}
        </span>
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
        <span className="font-sans text-xs font-normal text-black">{date}</span>
      </div>
    </div>
  )
}

const ProgramSections = ['coreProgram', 'accelerationProgram'] as const

export const ProgramPageContent = ({ lang }: any) => {
  const { t } = useTranslation(lang, 'programs-page')
  const { t: common } = useTranslation(lang, 'common')
  const [activeId, setActiveId] = useState('')
  const [isManualScroll, setIsManualScroll] = useState(false)
  const SCROLL_OFFSET = -900
  const sectionsRef = useRef<NodeListOf<HTMLElement> | null>(null)

  const howToApply: any =
    t('howToApply', {
      returnObjects: true,
    }) || []

  const coreProgramDescription: any[] =
    (t('coreProgram.description', {
      returnObjects: true,
    }) as any[]) ?? []

  const accelerationProgramDescription: any[] =
    (t('accelerationProgram.description', {
      returnObjects: true,
    }) as any[]) ?? []

  const curriculum: any[] =
    (t('curriculum', {
      returnObjects: true,
    }) as any[]) ?? []

  useEffect(() => {
    if (sectionsRef.current === null)
      sectionsRef.current = document.querySelectorAll(`div[data-section]`)
    if (!activeId) setActiveId(ProgramSections?.[0] ?? '')

    const handleScroll = () => {
      if (isManualScroll) return

      sectionsRef.current?.forEach((section: any) => {
        const sectionTop = section.offsetTop - SCROLL_OFFSET
        if (window.scrollY >= sectionTop && window.scrollY > 0) {
          setActiveId(section.getAttribute('id'))
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [SCROLL_OFFSET, activeId, isManualScroll])

  const scrollToId = useCallback((id: string) => {
    const element = document.getElementById(id)
    const scrollTop = document.documentElement.scrollTop
    const rectViewportTop = element?.getBoundingClientRect()?.top ?? 0
    const top = rectViewportTop + scrollTop

    if (element) {
      setActiveId(id) // active clicked id
      setIsManualScroll(true) // tell the window event listener to ignore this scrolling
      window?.scrollTo({
        behavior: 'smooth',
        top,
      })
    }

    setTimeout(() => setIsManualScroll(false), 800)
  }, [])

  return (
    <Divider.Section className="flex flex-col">
      <div className="bg-second-gradient">
        <PageHeader
          title={t('title')}
          subtitle={t('description')}
          image={
            <Image
              width={280}
              height={280}
              className="mx-auto h-[256px] w-[290px] lg:ml-auto lg:h-[428px] lg:w-[484px]"
              src="/images/programs.png"
              alt="computer image"
            />
          }
        />
      </div>
      <div className="relative flex w-full flex-col justify-center">
        <div className="sticky right-0 top-0 z-10 mx-auto flex w-full max-w-screen-3xl">
          <div
            id="sidebar"
            className="relative ml-auto hidden bg-white p-2 lg:block"
          >
            <div className="absolute right-0 mt-[80px] flex flex-col gap-4 lg:w-[220px] xl:w-[320px] xl:px-8">
              <h6 className="font-display text-lg font-bold text-tuatara-700">
                {common('onThisPage')}
              </h6>
              <ul className="text-normal font-sans text-black">
                {ProgramSections.map((id: string) => {
                  const label = t(`${id}.title`)

                  if (!label) return null // no label for this section

                  const active = id === activeId

                  return (
                    <li
                      key={id}
                      onClick={() => {
                        scrollToId(id)
                      }}
                      data-id={id}
                      className={cn(
                        'flex h-8 cursor-pointer items-center border-l-2 border-l-anakiwa-200 px-3 duration-200',
                        {
                          'border-l-anakiwa-500 text-anakiwa-500 font-medium':
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
        </div>

        <div className="relative z-0 flex w-full flex-col divide-y divide-tuatara-300 ">
          <div
            id="coreProgram"
            data-section="coreProgram"
            className="w-ful py-10 md:py-16"
          >
            <div className="mx-auto flex flex-col md:max-w-2xl">
              <div className="flex flex-col gap-8">
                <SectionTitle label={t('coreProgram.title')} />
                <div className="flex flex-col">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <Card className="flex flex-col gap-10">
                      <ProgramDetail
                        region="LatAm"
                        title="Core Program"
                        deadline="Apr. 30, 2024"
                        location="Buenos Aires - Cuenca - San Jose"
                        date="Jul. 22, 2024 - Sep. 15, 2024"
                      />
                      <Link href={siteConfig.links.coreProgram} target="_blank">
                        <Button className="w-full uppercase">
                          <div className="flex items-center gap-3">
                            <span>{t('common.applyNow')}</span>
                            <Icons.arrowRight size={20} />
                          </div>
                        </Button>
                      </Link>
                    </Card>
                    <Card className="flex flex-col gap-10">
                      <ProgramDetail
                        region="Asia"
                        title="Core Program"
                        deadline="Apr. 30, 2024"
                        location="Seoul - Taipei - Tokyo"
                        date="Jul. 29, 2024 - Sep. 22, 2024"
                      />
                      <Link href={siteConfig.links.coreProgram} target="_blank">
                        <Button className="w-full uppercase">
                          <div className="flex items-center gap-3">
                            <span>{t('common.applyNow')}</span>
                            <Icons.arrowRight size={20} />
                          </div>
                        </Button>
                      </Link>
                    </Card>
                  </div>
                  <div className="flex flex-col gap-2 pt-8">
                    {coreProgramDescription?.map((description, index) => {
                      return (
                        <span
                          key={index}
                          className="font-sans text-base text-tuatara-950"
                        >
                          {description}
                        </span>
                      )
                    })}
                  </div>
                </div>
                <div className="flex flex-col gap-0 md:mt-4 md:gap-10">
                  <div className="flex flex-col">
                    <AccordionLabel label={t('common.curriculum')} />
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
                          <div className="flex h-[96px] items-center justify-center border-b border-tuatara-300 bg-anakiwa-100 p-2 text-center md:border-none">
                            <span className="max-w-[136px] text-xs font-bold uppercase tracking-[2.5px] text-tuatara-950">
                              {t('common.week', {
                                week: index,
                              })}
                              <br />
                              {title}
                            </span>
                          </div>
                          <div className="flex items-center py-2">
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

                  <div className="flex flex-col">
                    <AccordionLabel label={t('common.faq')} />
                    <div className="pt-10">
                      <Accordion
                        id="faq"
                        className="!border-anakiwa-300"
                        size="xs"
                        items={coreProgramFaq.map(
                          ({ question, answer }, index) => {
                            return {
                              label: (
                                <span className="text-left font-sans text-base font-medium leading-6 text-black">
                                  {question}
                                </span>
                              ),
                              value: index.toString(),
                              children: (
                                <span
                                  className="font-sans text-sm font-normal text-black"
                                  dangerouslySetInnerHTML={{
                                    __html: answer?.toString() ?? '',
                                  }}
                                ></span>
                              ),
                            }
                          }
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col">
            <div
              id="accelerationProgram"
              data-section="accelerationProgram"
              className="mx-auto flex flex-col py-10 md:max-w-2xl md:py-16"
            >
              <div className="flex flex-col gap-5">
                <SectionTitle label={t('accelerationProgram.title')} />
                <Card className="flex flex-col gap-5">
                  <ProgramDetail
                    title={
                      <>
                        Acceleration Program <br />
                        Round 2
                      </>
                    }
                    deadline="May 31, 2024"
                    location="Remote Application"
                    date="June 1, 2024 - August 31, 2024"
                  />
                  <div className="mx-auto">
                    <Link
                      href={siteConfig.links.accelerationProgram}
                      target="_blank"
                    >
                      <Button className="uppercase">
                        <div className="flex items-center gap-3">
                          {t('common.learnMoreOnGithub')}
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
                    <span
                      key={index}
                      className="font-sans text-base text-tuatara-950"
                    >
                      {description}
                    </span>
                  )
                })}
              </div>
              <div className="flex flex-col gap-0  pt-14 md:gap-10">
                <div className="flex flex-col">
                  <AccordionLabel label={t('common.howToApply')} />
                  <div className="mt-10">
                    <div className="flex flex-col gap-8 pb-10 md:pb-16">
                      <div id="howToApply" className="flex flex-col gap-8">
                        <div>
                          <span className="text-base font-medium text-tuatara-950">
                            {t('howToApply.openTasks.title')}
                          </span>
                          <ul className="list-decimal">
                            {howToApply?.openTasks?.description?.map(
                              (task: string, index: number) => {
                                return (
                                  <li
                                    key={index}
                                    className="ml-8 list-item items-center"
                                  >
                                    <div
                                      className="text-tuatara-950"
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
                          <span className="text-base font-medium text-tuatara-950">
                            {t('howToApply.submitIdea.title')}
                          </span>
                          <ul className="list-decimal">
                            {howToApply?.submitIdea?.description?.map(
                              (task: string, index: number) => {
                                return (
                                  <li
                                    key={index}
                                    className="ml-8 list-item items-center"
                                  >
                                    <div
                                      className="text-tuatara-95"
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
                        <span className="text-base text-tuatara-950">
                          {t('howToApply.description')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <AccordionLabel label={t('common.faq')} />
                  <div className="mt-10 flex flex-col gap-8">
                    <Accordion
                      className="!border-anakiwa-300"
                      size="xs"
                      items={accelerationProgramFaq.map(
                        ({ question, answer }, index) => {
                          return {
                            label: (
                              <span className="text-left font-sans text-base font-medium text-black">
                                {question}
                              </span>
                            ),
                            value: index.toString(),
                            children: (
                              <span className="flex flex-col gap-3 text-base text-tuatara-950">
                                {answer}
                              </span>
                            ),
                          }
                        }
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Banner title={common('learnMore')} subtitle={common('learnMoreDiscord')}>
        <Link
          href={siteConfig.links.discord}
          target="_blank"
          rel="noreferrer"
          passHref
        >
          <Button>
            <div className="flex items-center gap-2">
              <Icons.discord fill="white" className="h-4" />
              <span className="text-[14px] uppercase">
                {common('joinOurDiscord')}
              </span>
              <Icons.externalUrl fill="white" className="h-5" />
            </div>
          </Button>
        </Link>
      </Banner>
    </Divider.Section>
  )
}
