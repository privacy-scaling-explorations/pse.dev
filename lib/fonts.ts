import { Space_Grotesk, DM_Sans, Inter } from "next/font/google"

const fontSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "700"],
  display: "swap",
})

const fontDisplay = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

export const fonts = [fontSans, fontDisplay, fontInter]
export const baseFont = fontSans
