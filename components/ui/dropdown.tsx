import React, { useState } from "react"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"

import { cn } from "@/lib/utils"

import { Icons } from "../icons"

interface DropdownItemProps {
  label: string
  value?: string | number
}

interface DropdownProps {
  label: React.ReactNode
  items?: DropdownItemProps[]
  defaultItem?: string | number
  onChange?: (value: DropdownItemProps["value"]) => void
  disabled?: boolean
}

const Dropdown = ({
  label,
  onChange,
  defaultItem,
  disabled,
  items,
}: DropdownProps) => {
  const [selected, setSelected] =
    useState<DropdownItemProps["value"]>(defaultItem)

  const onSelectCallback = ({ value }: DropdownItemProps) => {
    setSelected(value)
    if (typeof onChange === "function") onChange(value)
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild disabled={disabled}>
        <button
          className={cn("ring-0 focus:outline-none", {
            "opacity-70 cursor-not-allowed": disabled,
          })}
          aria-label="dropdown menu"
        >
          <div className="flex items-center gap-1">
            <span className="break-words text-sm font-medium text-tuatara-950">
              {label}
            </span>
            <Icons.arrowDown />
          </div>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="z-[50] max-h-[250px] min-w-[136px] overflow-scroll rounded-md border border-tuatara-200 bg-white py-2"
          sideOffset={5}
        >
          {items?.map((item, index) => {
            const active = selected === item.value
            return (
              <DropdownMenu.Item
                key={index}
                className={cn(
                  "text-duration-200 relative w-full cursor-pointer px-5 py-3 font-sans text-sm ring-0 hover:font-medium hover:text-anakiwa-500 focus:outline-none",
                  {
                    "text-tuatara-950 font-normal": !active,
                    "text-anakiwa-500 font-medium": active,
                  }
                )}
                onSelect={() => onSelectCallback(item)}
              >
                {active && (
                  <div className="absolute inset-y-0 left-0 w-[3px] bg-anakiwa-500"></div>
                )}
                {item.label}
              </DropdownMenu.Item>
            )
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

Dropdown.displayName = "Dropdown"
export { Dropdown }
