import type { YouTubeVideoItem, NormalizedVideo } from '../entities/youtube'

export function normalizeVideo(raw: YouTubeVideoItem): NormalizedVideo {
  const snippet = raw.snippet || {}
  const views = raw.statistics?.viewCount ? parseInt(raw.statistics.viewCount, 10) : 0

  return {
    id: raw.id,
    title: snippet.title || '',
    channel: snippet.channelTitle || '',
    publishedAt: snippet.publishedAt || '',
    thumbnailUrl: snippet.thumbnails?.medium?.url || '',
    description: snippet.description || '',
    views,
  }
}
