export interface YouTubeAPIResponse<T> {
  kind: string
  etag: string
  nextPageToken?: string
  prevPageToken?: string
  pageInfo: {
    totalResults: number
    resultsPerPage: number
  }
  items: T[]
}

export interface VideoSnippet {
  title: string
  thumbnails: { medium: { url: string } }
  channelTitle: string
  publishedAt: string
  description: string
}

export interface YouTubeSearchItem {
  id: { videoId: string }
  snippet: VideoSnippet
}

export interface YouTubeVideoItem {
  id: string
  snippet: VideoSnippet
  statistics: {
    viewCount: string
  }
}

export interface NormalizedVideo {
  id: string
  title: string
  channel: string
  publishedAt: string
  thumbnailUrl: string
  description: string
  views: number
}
