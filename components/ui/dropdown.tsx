import React, { useState } from "react"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"

import { cn } from "@/lib/utils"

import { Icons } from "../icons"

interface DropdownItemProps {
  label: string
  value?: string | number
}

interface DropdownProps {
  label: string
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
          className={cn("focus:outline-none ring-0", {
            "opacity-70 cursor-not-allowed": disabled,
          })}
          aria-label="dropdown menu"
        >
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium break-words text-tuatara-950">
              {label}
            </span>
            <Icons.arrowDown />
          </div>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[136px] max-h-[250px] overflow-scroll border border-tuatara-200 rounded-md bg-white py-2"
          sideOffset={5}
        >
          {items?.map((item, index) => {
            const active = selected === item.value
            return (
              <DropdownMenu.Item
                key={index}
                className={cn(
                  "relative py-3 px-5 w-full font-sans text-sm cursor-pointer hover:font-medium focus:outline-none ring-0 hover:text-anakiwa-500 text-duration-200",
                  {
                    "text-tuatara-950 font-normal": !active,
                    "text-anakiwa-500 font-medium": active,
                  }
                )}
                onSelect={() => onSelectCallback(item)}
              >
                {active && (
                  <div className="bg-anakiwa-500 w-[3px] absolute left-0 top-0 bottom-0"></div>
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
