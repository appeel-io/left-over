/* eslint-disable no-undef */
import { defineStore } from 'pinia'
import { useGeolocation } from '@vueuse/core'

export const useProfileStore = defineStore('useProfileStore', () => {
  const { coords, resume, pause, error: geoError, locatedAt } = useGeolocation({ immediate: false })
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  const profile = ref(null)
  const error = ref(null)
  const loading = ref(null)
  const currentLocation = ref(false)

  const position = computed(() => {
    return {
      long: currentLocation.value && coords.value?.longitude && coords.value.longitude !== Infinity
        ? coords.value.longitude
        : profile.value?.address[0]?.long || null,
      lat: currentLocation.value && coords.value?.latitude && coords.value.latitude !== Infinity
        ? coords.value.latitude
        : profile.value?.address[0]?.lat || null,
    }
  })

  async function getUserProfile() {
    error.value = null
    loading.value = true
    try {
      if (!user.value) throw new Error('User not logged in')
      const { data, error: err } = await supabase.from('profiles')
        .select('*, address(lat,long,id)')
        .eq('id', user.value.id)
        .single()
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

  function startCurrentLocation() {
    currentLocation.value = true
    resume()
  }

  function pauseCurrentLocation() {
    currentLocation.value = false
    pause()
  }

  onMounted(getUserProfile)

  return {
    profile,
    error,
    loading,
    position,
    geoError,
    locatedAt,
    currentLocation,
    getUserProfile,
    updateProfile,
    startCurrentLocation,
    pauseCurrentLocation,
  }
})
