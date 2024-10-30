"use client"

import { useEffect, useRef, useState } from "react"

import { ProjectExtraLinkType } from "@/lib/types"
import { cn } from "@/lib/utils"
import { useTranslation } from "@/app/i18n/client"

import { Icons } from "./icons"

interface Section {
  level: number
  text: string
  id: string
}

interface WikiSideNavigationProps {
  className?: string
  lang?: string
  content?: string
  project?: any
}

export const WikiSideNavigation = ({
  className,
  lang = "en",
  content = "",
  project,
}: WikiSideNavigationProps) => {
  const { t } = useTranslation(lang, "common")
  const [sections, setSections] = useState<Section[]>([])
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Extract sections from content
  useEffect(() => {
    if (!content) return
    const sectionsRegex = /^(#{1,3})\s(.+)/gm
    const extractedSections: Section[] = []
    let match

    while ((match = sectionsRegex.exec(content)) !== null) {
      const text = match[2]
      if (!extractedSections.some((section) => section.text === text)) {
        extractedSections.push({
          level: match[1].length,
          text,
          id: text.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        })
      }
    }

    setSections(extractedSections)
    // Set the first section as active by default
    if (extractedSections.length > 0) {
      setActiveSection(extractedSections[0].id)
    }
  }, [content])

  // Set up intersection observer
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -80% 0px",
      threshold: 0,
    }

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.getAttribute("data-section-id"))
        }
      })
    }, observerOptions)

    sections.forEach((section) => {
      const element = document.querySelector(
        `[data-section-id="${section.id}"]`
      )
      if (element) observerRef.current?.observe(element)
    })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [sections])

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(`[data-section-id="${sectionId}"]`)
    if (element) {
      const offset = 80 // Adjust this value based on your header height
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
      setActiveSection(sectionId)
    }
  }

  const ExtraLinkLabelMapping: Record<
    ProjectExtraLinkType,
    {
      label: string
      icon?: any
    }
  > = {
    buildWith: {
      label: t("buildWith"),
      icon: <Icons.hammer />,
    },
    play: {
      label: t("tryItOut"),
      icon: <Icons.hand />,
    },
    research: {
      label: t("deepDiveResearch"),
      icon: <Icons.readme />,
    },
    learn: {
      label: t("learnMore"),
    },
  }

  const { extraLinks = {} } = project
  const hasExtraLinks = Object.keys(extraLinks).length > 0

  if (sections.length === 0 || content.length === 0) return null

  return (
    <div className="sticky overflow-hidden top-20">
      <aside className={cn("flex flex-col", className)}>
        <h6 className="text-lg font-bold font-display text-tuatara-700">
          {t("contents")}
        </h6>
        <ul className="pt-4 font-sans text-black text-normal">
          {sections.map((section, index) => (
            <li
              key={index}
              className={cn(
                "flex h-8 items-center border-l-2 border-l-anakiwa-200 px-3 duration-200 cursor-pointer ",
                {
                  "border-l-anakiwa-500 text-anakiwa-500 font-medium":
                    activeSection === section.id,
                }
              )}
            >
              <button
                onClick={() => scrollToSection(section.id)}
                className="w-full overflow-hidden text-left line-clamp-1"
              >
                {section.text}
              </button>
            </li>
          ))}
          {Object.entries(ExtraLinkLabelMapping).map(([key]) => {
            const links = extraLinks[key as ProjectExtraLinkType] ?? []
            // @ts-ignore
            const { label } = ExtraLinkLabelMapping?.[key as any] ?? {}
            if (!links.length) return null // no links hide the section
            return (
              <li
                key={key}
                onClick={() => scrollToSection(key)}
                className={cn(
                  "flex h-8 items-center border-l-2 border-l-anakiwa-200 px-3 duration-200  cursor-pointer",
                  {
                    "border-l-anakiwa-500 text-anakiwa-500 font-medium":
                      activeSection === key,
                  }
                )}
              >
                {label}
              </li>
            )
          })}
          <li
            key="edit"
            onClick={() => scrollToSection("edit-this-page")}
            className={cn(
              "flex h-8 items-center border-l-2 border-l-anakiwa-200 px-3 duration-200  cursor-pointer",
              {
                "border-l-anakiwa-500 text-anakiwa-500 font-medium":
                  activeSection === "edit-this-page",
              }
            )}
          >
            Edit this page
          </li>
        </ul>
      </aside>
    </div>
  )
}
