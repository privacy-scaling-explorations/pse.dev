import { createInstance } from "i18next"
import resourcesToBackend from "i18next-resources-to-backend"
import { initReactI18next } from "react-i18next/initReactI18next"

import { getOptions } from "./settings"

const i18nCache = new Map()

const initI18next = async (lng: string, ns: string) => {
  const cacheKey = `${lng}|${Array.isArray(ns) ? ns.join(",") : ns}`

  if (i18nCache.has(cacheKey)) {
    return i18nCache.get(cacheKey)
  }

  const i18nInstance = createInstance()
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`./locales/${language}/${namespace}.json`)
      )
    )
    .init(getOptions(lng, ns))

  i18nCache.set(cacheKey, i18nInstance)
  return i18nInstance
}

export async function useTranslation(lng: string, ns: string) {
  const i18nextInstance = await initI18next(lng, ns)
  return {
    t: i18nextInstance.getFixedT(lng, Array.isArray(ns) ? ns[0] : ns),
    i18n: i18nextInstance,
  }
}

export function useClientTranslation(lng: string, ns: string) {
  const i18nInstance = createInstance()
  i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`./locales/${language}/${namespace}.json`)
      )
    )
    .init(getOptions(lng, ns))

  return {
    t: i18nInstance.getFixedT(lng, Array.isArray(ns) ? ns[0] : ns),
    i18n: i18nInstance,
  }
}
