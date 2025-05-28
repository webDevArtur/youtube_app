import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/home/HomePage.vue'
import FavoritesPage from '../pages/favorites/FavoritesPage.vue'
import VideoPage from '../pages/video/VideoPage.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/favorites', component: FavoritesPage },
    { path: '/video/:id',name: 'VideoPage', component: VideoPage 
}],
})
