import type { InitOptions } from "i18next"

export const fallbackLng = "en"
export const languages = [fallbackLng, "it", "ko", "fr", "zh-CN", "es"] as const
export type LocaleTypes = (typeof languages)[number]
export const defaultNS = "translation"
export const cookieName = "i18next"

export function getOptions(lng = fallbackLng, ns = defaultNS): InitOptions {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  }
}
