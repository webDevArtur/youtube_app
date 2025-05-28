import type { YouTubeSearchItem, YouTubeAPIResponse } from '../entities/youtube'
import { youtubeApi } from '../api/youtubeApi'

interface SearchVideosParams {
  query: string
  pageToken?: string
  maxResults?: number
}

export async function searchVideos({
  query,
  pageToken = '',
  maxResults = 12,
}: SearchVideosParams): Promise<YouTubeAPIResponse<YouTubeSearchItem>> {
  return youtubeApi({
    endpoint: 'search',
    params: {
      part: 'snippet',
      q: query,
      maxResults,
      type: 'video',
      pageToken,
    },
  })
}
