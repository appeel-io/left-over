/* eslint-disable no-undef */

import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('useGlobalStore', () => {
  const selectedPosting = ref(null)

  return {
    selectedPosting,
  }
})
