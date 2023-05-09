/* eslint-disable no-undef */

import { defineStore } from 'pinia'
import { usePostingsStore } from '@/store/postings'
import { useProfileStore } from '@/store/profile'

export const useGlobalStore = defineStore('useGlobalStore', () => {
  const profileStore = useProfileStore()
  const postingsStore = usePostingsStore()

  const selectedPosting = ref(null)
  const selectedReservePosting = ref(null)
  const search = ref(null)
  const radius = ref(30)
  const filters = ref([])
  const allergies = ref([])

  const radiusOptions = [5, 10, 15, 25, 30, 40, 50, 75, 100].map(i => ({ value: i, label: `${i}km` }))

  watch(() => ({
    search,
    radius,
    filters,
    allergies,
  }), v => postingsStore.filterPostings(v.search.value, v.radius.value, v.filters.value, v.allergies.value), {
    deep: true,
    immediate: true,
  })

  watch(() => profileStore.profile?.allergies, v => allergies.value = v)

  return {
    selectedPosting,
    selectedReservePosting,
    search,
    radius,
    filters,
    allergies,
    radiusOptions,
  }
})
