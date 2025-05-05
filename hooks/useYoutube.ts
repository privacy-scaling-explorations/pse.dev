import { useQuery } from "@tanstack/react-query"

async function fetchYoutubeVideos() {
  try {
    const response = await fetch("/api/youtube", {
      cache: "default",
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch videos: ${response.status}`)
    }

    const data = await response.json()
    return data.videos || []
  } catch (error) {
    console.error("Error fetching videos:", error)
    return []
  }
}

export const useYoutube = () => {
  return useQuery({
    queryKey: ["pse-youtube-videos"],
    queryFn: () => fetchYoutubeVideos(),
  })
}
