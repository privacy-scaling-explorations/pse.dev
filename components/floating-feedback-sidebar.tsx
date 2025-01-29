"use client"

import React, { useCallback, useEffect, useState } from "react"
import Link from "next/link"

import { siteConfig } from "@/config/site"

import { Icons } from "./icons"

export const FloatingFeedbackSidebar = () => {
  const [isOpen, setIsOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  const checkIfMobile = useCallback(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  useEffect(() => {
    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [checkIfMobile])

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <div
      className={`fixed z-50 transition-all duration-300 ease-in-out ${
        isMobile
          ? "bottom-4 right-0 h-auto"
          : "top-1/2 -translate-y-1/2 right-0 h-auto"
      }`}
      onMouseEnter={() => !isMobile && setIsOpen(true)}
      onMouseLeave={() => !isMobile && setIsOpen(false)}
    >
      <div className="flex">
        <button
          onClick={toggleSidebar}
          className={`flex text-sm cursor-pointer items-center justify-center bg-primary text-white font-sans font-medium transition-all duration-300 ${
            isMobile
              ? "w-24 py-2 px-4 rounded-l-lg"
              : "w-8 h-24 writing-mode-vertical-rl rounded-l-lg"
          }`}
        >
          Feedback
        </button>
        <Link
          href={siteConfig.links.discord}
          target="_blank"
          className={`flex items-center bg-white shadow-lg overflow-hidden transition-all duration-300 ${
            isOpen ? "w-56" : "w-0"
          }`}
        >
          <div className="flex flex-col gap-1 p-4 whitespace-nowrap">
            <span className="text-lg font-semibold text-tuatara-950">
              Have feedback?
            </span>
            <div className="flex items-center items-center gap-1">
              <span className="text-sm text-tuatara-950 leading-none font-sans">
                Let us know on Discord
              </span>
              <Icons.discord className="w-4 h-4" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}
