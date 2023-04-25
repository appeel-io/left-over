/* eslint-disable no-undef */
import { defineStore } from 'pinia'
import { useSupabaseClient, useSupabaseUser } from '#imports'

export const useAddressStore = defineStore('useAddressStore', () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  const address = ref(null)
  const error = ref(null)
  const loading = ref(null)

  async function getGeoFromAdress() {
    // const { data, error } = await useFetch('https://api.geoapify.com/v1/geocode/search?text=38%20Upper%20Montagu%20Street%2C%20Westminster%20W1H%201LJ%2C%20United%20Kingdom&apiKey=7b25bc7a723044b595137f0306ea297a')

    // console.log(data)
    // const { data, error } = await supabase.rpc('get_geo_from_address', {
    //   address: address,
    // })
    // if (error) throw error
    // return data
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

  async function updateAddress(newData) {
    try {
      await getGeoFromAdress(newData.address)
      // const { error } = await supabase
      //   .from('address')
      //   .upsert({ user_id: user.value.id, ...newData })
      //   .eq('id', id)
      // if (error) throw error
    }
    catch (error) {
      console.error(error)
    }
  }

  onMounted(getAddress)

  return { address, error, loading, updateAddress }
})
