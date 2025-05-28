<template>
  <div class="search-bar">
    <input v-model="query" @keyup.enter="search" placeholder="Введите запрос" />
    <button @click="search" aria-label="Поиск">
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style="pointer-events: none; display: inherit;">
        <path clip-rule="evenodd" d="M16.296 16.996a8 8 0 11.707-.708l3.909 3.91-.707.707-3.909-3.909zM18 11a7 7 0 00-14 0 7 7 0 1014 0z" fill-rule="evenodd"></path>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useVideoStore } from '../../store/videoStore'

const store = useVideoStore()
const router = useRouter()
const route = useRoute()

const query = computed({
  get: () => store.query,
  set: (val) => store.query = val
})

watch(query, (newVal) => {
  if (newVal.trim() === '') {
    store.fetchVideos('')
    if (route.path !== '/') {
      router.push('/')
    }
  }
})

const search = () => {
  const trimmed = query.value.trim()
  if (!trimmed) return

  store.query = trimmed
  store.fetchVideos(trimmed, store.filters)
}
</script>

<style scoped lang="scss">
@import './searchBar.scss';
</style>
