/* eslint-disable quotes */
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

// Get background image or return fallback image
export function getBackgroundImage(image: string | null | undefined = null) {
  if (!image) return "/fallback.webp"
  if (image === "") return "/fallback.webp"
  if (image === null) return "/fallback.webp"
  return image
}

export function removeProtocol(url: string) {
  return url?.replace(/^https?:\/\//, "")
}

/**
 * Interpolates a string with placeholders using the provided parameters
 * @param text - The string with placeholders in the format {{key}}
 * @param params - An object with key-value pairs to replace the placeholders
 * @returns The interpolated string

 */
export function interpolate(
  text: string,
  params?: Record<string, string | number>
): string {
  if (!params || !text) return text

  return text.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    const param = params[key]
    return param !== undefined ? String(param) : `{{${key}}}`
  })
}
