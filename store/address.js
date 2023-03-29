/* eslint-disable no-undef */
import { defineStore } from 'pinia'
import { useSupabaseClient, useSupabaseUser } from '#imports'

export const useAddressStore = defineStore('useAddressStore', () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  const address = ref(null)
  const error = ref(null)
  const loading = ref(null)

  async function getAddress() {
    error.value = null
    loading.value = true
    try {
      if (!user.value) throw new Error('User not logged in')
      const { data, error: err } = await supabase.from('address').select('*').eq('user', user.value.id)
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
      const { error } = await supabase
        .from('address')
        .upsert({ id, ...newData })
        .eq('id', id)
      if (error) throw error
    }
    catch (error) {
      console.error(error)
    }
  }

  onMounted(getAddress)

  return { address, error, loading, updateAddress }
})
