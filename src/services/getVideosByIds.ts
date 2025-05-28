import type { YouTubeVideoItem, YouTubeAPIResponse } from '../entities/youtube'
import { youtubeApi } from '../api/youtubeApi'

interface GetVideosParams {
  videoIds: string[]
  maxResults?: number
}

export async function getVideosByIds({
  videoIds,
  maxResults = 12,
}: GetVideosParams): Promise<YouTubeAPIResponse<YouTubeVideoItem>> {
  return youtubeApi({
    endpoint: 'videos',
    params: {
      part: 'snippet,statistics',
      id: videoIds.join(','),
      maxResults,
    },
  })
}
