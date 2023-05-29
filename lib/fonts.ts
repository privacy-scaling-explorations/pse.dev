import {
  Space_Grotesk as FontDisplay,
  JetBrains_Mono as FontMono,
  DM_Sans as FontSans,
} from "next/font/google"

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "700"],
})

export const fontDisplay = FontDisplay({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "700"],
})

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
})
