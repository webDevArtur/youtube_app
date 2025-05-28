<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useVideoStore } from '../../store/videoStore'
import { useFormattedViews } from '../../utils/formateViews'

const route = useRoute()
const store = useVideoStore()

const videoId = String(route.params.id)

const video = computed(() => ({
  id: videoId,
  title: (route.query.title as string) || 'Видео',
  description: (route.query.description as string) || '',
  channel: (route.query.channel as string) || '',
  publishedAt: (route.query.publishedAt as string) || '',
  thumbnailUrl: (route.query.thumbnailUrl as string) || '',
  views: (route.query.views as string) || '0',
}))

const formattedViews = computed(() => useFormattedViews(video.value.views))

const videoUrl = `https://www.youtube.com/embed/${videoId}`

const expanded = ref(false)
function toggleDescription() {
  expanded.value = !expanded.value
}

function linkify(text: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/g
  return text.replace(urlRegex, url => {
    return `<a href="${url}" class="link" target="_blank" rel="noopener noreferrer">${url}</a>`
  })
}

const shortDescription = computed(() => {
  const desc = video.value.description
  if (desc.length > 300 && !expanded.value) {
    return linkify(desc.slice(0, 300) + '...')
  }
  return linkify(desc)
})

const isFavorite = computed(() =>
  store.favorites.some(fav => fav.id === videoId)
)

function toggleFavorite() {
  if (isFavorite.value) {
    store.removeFavorite(video.value)
  } else {
    store.addFavorite(video.value)
  }
}
</script>

<template>
  <div class="video-page">
    <div class="video-container">
      <iframe
        class="video-player"
        :src="videoUrl"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      />
    </div>

    <div class="video-info">
      <h1 class="video-title">{{ video.title }}</h1>

      <div class="channel-name">
        <div class="channel-logo">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style="pointer-events: none; display: inherit;"><path clip-rule="evenodd" d="M4 4.5A1.5 1.5 0 015.5 3h13A1.5 1.5 0 0120 4.5H4Zm16.5 3h-17v11h17v-11ZM3.5 6A1.5 1.5 0 002 7.5v11A1.5 1.5 0 003.5 20h17a1.5 1.5 0 001.5-1.5v-11A1.5 1.5 0 0020.5 6h-17Zm7.257 4.454a.5.5 0 00-.757.43v4.233a.5.5 0 00.757.429L15 13l-4.243-2.546Z" fill-rule="evenodd"></path></svg>

          {{ video.channel }}
        </div>

            <button
              class="favorite-btn"
              @click.stop="toggleFavorite"
              :aria-pressed="isFavorite"
              :title="isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'"
            >
              <svg
                v-if="isFavorite"
                xmlns="http://www.w3.org/2000/svg"
                fill="red"
                stroke="red"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                aria-hidden="true"
              >
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                  2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3
                  19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                fill="gray"
                stroke="gray"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                aria-hidden="true"
              >
                <path
                  stroke-width="2"
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                  2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81
                  14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55
                  11.54L12 21.35z"
                />
              </svg>
            </button>
      </div>

      <div class="description-wrapper">
        <div class="video-stats">
          <span style="margin-right: 6px;">{{ formattedViews }} просмотров</span>
          <span>{{ video.publishedAt }}</span>
        </div>

        <p class="description" v-html="shortDescription.replace(/\n/g, '<br>')"></p>
        <button
          v-if="video.description.length > 300"
          @click="toggleDescription"
          class="toggle-btn"
        >
          {{ expanded ? 'Свернуть' : 'Показать ещё' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import './video.scss';
</style>