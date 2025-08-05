"use client"

import { LABELS } from "@/app/labels"
import { Icons } from "../icons"
import { Button } from "../ui/button"
import { motion } from "framer-motion"
import Link from "next/link"
import { AppContent } from "../ui/app-content"

export const HomepageHeader = () => {
  return (
    <div className="py-20 lg:py-[130px] bg-[url('/hero/hero-white.jpg')] dark:bg-[url('/hero/hero-dark.jpg')] bg-cover bg-center">
      <AppContent className="flex flex-col gap-10 max-w-[860px]">
        <motion.div
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, cubicBezier: "easeOut" }}
          className="flex flex-col gap-10 text-center"
        >
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-[10px]">
              <span className="font-sans font-medium leading-7 uppercase text-tuatara-800 dark:text-anakiwa-400">
                {LABELS.HOMEPAGE.HEADER_TITLE}
              </span>
              <h1 className="font-sans text-3xl lg:text-5xl font-medium text-tuatara-950 dark:text-tuatara-100">
                {LABELS.HOMEPAGE.HEADER_SUBTITLE}
              </h1>
            </div>
            <div className="flex gap-8 mx-auto">
              <Link href="/projects" className="flex items-center gap-2 group">
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
              <Link href="/research" className="flex items-center gap-2 group">
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
            </div>
          </div>
        </motion.div>
      </AppContent>
    </div>
  )
}
