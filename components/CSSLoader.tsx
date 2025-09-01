"use client"

import { useEffect, useState } from "react"

export function CSSLoader() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // Load main CSS after critical render
    const loadCSS = () => {
      const link = document.createElement("link")
      link.rel = "stylesheet"
      link.href = "/globals.css"
      link.onload = () => setLoaded(true)
      document.head.appendChild(link)
    }

    // Load CSS after a short delay to not block initial render
    const timer = setTimeout(loadCSS, 100)
    return () => clearTimeout(timer)
  }, [])

  return null
}
