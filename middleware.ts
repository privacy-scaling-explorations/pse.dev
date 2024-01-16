import { NextResponse } from "next/server"
import acceptLanguage from "accept-language"

import { cookieName, fallbackLng, languages } from "./app/i18n/settings"

acceptLanguage.languages(languages as any)

export const config = {
  //matcher: "/:lang*",
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
}
const PUBLIC_FILE = /\.(.*)$/

export function middleware(req: any) {
  const COOKIE_NAME = cookieName ?? "i18next"
  let lang
  if (req.cookies.has(COOKIE_NAME))
    lang = acceptLanguage.get(req.cookies.get(COOKIE_NAME).value)
  if (!lang) lang = acceptLanguage.get(req.headers.get("Accept-Language"))
  if (!lang) lang = fallbackLng

  // Keep the file from public folder
  if (PUBLIC_FILE.test(req.nextUrl.pathname)) {
    return
  }

  // Redirect if lang in path is not supported
  if (
    !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith("/_next")
  ) {
    return NextResponse.redirect(
      new URL(`/${lang}${req.nextUrl.pathname}`, req.url)
    )
  }

  if (req.headers.has("referer")) {
    const refererUrl = new URL(req.headers.get("referer"))
    const langInReferer = languages.find((l) =>
      refererUrl.pathname.startsWith(`/${l}`)
    )
    const response = NextResponse.next()
    if (langInReferer) response.cookies.set(COOKIE_NAME, langInReferer)
    return response
  }

  return NextResponse.next()
}
