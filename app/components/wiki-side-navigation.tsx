"use client"

import { useEffect, useRef, useState } from "react"

import { ProjectExtraLinkType } from "@/lib/types"
import { cn } from "@/lib/utils"

import { Icons } from "./icons"
import { LABELS } from "@/app/labels"

interface Section {
  level: number
  text: string
  id: string
}

interface SideNavigationItemProps {
  text: string
  id: string
  activeSection: string | null
  onClick: () => void
}

const SideNavigationItem = ({
  text,
  id,
  activeSection,
  onClick,
}: SideNavigationItemProps) => (
  <button
    onClick={onClick}
    className={cn(
      "text-sm text-left duration-200 hover:text-anakiwa-500",
      activeSection === id ? "text-orange" : "text-tuatara-600"
    )}
  >
    {text}
  </button>
)

interface WikiSideNavigationProps {
  project: any
  content: string
  className?: string
  hasRelatedArticles?: boolean
}

export const WikiSideNavigation = ({
  project,
  content,
  className,
  hasRelatedArticles = false,
}: WikiSideNavigationProps) => {
  const [sections, setSections] = useState<Section[]>([])
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && content) {
      // Parse headings from markdown content
      const tempDiv = document.createElement("div")
      tempDiv.innerHTML = content.replace(
        /^(#{1,6})\s+(.+)$/gm,
        (match, hashes, title) => {
          const level = hashes.length
          const id = title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .trim()
          return `<h${level} id="${id}">${title}</h${level}>`
        }
      )

      const headings = tempDiv.querySelectorAll("h1, h2, h3, h4, h5, h6")
      const parsedSections = Array.from(headings).map((heading) => ({
        level: parseInt(heading.tagName.charAt(1)),
        text: heading.textContent || "",
        id:
          heading.id ||
          heading.textContent?.toLowerCase().replace(/\s+/g, "-") ||
          "",
      }))

      setSections(parsedSections)
    }
  }, [content])

  useEffect(() => {
    if (sections.length > 0) {
      // Create intersection observer
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id)
            }
          })
        },
        {
          rootMargin: "-20% 0px -60% 0px",
        }
      )

      // Observe all sections
      sections.forEach((section) => {
        const element = document.getElementById(section.id)
        if (element && observerRef.current) {
          observerRef.current.observe(element)
        }
      })

      // Also observe additional sections
      const additionalSections = [
        "youtube-videos",
        "team-members",
        "related-articles",
        "edit-this-page",
      ]

      additionalSections.forEach((sectionId) => {
        const element =
          document.getElementById(sectionId) ||
          document.querySelector(`[data-section-id="${sectionId}"]`)
        if (element && observerRef.current) {
          observerRef.current.observe(element)
        }
      })

      return () => {
        if (observerRef.current) {
          observerRef.current.disconnect()
        }
      }
    }
  }, [sections])

  const scrollToSection = (sectionId: string) => {
    const element =
      document.getElementById(sectionId) ||
      document.querySelector(`[data-section-id="${sectionId}"]`)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  const { extraLinks = {}, team = [], youtubeLinks = [] } = project

  const hasTeam = Array.isArray(team) && team.length > 0
  const hasYoutubeVideos =
    Array.isArray(youtubeLinks) && youtubeLinks.length > 0

  if (sections.length === 0 || content.length === 0) return null

  return (
    <div className={cn("flex flex-col gap-8 sticky top-20", className)}>
      <div className="flex flex-col gap-4">
        <span className="text-base font-bold text-tuatara-950">
          {LABELS.COMMON.CONTENTS}
        </span>
        <div className="flex flex-col gap-3">
          {sections.map((section) => (
            <SideNavigationItem
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              activeSection={activeSection}
              text={section.text}
              id={section.id}
            />
          ))}

          {hasYoutubeVideos && (
            <SideNavigationItem
              key="youtube-videos"
              onClick={() => scrollToSection("youtube-videos")}
              activeSection={activeSection}
              text="Videos"
              id="youtube-videos"
            />
          )}

          {hasTeam && (
            <SideNavigationItem
              key="team-members"
              onClick={() => scrollToSection("team-members")}
              activeSection={activeSection}
              text="Team"
              id="team-members"
            />
          )}

          {hasRelatedArticles && (
            <SideNavigationItem
              key="related-articles"
              onClick={() => scrollToSection("related-articles")}
              activeSection={activeSection}
              text="Related articles"
              id="related-articles"
            />
          )}

          <SideNavigationItem
            key="edit"
            onClick={() => scrollToSection("edit-this-page")}
            activeSection={activeSection}
            text={LABELS.COMMON.EDIT_THIS_PAGE}
            id="edit-this-page"
          />
        </div>
      </div>
    </div>
  )
}
