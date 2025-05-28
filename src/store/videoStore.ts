import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useVideosFetcher } from '../hooks/useVideosFetcher'

function getVideoId(video: any): string {
  return typeof video.id === 'string' ? video.id : video.id?.videoId || ''
}

export const useVideoStore = defineStore('video', () => {
  const videos = ref<any[]>([])
  const favorites = ref<any[]>(JSON.parse(localStorage.getItem('favorites') || '[]'))
  const query = ref('')
  const error = ref('')
  const nextPageToken = ref('')
  const isLoading = ref(false)
  const filters = ref({})

  const { fetchVideos: fetcher, error: fetcherError } = useVideosFetcher()

  const fetchVideos = async (searchQueryParam: string, newFilters: any = {}) => {
    try {
      isLoading.value = true
      query.value = searchQueryParam
      filters.value = newFilters
      const data = await fetcher(searchQueryParam, newFilters)
      videos.value = data.videos
      nextPageToken.value = data.nextPageToken || ''
      error.value = ''

      if (fetcherError.value) {
        error.value = fetcherError.value
      }
    } catch (e: any) {
      error.value = e.message
    } finally {
      isLoading.value = false
    }
  }

  const loadMore = async () => {
    if (!nextPageToken.value) return
    try {
      isLoading.value = true
      const data = await fetcher(query.value, { ...filters.value, pageToken: nextPageToken.value })
      videos.value.push(...data.videos)
      nextPageToken.value = data.nextPageToken || ''

      if (fetcherError.value) {
        error.value = fetcherError.value
      }
    } catch (e: any) {
      error.value = e.message
    } finally {
      isLoading.value = false
    }
  }

  function plainVideo(video: any) {
    return JSON.parse(JSON.stringify(video))
  }

  const addFavorite = (video: any) => {
    const id = getVideoId(video)
    if (!favorites.value.some(v => getVideoId(v) === id)) {
      favorites.value.push(plainVideo(video))
      localStorage.setItem('favorites', JSON.stringify(favorites.value))
    }
  }

  const removeFavorite = (video: any) => {
    const id = getVideoId(video)
    favorites.value = favorites.value.filter(v => getVideoId(v) !== id)
    localStorage.setItem('favorites', JSON.stringify(favorites.value))
  }

  const resetVideos = () => {
    videos.value = []
    query.value = ''
    nextPageToken.value = ''
    error.value = ''
    filters.value = {}
  }

  return {
    videos,
    query,
    favorites,
    error,
    nextPageToken,
    isLoading,
    filters,
    fetchVideos,
    loadMore,
    addFavorite,
    removeFavorite,
    resetVideos,
  }
})
