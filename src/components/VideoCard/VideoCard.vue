<template>
  <div class="video-card" @click="$emit('click', video)">
    <img :src="video.thumbnailUrl" :alt="video.title" />
    <h3>{{ video.title }}</h3>
    <div class="content">
      <p class="published-at">{{ formattedViews }} просмотров · {{ formattedDate }} </p>
      <p class="channel">{{ video.channel }}</p>
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
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useVideoStore } from '../../store/videoStore'
import { useFormattedDate } from '../../utils/formateData'
import { useFormattedViews } from '../../utils/formateViews'

interface Video {
  id: string
  title: string
  channel: string
  publishedAt: string
  thumbnailUrl: string
  views?: number | string
}

const props = defineProps<{ video: Video }>()
const store = useVideoStore()

const isFavorite = computed(() =>
  store.favorites.some(fav => fav.id === props.video.id)
)

const toggleFavorite = () => {
  if (isFavorite.value) {
    store.removeFavorite(props.video)
  } else {
    store.addFavorite(props.video)
  }
}

const formattedDate = computed(() => useFormattedDate(props.video.publishedAt))
const formattedViews = computed(() => useFormattedViews(props.video.views))
</script>

<style scoped lang="scss">
@import './videoCard.scss';
</style>
