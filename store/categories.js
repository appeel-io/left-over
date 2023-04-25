/* eslint-disable no-undef */

import { defineStore } from 'pinia'

export const useCategoriesStore = defineStore('useCategoriesStore', () => {
  const supabase = useSupabaseClient()

  const categories = ref(null)
  const error = ref(null)
  const loading = ref(false)

  async function getCategories() {
    error.value = null
    loading.value = true
    try {
      const { data, error: err } = await supabase.from('categories').select('*')
      if (err) throw err
      categories.value = data
    }
    catch (err) {
      err.value = null
    }
    finally {
      loading.value = false
    }
  }

  onMounted(getCategories)

  return {
    data: categories,
    error,
    loading,
    getCategories,
  }
})
