import type { YouTubeVideoItem, YouTubeAPIResponse } from '../entities/youtube'
import { youtubeApi } from '../api/youtubeApi'

interface GetPopularVideosParams {
  regionCode?: string
  maxResults?: number
  pageToken?: string
}

export async function getPopularVideos({
  regionCode = 'RU',
  maxResults = 12,
  pageToken = '',
}: GetPopularVideosParams): Promise<YouTubeAPIResponse<YouTubeVideoItem>> {
  return youtubeApi({
    endpoint: 'videos',
    params: {
      part: 'snippet,statistics',
      chart: 'mostPopular',
      regionCode,
      maxResults,
      pageToken,
    },
  })
}
