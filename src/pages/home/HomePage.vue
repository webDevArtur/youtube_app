<template>
  <div>
    <FilterPanel v-if="store.query && store.query.trim().length > 0" />

    <div v-if="store.error" class="error-message">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" fill="#ff0033"/>
      </svg>
      <span>{{ store.error }}</span>
    </div>

    <div v-if="!store.videos.length && !store.isLoading && !store.error" class="no-results">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" fill="#999"/>
      </svg>
      <p>Результаты не найдены. Измените параметры поиска.</p>
    </div>
    <div class="video-list">
      <VideoCard
        v-for="video in store.videos"
        :key="video.id"
        :video="video"
        @click="openVideo(video)"
      />
    </div>
    <div class="load-more-wrapper" v-if="store.nextPageToken">
      <button class="yt-button" @click="store.loadMore">Загрузить ещё</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import FilterPanel from '../../components/FilterPanel/FilterPanel.vue'
import VideoCard from '../../components/VideoCard/VideoCard.vue'
import { useVideoStore } from '../../store/videoStore'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const store = useVideoStore()
const router = useRouter()

function openVideo(video: any) {
  if (!video || !video.id) {
    return
  }

  router.push({
    name: 'VideoPage',
    params: { id: video.id },
    query: {
      title: video.title || 'Видео',
      description: video.description || '',
      channel: video.channel || '',
      publishedAt: video.publishedAt
        ? new Date(video.publishedAt).toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })
        : '',
      thumbnailUrl: video.thumbnailUrl,
      views: video.views || '0',
    },
  })
}

onMounted(() => {
  if (store.query && store.query.trim() !== '') {
    store.fetchVideos(store.query, store.filters)
  } else if (!store.videos.length) {
    store.fetchVideos('')
  }
})
</script>

<style scoped lang="scss">
@import './home.scss';
</style>
