/* eslint-disable no-undef */

import { defineStore } from 'pinia'

export const useCategoriesStore = defineStore('useCategoriesStore', () => {
  const supabase = useSupabaseClient()

  const categories = ref([])
  const error = ref(null)
  const loading = ref(false)

  const categoriesOptions = computed(() => categories.value.map(({ id, label }) => ({ label, value: id })))

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
  const options = computed(() => categories.value?.map(e => ({ value: e.id, label: e.label })))

  onMounted(getCategories)

  return {
    data: categories,
    categoriesOptions,
    error,
    loading,
    getCategories,
    options,
  }
})
