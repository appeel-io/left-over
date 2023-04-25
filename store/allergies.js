/* eslint-disable no-undef */

import { defineStore } from 'pinia'

export const useAllergiesStore = defineStore('useAllergiesStore', () => {
  const supabase = useSupabaseClient()

  const allergies = ref([])
  const error = ref(null)
  const loading = ref(false)

  const allergiesOptions = computed(() => allergies.value.map(({ label }) => label))

  async function getAllergies() {
    error.value = null
    loading.value = true

    try {
      const { data, error: err } = await supabase.from('allergies').select('*')
      if (err) throw err
      allergies.value = data
    }
    catch (err) {
      err.value = null
    }
    finally {
      loading.value = false
    }
  }

  const options = computed(() => allergies.value?.map(allergy => (allergy.label)))

  onMounted(getAllergies)

  return {
    data: allergies,
    allergiesOptions,
    error,
    options,
    loading,
    getAllergies,
  }
})
