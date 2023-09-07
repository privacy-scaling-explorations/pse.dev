"use client"

import React from "react"
import * as RadixAccordion from "@radix-ui/react-accordion"

import { Icons } from "../icons"

interface AccordionItemProps {
  label: string
  children?: React.ReactNode
  value: string
}

interface AccordionProps extends RadixAccordion.AccordionImplProps {
  type: "single" | "multiple"
  defaultValue?: string
  items: AccordionItemProps[]
}

const Accordion = ({
  type = "multiple",
  defaultValue,
  items,
}: AccordionProps) => {
  return (
    <RadixAccordion.Root
      type={type as any}
      defaultValue={defaultValue}
      collapsible
    >
      {items?.map(({ label, children, value }) => (
        <RadixAccordion.Item value={value}>
          <RadixAccordion.Trigger className="flex items-center justify-between w-full py-6 border-t group border-t-black ring-0 focus:outline-none">
            <span className="font-sans text-base md:text-xl font-bold text-black uppercase tracking-[3.36px] md:tracking-[4.2px] block text-left">
              {label}
            </span>
            <div className={`hidden group-data-[state=closed]:block`}>
              <Icons.plus className="w-4 md:w-8" />
            </div>
            <div className={`hidden group-data-[state=open]:block`}>
              <Icons.minus className="w-4 md:w-8" />
            </div>
          </RadixAccordion.Trigger>
          <RadixAccordion.Content>{children}</RadixAccordion.Content>
        </RadixAccordion.Item>
      ))}
    </RadixAccordion.Root>
  )
}

Accordion.displayName = "Accordion"

export { Accordion }
