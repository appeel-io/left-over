/* eslint-disable no-undef */
import { defineStore } from 'pinia'
import { useSupabaseClient, useSupabaseUser } from '#imports'

export const useAddressStore = defineStore('useAddressStore', () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  const address = ref(null)
  const error = ref(null)
  const loading = ref(null)

  async function getGeoFromAdress(address) {
    const encodedAddress = `${address.number}%20${address.street}%2C%20${address.city}%2C%20${address.postcode}%2C%20${address.country}`
    const { data, error } = await useFetch(`https://api.geoapify.com/v1/geocode/search?text=${encodedAddress}&apiKey=7b25bc7a723044b595137f0306ea297a`)
    if (error.value) throw error.value
    return {
      lat: Object.values(data.value.features[0].geometry.coordinates)[1],
      long: Object.values(data.value.features[0].geometry.coordinates)[0],
    }
  }

  async function getAddress() {
    error.value = null
    loading.value = true
    try {
      if (!user.value) throw new Error('User not logged in')
      const { data, error: err } = await supabase.from('address').select('*').eq('profile', user.value.id)
      if (err) throw err
      if (data) address.value = data
    }
    catch (err) {
      error.value = err
    }
    finally {
      loading.value = false
    }
  }

  async function updateAddress(id, newData) {
    try {
      const geoData = await getGeoFromAdress(newData)
      const { error } = await supabase
        .from('address')
        .upsert({
          id,
          ...newData,
          ...geoData,
          profile: user.value.id,
        })
      if (error) throw error
    }
    catch (error) {
      console.error(error)
    }
  }
  const options = computed(() => address.value?.map(e => ({
    value: e.id, label: `${e.street} ${e.house_number}`,
  })))
  onMounted(getAddress)

  return { address, error, loading, updateAddress, options }
})
