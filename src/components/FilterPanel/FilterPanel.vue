<template>
  <div class="filter-panel">
    <button class="toggle-btn" @click="filtersVisible = !filtersVisible">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M15 17h6v1h-6v-1zm-4 0H3v1h8v2h1v-5h-1v2zm3-9h1V3h-1v2H3v1h11v2zm4-3v1h3V5h-3zM6 14h1V9H6v2H3v1h3v2zm4-2h11v-1H10v1z"/>
      </svg>

      <span>Фильтры</span>
    </button>

    <transition name="fade-slide">
      <div v-if="filtersVisible" class="filters-form">
        <div class="form-group">
          <label for="order">Сортировка</label>

          <select id="order" v-model="order">
            <option value="relevance">По релевантности</option>

            <option value="date">По дате</option>

            <option value="viewCount">По просмотрам</option>
          </select>
        </div>

        <div class="form-group">
          <label for="duration">Длительность</label>

          <select id="duration" v-model="duration">
            <option value="">Любая</option>

            <option value="short">Короткие</option>

            <option value="medium">Средние</option>

            <option value="long">Длинные</option>
          </select>
        </div>

        <div class="form-group">
          <button class="apply-btn" @click="applyFilters">Применить</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useVideoStore } from '../../store/videoStore'

const store = useVideoStore()

const filtersVisible = ref(false)

const order = ref('relevance')
const duration = ref('')

const applyFilters = () => {
  const filters: any = {
    order: order.value,
  }

  if (duration.value) {
    filters.videoDuration = duration.value
  }

  store.fetchVideos(store.query, filters)
}
</script>

<style scoped lang="scss">
@import './filterPanel.scss';
</style>
