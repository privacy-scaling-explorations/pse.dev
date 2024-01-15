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
      collapsible={true}
    >
      {items?.map(({ label, children, value }, accordionIndex) => (
        <RadixAccordion.Item
          className="group"
          value={value}
          key={accordionIndex}
        >
          <RadixAccordion.Trigger className="flex w-full items-center justify-between border-t border-t-black py-6 ring-0 focus:outline-none">
            <span className="block text-left font-sans text-base font-bold uppercase tracking-[3.36px] text-black md:text-xl md:tracking-[4.2px]">
              {label}
            </span>
            <div
              className={`duration-50 group-hover:visible group-data-[state=open]:hidden md:invisible`}
            >
              <Icons.plus className="w-4 md:w-8" />
            </div>
            <div className={`hidden group-data-[state=open]:block`}>
              <Icons.minus className="w-4 md:w-8" />
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
