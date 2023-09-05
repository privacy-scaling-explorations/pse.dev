import { ReadonlyURLSearchParams } from "next/navigation"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function uniq(arr: any[], removeEmpty = true) {
  const uniqArray = Array.from(new Set(arr))

  return removeEmpty ? uniqArray.filter(Boolean) : uniqArray
}

export function queryStringToObject(
  searchParams: ReadonlyURLSearchParams
): Record<string, any> {
  const obj = Object.fromEntries(searchParams.entries())
  const object: Record<string, any> = {}
  Object.keys(obj).forEach((key) => {
    object[key] = obj[key]?.split(",")
  })

  return object
}

export function shuffleArray<T>(array: T[]) {
  return array.sort(() => 0.5 - Math.random())
}
