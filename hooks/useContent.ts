import { useEffect, useState } from "react"

/**
 * @dev This hook is used as helper to fetch content from the server
 * @returns
 */
export default function useContent({ lang, id }: any) {
  const [projectContent, setProjectContent] = useState<any>(null)

  useEffect(() => {
    const fetchContent = async () => {
      const [content] = await Promise.all([
        fetch(
          `https://raw.githubusercontent.com/privacy-scaling-explorations/pse.dev/main/app/i18n/locales/${lang}/projects/${id}.json`
        ).then((res) => res.json()),
      ])
      setProjectContent(content)
    }
    fetchContent()
  }, [])

  return {
    projectContent,
  }
}
