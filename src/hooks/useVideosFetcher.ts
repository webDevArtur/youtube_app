import { ref } from 'vue'
import { searchVideos } from '../services/searchVideos'
import { getPopularVideos } from '../services/getPopularVideos'
import { getVideosByIds } from '../services/getVideosByIds'
import { normalizeVideo } from '../utils/normalizeVideo'

export function useVideosFetcher() {
  const error = ref('')

  async function fetchVideos(
    searchQuery = '',
    filters: { regionCode?: string; maxResults?: number; pageToken?: string } = {}
  ) {
    error.value = ''
    const maxResults = filters.maxResults ?? 12
    const regionCode = filters.regionCode ?? 'RU'
    const pageToken = filters.pageToken ?? ''

    try {
      if (!searchQuery.trim()) {
        const data = await getPopularVideos({ regionCode, maxResults, pageToken })

        return {
          videos: data.items.map(normalizeVideo),
          nextPageToken: data.nextPageToken ?? '',
        }
      }

      const searchResponse = await searchVideos({ query: searchQuery, maxResults, pageToken })

      const videoIds = searchResponse.items
        .map((item) => item.id.videoId)
        .filter(Boolean)

      if (!videoIds.length) {
        return { videos: [], nextPageToken: '' }
      }

      const videosResponse = await getVideosByIds({ videoIds, maxResults })

      return {
        videos: videosResponse.items.map(normalizeVideo),
        nextPageToken: searchResponse.nextPageToken ?? '',
      }
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : String(e)
      return { videos: [], nextPageToken: '' }
    }
  }

  return {
    fetchVideos,
    error,
  }
}
