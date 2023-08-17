"use client"

import React, { ChangeEvent, ReactNode, useEffect, useState } from "react"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import FiltersIcon from "@/public/icons/filters.svg"
import {
  FilterLabelMapping,
  ProjectFilter,
  useProjectFiltersState,
} from "@/state/useProjectFiltersState"
import { useDebounce } from "react-use"

import { cn, queryStringToObject } from "@/lib/utils"

import Badge from "../ui/badge"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import { Input } from "../ui/input"
import { Modal } from "../ui/modal"

interface FilterWrapperProps {
  label: string
  children?: ReactNode
}

const FilterWrapper = ({ label, children }: FilterWrapperProps) => {
  return (
    <div className="flex flex-col gap-4 py-6">
      <span className="text-xl font-bold">{label}</span>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-2">{children}</div>
    </div>
  )
}

export default function ProjectFiltersBar() {
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState("")

  const { filters, toggleFilter, queryString, activeFilters, onFilterProject } =
    useProjectFiltersState((state) => state)

  useEffect(() => {
    if (!queryString) return
    router.push(`/projects?${queryString}`)
  }, [queryString, router])

  useEffect(() => {
    // set active filters from url
    useProjectFiltersState.setState({
      activeFilters: queryStringToObject(searchParams),
    })
  }, [])

  const clearAllFilters = () => {
    useProjectFiltersState.setState({ activeFilters: {}, queryString: "" })
    router.push("/projects")
  }

  useDebounce(
    () => {
      onFilterProject(searchQuery)
    },
    500, // debounce timeout in ms when user is typing
    [searchQuery]
  )
  const hasActiveFilters = queryString && queryString.length > 0

  return (
    <>
      <Modal
        title="Filters"
        footer={
          <div className="flex">
            <Button
              disabled={!hasActiveFilters}
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
            >
              Clear all
            </Button>
            <div className="ml-auto">
              <Button
                variant="black"
                size="sm"
                onClick={() => setShowModal(false)}
              >
                Show project
              </Button>
            </div>
          </div>
        }
        open={showModal}
        setOpen={setShowModal}
      >
        {Object.entries(filters).map(([key, items]) => {
          const filterLabel = FilterLabelMapping?.[key as ProjectFilter] ?? ""
          const hasItems = items.length > 0

          return (
            hasItems && (
              <FilterWrapper key={key} label={filterLabel}>
                <>
                  {items.map((item) => {
                    const isActive =
                      activeFilters?.[key as ProjectFilter]?.includes(item)

                    return (
                      <Checkbox
                        key={item}
                        onClick={() => toggleFilter(key as ProjectFilter, item)}
                        name={item}
                        label={item}
                        checked={isActive}
                      />
                    )
                  })}
                </>
              </FilterWrapper>
            )
          )
        })}
      </Modal>
      <div className="flex flex-col gap-6">
        <span className="text-lg font-medium">
          What do you want to do today?
        </span>
        <div className="grid items-center justify-between grid-cols-1 gap-3 md:gap-12 md:grid-cols-5">
          <div className="relative grid grid-cols-3 col-span-1 gap-4 md:gap-6 md:col-span-2 after:content-none md:after:content-[''] after:absolute after:h-11 after:w-[1px] after:bg-anakiwa-500 after:-right-[25px]">
            <Button variant="white" size="lg">
              Build
            </Button>
            <Button variant="white" size="lg">
              Play
            </Button>
            <Button variant="white" size="lg">
              Research
            </Button>
          </div>
          <div className="grid grid-cols-[1fr_auto] col-span-1 gap-3 md:col-span-3">
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearchQuery(e?.target?.value)
              }
              placeholder="Search project title or keyword"
            />
            <div className="flex items-center gap-3">
              <Badge>
                <Button
                  onClick={() => setShowModal(true)}
                  variant="white"
                  className={cn({
                    "border-2 border-anakiwa-950": hasActiveFilters,
                  })}
                >
                  <div className="flex items-center gap-2">
                    <Image src={FiltersIcon} alt="filter icon" />
                    <span className="hidden md:block">Filters</span>
                  </div>
                </Button>
              </Badge>
              <button
                disabled={!hasActiveFilters}
                onClick={clearAllFilters}
                className="hidden bg-transparent cursor-pointer md:block text-primary opacity-85 hover:opacity-100 disabled:opacity-50 disabled:pointer-events-none"
              >
                <div className="flex items-center gap-2 border-b-2 border-black">
                  <span className="text-sm font-medium">Clear all</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
