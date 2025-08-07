"use client"

import { LABELS } from "@/app/labels"
import { Icons } from "../icons"
import { Button } from "../ui/button"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { AppContent } from "../ui/app-content"
import { useRef } from "react"

export const ParallaxHero = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "80%"])

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden h-[500px] lg:h-[600px]"
      style={{ isolation: "isolate" }}
    >
      <motion.div
        className="absolute inset-0 w-full h-[120%] -z-10 bg-[url('/hero/hero-white.jpg')] dark:bg-[url('/hero/hero-dark.jpg')] bg-cover bg-[0_-150px]"
        style={{
          y: backgroundY,
        }}
      />

      <motion.div
        className="relative z-10 flex items-center justify-center h-full py-20 lg:py-[130px]"
        style={{
          y: useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]),
        }}
      >
        <AppContent className="flex flex-col gap-10 max-w-[860px]">
          <motion.div
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-10 text-center"
          >
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-[10px]">
                <motion.span
                  style={{
                    y: useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]),
                  }}
                  className="font-sans font-medium leading-7 uppercase text-tuatara-800 dark:text-anakiwa-400"
                >
                  {LABELS.HOMEPAGE.HEADER_TITLE}
                </motion.span>
                <motion.h1
                  style={{
                    y: useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]),
                  }}
                  className="font-sans text-3xl lg:text-5xl font-medium text-tuatara-950 dark:text-tuatara-100"
                >
                  {LABELS.HOMEPAGE.HEADER_SUBTITLE}
                </motion.h1>
              </div>
              <motion.div
                style={{
                  y: useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]),
                }}
                className="flex flex-wrap gap-4 lg:gap-8 mx-auto justify-center"
              >
                <Link
                  href="/projects"
                  className="flex items-center gap-2 group"
                >
                  <Button className="w-full sm:w-auto">
                    <div className="flex items-center gap-1">
                      <span className="text-base font-medium uppercase">
                        {LABELS.COMMON.DEVELOPMENT_PROJECTS}
                      </span>
                      <Icons.arrowRight
                        fill="white"
                        className="h-5 duration-200 ease-in-out group-hover:translate-x-2"
                      />
                    </div>
                  </Button>
                </Link>
                <Link
                  href="/research"
                  className="flex items-center gap-2 group"
                >
                  <Button className="w-full sm:w-auto">
                    <div className="flex items-center gap-1">
                      <span className="text-base font-medium uppercase">
                        {LABELS.COMMON.APPLIED_RESEARCH}
                      </span>
                      <Icons.arrowRight
                        fill="white"
                        className="h-5 duration-200 ease-in-out group-hover:translate-x-2"
                      />
                    </div>
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </AppContent>
      </motion.div>
    </div>
  )
}
