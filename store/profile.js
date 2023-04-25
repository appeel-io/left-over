/* eslint-disable no-undef */
import { defineStore } from 'pinia'
import { useSupabaseClient, useSupabaseUser } from '#imports'

export const useProfileStore = defineStore('useProfileStore', () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  const profile = ref(null)
  const error = ref(null)
  const loading = ref(null)

  async function getUserProfile() {
    error.value = null
    loading.value = true
    try {
      if (!user.value) throw new Error('User not logged in')
      const { data, error: err } = await supabase.from('profiles').select('*').eq('id', user.value.id).single()
      if (err) throw err
      if (data) profile.value = data
    }
    catch (err) {
      error.value = err
    }
    finally {
      loading.value = false
    }
  }

  async function updateProfile(newData) {
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({ id: user.value.id, ...newData })
      if (error) throw error
    }
    catch (error) {
      console.error(error)
    }
  }

  onMounted(getUserProfile)

  return { profile, error, loading, getUserProfile, updateProfile }
})
