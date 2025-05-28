import { computed } from 'vue'

export function useFormattedViews(views: string | number | undefined) {
  return computed(() => {
    if (!views) return '—'
    const viewsNum = typeof views === 'string' ? parseInt(views) : views
    if (isNaN(viewsNum)) return '—'

    return viewsNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  })
}