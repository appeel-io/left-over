import { defineStore } from 'pinia'
import { useSupabaseClient, useSupabaseUser } from '#imports'

export const useProfileStore = defineStore('useProfileStore', {
  state: () => ({
    data: null,
  }),
  actions: {
    async getUserProfile() {
      const supabase = useSupabaseClient()
      const user = useSupabaseUser()
      if (!user.value) throw new Error('User not logged in')
      const { data, error } = await supabase.from('profiles').select('*').eq('id', user.value.id).single()
      if (error) throw error
      if (data) this.data = data
    },
  },
})
