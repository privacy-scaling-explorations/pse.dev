"use client"

import React, { ReactNode } from "react"
import * as RadixAccordion from "@radix-ui/react-accordion"

import { cn } from "@/lib/utils"

import { Icons } from "../icons"

interface AccordionItemProps {
  label: ReactNode
  children?: React.ReactNode
  value: string
}

type AccordionPadding = "xs" | "sm"

interface AccordionProps extends RadixAccordion.AccordionImplProps {
  type?: "single" | "multiple"
  size?: AccordionPadding
  defaultValue?: string
  items: AccordionItemProps[]
  className?: string
  iconOnHover?: boolean
}

const AccordionSizeMapping: Record<AccordionPadding, string> = {
  xs: "pt-4",
  sm: "py-6",
}

const Accordion = ({
  type = "multiple",
  defaultValue,
  items,
  size = "sm",
  className,
  iconOnHover = true,
}: AccordionProps) => {
  return (
    <RadixAccordion.Root
      type={type as any}
      defaultValue={defaultValue}
      collapsible={true}
    >
      {items?.map(({ label, children, value }, accordionIndex) => (
        <RadixAccordion.Item
          className={cn("group", {
            "pb-4": size === "xs",
          })}
          value={value}
          key={accordionIndex}
        >
          <RadixAccordion.Trigger className="w-full">
            <div
              className={cn(
                "relative flex w-full items-center justify-between border-t border-t-black ring-0 focus:outline-none",
                className,
                {
                  [AccordionSizeMapping.xs]: size === "xs",
                  [AccordionSizeMapping.sm]: size === "sm",
                }
              )}
            >
              {typeof label === "string" ? (
                <span className="block text-left font-sans text-base font-bold uppercase tracking-[3.36px] text-black md:text-xl md:tracking-[4.2px]">
                  {label}
                </span>
              ) : (
                label
              )}
              <div
                className={cn(
                  "duration-50 absolute right-0 group-data-[state=open]:hidden",
                  {
                    "group-hover:visible md:invisible": iconOnHover,
                  }
                )}
              >
                <Icons.plus
                  className={cn({
                    "w-4 md:w-6": size === "xs",
                    "w-4 md:w-8": size === "sm",
                  })}
                />
              </div>
              <div
                className={`absolute right-0 hidden group-data-[state=open]:block`}
              >
                <Icons.minus
                  className={cn({
                    "w-4 md:w-6": size === "xs",
                    "w-4 md:w-8": size === "sm",
                  })}
                />
              </div>
            </div>
          </RadixAccordion.Trigger>
          <RadixAccordion.Content className="overflow-hidden transition-transform group-data-[state=closed]:animate-slide-up group-data-[state=open]:animate-slide-down">
            {children}
          </RadixAccordion.Content>
        </RadixAccordion.Item>
      ))}
    </RadixAccordion.Root>
  )
}

Accordion.displayName = "Accordion"

export { Accordion }
