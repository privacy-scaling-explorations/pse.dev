import type { InitOptions } from "i18next"

export const fallbackLng = "en"
export const languages = [fallbackLng, "it", "ko", "fr", "zh-CN", "es"] as const
export type LocaleTypes = (typeof languages)[number]
export const defaultNS = "translation"
export const cookieName = "i18next"

export const LanguageMapping: Record<string, string> = {
  en: "English",
  it: "Italiano",
  ko: "한국어",
  fr: "Français",
  "zh-CN": "中文",
  es: "Español",
}

export function getOptions(lng = fallbackLng, ns = defaultNS): InitOptions {
  return {
    debug: false,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  }
}
