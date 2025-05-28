import { computed } from 'vue'

export function useFormattedDate(publishedAt: string | undefined) {
  return computed(() => {
    if (!publishedAt) return ''
    return new Date(publishedAt).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  })
}
