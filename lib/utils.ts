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

export function convertDirtyStringToHtml(string: string) {
  const urlPattern =
    // eslint-disable-next-line no-useless-escape
    /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim
  // eslint-disable-next-line no-useless-escape
  const pseudoUrlPattern = /(^|[^\/])(www\.[\S]+(\b|$))/gim

  if (!string) return ""
  return string
    .replace(/\n/g, "<br />")
    .replace(urlPattern, '<a href="$&">$&</a>')
    .replace(pseudoUrlPattern, '$1<a href="http://$2">$2</a>')
    .toLowerCase()
}

export function removeProtocol(url: string) {
  return url?.replace(/^https?:\/\//, "")
}
